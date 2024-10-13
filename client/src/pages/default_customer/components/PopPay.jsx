import React, { useState } from "react";
import { Dialog, DialogContent, Button, Box, Typography } from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../constants/color";

const PopPay = ({ open, onClose }) => {
  // Sample data for one service availed by the customer
  const service = {
    service: "Wash & Fold",
    pricePerKilo: 60, // Default price per kilo
    weight: 5, // Customer's laundry weight in kilograms
    itemsUsed: ["Detergent", "Fabric Softener"],
  };

  const totalAmount = service.pricePerKilo * service.weight;

  // State for selected payment option
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod) {
      console.log(`Payment Method: ${paymentMethod}`);
      onClose();
    } else {
      alert("Please select a payment method.");
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
          height: "600px", // Adjusted height for layout
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Complete Your Payment"}
        subtitle={"Choose a payment method to finalize your order"}
        onClose={onClose}
      />

      <DialogContent
        style={{
          padding: "16px",
          height: "calc(100% - 64px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Service Breakdown */}
        <Box className="flex flex-col bg-gray-100 rounded p-4 mb-4">
          <Box className="flex justify-between">
            <Typography variant="body1" className="font-semibold">
              {service.service}
            </Typography>
            <Typography variant="body1">
              ₱{service.pricePerKilo} per kg
            </Typography>
          </Box>
          <Box className="flex justify-between mt-2">
            <Typography variant="body2">Laundry Weight:</Typography>
            <Typography variant="body2">{service.weight} kg</Typography>
          </Box>
          <Box className="flex justify-between mt-2">
            <Typography variant="body2">Total Cost:</Typography>
            <Typography variant="body2" className="font-semibold">
              ₱{totalAmount}
            </Typography>
          </Box>
          <Typography variant="caption" className="text-gray-500 mt-3">
            <strong>Items Used:</strong> {service.itemsUsed.join(", ")}
          </Typography>
        </Box>

        {/* Payment Options - Clickable Cards */}
        <Box className="bg-white rounded p-4 shadow-md">
          <Typography variant="h6" className="mb-3 font-semibold">
            Payment Options
          </Typography>
          <Box className="flex justify-between">
            {/* Cash on Delivery Option */}
            <Box
              onClick={() => handlePaymentChange("cashOnDelivery")}
              className={`flex-1 p-3 cursor-pointer border rounded-lg text-center ${
                paymentMethod === "cashOnDelivery"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              sx={{
                transition: "all 0.3s",
                "&:hover": { borderColor: COLORS.secondary },
              }}
            >
              <Typography variant="body1" className="font-semibold">
                Cash on Delivery
              </Typography>
              <Typography variant="body2">
                Pay when you receive your laundry
              </Typography>
            </Box>

            {/* GCash Option */}
            <Box
              onClick={() => handlePaymentChange("gcash")}
              className={`flex-1 p-3 cursor-pointer border rounded-lg text-center ml-2 ${
                paymentMethod === "gcash"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              sx={{
                transition: "all 0.3s",
                "&:hover": { borderColor: COLORS.secondary },
              }}
            >
              <Typography variant="body1" className="font-semibold">
                GCash
              </Typography>
              <Typography variant="body2">Secure mobile payment</Typography>
            </Box>
          </Box>
        </Box>

        {/* Payment Button */}
        <Button
          disableElevation
          variant="contained"
          color="primary"
          onClick={handlePaymentSubmit}
          sx={{
            marginTop: 3,
            textTransform: "none",
            backgroundColor: COLORS.secondary,
            "&:hover": {
              backgroundColor: COLORS.secondaryHover,
            },
          }}
        >
          Proceed to Payment
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PopPay;
