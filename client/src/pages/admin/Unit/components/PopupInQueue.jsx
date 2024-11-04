import React, { useCallback, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Paper,
  Button,
  Tooltip,
  Typography,
  Box,
  Chip,
  Skeleton,
  Divider,
  Stack,
} from "@mui/material";
import styles from "../../../../styles/style";
import { Link } from "react-router-dom";
import {
  CalendarDots,
  SlidersHorizontal,
  MinusSquare,
  WashingMachine,
  PlusCircle,
  CheckCircle,
} from "@phosphor-icons/react";
import CloseIcon from "@mui/icons-material/Close";
import nodata from "../../../../assets/images/no_data_all.jpg";
import useUnitMonitor from "../../../../hooks/admin/useUnitMonitor";
import PopupAssignUnit from "./PopupAssignUnit";
import ConfirmationDialog from "../../../../components/common/ConfirmationDialog";
import useFetchData from "../../../../hooks/common/useFetchData";
import { viewRequestInQueue, viewUnits } from "../../../../services/api/getApi";
import useAuth from "../../../../contexts/AuthContext";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../../constants/color";
import usePopup from "../../../../hooks/common/usePopup";
import CustomSearch from "../../../../components/common/table/filter/CustomSearch";
import PopAddInQueue from "./PopAddInQueue";
import CustomUnitsAvailable from "./import/CustomUnitsAvailable";
import CustomAddButton from "../../../../components/common/CustomAddButton";
import CustomOutlinedAddButton from "../../../../components/common/CustomOutlinedAddButton";
import CustomFilterCustomerType from "../../../../components/common/table/filter/CustomFilterCustomerType";
import Net10Grid from "./import/Net10Box";

