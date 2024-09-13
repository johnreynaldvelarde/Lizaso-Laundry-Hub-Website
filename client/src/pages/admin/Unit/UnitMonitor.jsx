import React, { useEffect, useState } from "react";
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
import PopupCustomerRequest from "./PopupCustomerRequest";
import PopupInLaundry from "./PopupInLaundry";
import PopupInQueue from "./PopupInQueue";

// image
import nodata from "../../../assets/images/no_data.png";
import Available from "../../../assets/images/Available.png";
import Occupied from "../../../assets/images/Occupied.png";
import Reserved from "../../../assets/images/Reserved.png";
import In_Maintaince from "../../../assets/images/Not_Available.png";
import ConfirmationDialog from "../../../components/common/ConfirmationDialog";

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
        <TextField
          variant="outlined"
          placeholder="Search units name..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "100%", maxWidth: "400px" }}
        />

        <Box sx={{ mt: isSmallScreen ? 2 : 0, display: "flex", gap: 2 }}>
          {/* <Button
            variant="outlined"
            startIcon={
              <SlidersHorizontal size={24} color="#5787C8" weight="duotone" />
            }
            sx={{
              borderRadius: "5px",
              fontWeight: 600,
              textTransform: "none",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontSize: "16px",
              color: "#5787C8",
              borderColor: "#5787C8",
              "&:hover": {
                borderColor: "#5787C8",
                backgroundColor: "rgba(87, 135, 200, 0.1)",
              },
            }}
            onClick={handleClick}
          >
            Filter by Status
          </Button> */}

          <Button
            variant="outlined"
            startIcon={
              <SlidersHorizontal size={24} color="#5787C8" weight="duotone" />
            }
            endIcon={open ? <CaretUp size={20} /> : <CaretDown size={20} />} // Toggle arrow icon
            sx={{
              borderRadius: "5px",
              fontWeight: 600,
              textTransform: "none",
              paddingLeft: "20px",
              paddingRight: "20px",
              fontSize: "16px",
              color: "#5787C8",
              borderColor: "#5787C8",
              "&:hover": {
                borderColor: "#5787C8",
                backgroundColor: "rgba(87, 135, 200, 0.1)",
              },
            }}
            onClick={handleClick}
          >
            Filter by Status
          </Button>

          {/* Menu for status options */}
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
                paddingLeft: "20px",
                paddingRight: "20px",
                fontSize: "16px",
                color: "#5787C8",
                borderColor: "#5787C8",
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
                "&:hover": { backgroundColor: "#117a8b" },
              }}
              onClick={() => toggleDrawer(true)}
            >
              In Progress
            </Button>
          </Badge>
        </Box>
      </Box>

      {/* Drawer */}
      <Drawer
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
          {/* Top Row - Title and Close Button */}
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

          {/* Second Row */}
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

          {/* Third Row - Customer List */}
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
                        onClick={() => handleConfirmInProgress(customer.id)}
                        disabled={loading}
                        sx={{
                          backgroundColor: "#5787C8",
                          borderRadius: "5px",
                          fontWeight: 500,
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#3A5A85",
                          },
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={20} sx={{ color: "#fff" }} /> // Show loading spinner
                        ) : (
                          "Complete" // Show text when not loading
                        )}
                      </Button>
                      <IconButton
                        onClick={() =>
                          handleDialogRemoveInProgress(customer.id)
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

          {/* Bottom Row - Footer */}
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
      </Drawer>

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
                onClick={() => handleOpenDialog(unit)}
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

      {openCustomerRequest && (
        <PopupCustomerRequest
          open={openCustomerRequest}
          onClose={handleCloseCustomerRequest}
        />
      )}

      {openInQueue && (
        <PopupInQueue open={openInQueue} onClose={handleCloseInQueue} />
      )}

      {openInProgress && (
        <PopupInLaundry open={openInProgress} onClose={handleCloseInProgress} />
      )}

      {/* Filter */}
      {/* <Menu
        anchorEl={anchorEl}
        id="filter-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Available</MenuItem>
        <MenuItem onClick={handleClose}>Occupied</MenuItem>
        <MenuItem onClick={handleClose}>Reserved</MenuItem>
        <MenuItem onClick={handleClose}>Maintenance</MenuItem>
      </Menu> */}

      <ConfirmationDialog
        open={dialogProgressOpen}
        onClose={() => setDialogProgressOpen(false)}
        onConfirm={handleConfirmRemoveInProgress}
        itemId={selectedProgressID}
      />
    </Box>
  );
};

export default UnitMonitor;
