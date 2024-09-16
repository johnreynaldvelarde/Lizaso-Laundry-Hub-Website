import React, { useState, useEffect } from "react";
import useAuth from "../../../../contexts/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { createNewServiceType } from "../../../../services/api/postApi";
import { updateServiceType } from "../../../../services/api/putApi";

const PopupServiceType = ({
  open,
  onClose,
  storeId,
  serviceData,
  onSuccess,
}) => {
  const { userDetails } = useAuth();
  const [serviceName, setServiceName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceData) {
      setServiceName(serviceData.service_name || "");
      setDefaultPrice(serviceData.default_price || "");
    } else {
      setServiceName("");
      setDefaultPrice("");
    }
  }, [serviceData]);

  const handleClear = async () => {
    setServiceName("");
    setDefaultPrice("");
    setErrors({});
    onClose();
  };

  const validateFields = () => {
    const newErrors = {};
    if (!serviceName) {
      newErrors.serviceName = "Service name is required";
    }
    if (!defaultPrice) {
      newErrors.defaultPrice = "Price is required";
    } else if (defaultPrice <= 0) {
      newErrors.defaultPrice = "Price must be greater than 0";
    }
    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    if (field === "serviceName") {
      setServiceName(value);
    } else if (field === "defaultPrice") {
      setDefaultPrice(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleSave = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      setTimeout(async () => {
        const data = {
          store_id: storeId || userDetails.storeId,
          service_name: serviceName,
          default_price: defaultPrice,
        };

        try {
          let response;
          if (serviceData) {
            response = await updateServiceType.putServiceType(
              serviceData.id,
              data
            );
          } else {
            response = await createNewServiceType.setServiceType(data);
          }

          if (response.success) {
            toast.success(response.message);
            handleClear();
            if (onSuccess) onSuccess(); // Call the onSuccess callback to refresh the data
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              serviceName: response.message,
            }));
          }
        } catch (error) {
          if (error.response && error.response.data) {
            toast.error(error.response.data.message);
          } else {
            toast.error(
              "An unexpected error occurred while creating the service type."
            );
          }
        } finally {
          setLoading(false);
        }
      }, 500);
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
      <DialogTitle className="flex flex-col">
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">
              {serviceData ? "Edit Service" : "Add Service"}
            </span>
          </div>
          <IconButton
            onClick={onClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className="mt-1">
          Enter service details below.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Service Name"
          type="text"
          fullWidth
          variant="outlined"
          value={serviceName}
          onChange={handleInputChange("serviceName")}
          error={Boolean(errors.serviceName)}
          helperText={errors.serviceName}
          sx={{ mb: 2 }}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          variant="outlined"
          value={defaultPrice}
          onChange={handleInputChange("defaultPrice")}
          error={Boolean(errors.defaultPrice)}
          helperText={errors.defaultPrice}
        />
      </DialogContent>
      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            marginRight: 1,
            borderColor: "#595959",
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            color: "#595959",
            "&:hover": {
              borderColor: "#595959",
              backgroundColor: "rgba(144, 144, 144, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          disableElevation
          onClick={handleSave}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 500,
            minWidth: "90px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3A5A85",
            },
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupServiceType;

// const handleSave = async () => {
//   const newErrors = validateFields();
//   setErrors(newErrors);

//   if (Object.keys(newErrors).length === 0) {
//     setLoading(true);

//     setTimeout(async () => {
//       const data = {
//         store_id: storeId || userDetails.storeId,
//         service_name: serviceName,
//         default_price: defaultPrice,
//       };

//       try {
//         if (serviceData) {
//           const response = await updateServiceType.putServiceType(
//             serviceData.id,
//             data
//           );

//           if (response.success) {
//             toast.success(response.message);
//             handleClear();
//           } else {
//             setErrors((prevErrors) => ({
//               ...prevErrors,
//               serviceName: response.message,
//             }));
//           }
//         } else {
//           const response = await createNewServiceType.setServiceType(data);

//           if (response.success) {
//             toast.success(response.message);
//             handleClear();
//           } else {
//             setErrors((prevErrors) => ({
//               ...prevErrors,
//               serviceName: response.message,
//             }));
//           }
//         }
//       } catch (error) {
//         if (error.response && error.response.data) {
//           toast.error(error.response.data.message);
//         } else {
//           toast.error(
//             "An unexpected error occurred while creating the service type."
//           );
//         }
//       } finally {
//         setLoading(false);
//       }
//     }, 500);
//   }
// };

// const handleSave = async () => {
//   const newErrors = validateFields();
//   setErrors(newErrors);

//   if (Object.keys(newErrors).length === 0) {
//     setLoading(true);

//     try {
//       const data = {
//         store_id: userDetails.storeId,
//         service_name: serviceName,
//         default_price: defaultPrice,
//       };

//       if (serviceData) {
//         // Placeholder for updating service type, if applicable
//         toast.success("Service type updated successfully!");
//       } else {
//         const response = await createNewServiceType(data);
//         if (response.success) {
//           toast.success(response.message);
//           setServiceName("");
//           setDefaultPrice("");
//           setErrors({});
//           onClose();
//         } else {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             serviceName: response.message,
//           }));
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.data) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error(
//           "An unexpected error occurred while creating the service type."
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   }
// };

