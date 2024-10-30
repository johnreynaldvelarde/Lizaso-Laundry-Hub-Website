import React, { useCallback, useEffect, useState } from "react";
import useAuth from "../../../contexts/AuthContext";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Badge,
  Menu,
  MenuItem,
  Paper,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
  FormControl,
  Select,
} from "@mui/material";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import { HourglassLow, PlusCircle } from "@phosphor-icons/react";
import PopupSelectUnit from "./components/PopupSelectUnit";
import PopupInQueue from "./components/PopupInQueue";
import nodata from "../../../assets/images/no_data_all.jpg";
import { COLORS } from "../../../constants/color";
import usePopup from "../../../hooks/common/usePopup";
import PopCompleteInLaundry from "./components/PopCompleteInLaundry";
import DrawerInLaundry from "./components/DrawerInLaundry";
import useFetchData from "../../../hooks/common/useFetchData";

import {
  getCountLaundryAssignment,
  getCountRequestInQueue,
  viewUnits,
} from "../../../services/api/getApi";
import { getUnitImage } from "./components/unit_helpers";
import CustomHeaderTitle from "../../../components/common/CustomHeaderTitle";
import CustomAddButton from "../../../components/common/CustomAddButton";
import { KeyboardArrowDown } from "@mui/icons-material";
import { statusUnit } from "../../../data/unit/unitStatus";
import PopAddNewUnits from "./components/PopAddNewUnits";

