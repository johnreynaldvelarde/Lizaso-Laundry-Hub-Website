import React, { useState, useEffect } from "react";
import useAuth from "../../../contexts/AuthContext";
import { format } from "date-fns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Autocomplete,
  TextField,
  Box,
  Collapse,
  IconButton,
  FormControl,
  Chip,
} from "@mui/material";
import { createFilterOptions } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getSelectedCustomer } from "../../../services/api/getApi";

const PopupSelectUnit = ({ open, onClose, unitName, unitId }) => {
  const { userDetails } = useAuth();
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [errors, setErrors] = useState({});

  const handleAdditionalInfoToggle = () => {
    setShowAdditionalInfo((prev) => !prev);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!selectedCustomer) {
      newErrors.selectedCustomer = "Customer is required";
    }
    if (!weight) {
      newErrors.weight = "Weight is required";
    } else if (weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }
    return newErrors;
  };

  const filterOptions = createFilterOptions({
    matchFrom: "any", // This will match from any part of the string (name or username)
    stringify: (option) => `${option.fullname} ${option.c_username}`, // Combine both fields for search purposes
  });

  const handleProceedSelectedUnit = (e) => {
    e.preventDefault();

    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Proceeding with selection...");
      console.log("Selected Customer Name: " + selectedCustomer.fullname);
      console.log("Selected Customer ID: " + selectedCustomer.id);
      console.log("Selected Tab: " + selectedTab); // 0 = Wash, 1 = Wash/Dry, 2 = Wash/Dry/Fold
      console.log("Weight: " + weight);
      console.log("Store ID: " + userDetails.storeId);
      console.log("Selected Unit ID: " + unitId);
      console.log("Notes from customer: " + notes);

      // You can proceed with the next steps, e.g., submitting data to an API, etc.
    }
  };

  // Fetch selected customer details by store ID
  const fetchSelectedCustomer = async () => {
    if (!userDetails?.storeId) return;

    try {
      const response = await getSelectedCustomer.getSelectCustomer(
        userDetails.storeId
      );
      if (response) {
        setCustomerData(response);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchSelectedCustomer();
    }
  }, [open]);

  const customers = [
    {
      id: 1,
      name: "John Doe",
      username: "john_doe",
      createdDate: "2024-09-14",
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "jane_smith",
      createdDate: "2024-09-13",
    },
    {
      id: 3,
      name: "Michael Johnson",
      username: "michael_johnson",
      createdDate: "2024-09-14",
    },
  ];

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
            <span className="text-lg font-semibold">Selected Unit</span>
            <span className="text-sm font-semibold border border-[#5787C8] rounded px-2 py-1 text-[#5787C8]">
              {unitName}
            </span>
          </div>
          <IconButton
            onClick={onClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Select a service and choose a customer.
        </p>
      </DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
        }}
      >
        {/* Custom Tab Navigation */}
        <div className="mt-2 mb-2 flex justify-center bg-[#5787C8] rounded-md">
          {["Wash", "Wash/Dry", "Wash/Dry/Fold"].map((label, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`w-full p-2 m-1.5 font-bold text-sm rounded-sm transition-colors duration-200 ${
                selectedTab === index
                  ? "bg-white text-[#5787C8]"
                  : "bg-transparent text-white hover:bg-[#4a6b9c]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Customer Selection Autocomplete */}
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.selectedCustomer}
        >
          <Autocomplete
            options={customerData}
            getOptionLabel={(option) => option.fullname} // Only display the name in the dropdown
            value={selectedCustomer}
            onChange={(event, newValue) => setSelectedCustomer(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            filterOptions={filterOptions} // Use the custom filterOptions to search by name and username
            renderOption={(props, option) => {
              const today = new Date();
              const createdDate = new Date(option.date_created);
              const diffDays = Math.ceil(
                (today - createdDate) / (1000 * 60 * 60 * 24)
              );

              return (
                <li
                  {...props}
                  key={option.id}
                  style={{
                    display: "flex",
                    flexDirection: "column", // Stack name and username vertically
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: "bold",
                      }}
                    >
                      {option.fullname}
                    </span>
                    {diffDays <= 3 && (
                      <Chip
                        label="New"
                        variant="outlined"
                        size="small"
                        sx={{
                          color: "red",
                          borderColor: "red",
                          marginLeft: 2,
                        }}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: "gray",
                      fontSize: "smaller",
                    }}
                  >
                    {option.c_username}
                  </span>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Customer"
                variant="outlined"
                placeholder="Search for a customer"
              />
            )}
          />
          {errors.selectedCustomer && (
            <Typography
              variant="caption"
              color="error"
              sx={{ marginTop: "3px", marginLeft: "5px" }}
            >
              {errors.selectedCustomer}
            </Typography>
          )}
        </FormControl>

        {/* Weight Input */}
        <FormControl fullWidth margin="normal" error={!!errors.weight}>
          <TextField
            label="Weight (kg)"
            variant="outlined"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kilograms"
            error={!!errors.weight}
          />
          {errors.weight && (
            <Typography
              variant="caption"
              color="error"
              sx={{ marginTop: "3px", marginLeft: "5px" }}
            >
              {errors.weight}
            </Typography>
          )}
        </FormControl>

        {/* Additional Info Toggle */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <Typography variant="body1">Additional Info</Typography>
          <Button
            onClick={handleAdditionalInfoToggle}
            sx={{ textTransform: "none" }}
          >
            {showAdditionalInfo ? "Hide" : "Show"}
          </Button>
        </Box>

        {/* Additional Info Text Field (Collapsible) */}
        <Collapse in={showAdditionalInfo}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Notes"
              multiline
              rows={4}
              variant="outlined"
              placeholder="Enter additional details here"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormControl>
        </Collapse>
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
          onClick={handleProceedSelectedUnit}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3A5A85",
            },
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupSelectUnit;
