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
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { COLORS } from "../../../../constants/color";
import { createAdminBasedNewUser } from "../../../../services/api/postApi";
import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import { Link } from "react-router-dom";
import PopupTermsAndConditon from "./PopupTermsAndConditon1";
import usePopup from "../../../../hooks/common/usePopup";
import { registerService } from "../../../../services/api/authClient";

const PopAddNewCustomer = ({ open, onClose, refreshData }) => {
  const { userDetails } = useAuth();
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();

  const [username, setUsername] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreement, setIsAgreement] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateFields = () => {
    const newErrors = {};

    const fields = {
      username: "Username is required",
      defaultPassword: "Password is required",
      firstname: "Firstname is required",
      lastname: "Lastname is required",
      number: "Mobile number is required",
    };

    for (const field in fields) {
      let value;

      // Use if-else to determine which value to check
      if (field === "username") {
        value = username;
      } else if (field === "defaultPassword") {
        value = defaultPassword;
      } else if (field === "firstname") {
        value = firstname;
      } else if (field === "lastname") {
        value = lastname;
      } else if (field === "number") {
        value = number;
      } else if (field === "email") {
        value = email;
      }

      if (!value) {
        newErrors[field] = fields[field];
      } else if (field === "defaultPassword" && value.length < 8) {
        newErrors[field] = "Password must be at least 8 characters long";
      }
    }

    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const isCheckbox = field === "agreement";
    const value = isCheckbox ? e.target.checked : e.target.value;

    const fieldToStateMap = {
      username: setUsername,
      defaultPassword: setDefaultPassword,
      firstname: setFirstname,
      lastname: setLastname,
      middlename: setMiddlename,
      number: setNumber,
      email: setEmail,
      agreement: setIsAgreement,
    };

    const setFieldValue = fieldToStateMap[field];
    if (setFieldValue) {
      setFieldValue(value);
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
      if (!isAgreement) {
        toast.error(
          "You must agree to the terms and conditions before proceeding."
        );
        return;
      }

      setLoading(true);

      const userData = {
        username: username,
        password: defaultPassword,
        mobile_number: number,
        email: email,
        firstname: firstname,
        middlename: middlename,
        lastname: lastname,
        isAgreement: isAgreement,
      };

      try {
        const response = await registerService.register(userData);
        if (response.success) {
          toast.success(response.message);
          refreshData();
          onClose();
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: response.message,
          }));
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
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
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Add New Customer"}
        subtitle={" Provide the details for the new customer below"}
        onClose={onClose}
      />

      <DialogContent>
        {/* Username */}
        <TextField
          margin="dense"
          label="Username"
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

        {/* Default Password */}
        <TextField
          margin="dense"
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle between text and password type
          fullWidth
          variant="outlined"
          value={defaultPassword}
          onChange={handleInputChange("defaultPassword")}
          error={Boolean(errors.defaultPassword)}
          helperText={errors.defaultPassword}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* First name, Last name, Middle name */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 1.5 }}>
          <TextField
            margin="dense"
            label="First name"
            type="text"
            fullWidth
            variant="outlined"
            value={firstname}
            onChange={handleInputChange("firstname")}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
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
          />
          <TextField
            margin="dense"
            label="Middle Initial"
            type="text"
            variant="outlined"
            value={middlename}
            onChange={handleInputChange("middlename")}
            sx={{
              width: "400px",
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
          <TextField
            margin="dense"
            label="Last name"
            type="text"
            fullWidth
            variant="outlined"
            value={lastname}
            onChange={handleInputChange("lastname")}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
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
          />
        </Box>
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

        {/* Email */}
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={(e) => {
            const { value } = e.target;
            handleInputChange("email")({
              target: { value: value.replace(/[^a-zA-Z0-9@._-]/g, "") },
            });
          }}
          inputProps={{
            inputMode: "email",
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

        {/* Terms and Conditions */}
        <Box display="flex" alignItems="center" mb={2} ml={1} mt={1}>
          <FormControlLabel
            control={
              <Checkbox
                id="agreement"
                required
                checked={isAgreement}
                onChange={handleInputChange("agreement")}
                sx={{
                  color: "gray",
                  padding: 0.5, // Reduces padding around the checkbox for better alignment
                  "&.Mui-checked": {
                    color: COLORS.secondary,
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                color="textPrimary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                I agree with the
                <Link
                  to="#"
                  underline="hover"
                  className="ml-1"
                  style={{ color: COLORS.secondary }}
                  onClick={() => openPopup("termsConditon")}
                >
                  terms and conditions
                </Link>
              </Typography>
            }
            sx={{
              alignItems: "center", // Aligns label and checkbox to the center
              "& .MuiTypography-root": {
                marginLeft: 0.5,
              },
              "& .MuiFormControlLabel-asterisk": {
                display: "none", // Hides the asterisk
              },
            }}
          />
        </Box>
      </DialogContent>
      {/* Footer */}
      <CustomPopFooterButton
        label={"Create Customer"}
        onClose={onClose}
        onSubmit={handleCreateUser}
        loading={loading}
      />

      {isOpen && popupType === "termsConditon" && (
        <PopupTermsAndConditon open={isOpen} onClose={closePopup} />
      )}
    </Dialog>
  );
};

export default PopAddNewCustomer;