const UnitMonitor = () => {
  const { userDetails } = useAuth();
  const {
    openDialog,
    selectedUnit,
    openInQueue,
    searchTerm,
    handleOpenDialog,
    handleCloseDialog,
    handleSearchChange,
    handleOpenInQueue,
    handleCloseInQueue,
    // <------------------------->
  } = useUnitMonitor();
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const { isOpen, popupType, openPopup, closePopup } = usePopup();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const { data: unitsData, fetchData: fetchUnits } = useFetchData();
  const { data: countInQueueData, fetchData: fetchCountInQueue } =
    useFetchData();
  const { data: countAssignmentData, fetchData: fetchCountAssignment } =
    useFetchData();

  const fetchUnitsData = useCallback(() => {
    fetchUnits(viewUnits.getUnitsList, userDetails.storeId);
  }, [fetchUnits, userDetails?.storeId]);

  const fetchCountInQueueData = useCallback(() => {
    fetchCountInQueue(
      getCountRequestInQueue.getCountInQueue,
      userDetails.storeId
    );
  }, [fetchCountInQueue, userDetails?.storeId]);

  const fetchCountAssignmentData = useCallback(() => {
    fetchCountAssignment(
      getCountLaundryAssignment.getCountAssignment,
      userDetails.storeId
    );
  }, [fetchCountAssignment, userDetails?.storeId]);

  useEffect(() => {
    fetchUnitsData();
    fetchCountInQueueData();
    fetchCountAssignmentData();

    // const intervalId = setInterval(() => {
    //   fetchUnitsData();
    //   fetchCountInQueueData();
    //   fetchCountAssignmentData();
    // }, 10000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [fetchUnitsData, fetchCountInQueueData, fetchCountAssignmentData]);

  // useEffect(() => {
  //   setFilteredUnits(
  //     unitsData
  //       .filter((unit) =>
  //         unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //       .filter(
  //         (unit) => filterStatus === "" || unit.isUnitStatus === filterStatus
  //       )
  //   );
  // }, [searchTerm, unitsData, filterStatus]);

  useEffect(() => {
    setFilteredUnits(
      unitsData
        .filter((unit) =>
          unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
          (unit) => filterStatus === 0 || unit.isUnitStatus === filterStatus
        )
    );
  }, [searchTerm, unitsData, filterStatus]);

  const handleRefreshData = () => {
    fetchUnitsData();
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status); // This stores the selected status
    setFilterStatus(status); // This applies the filter
  };

  return (
    <Box sx={{ pt: "100px", pb: "20px", px: { xs: 1, md: 2 } }}>
      {/* Header */}
      <Box
        className="flex items-center justify-between mb-8"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        <CustomHeaderTitle
          title={"Monitored Units"}
          subtitle={"Tracking and managing all active laundry units"}
        />
        <CustomAddButton
          label={"Add new units"}
          onClick={() => {
            openPopup("addUnits");
          }}
          icon={
            <PlusCircle
              size={24}
              color={COLORS.white}
              weight="duotone"
              sx={{ display: { xs: "none", sm: "inline" } }}
            />
          }
        />
      </Box>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            mt: { xs: 2, sm: 2, md: 0 },
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "column", md: "row" },
            gap: 2,
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search units name..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "100%", md: "300px", lg: "400px" },
              mb: { xs: 2, sm: 2, md: 0 },
              "& .MuiInputBase-root": {
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              gap: 2, // Space between buttons
              flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack buttons vertically on small screens
              width: "100%", // Ensure full width on small screens
              justifyContent: { xs: "center", sm: "center", md: "flex-end" }, // Center buttons on small screens
            }}
          >
            <FormControl sx={{ minWidth: 200 }} size="small">
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                displayEmpty
                IconComponent={KeyboardArrowDown}
                renderValue={(selected) => {
                  if (!selected) {
                    return <span style={{ color: COLORS.primary }}>All</span>;
                  }
                  // Find the selected option label
                  const selectedOption = statusUnit.find(
                    (option) => option.value === selected
                  );
                  return selectedOption ? selectedOption.label : "";
                }}
                sx={{
                  borderRadius: 2,
                  color: COLORS.primary,
                  "& .MuiSvgIcon-root": {
                    color: COLORS.primary,
                  },
                }}
              >
                {/* Status options */}
                {statusUnit.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Badge
              badgeContent={countInQueueData > 0 ? countInQueueData : null}
              color="error"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "5px",
                  fontWeight: 600,
                  textTransform: "none",
                  padding: { xs: "8px 15px", sm: "10px 20px", md: "10px 20px" },
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  color: "#5787C8",
                  borderColor: "#5787C8",
                  height: "40px", // Fixed height for all screens
                  width: { xs: "100%", sm: "100%", md: "auto" }, // Full width on small screens
                  "&:hover": {
                    borderColor: "#5787C8",
                    backgroundColor: "rgba(87, 135, 200, 0.1)",
                  },
                }}
                onClick={handleOpenInQueue}
              >
                Customer Request
              </Button>
            </Badge>

            <Badge
              badgeContent={Number(countAssignmentData?.count_in_progress) || 0}
              color="error"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Button
                variant="contained"
                startIcon={
                  <HourglassLow size={24} color="#fcfcfc" weight="duotone" />
                }
                sx={{
                  textTransform: "none",
                  backgroundColor: "#17a2b8",
                  padding: { xs: "8px 15px", sm: "10px 20px", md: "10px 20px" },
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  height: "40px", // Fixed height for all screens
                  width: { xs: "100%", sm: "100%", md: "auto" }, // Full width on small screens
                  "&:hover": { backgroundColor: "#117a8b" },
                }}
                onClick={() => toggleDrawer(true)}
              >
                In Progress
              </Button>
            </Badge>
          </Box>
        </Box>
      </Box>

      {/* List of Units*/}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 2,
        }}
      >
        {filteredUnits.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 400px)",
              width: "100%",
              gridColumn: "1 / -1",
              textAlign: "center",
            }}
          >
            <img
              src={nodata}
              alt="No data"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: COLORS.primary,
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              No laundry units available
            </Typography>
          </Box>
        ) : (
          filteredUnits.map((unit) => (
            <Box
              key={unit.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "20px",
                p: 2,
                textAlign: "center",
                width: "100%",
                height: "341px",
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  position: "absolute",
                  top: 15,
                  left: 20,
                  fontWeight: 600,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {unit.unit_name}
              </Typography>
              <img
                src={getUnitImage(unit.isUnitStatus)}
                alt={unit.unit_name}
                style={{
                  width: "100%",
                  maxWidth: "170px",
                  height: "auto",
                  maxHeight: "calc(341px - 80px)",
                  objectFit: "contain",
                  marginTop: "10px",
                  marginBottom: "30px",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  position: "absolute",
                  bottom: 25,
                  width: "80%",
                  backgroundColor:
                    unit.isUnitStatus === 0
                      ? "#4690FF"
                      : unit.isUnitStatus === 1
                      ? "#B4162C"
                      : unit.isUnitStatus === 2
                      ? "#FFA500"
                      : unit.isUnitStatus === 3
                      ? "gray"
                      : "gray",
                  color: "white",
                  "&:hover": {
                    backgroundColor:
                      unit.isUnitStatus === 0
                        ? "#3576CC"
                        : unit.isUnitStatus === 1
                        ? "#8B1A2C"
                        : unit.isUnitStatus === 2
                        ? "#FF8C00"
                        : unit.isUnitStatus === 3
                        ? "darkgray"
                        : "darkgray",
                  },
                  fontSize: "1rem",
                  fontWeight: 500,
                }}
                onClick={() => {
                  if (unit.isUnitStatus === 0) {
                    handleOpenDialog(unit);
                  } else if (unit.isUnitStatus === 1) {
                    toast.error("This laundry unit is occupied");
                  }
                }}
              >
                {unit.isUnitStatus === 0
                  ? "Select"
                  : unit.isUnitStatus === 1
                  ? "Occupied"
                  : unit.isUnitStatus === 2
                  ? "Reserved"
                  : unit.isUnitStatus === 3
                  ? "In Maintenance"
                  : "Unknown"}
              </Button>
            </Box>
          ))
        )}
      </Box>

      {selectedUnit && (
        <PopupSelectUnit
          open={openDialog}
          onClose={handleCloseDialog}
          unitName={selectedUnit.unit_name}
          unitId={selectedUnit.id}
        />
      )}

      {openInQueue && (
        <PopupInQueue open={openInQueue} onClose={handleCloseInQueue} />
      )}

      {/* Popup */}
      {isOpen && popupType === "completeInLaundry" && (
        <PopCompleteInLaundry open={isOpen} onClose={closePopup} />
      )}
      {isOpen && popupType === "addUnits" && (
        <PopAddNewUnits
          open={isOpen}
          onClose={closePopup}
          refreshData={handleRefreshData}
        />
      )}
      <DrawerInLaundry open={drawerOpen} onClose={() => toggleDrawer(false)} />
    </Box>
  );
};

export default UnitMonitor;

{
  /* <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={handleClose}>Available</MenuItem>
              <MenuItem onClick={handleClose}>Occupied</MenuItem>
              <MenuItem onClick={handleClose}>Reserved</MenuItem>
            </Menu> */
}
