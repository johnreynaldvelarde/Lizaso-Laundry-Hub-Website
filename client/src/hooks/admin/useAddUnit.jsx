import { useEffect, useState, useRef } from "react";
import useAuth from "../../contexts/AuthContext";
import { createUnit } from "../../services/api/postApi";
import { getUnitName } from "../../services/api/getApi";

const STATUS_MAP = {
  Available: 0,
  Occupied: 1,
  Reserved: 2,
  "In Maintenance": 3,
};

const useAddUnit = () => {
  const [unitName, setUnitName] = useState("");
  const [isUnitStatus, setUnitStatus] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);
  const { userDetails } = useAuth();

  // Function to fetch suggested unit name
  const fetchSuggestedUnitName = async () => {
    if (userDetails?.storeId) {
      try {
        const response = await getUnitName.getSuggestedUnitName(
          userDetails.storeId
        );
        if (response.success) {
          setUnitName(response.unit_name);
        } else {
          console.error("Failed to fetch suggested unit name");
        }
      } catch (error) {
        console.error("Error fetching suggested unit name:", error);
      }
    } else {
      console.error("Store ID is undefined.");
    }
  };

  useEffect(() => {
    fetchSuggestedUnitName();
  }, [userDetails?.storeId]);

  const handleClear = () => {
    setUnitStatus("");
    setImage("");
    setErrors({});
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    // Update the respective state based on the field
    if (field === "unitName") {
      setUnitName(value);
    } else if (field === "unitStatus") {
      setUnitStatus(value);
    }

    // Clear the error for the specific field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    if (!isUnitStatus) newErrors.unitStatus = "Unit Status is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    setErrors(newErrors);

    // Proceed only if there are no validation errors
    if (Object.keys(newErrors).length === 0) {
      try {
        // Convert the unit status to its corresponding numeric value
        const numericStatus = STATUS_MAP[isUnitStatus];

        const response = await createUnit.setUnit({
          store_id: userDetails.storeId,
          unit_name: unitName,
          isUnitStatus: numericStatus,
        });

        if (response.success) {
          alert("Submission Successful!");
          handleClear();
          // Refresh the unit name suggestion
          fetchSuggestedUnitName();
        } else {
          alert("Cannot Proceed");
        }
      } catch (error) {
        console.error("Error submitting the form", error);
      }
    }
  };

  return {
    unitName,
    setUnitName,
    isUnitStatus,
    setUnitStatus,
    image,
    setImage,
    errors,
    setErrors,
    imageInput,
    handleInputChange,
    handleClear,
    handleSubmit,
  };
};

export default useAddUnit;
