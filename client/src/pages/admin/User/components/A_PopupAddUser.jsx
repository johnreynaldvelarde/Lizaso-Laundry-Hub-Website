import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

const A_PopupAddUser = ({ open, onClose }) => {
  // const validateFields = () => {
  //   const newErrors = {};
  //   if (!serviceName) {
  //     newErrors.serviceName = "Service name is required";
  //   }
  //   if (!defaultPrice) {
  //     newErrors.defaultPrice = "Price is required";
  //   } else if (defaultPrice <= 0) {
  //     newErrors.defaultPrice = "Price must be greater than 0";
  //   }
  //   return newErrors;
  // };

  // const handleInputChange = (field) => (e) => {
  //   const value = e.target.value;

  //   if (field === "serviceName") {
  //     setServiceName(value);
  //   } else if (field === "defaultPrice") {
  //     setDefaultPrice(value);
  //   }

  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     [field]: "",
  //   }));
  // };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      <DialogTitle className="flex flex-col">
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">
              {serviceData ? "Edit Service" : "Add Service"}
            </span>
          </div>
          <IconButton
            onClick={onClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className="mt-1">
          Enter service details below.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Service Name"
          type="text"
          fullWidth
          variant="outlined"
          error={Boolean(errors.serviceName)}
          helperText={errors.serviceName}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          error={Boolean(errors.defaultPrice)}
          helperText={errors.defaultPrice}
        />
      </DialogContent>
      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          variant="outlined"
          onClick={onClose}
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
          onClick={handleSave}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 500,
            minWidth: "90px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3A5A85",
            },
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default A_PopupAddUser;
