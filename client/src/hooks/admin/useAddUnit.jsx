import { useState, useRef } from "react";

const useAddUnit = () => {
  const [isUnitStatus, setUnitStatus] = useState("");
  const [unitName, setUnitName] = useState("");
  const imageInput = useRef(null);
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUnitStatus(event.target.value);
    console.log(isUnitStatus);
  };

  const handleClear = () => {
    setUnitName("");
    setErrors({});
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    switch (field) {
      case "storeNo":
        setStoreNo(value);
        break;
      case "storeName":
        setStoreName(value);
        break;
      case "contactNumber":
        setContactNumber(value);
        break;
      case "location":
        setLocation(value);
        break;
      default:
        break;
    }
    // Clear the specific error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSubmit = async (e) => {};

  return {
    isUnitStatus,
    setUnitStatus,
    unitName,
    setUnitName,
    errors,
    setErrors,
    image,
    setImage,
    handleChange,
    handleInputChange,
    handleClear,
    handleSubmit,
  };
};

export default useAddUnit;
