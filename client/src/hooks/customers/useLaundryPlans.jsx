import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../contexts/AuthContext";
import { createCustomerServiceRequest } from "../../services/api/customerApi";
import { useNavigate } from "react-router-dom";

const useLaundryPlans = (onClose) => {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(userDetails.fullName);
  const [note, setNote] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Customer name is required";
    }
    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "name") {
      setName(value);
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSubmit = async (serviceId, e) => {
    e.preventDefault();

    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setTimeout(async () => {
        const storeId = userDetails.storeId;
        const customerData = {
          store_id: storeId,
          service_type_id: serviceId,
          customer_name: name,
          notes: note,
        };

        try {
          const response =
            await createCustomerServiceRequest.setCustomerServiceRequest(
              userDetails.userId,
              customerData
            );
          if (!response.success) {
            toast.success(response.message);
            onClose();
            navigate("/customer-page/track-orders");
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error(`Error with service request: ${error.message || error}`);
          console.log(error);
        } finally {
          setLoading(false);
        }
      }, 1000);
    } else {
      setLoading(false);
    }
  };

  return {
    name,
    note,
    setName,
    setNote,
    serviceType,
    setServiceType,
    selectedService,
    setSelectedService,
    handleInputChange,
    handleSubmit,
    loading,
    setLoading,
    errors,
    setErrors,
  };
};

export default useLaundryPlans;
