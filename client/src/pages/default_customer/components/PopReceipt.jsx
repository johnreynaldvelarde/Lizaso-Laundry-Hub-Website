import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  DialogActions,
} from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../constants/color";

const PopReceipt = ({ open, onClose }) => {
  const handleDownloadAsPdf = () => {
    if (paymentMethod) {
      console.log(`Payment Method: ${paymentMethod}`);
      onClose();
    } else {
      alert("Please select a payment method.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          height: "600px",
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Transaction Receipt"}
        subtitle={"Your receipt is displayed below"}
        onClose={onClose}
      />

      <DialogContent
        style={{
          padding: "16px",
          height: "calc(100% - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      ></DialogContent>

      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          sx={{
            marginTop: 3,
            marginRight: 1,
            borderColor: COLORS.border2,
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            color: COLORS.text4,
            "&:hover": {
              borderColor: COLORS.border2,
              backgroundColor: COLORS.light,
            },
          }}
        >
          Save as Image
        </Button>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          sx={{
            marginTop: 3,
            textTransform: "none",
            backgroundColor: COLORS.secondary,
            "&:hover": {
              backgroundColor: COLORS.secondaryHover,
            },
          }}
        >
          Download as PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopReceipt;
