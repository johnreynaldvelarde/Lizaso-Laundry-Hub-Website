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
  const [username, setUsername] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value); // Update the state with the selected value
  };

  const validateFields = () => {
    const newErrors = {};
    if (!username) {
      newErrors.username = "Username is required";
    }
    if (!defaultPassword) {
      newErrors.defaultPassword = "Password is required";
    }
    if (!firstname) {
      newErrors.firstname = "Firstname is required";
    }
    if (!lastname) {
      newErrors.lastname = "Lastname is required";
    }
    if (!number) {
      newErrors.number = "Mobile number is required";
    }
    if (!selectedRole) {
      newErrors.selectedRole = "Role is required";
    }
    if (!selectedStatus) {
      newErrors.selectedStatus = "Status is required";
    }
    if (!selectedPermissions) {
      newErrors.selectedPermissions = "Permissions is required";
    }
    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "username") {
      setUsername(value);
    } else if (field === "defaultPassword") {
      setDefaultPassword(value);
    } else if (field === "firstname") {
      setFirstname(value);
    } else if (field === "lastname") {
      setLastname(value);
    } else if (field === "middlename") {
      setMiddlename(value);
    } else if (field === "number") {
      setNumber(value);
    } else if (field === "selectedRole") {
      setSelectedRole(value);
    } else if (field === "selectedStatus") {
      setSelectedStatus(value);
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
    setUsername("");
    setFirstname("");
    setLastname("");
    setNumber("");
    setSelectedRole("");
    setSelectedStatus("");
    setSelectedPermissions("");

    setErrors({});

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="sm"
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
          value={username}
          onChange={handleInputChange("username")}
          error={Boolean(errors.username)}
          helperText={errors.username}
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

        {/* Mobile Number */}
        <TextField
          margin="dense"
          label="Mobile Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={number}
          error={Boolean(errors.number)}
          helperText={errors.number}
          onChange={(e) => {
            const { value } = e.target;
            handleInputChange("number")({
              target: { value: value.replace(/[^0-9]/g, "") },
            });
          }}
          // onChange={(e) => {
          //   const { value } = e.target;
          //   if (/^[0-9]*$/.test(value) || value === "") {
          //     handleInputChange("number", value);
          //   } else {
          //     e.target.value = value.replace(/[^0-9]/g, "");
          //   }
          // }}
          inputProps={{
            inputMode: "numeric",
          }}
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
        {/* Select a role */}
        <TextField
          select
          margin="dense"
          label="Role"
          fullWidth
          variant="outlined"
          value={selectedRole}
          onChange={handleInputChange("selectedRole")}
          error={Boolean(errors.selectedRole)}
          helperText={errors.selectedRole}
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
        >
          {/* Add your role options here */}
          <MenuItem value="" disabled>
            Select a role
          </MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="manager">Manager</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="delivery">Delivery Personnel</MenuItem>
        </TextField>
        {/* Status and Permission */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {/* Select a status */}
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            value={selectedStatus}
            onChange={handleInputChange("selectedStatus")}
            error={Boolean(errors.selectedStatus)}
            helperText={errors.selectedStatus}
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
              Select a role
            </MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="delivery">Delivery Personnel</MenuItem>
          </TextField>

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
        </Box>
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
            "Create User"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default A_PopupAddRole;
