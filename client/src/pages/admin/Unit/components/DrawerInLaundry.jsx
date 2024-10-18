import React, { useCallback, useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Box,
  Button,
  Drawer,
  Divider,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import nodata from "../../../../assets/images/no_data.png";
import styles from "../../../../styles/style";
import { MinusSquare } from "@phosphor-icons/react";
import CloseIcon from "@mui/icons-material/Close";
import ConfirmationDialog from "../../../../components/common/ConfirmationDialog";
import usePopup from "../../../../hooks/common/usePopup";
import PopCompleteInLaundry from "./PopCompleteInLaundry";
import useUnitMonitor from "../../../../hooks/admin/useUnitMonitor";
import useFetchData from "../../../../hooks/common/useFetchData";
import { getAssignmentInProgress } from "../../../../services/api/getApi";
import useAuth from "../../../../contexts/AuthContext";

const DrawerInLaundry = ({ open, onClose }) => {
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(false);
  const { isOpen, popupType, openPopup, closePopup } = usePopup();
  const {
    selectedProgressID,
    dialogProgressOpen,
    setDialogProgressOpen,
    handleDialogRemoveInProgress,
    handleConfirmRemoveInProgress,
  } = useUnitMonitor();

  const { data: inProgressData, fetchData: fetchInprogress } = useFetchData();

  const fetchInprogressData = useCallback(() => {
    fetchInprogress(getAssignmentInProgress.getInProgress, userDetails.storeId);
  }, [fetchInprogress, userDetails?.storeId]);

  useEffect(() => {
    if (open) {
      fetchInprogressData();

      const intervalId = setInterval(() => {
        fetchInprogressData();
      }, 2000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [fetchInprogressData, open]);

  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose()}>
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
              onClick={() => onClose()}
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
                        onClick={() => openPopup("completeInLaundry")}
                        // onClick={() => handleConfirmInProgress(customer.id)}
                        disabled={loading}
                        sx={{
                          backgroundColor: "#5787C8",
                          borderRadius: "5px",
                          fontWeight: 600,
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

      {/* Popup */}
      {isOpen && popupType === "completeInLaundry" && (
        <PopCompleteInLaundry open={isOpen} onClose={closePopup} />
      )}

      <ConfirmationDialog
        open={dialogProgressOpen}
        onClose={() => setDialogProgressOpen(false)}
        onConfirm={handleConfirmRemoveInProgress}
        itemId={selectedProgressID}
      />
    </>
  );
};

export default DrawerInLaundry;
