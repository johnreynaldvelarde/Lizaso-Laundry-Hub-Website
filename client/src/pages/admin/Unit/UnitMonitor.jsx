import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Badge,
  Menu,
  MenuItem,
  Grid,
  Typography,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import { SlidersHorizontal, HourglassLow } from "@phosphor-icons/react";

// popup page
import PopupSelectUnit from "./PopupSelectUnit";
import PopupCustomerRequest from "./PopupCustomerRequest";
import PopupInLaundry from "./PopupInLaundry";
import PopupInQueue from "./PopupInQueue";

// image
import Available from "../../../assets/images/Available.png";
import Occupied from "../../../assets/images/Occupied.png";
import Reserved from "../../../assets/images/Reserved.png";
import In_Maintaince from "../../../assets/images/Not_Available.png";
import noData from "../../../assets/images/no_data.png";

const UnitMonitor = () => {
  const [anchorEl, setAnchorEl] = useState(null);
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
    fetchCountInQueue,
  } = useUnitMonitor();

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
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [fetchUnitsData, fetchCountInQueue]);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
          placeholder="Search units..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "100%", maxWidth: "400px" }}
        />

        <Box sx={{ mt: isSmallScreen ? 2 : 0, display: "flex", gap: 2 }}>
          <Button
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
          >
            Filter
          </Button>
          <Badge
            badgeContent={countInQueueData}
            color="primary"
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
            onClick={handleClick}
          >
            In Progress
          </Button>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "in-progress-button",
          }}
        >
          <MenuItem onClick={handleClose}>Option 1</MenuItem>
          <MenuItem onClick={handleClose}>Option 2</MenuItem>
          <MenuItem onClick={handleClose}>Option 3</MenuItem>
        </Menu>
      </Box>
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
              src={noData}
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
    </Box>
  );
};

export default UnitMonitor;

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       await fetchUnitsData();
//       await fetchCountInQueue();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   fetchData();
// }, [fetchUnitsData, fetchCountInQueue]);

// useEffect(() => {
//   fetchUnitsData();
// }, []);
