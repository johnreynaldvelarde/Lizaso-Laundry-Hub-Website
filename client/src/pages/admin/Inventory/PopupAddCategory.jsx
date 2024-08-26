import React, { useState } from "react";
import useInventory from "../../../hooks/admin/useInventory";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const PopupAddCategory = ({ open, onClose }) => {
  const {
    errors,
    categoryName,
    setCategoryName,
    handleInputChange,
    handleSubmitCategory,
  } = useInventory();
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ mt: 2 }}>Add new category</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Provide the name for the new category you are adding.
        </Typography>
        <TextField
          label="Category Name"
          variant="outlined"
          size="medium"
          fullWidth
          margin="normal"
          value={categoryName}
          onChange={handleInputChange("categoryName")}
          error={Boolean(errors.categoryName)}
          helperText={errors.categoryName}
          sx={{
            mt: 3,
            "& .MuiOutlinedInput-root": {
              "&.Mui-error": {
                borderColor: "red",
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmitCategory} color="primary">
          Submit
        </Button>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupAddCategory;
