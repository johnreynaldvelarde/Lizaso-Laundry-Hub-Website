import { useState, useRef } from "react";
import { unitStatus } from "../../data/unit_status";

const useAddUnit = () => {
  const [unitName, setUnitName] = useState("");
  const [isUnitStatus, setUnitStatus] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});
  const imageInput = useRef(null);

  const handleClear = () => {
    setUnitName("");
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
    if (!unitName) newErrors.unitName = "Unit Name is required";
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
        // Proceed with form submission or further processing
        console.log("Form submitted successfully", {
          unitName,
          isUnitStatus,
          image,
        });
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

// import { useState, useRef } from "react";
// import { unitStatus } from "../../data/unit_status";

// const useAddUnit = () => {
//   const [isUnitStatus, setUnitStatus] = useState("");
//   const [unitName, setUnitName] = useState("");
//   const imageInput = useRef(null);
//   const [image, setImage] = useState("");
//   const [errors, setErrors] = useState({});

//   const handleClear = () => {
//     setUnitName("");
//     setErrors({});
//   };

//   const handleInputChange = (field) => (e) => {
//     const value = e.target.value;
//     switch (field) {
//       case "unitName":
//         setUnitName(value);
//         break;
//       case "unitStatus":
//         setUnitStatus(value);
//         break;
//       default:
//         break;
//     }
//     // Clear the specific error for the field being edited
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field]: "",
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!unitName) newErrors.unitName = "Unit Name is required";
//     if (!unitStatus) newErrors.isUnitStatus = "Unit Status is required";
//     setErrors(newErrors);

//     // Proceed only if there are no validation errors
//     if (Object.keys(newErrors).length === 0) {
//       try {
//       } catch (error) {}
//     }
//   };

//   return {
//     isUnitStatus,
//     setUnitStatus,
//     unitName,
//     setUnitName,
//     errors,
//     setErrors,
//     image,
//     setImage,
//     handleInputChange,
//     handleClear,
//     handleSubmit,
//   };
// };

// export default useAddUnit;

// const handleChange = (event) => {
//   setUnitStatus(event.target.value);
//   console.log(isUnitStatus);
// };