const PopupInQueue = ({ open, onClose }) => {
  const { userDetails } = useAuth();
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [loading, setLoading] = useState(true);
  // const {
  //   dialogQueueOpen,
  //   dialogAssignUnitOpen,
  //   selectedQueueID,
  //   setDialogQueueOpen,
  //   setDialogAssignUnitOpen,
  //   handleDialogAssignUnit,
  //   handleDialogRemoveInQueue,
  //   handleConfrimRemoveQueue,
  // } = useUnitMonitor();

  const { data: unitsData, fetchData: fetchUnits } = useFetchData();
  const { data: inQueueData, fetchData: fetchInQueue } = useFetchData();

  const fetchUnitsData = useCallback(() => {
    setLoading(true);
    fetchUnits(viewUnits.getUnitsList, userDetails.storeId);
    setLoading(false);
  }, [fetchUnits, userDetails?.storeId]);

  const fetchInQueueData = useCallback(() => {
    fetchInQueue(viewRequestInQueue.getRequestInQueue, userDetails.storeId);
  }, [fetchInQueue, userDetails?.storeId]);

  useEffect(() => {
    if (open) {
      fetchUnitsData();
      fetchInQueueData();

      const intervalId = setInterval(() => {
        fetchUnitsData();
        fetchInQueueData();
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [fetchUnitsData, fetchInQueueData, open]);

  const handleRefreshData = () => {
    fetchUnitsData();
    fetchInQueueData();
  };

  const allUnitsAvailable =
    unitsData && unitsData.every((unit) => unit.isUnitStatus === 1);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Queued Laundry"}
        subtitle={" Track laundry in queue and assign available units."}
        onClose={onClose}
      />

      <DialogTitle>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
        >
          <Link to="/main/schedule" style={{ textDecoration: "none" }}>
            <CustomOutlinedAddButton
              onClick={() => openPopup("addInQueue")}
              label={"View Schedule Details"}
              icon={
                <CalendarDots
                  size={24}
                  color={COLORS.secondary}
                  weight="duotone"
                />
              }
            />
          </Link>

          <CustomAddButton
            onClick={() => openPopup("addInQueue")}
            label={"Add In Queue"}
            icon={
              <PlusCircle size={24} color={COLORS.white} weight="duotone" />
            }
            disabled={!allUnitsAvailable}
          />
        </Stack>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{ color: COLORS.secondary }}
          >
            Laundry Units:
          </Typography>
          <Box sx={{ ml: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              label="Available"
              variant="outlined"
              sx={{
                borderColor: COLORS.success,
                backgroundColor: COLORS.pale_sucess,
                color: COLORS.success,
                fontSize: 15,
              }}
            />
            <Chip
              label="Occupied"
              variant="outlined"
              sx={{
                borderColor: COLORS.error,
                backgroundColor: COLORS.pale_error,
                color: COLORS.error,
                fontSize: 15,
              }}
            />
          </Box>
        </Box>

        <CustomUnitsAvailable unitsData={unitsData} loading={loading} />

        <Box sx={{ mt: 3 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              gap: 2,
              mt: {
                xs: 2,
                sm: 0,
              },
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <CustomSearch
                // searchTerm={searchTerm}
                // handleSearchChange={handleSearchChange}
                placeholder={"Search name or tracking code or queue number ..."}
                customWidth={450}
              />
            </Box>

            <Box
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
              }}
            >
              <CustomFilterCustomerType customWidth={250} />
            </Box>
          </Box>
        </Box>
      </DialogTitle>

      {/* Sub Header 3 */}
      <DialogContent>
        <Box>
          <Net10Grid />
          <Box>
            {/* 
          {inQueueData.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <img
                src={nodata}
                alt="No Data"
                style={{ width: 128, height: 128, marginBottom: "8px" }}
              />
              <Typography
                variant="body1"
                sx={{ color: COLORS.primary, fontWeight: 500 }}
              >
                No data available at the moment
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                paddingBottom: 1,
              }}
            >
              {inQueueData.map((customer) => (
                <Paper
                  key={customer.id}
                  sx={{
                    padding: 2,
                    boxShadow: "none !important",
                    borderRadius: "10px",
                    border: "1px solid",
                    borderColor: "divider",
                    minWidth: 250,
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 600 }}
                    >
                      {customer.customer_fullname}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: styles.textColor2 }}
                    >
                      <strong>Service Type:</strong> {customer.service_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: styles.textColor2 }}
                    >
                      <strong>Waiting Time:</strong>{" "}
                      <span style={{ color: styles.textColor1 }}>
                        {formatDistanceToNow(new Date(customer.request_date), {
                          addSuffix: true,
                        })}
                      </span>
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                    {customer.notes && customer.notes.trim() !== "" && (
                      <Tooltip title={customer.notes} arrow>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{
                            borderColor: "#5787C8",
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
                      </Tooltip>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => openPopup("selectAssignUnit", customer.id)}
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
                  </Box>
                </Paper>
              ))}
            </Box>
          )} */}
          </Box>
        </Box>
      </DialogContent>

      {/* <ConfirmationDialog
      // open={dialogQueueOpen}
      // onClose={() => setDialogQueueOpen(false)}
      // onConfirm={handleConfrimRemoveQueue}
      // itemId={selectedQueueID}
      /> */}

      {isOpen && popupType === "selectAssignUnit" && (
        <PopupAssignUnit
          open={isOpen}
          onClose={closePopup}
          inqueueID={popupData}
          refreshData={handleRefreshData}
          // onConfirm={handleRemoveCategory}
          // id={popupData}
          // inqueueID={selectedQueueID}
        />
      )}

      {isOpen && popupType === "addInQueue" && (
        <PopAddInQueue
          open={isOpen}
          onClose={closePopup}
          // onConfirm={handleRemoveCategory}
          // id={popupData}
        />
      )}

      {isOpen && popupType === "removeCategory" && (
        <ConfirmationDialog
          open={isOpen}
          onClose={closePopup}
          onConfirm={handleRemoveCategory}
          id={popupData}
        />
      )}
    </Dialog>
  );
};

export default PopupInQueue;

{
  /* <IconButton
                      onClick={() => openPopup("selectAssignUnit", customer.id)}
                    >
                      <MinusSquare size={20} color="#DB524B" weight="duotone" />
                    </IconButton> */
}

{
  /* <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: "8px",
                maxWidth: "300px", // You can adjust this width
                textAlign: "center",
                backgroundColor: "#f0f8ff", // Light background color
                border: "1px solid #2196f3", // Blue border
              }}
            >
              <CheckCircle sx={{ color: "#2196f3", fontSize: 40 }} />
              <Typography variant="h6" sx={{ fontWeight: 600, mt: 2 }}>
                Net 10
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
                Enjoy unlimited talk and text with 10GB of high-speed data.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "#2196f3" }}
                >
                  Only $35/month
                </Typography>
              </Box>
            </Paper>
          </Box> */
}
