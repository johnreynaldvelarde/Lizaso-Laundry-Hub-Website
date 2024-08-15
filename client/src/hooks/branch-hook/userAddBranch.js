import { useState } from "react";

const userAddBranch = () => {
  const [storeNo, setStoreNo] = useState("");
  const [storeName, setStoreName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});


  const handleClear = () => {
    setStoreName("");
    setStoreNo("");
    setContactNumber("");
    setLocation("");
    setErrors({});
  };

  const handleGenerateStoreNo = () => {
    const generatedStoreNo = "LIZASO" + Math.floor(1000 + Math.random() * 9000);
    setStoreNo(generatedStoreNo);
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (!storeName) newErrors.storeName = "Store Name is required";
    if (!storeNo) newErrors.storeNo = "Store No is required";
    if (!contactNumber) newErrors.contactNumber = "Contact Number is required";
    if (!location) newErrors.location = "Location is required";
    setErrors(newErrors);

    
    if (Object.keys(newErrors).length === 0) {
        alert("Submission Successful!");
        handleClear();
    }
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    switch (field) {
      case 'storeNo':
        setStoreNo(value);
        break;
      case 'storeName':
        setStoreName(value);
        break;
      case 'contactNumber':
        setContactNumber(value);
        break;
      case 'location':
        setLocation(value);
        break;
      default:
        break;
    }
    // Clear the specific error for the field being edited
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: ""
    }));
  };

  return {
    storeNo,
    setStoreNo,
    storeName,
    setStoreName,
    contactNumber,
    setContactNumber,
    location,
    setLocation,
    errors,
    setErrors,
    handleGenerateStoreNo,
    handleSubmit,
    handleInputChange,
    handleClear,
  };
};

export default userAddBranch;
