import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../constants/color";
import {
  createMessageSenderCustomer,
  getCustomerMessageConvo,
} from "../../../services/api/customerApi";
import useFetchData from "../../../hooks/common/useFetchData";
import useAuth from "../../../contexts/AuthContext";
import CustomPopFooterButton from "../../../components/common/CustomPopFooterButton";

const PopFeedbackAndReview = ({
  open,
  onClose,
  userId,
  storeId,
  serviewRequestId,
}) => {
  const { userDetails } = useAuth();
  const [feedback, setFeedBack] = useState("");
  const [rating, setRating] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          height: "600px",
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Chat with Pickup or Delivery Staff"}
        subtitle={"Send your inquiries or updates"}
        onClose={onClose}
      />

      <DialogContent></DialogContent>
      {/* Footer */}
      <CustomPopFooterButton
        label={"Submit"}
        onClose={onClose}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Dialog>
  );
};

export default PopFeedbackAndReview;
