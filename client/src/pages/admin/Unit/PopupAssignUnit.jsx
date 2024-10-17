import React, { useState, useEffect, useCallback } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import toast from "react-hot-toast";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import CustomPopFooterButton from "../../../components/common/CustomPopFooterButton";
import { COLORS } from "../../../constants/color";
import useAuth from "../../../contexts/AuthContext";
import { getInventoryLaundryItem } from "../../../services/api/getApi";
import useFetchData from "../../../hooks/common/useFetchData";
import { createLaundryAssignment } from "../../../services/api/postApi";

function PopupAssignUnit({ open, onClose, inqueueID }) {
  const { userDetails } = useAuth();
  const [selectedAssignUnit, setSelectedAssignUnit] = useState(null);
  const [weight, setWeight] = useState("");
  const [selectedSupplies, setSelectedSupplies] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [quantityErrors, setQuantityErrors] = useState({}); // To store quantity validation errors
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { data: itemData, fetchData: fetchItem } = useFetchData();
  const { avaiableUnitData, fetchAvailableUnit } = useUnitMonitor();

  const fetchItemData = useCallback(() => {
    fetchItem(getInventoryLaundryItem.getInventoryItem, userDetails.storeId);
  }, [fetchItem, userDetails?.storeId]);

  useEffect(() => {
    fetchItemData();
  }, [fetchItemData]);

  useEffect(() => {
    if (open) {
      fetchAvailableUnit();
    }
  }, [open]);

  const handleSupplySelect = (event) => {
    setSelectedSupplies(event.target.value);
  };

  const handleQuantityChange = (supplyId, quantity) => {
    const supply = itemData.find((s) => s.inventory_id === supplyId);

    if (quantity > supply.quantity) {
      setQuantityErrors((prev) => ({
        ...prev,
        [supplyId]: `Quantity cannot exceed available amount (${supply.quantity})`,
      }));
    } else {
      setQuantityErrors((prev) => ({
        ...prev,
        [supplyId]: "", // Clear the error if the quantity is valid
      }));
    }

    setQuantities((prev) => ({
      ...prev,
      [supplyId]: quantity,
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!weight) {
      newErrors.weight = "Weight is required";
    } else if (weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }
    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "weight") {
      setWeight(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleProceed = async (e) => {
    e.preventDefault();

    const newErrors = validateFields();
    setErrors(newErrors);

    if (!selectedAssignUnit) {
      toast.error("Select a laundry unit to proceed.");
      return;
    }

    if (
      Object.keys(newErrors).length === 0 &&
      Object.values(quantityErrors).every((err) => err === "")
    ) {
      // setLoading(true);
      // const data = {
      //   service_request_id: inqueueID,
      //   unit_id: selectedAssignUnit,
      //   assign_by_id: userDetails.userId,
      //   weight: weight,
      //   supplies: selectedSupplies.map((supplyId) => ({
      //     supplyId,
      //     quantity: quantities[supplyId] || 1,
      //   })),
      // };

      // Prepare supplies data with total amount per item
      const suppliesData = selectedSupplies.map((supplyId) => {
        const supply = itemData.find((s) => s.inventory_id === supplyId);
        const quantity = quantities[supplyId] || 1; // Default to 1 if not set
        const totalAmount = (supply.price * quantity).toFixed(2); // Calculate total amount

        return {
          supplyId,
          quantity,
          amount: totalAmount, // Add amount per item
        };
      });

      const data = {
        service_request_id: inqueueID,
        unit_id: selectedAssignUnit,
        assign_by_id: userDetails.userId,
        weight: weight,
        supplies: suppliesData, // Include supplies data
      };

      // console.log("Selected Supplies:", selectedSupplies);
      // console.log("Quantities:", quantities);
      console.log("Data to be submitted:", data);

      // try {
      //   const response = await createLaundryAssignment.setLaundryAssignment(
      //     data
      //   );

      //   if (response.success) {
      //     toast.success(response.message);
      //   } else {
      //     toast.error(response.message);
      //   }
      // } catch (error) {
      //   toast.error(
      //     `Error with laundry assignment  request: ${error.message || error}`
      //   );
      // } finally {
      //   setLoading(false);
      // }
    } else {
      setLoading(false);
    }
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
        title={"Choose an Available Unit"}
        subtitle={"Fill in the necessary details"}
        onClose={onClose}
      />
      <DialogContent>
        <div className="mt-4 mb-5 flex overflow-x-auto space-x-3 hori-scrollable">
          {avaiableUnitData.length > 0 ? (
            avaiableUnitData.map((unit) => (
              <Paper
                key={unit.id}
                elevation={0}
                sx={{
                  padding: "15px",
                  border: "1px solid",
                  borderColor:
                    selectedAssignUnit === unit.id
                      ? COLORS.secondary
                      : COLORS.border,
                  marginBottom: "10px",
                  borderRadius: "8px",
                  color:
                    selectedAssignUnit === unit.id
                      ? COLORS.white
                      : COLORS.primary,
                  backgroundColor:
                    selectedAssignUnit === unit.id ? COLORS.secondary : "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onClick={() => setSelectedAssignUnit(unit.id)}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  {unit.unit_name}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              No available units at the moment.
            </Typography>
          )}
        </div>

        {/* Weight Input */}
        <TextField
          label="Weight (kg)"
          variant="outlined"
          fullWidth
          type="number"
          value={weight}
          placeholder="Enter weight in kilograms"
          onChange={handleInputChange("weight")}
          error={Boolean(errors.weight)}
          helperText={errors.weight}
        />

        <FormControl fullWidth variant="outlined" sx={{ marginTop: "20px" }}>
          <InputLabel>Select Laundry Supplies</InputLabel>
          <Select
            label="Select Laundry Supplies"
            multiple
            value={selectedSupplies}
            onChange={handleSupplySelect}
            renderValue={(selected) =>
              selected.map((supplyId) => {
                const supply = itemData.find(
                  (s) => s.inventory_id === supplyId
                );
                return (
                  <Chip
                    key={supplyId}
                    label={supply ? supply.item_name : ""}
                    sx={{ margin: "5px" }}
                  />
                );
              })
            }
          >
            {itemData.map((supply) => (
              <MenuItem key={supply.inventory_id} value={supply.inventory_id}>
                {`${supply.item_name} (Available: ${supply.quantity})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedSupplies.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {selectedSupplies.map((supplyId) => {
              const supply = itemData.find((s) => s.inventory_id === supplyId);
              const quantity = quantities[supplyId] || 1; // Default quantity is 1
              const totalPrice = (supply.price * quantity).toFixed(2); // Calculate total price

              return (
                <div key={supplyId} style={{ marginBottom: "10px" }}>
                  <Typography variant="body2">
                    {supply.item_name} Quantity:
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(supplyId, parseInt(e.target.value))
                    }
                    inputProps={{ min: 1, max: supply.quantity }} // Set max to available quantity
                    error={Boolean(quantityErrors[supplyId])}
                    helperText={quantityErrors[supplyId]}
                  />
                  <Typography variant="body2" sx={{ marginTop: "5px" }}>
                    Total Price: ${totalPrice} {/* Display total price */}
                  </Typography>
                </div>
              );
            })}
          </div>
        )}

        {/* <FormControl fullWidth variant="outlined" sx={{ marginTop: "20px" }}>
          <InputLabel>Select Laundry Supplies</InputLabel>
          <Select
            label="Select Laundry Supplies"
            multiple
            value={selectedSupplies}
            onChange={handleSupplySelect}
            renderValue={(selected) =>
              selected.map((supplyId) => {
                const supply = itemData.find(
                  (s) => s.inventory_id === supplyId
                );
                return (
                  <Chip
                    key={supplyId}
                    label={supply ? supply.item_name : ""}
                    sx={{ margin: "5px" }}
                  />
                );
              })
            }
          >
            {itemData.map((supply) => (
              <MenuItem key={supply.inventory_id} value={supply.inventory_id}>
                {`${supply.item_name} (Available: ${supply.quantity})`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedSupplies.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {selectedSupplies.map((supplyId) => {
              const supply = itemData.find((s) => s.inventory_id === supplyId);
              return (
                <div key={supplyId} style={{ marginBottom: "10px" }}>
                  <Typography variant="body2">
                    {supply.item_name} Quantity:
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={quantities[supplyId] || 1}
                    onChange={(e) =>
                      handleQuantityChange(supplyId, parseInt(e.target.value))
                    }
                    inputProps={{ min: 1 }}
                    error={Boolean(quantityErrors[supplyId])}
                    helperText={quantityErrors[supplyId]}
                  />
                </div>
              );
            })}
          </div>
        )} */}
      </DialogContent>

      {/* Footer */}
      <CustomPopFooterButton
        label={"Proceed"}
        onClose={onClose}
        onSubmit={handleProceed}
        loading={loading}
      />
    </Dialog>
  );
}

export default PopupAssignUnit;
