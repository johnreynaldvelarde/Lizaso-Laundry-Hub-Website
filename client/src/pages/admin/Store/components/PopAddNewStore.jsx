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
  Grid,
} from "@mui/material";
import toast from "react-hot-toast";
import { COLORS } from "../../../../constants/color";
import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { handleGenerate } from "../../../../utils/generateStoreNo";
import {
  cities,
  provinces,
  regions,
} from "../../../../utils/country_selection";

const PopAddNewStore = ({ open, onClose }) => {
  // Store
  const [storeName, setStoreName] = useState("");
  const [storeNo, setStoreNo] = useState("");
  const [storeContact, setStoreContact] = useState("");
  const [storeEmail, setStoreEmail] = useState("");

  // Address
  const [addressLine, setAddressLine] = useState("");
  const [country, setCountry] = useState("Philippines");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const newErrors = {};

    const fields = {
      // Store
      storeName: "Store name is required",
      storeNo: "Store generate number is required",
      storeContact: "Store mobile number or telephone number is required",
      storeEmail: "Store email is required",

      // Address

      addressLine: "Store main address is required",
      country: "Country is required",
      region: "Region is required",
      province: "Province is required",
      city: "City is required",
      postalCode: "Postal code is required",
    };

    for (const field in fields) {
      let value;

      // Use if-else to determine which value to check
      if (field === "storeName") {
        value = storeName;
      } else if (field === "storeNo") {
        value = storeNo;
      } else if (field === "storeContact") {
        value = storeContact;
      } else if (field === "storeEmail") {
        value = storeEmail;
      } else if (field === "addressLine") {
        value = addressLine;
      } else if (field === "country") {
        value = country;
      } else if (field === "region") {
        value = region;
      } else if (field === "province") {
        value = province;
      } else if (field === "city") {
        value = city;
      } else if (field === "postalCode") {
        value = postalCode;
      }

      if (value === undefined || value === null || value === "") {
        newErrors[field] = fields[field];
      }
    }

    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "region") {
      setProvince("");
    }

    if (field === "province") {
      setCity("");
    }
    const fieldToStateMap = {
      storeName: setStoreName,
      storeNo: setStoreNo,
      storeContact: setStoreContact,
      storeEmail: setStoreEmail,

      addressLine: setAddressLine,
      country: setCountry,
      region: setRegion,
      province: setProvince,
      city: setCity,
      postalCode: setPostalCode,
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

  const handleCreateStore = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      const storeData = {
        store_no: storeNo,
        store_name: storeName,
        store_contact: storeContact,
        store_email: storeEmail,
        address_line: addressLine,
        country: country,
        province: province,
        city: city,
        postal_code: postalCode,
        latitude: latitude,
        longitude: longitude,
      };

      // try {
      //   const response = await createAdminBasedNewUser.setAdminBasedNewUser(
      //     storeData
      //   );

      //   if (response.success) {
      //     toast.success(response.message);
      //     onClose();
      //   } else {
      //     setErrors((prevErrors) => ({
      //       ...prevErrors,
      //       username: response.message,
      //     }));
      //   }
      // } catch (error) {
      //   toast.error(
      //     `Error posting new user: ${error.message || "Something went wrong"}`
      //   );
      // } finally {
      //   setLoading(false);
      // }
    } else {
      setLoading(false);
    }
  };

  // const handleDialogClose = () => {
  //   setUsername("");
  //   setFirstname("");
  //   setMiddlename("");
  //   setLastname("");
  //   setNumber("");
  //   setEmail("");
  //   setSelectedRole("");
  //   setSelectedStatus("");
  //   setSelectedStore("");

  //   setErrors({});

  //   onClose();
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Add New Store"}
        subtitle={"Provide the details for the new store below"}
        onClose={onClose}
      />

      {/* Content */}
      <DialogContent>
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: 1,
              }}
            >
              {/* Store name */}
              <TextField
                margin="dense"
                label="Store name"
                type="text"
                fullWidth
                variant="outlined"
                value={storeName}
                onChange={handleInputChange("storeName")}
                error={Boolean(errors.storeName)}
                helperText={errors.storeName}
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

              {/* Store no */}
              <TextField
                margin="dense"
                label="Store no"
                type="text"
                fullWidth
                variant="outlined"
                value={storeNo}
                onChange={handleInputChange("storeNo")}
                error={Boolean(errors.storeNo)}
                helperText={errors.storeNo}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleGenerate(setStoreNo)}
                        edge="end"
                        aria-label="generate store number"
                      >
                        <ArrowsClockwise
                          color={COLORS.secondary}
                          weight="fill"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
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

              {/* Mobile Number */}
              <TextField
                margin="dense"
                label="Mobile or Telephone number"
                type="tel"
                fullWidth
                variant="outlined"
                value={storeContact}
                error={Boolean(errors.storeContact)}
                helperText={errors.storeContact}
                onChange={(e) => {
                  const { value } = e.target;
                  handleInputChange("storeContact")({
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
                label="Store email"
                type="email"
                fullWidth
                variant="outlined"
                value={storeEmail}
                error={Boolean(errors.storeEmail)}
                helperText={errors.storeEmail}
                onChange={(e) => {
                  const { value } = e.target;
                  handleInputChange("storeEmail")({
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
            </Box>
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                padding: 1,
              }}
            >
              {/* Address line */}
              <TextField
                margin="dense"
                label="Address Line"
                type="text"
                fullWidth
                variant="outlined"
                value={addressLine}
                onChange={handleInputChange("addressLine")}
                error={Boolean(errors.addressLine)}
                helperText={errors.addressLine}
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
              {/* Country */}
              <TextField
                select
                margin="dense"
                label="Country"
                fullWidth
                variant="outlined"
                value={country}
                onChange={handleInputChange("country")}
                error={Boolean(errors.country)}
                helperText={errors.country}
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
                  readOnly: true,
                }}
              >
                <MenuItem value="" disabled>
                  Select a country
                </MenuItem>
                <MenuItem value={"Philippines"}>Philippines</MenuItem>
              </TextField>

              {/* Region */}
              <TextField
                select
                margin="dense"
                label="Region"
                fullWidth
                variant="outlined"
                value={region}
                onChange={handleInputChange("region")}
                error={Boolean(errors.region)}
                helperText={errors.region}
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
                <MenuItem value="" disabled>
                  Select a region
                </MenuItem>
                {regions.map((region) => (
                  <MenuItem key={region.id} value={region.name}>
                    {region.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Province */}
              <TextField
                select
                margin="dense"
                label="Province"
                fullWidth
                variant="outlined"
                value={province}
                onChange={handleInputChange("province")}
                error={Boolean(errors.province)}
                helperText={errors.province}
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
                disabled={!region} // Disable province dropdown until a region is selected
              >
                <MenuItem value="" disabled>
                  Select a province
                </MenuItem>
                {region ? (
                  provinces[region] && provinces[region].length > 0 ? (
                    provinces[region].map((provinceName, index) => (
                      <MenuItem key={index} value={provinceName}>
                        {provinceName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No provinces available</MenuItem>
                  )
                ) : null}
              </TextField>

              {/* City */}
              <TextField
                select
                margin="dense"
                label="City"
                fullWidth
                variant="outlined"
                value={city}
                onChange={handleInputChange("city")}
                error={Boolean(errors.city)}
                helperText={errors.city}
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
                disabled={!province}
              >
                <MenuItem value="" disabled>
                  Select a city
                </MenuItem>
                {province ? (
                  cities[province] && cities[province].length > 0 ? (
                    cities[province].map((cityName, index) => (
                      <MenuItem key={index} value={cityName}>
                        {cityName}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No cities available</MenuItem>
                  )
                ) : null}
              </TextField>

              {/* Postal Code */}
              <TextField
                margin="dense"
                label="Postal Code"
                type="text"
                fullWidth
                variant="outlined"
                value={postalCode}
                onChange={handleInputChange("postalCode")}
                error={Boolean(errors.postalCode)}
                helperText={errors.postalCode}
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
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      {/* Footer */}
      <CustomPopFooterButton
        label={"Creater New Store"}
        onClose={onClose}
        onSubmit={handleCreateStore}
        loading={loading}
      />
    </Dialog>
  );
};

export default PopAddNewStore;