// import React, { useState } from "react";
// import useAuth from "../../../../contexts/AuthContext";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   IconButton,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import toast from "react-hot-toast";
// import { createNewServiceType } from "../../../../services/api/postApi";

// const PopupServiceType = ({ open, onClose, serviceData }) => {
//   const { userDetails } = useAuth();
//   const [serviceName, setServiceName] = useState("");
//   const [defaultPrice, setDefaultPrice] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateFields = () => {
//     const newErrors = {};
//     if (!serviceName) {
//       newErrors.serviceName = "Service name is required";
//     }
//     if (!defaultPrice) {
//       newErrors.defaultPrice = "Price is required";
//     } else if (defaultPrice <= 0) {
//       newErrors.defaultPrice = "Price must be greater than 0";
//     }
//     return newErrors;
//   };

//   const handleInputChange = (field) => (e) => {
//     const value = e.target.value;

//     if (field === "serviceName") {
//       setServiceName(value);
//     } else if (field === "defaultPrice") {
//       setDefaultPrice(value);
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field]: "",
//     }));
//   };

//   const handleSave = async () => {
//     const newErrors = validateFields();
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       setLoading(true);

//       setTimeout(async () => {
//         const data = {
//           store_id: userDetails.storeId,
//           service_name: serviceName,
//           default_price: defaultPrice,
//         };

//         try {
//           const response = await createNewServiceType.setServiceType(data);

//           if (response.success) {
//             toast.success(response.message);
//             setServiceName("");
//             setDefaultPrice("");
//             setErrors({});
//             onClose();
//           } else {
//             setErrors((prevErrors) => ({
//               ...prevErrors,
//               serviceName: response.message,
//             }));
//           }
//         } catch (error) {
//           if (error.response && error.response.data) {
//             toast.error(error.response.data.message);
//           } else {
//             toast.error(
//               "An unexpected error occurred while creating the service type."
//             );
//           }
//         } finally {
//           setLoading(false);
//         }
//       }, 500);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{
//         style: {
//           borderRadius: 16,
//         },
//       }}
//     >
//       <DialogTitle className="flex flex-col">
//         <div className="flex justify-between items-center mt-2">
//           <div className="flex items-center space-x-2">
//             <span className="text-lg font-semibold">Add Service</span>
//           </div>
//           <IconButton
//             onClick={onClose}
//             className="text-[#5787C8] hover:text-[#5787C8]"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//         <Typography variant="body2" color="textSecondary" className="mt-1">
//           Enter service details below.
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Service Name"
//           type="text"
//           fullWidth
//           variant="outlined"
//           value={serviceName}
//           onChange={handleInputChange("serviceName")}
//           error={Boolean(errors.serviceName)}
//           helperText={errors.serviceName}
//           sx={{ mb: 2 }}
//         />
//         <TextField
//           margin="dense"
//           label="Price"
//           type="number"
//           fullWidth
//           variant="outlined"
//           value={defaultPrice}
//           onChange={handleInputChange("defaultPrice")}
//           error={Boolean(errors.defaultPrice)}
//           helperText={errors.defaultPrice}
//         />
//       </DialogContent>
//       <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
//         <Button
//           variant="outlined"
//           onClick={onClose}
//           sx={{
//             marginRight: 1,
//             borderColor: "#595959",
//             borderRadius: "5px",
//             fontWeight: 500,
//             textTransform: "none",
//             color: "#595959",
//             "&:hover": {
//               borderColor: "#595959",
//               backgroundColor: "rgba(144, 144, 144, 0.1)",
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           variant="contained"
//           disableElevation
//           onClick={handleSave}
//           sx={{
//             backgroundColor: "#5787C8",
//             borderRadius: "5px",
//             fontWeight: 500,
//             minWidth: "90px",
//             textTransform: "none",
//             "&:hover": {
//               backgroundColor: "#3A5A85",
//             },
//           }}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save"}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupServiceType;
