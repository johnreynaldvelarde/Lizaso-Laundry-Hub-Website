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
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";
import { COLORS } from "../../../../constants/color";
import { createNewRoleAndPermissions } from "../../../../services/api/postApi";

const A_PopupEditRole = ({ open, onClose, selectRoleData }) => {
  const { userDetails } = useAuth();
  const [rolename, setRolename] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    if (!rolename) {
      newErrors.rolename = "Role name is required";
    }

    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "rolename") {
      setRolename(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handlePermissionToggle = (permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleUpdateRole = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      const roleData = {
        role_name: rolename,
        permissionsStatus: {
          Read: selectedPermissions.includes("Read"),
          Write: selectedPermissions.includes("Write"),
          Edit: selectedPermissions.includes("Edit"),
          Delete: selectedPermissions.includes("Delete"),
        },
      };

      try {
        const response = await createNewRoleAndPermissions.setRoleAndPermissons(
          userDetails.userId,
          roleData
        );

        if (response.success) {
          toast.success(response.message);
          onClose();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(`Error with service request: ${error.message || error}`);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setRolename("");
    setSelectedPermissions([]);
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
            <span className="text-lg font-semibold">Edit Role Permission</span>
          </div>
          <IconButton
            onClick={handleDialogClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className="mt-1">
          Select permissions for this role
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Role Name */}
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

        {/* Permission Selection */}
        <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
          Select Permissions:
        </Typography>
        <Grid container spacing={1} sx={{ mt: 0.5 }}>
          {["Read", "Write", "Edit", "Delete"].map((permission) => (
            <Grid item xs={6} sm={4} md={3} key={permission}>
              <Button
                variant={
                  selectedPermissions.includes(permission)
                    ? "contained"
                    : "outlined"
                }
                onClick={() => handlePermissionToggle(permission)}
                sx={{
                  color: selectedPermissions.includes(permission)
                    ? "#fff"
                    : COLORS.secondary,
                  backgroundColor: selectedPermissions.includes(permission)
                    ? COLORS.secondary
                    : "#fff",
                  width: "100%", // Make the button full width
                  "&:hover": {
                    backgroundColor: selectedPermissions.includes(permission)
                      ? "#3A5A85"
                      : "rgba(144, 144, 144, 0.1)",
                  },
                }}
              >
                {selectedPermissions.includes(permission) && <CheckIcon />}
                {permission}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      {/* Footer */}
      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          variant="outlined"
          onClick={handleDialogClose}
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
          onClick={handleUpdateRole}
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

export default A_PopupEditRole;
