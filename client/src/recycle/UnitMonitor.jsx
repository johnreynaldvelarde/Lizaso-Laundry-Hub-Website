import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import {
  Box,
  Button,
  Badge,
  Drawer,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  Paper,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../../styles/style";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import {
  SlidersHorizontal,
  HourglassLow,
  MinusSquare,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

// popup page
import PopupSelectUnit from "./PopupSelectUnit";
import PopupInQueue from "./PopupInQueue";

// image
import nodata from "../../../assets/images/no_data.png";
import Available from "../../../assets/images/Available.png";
import Occupied from "../../../assets/images/Occupied.png";
import Reserved from "../../../assets/images/Reserved.png";
import In_Maintaince from "../../../assets/images/Not_Available.png";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";
import { COLORS } from "../../../constants/color";
import usePopup from "../../../hooks/common/usePopup";
import PopCompleteInLaundry from "./PopCompleteInLaundry";
import DrawerInLaundry from "./components/DrawerInLaundry";

const UnitMonitor = () => {
  const {
    openDialog,
    selectedUnit,
    openCustomerRequest,
    openInQueue,
    openInProgress,
    searchTerm,
    filteredUnits,
    loading,
    error,
    handleOpenDialog,
    handleCloseDialog,
    handleCloseCustomerRequest,
    handleCloseInProgress,
    handleSearchChange,
    handleOpenInQueue,
    handleCloseInQueue,
    fetchUnitsData,
    userDetails,
    // <----- Counting Section ----->
    countInQueueData,
    countAssignmentData,
    fetchCountInQueue,
    fetchCountLaundryAssignment,
    // <------------------------->
    // <----- Drawer InProgress Section ----->
    inQueueData,
    inProgressData,
    dialogProgressOpen,
    selectedProgressID,
    setDialogProgressOpen,
    fetchInProgress,
    handleDialogRemoveInProgress,
    handleConfirmRemoveInProgress,
    handleConfirmInProgress,
    // <------------------------->
  } = useUnitMonitor();

  const { isOpen, popupType, openPopup, closePopup } = usePopup();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getImage = (status) => {
    switch (status) {
      case 0:
        return Available;
      case 1:
        return Occupied;
      case 2:
        return Reserved;
      case 3:
        return In_Maintaince;
      default:
        return Available;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUnitsData();
        await fetchCountInQueue();
        await fetchCountLaundryAssignment();
        await fetchInProgress();
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [
    fetchUnitsData,
    fetchCountInQueue,
    fetchCountLaundryAssignment,
    fetchInProgress,
  ]);

  const refreshData = async () => {
    try {
      await fetchUnitsData();
      await fetchInProgress();
      // await fetchCountLaundryAssignment();
    } catch (error) {
      console.error("Error during refresh:", error);
    }
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ pt: "90px", pb: "20px", px: { xs: 1, md: 2 } }}>
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
            justifyContent: "space-between", // Ensure search is on the left, buttons on the right
            alignItems: "center",
            flexDirection: { xs: "column", sm: "column", md: "row" }, // Stack vertically on small screens
            gap: 2, // Add spacing between elements
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search units name..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: "100%", // Full width of the container
              maxWidth: { xs: "100%", sm: "100%", md: "300px", lg: "400px" }, // Adjust maximum width for different screen sizes
              mb: { xs: 2, sm: 2, md: 0 }, // Margin bottom for spacing on small screens
              "& .MuiInputBase-root": {
                fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" }, // Responsive font size
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
            <Button
              variant="outlined"
              endIcon={open ? <CaretUp size={20} /> : <CaretDown size={20} />}
              sx={{
                borderRadius: "5px",
                fontWeight: 600,
                textTransform: "none",
                padding: {
                  xs: "8px 15px",
                  sm: "10px 20px",
                  md: "10px 20px",
                  lg: "10px 20px",
                  xl: "10px auto",
                },
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
                color: "#5787C8",
                borderColor: "#5787C8",
                height: "40px", // Fixed height for all screens
                width: { xs: "100%", sm: "100%", md: "auto" }, // Full width on small screens
                overflow: "hidden", // Hide overflow content
                textOverflow: "ellipsis", // Handle overflowed text
                whiteSpace: "nowrap", // Prevent text wrapping
                "&:hover": {
                  borderColor: "#5787C8",
                  backgroundColor: "rgba(87, 135, 200, 0.1)",
                },
              }}
              onClick={handleClick}
            >
              Filter by Status
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={handleClose}>Available</MenuItem>
              <MenuItem onClick={handleClose}>Occupied</MenuItem>
              <MenuItem onClick={handleClose}>Reserved</MenuItem>
            </Menu>

            <Badge
              badgeContent={countInQueueData}
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
              badgeContent={countAssignmentData.count_in_progress}
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

      {/* Drawer */}
      {/* <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 450,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: 2,
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
            }}
          >
            <span className="text-xl font-semibold">In Progress Laundry</span>
            <IconButton
              onClick={() => toggleDrawer(false)}
              sx={{ color: "#5787C8", "&:hover": { color: "#5787C8" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          <Box
            sx={{
              height: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            {" "}
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              In Progress Laundry
            </Typography>
          </Box>
          <Divider />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              padding: 2,
              height: "100%",
            }}
          >
            {inProgressData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full border border-gray-300 rounded-lg shadow-sm">
                <img src={nodata} alt="No Data" className="w-32 h-32 mb-4" />
                <p
                  className="text-base font-semibold"
                  style={{ color: styles.textColor2 }}
                >
                  No data available at the moment
                </p>
              </div>
            ) : (
              <ul className="space-y-2">
                {inProgressData.map((customer) => (
                  <Paper
                    key={customer.id}
                    sx={{
                      padding: 2,
                      boxShadow: "none !important",
                      borderRadius: "10px",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "divider",
                    }}
                    className="flex justify-between items-center"
                  >
                    <div className="flex-1 mr-4 truncate">
                      <div className="font-bold truncate">
                        {customer.customer_fullname}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {customer.unit_name}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {formatDistanceToNow(new Date(customer.assigned_at), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="contained"
                        disableElevation
                        color="primary"
                        size="small"
                        onClick={() => openPopup("completeInLaundry")}
                        // onClick={() => handleConfirmInProgress(customer.id)}
                        disabled={loading}
                        sx={{
                          backgroundColor: "#5787C8",
                          borderRadius: "5px",
                          fontWeight: 600,
                          fontSize: 15,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#3A5A85",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            size={20}
                            sx={{ color: COLORS.white }}
                          />
                        ) : (
                          "Complete"
                        )}
                      </Button>
                      <IconButton
                        onClick={() =>
                          handleDialogRemoveInProgress(customer.id, refreshData)
                        }
                      >
                        <MinusSquare
                          size={20}
                          color="#DB524B"
                          weight="duotone"
                        />
                      </IconButton>
                    </div>
                  </Paper>
                ))}
              </ul>
            )}
          </Box>
          <Box
            sx={{
              padding: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Paper sx={{ padding: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Additional Information or Footer Content
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Drawer> */}
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
                marginBottom: "20px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: "text.secondary",
                fontSize: "1.5rem",
                textAlign: "center",
              }}
            >
              No units available
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
                src={getImage(unit.isUnitStatus)}
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
                    // alert("This is occupied");
                    // handleShowOccupiedMenu(unit); // Function to handle occupied state
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
          onSuccess={refreshData}
        />
      )}

      {openInQueue && (
        <PopupInQueue open={openInQueue} onClose={handleCloseInQueue} />
      )}

      {/* {openInProgress && (
        <PopupInLaundry open={openInProgress} onClose={handleCloseInProgress} />
      )} */}

      {/* Popup */}
      {isOpen && popupType === "completeInLaundry" && (
        <PopCompleteInLaundry open={isOpen} onClose={closePopup} />
      )}
      <DrawerInLaundry
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        inProgressData={inProgressData}
      />

      {/* <ConfirmationDialog
        open={dialogProgressOpen}
        onClose={() => setDialogProgressOpen(false)}
        onConfirm={handleConfirmRemoveInProgress}
        itemId={selectedProgressID}
      /> */}
    </Box>
  );
};

export default UnitMonitor;
