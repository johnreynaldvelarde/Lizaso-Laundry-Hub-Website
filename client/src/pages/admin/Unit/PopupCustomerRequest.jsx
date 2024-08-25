import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const PopupCustomerRequest = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Customer Request</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Details of the customer request go here.
        </Typography>
        {/* Add form or content for customer request */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupCustomerRequest;
