import React, { useState, useEffect, useCallback } from "react";
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
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";

const PopCompleteInLaundry = ({ open, onClose, service_id }) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
        title={"Finalize the Transaction"}
        subtitle={"Provide the required information"}
        onClose={onClose}
      />

      <DialogContent>
        {/* Weight Input */}
        <TextField
          label="Weight (kg)"
          variant="outlined"
          fullWidth
          type="number"
          placeholder="Enter weight in kilograms"
        />

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
        </FormControl> */}

        {/* {selectedSupplies.length > 0 && (
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
                    inputProps={{ min: 1, max: supply.quantity }}
                    error={Boolean(quantityErrors[supplyId])}
                    helperText={quantityErrors[supplyId]}
                  />
                  <Typography variant="body2" sx={{ marginTop: "5px" }}>
                    Total Price: ${totalPrice}
                  </Typography>
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
        loading={loading}
      />
    </Dialog>
  );
};

export default PopCompleteInLaundry;
