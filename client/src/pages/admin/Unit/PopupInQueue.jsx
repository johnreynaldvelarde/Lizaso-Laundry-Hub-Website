import React, { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  Button,
  colors,
} from "@mui/material";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";
import {
  CalendarDots,
  SlidersHorizontal,
  MinusSquare,
} from "@phosphor-icons/react";
import CloseIcon from "@mui/icons-material/Close";
import nodata from "../../../assets/images/no_data.png";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

const PopupInQueue = ({ open, onClose }) => {
  const { fetchUnitsData, fetchInQueueLaundry, unitsData, inQueueData } =
    useUnitMonitor();

  useEffect(() => {
    fetchUnitsData();
  }, []);

  useEffect(() => {
    fetchInQueueLaundry();
  }, []);

  const customers = [
    { id: 1, name: "John Doe", status: "Washing", timeInQueue: "30 minutes" },
    { id: 2, name: "Jane Smith", status: "Drying", timeInQueue: "15 minutes" },
    {
      id: 3,
      name: "Michael Johnson",
      status: "Waiting",
      timeInQueue: "45 minutes",
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      classes={{
        paper: "rounded-lg shadow-lg",
      }}
    >
      <DialogTitle className="flex flex-col">
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold">Queued Laundry</span>
          <IconButton
            onClick={onClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Track laundry in queue and assign available units.
        </p>
        <div className="mt-4 flex gap-2 justify-between">
          <Link to="/main/schedule" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={
                <CalendarDots size={24} color="#5787C8" weight="duotone" />
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
              View Schedule Details
            </Button>
          </Link>

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
            Mark
          </Button>
        </div>
        <div className="flex items-center mt-6 ">
          <span className="text-base font-semibold flex items-center">
            Laundry Units
            <span className="ml-4 flex items-center">
              <span className="text-sm px-3 py-1 rounded-full border-2 border-[#0ba360]  text-[#0ba360] bg-[#3cba92] bg-opacity-10 font-normal mr-2">
                Available
              </span>
              <span className="text-sm px-3 py-1 rounded-full border-2 border-[#eb3941] bg-[#f15e64] bg-opacity-10 text-[#eb3941] font-normal">
                Occupied
              </span>
            </span>
          </span>
        </div>
        <div>
          <div className="mt-4 flex overflow-x-auto space-x-3 hori-scrollable">
            {unitsData.map((unit) => (
              <div
                key={unit.id}
                className={`flex-shrink-0 p-3 rounded-lg min-w-[100px] text-center mb-1 ${
                  unit.isUnitStatus === 0
                    ? "bg-gradient-to-r from-[#0ba360] to-[#3cba92] text-white"
                    : "bg-gradient-to-r from-[#B4162C] to-[#e14e53] text-white"
                }`}
              >
                <span className="text-base block font-medium text-white">
                  {unit.unit_name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogTitle>

      <DialogContent className="bg-white px-4 py-6 mb-2">
        {inQueueData.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-sm">
            <img src={nodata} alt="No Data" className="w-32 h-32 mb-4" />
            <p
              className="text-base font-semibold"
              style={{ color: styles.textColor2 }}
            >
              No data available at the moment
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {inQueueData.map((customer) => (
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
                <div>
                  <h3 className="text-lg font-semibold">
                    {customer.customer_fullname}
                  </h3>
                  <p className="text-sm" style={{ color: styles.textColor2 }}>
                    <span className="font-semibold mr-2">Service Type:</span>
                    <span className="font-normal">{customer.service_type}</span>
                  </p>
                  <p className="text-sm" style={{ color: styles.textColor2 }}>
                    <span className="font-semibold mr-2">Waiting Time:</span>
                    <span
                      className="font-normal"
                      style={{ color: styles.textColor1 }}
                    >
                      {formatDistanceToNow(new Date(customer.request_date), {
                        addSuffix: true,
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="outlined"
                    disableElevation
                    color="primary"
                    size="small"
                    className="ml-4"
                    sx={{
                      marginRight: 1,
                      borderColorolor: "#5787C8",
                      borderRadius: "5px",
                      fontWeight: 500,
                      textTransform: "none",
                      "&:hover": {
                        borderColor: "#5787C8",
                        backgroundColor: "rgba(87, 135, 200, 0.1)",
                      },
                    }}
                  >
                    Notes
                  </Button>

                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    size="small"
                    className="ml-4"
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
                    Assign
                  </Button>
                  <IconButton>
                    <MinusSquare size={20} color="#DB524B" weight="duotone" />
                  </IconButton>
                </div>
              </Paper>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupInQueue;
