import React, { useState } from "react";
import useAuth from "../../../../contexts/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { COLORS } from "../../../../constants/color";

const A_PopupAddRole = ({ open, onClose }) => {
  const { userDetails } = useAuth();
  const [rolename, setRolename] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    if (!rolename) {
      newErrors.rolename = "Role name is required";
    }

    if (!selectedPermissions) {
      newErrors.selectedPermissions = "Permissions is required";
    }
    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "rolename") {
      setRolename(value);
    } else if (field === "selectedPermissions") {
      setSelectedPermissions(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleCreateUser = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      setTimeout(async () => {
        // const data = {
        //   store_id: storeId || userDetails.storeId,
        //   service_name: serviceName,
        //   default_price: defaultPrice,
        // };
        // try {
        //   let response;
        //   if (serviceData) {
        //     response = await updateServiceType.putServiceType(
        //       serviceData.id,
        //       data
        //     );
        //   } else {
        //     response = await createNewServiceType.setServiceType(data);
        //   }
        //   if (response.success) {
        //     toast.success(response.message);
        //     handleClear();
        //     if (onSuccess) onSuccess(); // Call the onSuccess callback to refresh the data
        //   } else {
        //     setErrors((prevErrors) => ({
        //       ...prevErrors,
        //       serviceName: response.message,
        //     }));
        //   }
        // } catch (error) {
        //   if (error.response && error.response.data) {
        //     toast.error(error.response.data.message);
        //   } else {
        //     toast.error(
        //       "An unexpected error occurred while creating the service type."
        //     );
        //   }
        // } finally {
        //   setLoading(false);
        // }
      }, 500);
    }
  };

  const handleDialogClose = () => {
    setRolename("");
    setSelectedPermissions("");

    setErrors({});

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
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
            <span className="text-lg font-semibold">Add a new role</span>
          </div>
          <IconButton
            onClick={handleDialogClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className="mt-1">
          Provide the details for the new role below.
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Role Name*/}
        <TextField
          margin="dense"
          label="Role Name"
          type="text"
          fullWidth
          variant="outlined"
          value={rolename}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.rolename)}
          helperText={errors.rolename}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        />

        {/* Select a permissions*/}
        <TextField
          select
          margin="dense"
          label="Permissions"
          fullWidth
          variant="outlined"
          value={selectedPermissions}
          onChange={handleInputChange("selectedPermissions")}
          error={Boolean(errors.selectedPermissions)}
          helperText={errors.selectedPermissions}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        >
          {/* Add your role options here */}
          <MenuItem value="" disabled>
            Select a permissions
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="delivery">Delivery Personnel</MenuItem>
        </TextField>
      </DialogContent>
      {/* Footer */}
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
          onClick={handleCreateUser}
          variant="contained"
          disableElevation
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
          {loading ? (
            <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            "Create Role"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default A_PopupAddRole;
