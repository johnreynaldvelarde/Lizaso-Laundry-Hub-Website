import React, { useState, useEffect } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { Radio, RadioGroup, FormControlLabel, Paper } from "@mui/material";

function PopupAssignUnit({ open, onClose, inqueueID }) {
  const {
    avaiableUnitData,
    selectedAssignUnit,
    setSelectedAssignUnit,
    handleAssignUnitSelect,
    handleAssignUnitConfirm,
    fetchAvailableUnit,
  } = useUnitMonitor();

  const dialogVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (open) {
      fetchAvailableUnit();
    }
  }, [open]);

  // const handleAssignUnitConfirm = (inqueueID) => {
  //   if (selectedAssignUnit) {
  //     // onConfirm(inqueueID, selectedAssignUnit);
  //     console.log("In Queue ID: " + inqueueID);
  //     console.log("Unit ID: " + selectedAssignUnit);
  //     onClose();
  //   } else {
  //     toast.error("Select a unit before proceeding");
  //   }
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: motion.div,
        variants: dialogVariants,
        initial: "hidden",
        animate: "visible",
        transition: { duration: 0.3, ease: "easeOut" },
        className: "bg-white rounded-3xl max-w-md mx-4 p-1",
      }}
    >
      <div className="relative">
        <DialogTitle className="text-lg font-semibold mb-4">
          Select an Available Unit
        </DialogTitle>
        <DialogContent className="text-sm text-gray-700 mb-4">
          <div
            style={{
              padding: "2px",
              maxHeight: "300px", // Set max height for the list
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <RadioGroup
              value={selectedAssignUnit}
              onChange={handleAssignUnitSelect}
            >
              {avaiableUnitData.length > 0 ? (
                avaiableUnitData.map((unit) => (
                  <Paper
                    key={unit.id}
                    // elevation={selectedUnit === unit.id ? 6 : 1}
                    sx={{
                      padding: "15px",
                      boxShadow: "none !important",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "divider",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      //   backgroundColor:
                      //     selectedUnit === unit.id ? "#e0f7fa" : "#f5f5f5",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedAssignUnit(unit.id)}
                  >
                    <FormControlLabel
                      value={unit.id}
                      control={<Radio />}
                      label={unit.unit_name}
                    />
                  </Paper>
                ))
              ) : (
                <p>No available units at the moment.</p>
              )}
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-end space-x-2 mb-1">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              marginRight: 1,
              borderColor: "#595959",
              borderRadius: "5px",
              fontWeight: 500,
              textTransform: "none",
              color: "#595959",
              "&:hover": {
                borderColor: "#595959",
                backgroundColor: "rgba(144, 144, 144, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => handleAssignUnitConfirm(inqueueID, onClose)}
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
            Proceed
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default PopupAssignUnit;
