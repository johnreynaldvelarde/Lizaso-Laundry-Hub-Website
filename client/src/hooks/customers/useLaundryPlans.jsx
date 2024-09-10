import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createCustomerServiceRequest } from "../../services/api/postApi";
import useAuth from "../../contexts/AuthContext";

const useLaundryPlans = () => {
  const { userDetails } = useAuth();
  const [name, setName] = useState(userDetails.fullName);
  const [note, setNote] = useState("");
  const [serviceType, setServiceType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails || !userDetails.userId) {
      alert("User details are not properly set.");
      return;
    }

    try {
      const storeId = userDetails.storeId;
      const customerData = {
        store_id: storeId,
        service_type: serviceType,
        customer_name: name,
        notes: note,
      };

      const response =
        await createCustomerServiceRequest.setCustomerServiceRequest(
          userDetails.userId,
          customerData
        );

      if (!response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Error customer service request:", error);
    }
  };

  return {
    name,
    note,
    setName,
    setNote,
    serviceType,
    setServiceType,
    handleSubmit,
  };
};

export default useLaundryPlans;
