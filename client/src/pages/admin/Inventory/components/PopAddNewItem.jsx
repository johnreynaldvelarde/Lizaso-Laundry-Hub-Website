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
  Grid,
  Menu,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import toast from "react-hot-toast";
import { COLORS } from "../../../../constants/color";
import { createNewRoleAndPermissions } from "../../../../services/api/postApi";
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";

const PopAddNewItem = ({ open, onClose, data }) => {
  const { userDetails } = useAuth();
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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

  const handleCreateUser = async () => {
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
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      <CustomPopHeaderTitle
        title={"Add New Item"}
        subtitle={"Provide the details for the new item"}
        onClose={onClose}
      />
      <DialogContent>
        {/* Item Generated Code */}
        <TextField
          margin="dense"
          label="Item Code"
          type="text"
          fullWidth
          variant="outlined"
          value={itemCode}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.itemCode)}
          helperText={errors.itemCode}
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
        {/* Item Name */}
        <TextField
          margin="dense"
          label="Item Name"
          type="text"
          fullWidth
          variant="outlined"
          value={itemName}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.itemName)}
          helperText={errors.itemName}
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
        {/* Item Price */}
        <TextField
          margin="dense"
          label="Price"
          type="text"
          fullWidth
          variant="outlined"
          value={itemPrice}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.itemPrice)}
          helperText={errors.itemPrice}
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
        {/* Select Category */}
        <TextField
          select
          margin="dense"
          label="Category"
          fullWidth
          variant="outlined"
          value={selectedCategory}
          onChange={handleInputChange("selectedStore")}
          error={Boolean(errors.selectedCategory)}
          helperText={errors.selectedCategory}
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
            Select a category
          </MenuItem>
          {data.map((category) => (
            <MenuItem key={category.category_id} value={category.category_id}>
              {category.category_name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      {/* Footer */}
      <CustomPopFooterButton
        label={"Create Item"}
        onClose={onClose}
        loading={loading}
      />
    </Dialog>
  );
};

export default PopAddNewItem;
