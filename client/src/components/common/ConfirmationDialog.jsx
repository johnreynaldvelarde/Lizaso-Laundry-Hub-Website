import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function ConfirmationDialog({ open, onClose, onConfirm, itemId }) {
  return (
    <Dialog open={open} onClose={onClose} className="p-4">
      <DialogTitle className="text-lg font-semibold">
        Are you absolutely sure?
      </DialogTitle>
      <DialogContent className="text-sm text-gray-700">
        Are you sure you want to remove this item?
      </DialogContent>
      <DialogActions className="space-x-2">
        <Button
          onClick={onClose}
          className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm(itemId);
            onClose();
          }}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
