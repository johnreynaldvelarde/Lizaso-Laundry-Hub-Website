import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Collapse,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopupSelectUnit = ({ open, onClose, unitName, unitId }) => {
  const [inSelectedCustomerData, setSelectedCustomerData] = useState([]);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [errors, setErrors] = useState({});

  const handleAdditionalInfoToggle = () => {
    setShowAdditionalInfo((prev) => !prev);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!selectedCustomer) {
      newErrors.selectedCustomer = "Customer is required";
    }
    if (!weight) {
      newErrors.weight = "Weight is required";
    } else if (weight <= 0) {
      newErrors.weight = "Weight must be greater than 0";
    }
    return newErrors;
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleProceedSelectedUnit = (e) => {
    e.preventDefault();
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Proceeding with selection...");
    }
  };

  const customers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
  ];

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
            <span className="text-lg font-semibold">Selected Unit</span>
            <span className="text-sm font-semibold border border-[#5787C8] rounded px-2 py-1 text-[#5787C8]">
              {unitName}
            </span>
          </div>
          <IconButton
            onClick={onClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Select a service and choose a customer.
        </p>
      </DialogTitle>
      <DialogContent
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#555" },
        }}
      >
        {/* Custom Tab Navigation */}
        <div className="mt-2 mb-2 flex justify-center bg-[#5787C8] rounded-md">
          {["Wash", "Wash/Dry", "Wash/Dry/Fold"].map((label, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={`w-full p-2 m-1.5 font-bold text-sm rounded-sm transition-colors duration-200 ${
                selectedTab === index
                  ? "bg-white text-[#5787C8]"
                  : "bg-transparent text-white hover:bg-[#4a6b9c]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Customer Selection Dropdown */}
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.selectedCustomer}
        >
          <InputLabel>Customer</InputLabel>
          <Select
            value={selectedCustomer}
            onChange={handleCustomerChange}
            label="Customer"
          >
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
          {errors.selectedCustomer && (
            <Typography
              variant="caption"
              color="error"
              sx={{ marginTop: "3px", marginLeft: "5px" }}
            >
              {errors.selectedCustomer}
            </Typography>
          )}
        </FormControl>

        {/* Weight Input */}
        <FormControl fullWidth margin="normal" error={!!errors.weight}>
          <TextField
            label="Weight (kg)"
            variant="outlined"
            type="number"
            value={weight}
            onChange={handleWeightChange}
            placeholder="Enter weight in kilograms"
            error={!!errors.weight}
          />
          {errors.weight && (
            <Typography
              variant="caption"
              color="error"
              sx={{ marginTop: "3px", marginLeft: "5px" }}
            >
              {errors.weight}
            </Typography>
          )}
        </FormControl>

        {/* Additional Info Toggle */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop={2}
        >
          <Typography variant="body1">Additional Info</Typography>
          <Button
            onClick={handleAdditionalInfoToggle}
            sx={{ textTransform: "none" }}
          >
            {showAdditionalInfo ? "Hide" : "Show"}
          </Button>
        </Box>

        {/* Additional Info Text Field (Collapsible) */}
        <Collapse in={showAdditionalInfo}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Notes"
              multiline
              rows={4}
              variant="outlined"
              placeholder="Enter additional details here"
            />
          </FormControl>
        </Collapse>
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
          onClick={handleProceedSelectedUnit}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3A5A85",
            },
          }}
        >
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupSelectUnit;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Box,
//   Collapse,
//   IconButton,
//   TextField,
// } from "@mui/material";
// import styles from "../../../styles/style";
// import { Link } from "react-router-dom";
// import {
//   CalendarDots,
//   SlidersHorizontal,
//   MinusSquare,
// } from "@phosphor-icons/react";
// import CloseIcon from "@mui/icons-material/Close";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

// const PopupSelectUnit = ({ open, onClose, unitName, unitId }) => {
//   const {} = useUnitMonitor();

//   const [inSelectedCustomerData, setSelectedCustomerData] = useState([]);
//   const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [errors, setErrors] = useState({});

//   const handleAdditionalInfoToggle = () => {
//     setShowAdditionalInfo((prev) => !prev);
//   };

//   const validateFields = () => {
//     const newErrors = {};
//     if (!) newErrors. = "Customer is required";
//     return newErrors;
//   };

//   const handleCustomerChange = (event) => {
//     setSelectedCustomer(event.target.value);
//   };

//   const handleTabChange = (index) => {
//     setSelectedTab(index);
//   };

//   const handleProceedSelectedUnit = () => {
//     e.preventDefault();
//     const newErrors = validateFields();
//     setErrorsSelectedUnit(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log("Okay naman");
//     }
//   };

//   const customers = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Michael Johnson" },
//   ];

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
//             <span className="text-lg font-semibold">Selected Unit</span>
//             <span className="text-sm font-semibold border border-[#5787C8] rounded px-2 py-1 text-[#5787C8]">
//               {unitName}
//             </span>
//           </div>
//           <IconButton
//             onClick={onClose}
//             className="text-[#5787C8] hover:text-[#5787C8]"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">
//           Select a service and choose a customer.
//         </p>
//       </DialogTitle>
//       <DialogContent
//         sx={{
//           overflowY: "auto", // Enable vertical scrolling when needed
//           "&::-webkit-scrollbar": {
//             width: "8px", // Customize scrollbar width
//           },
//           "&::-webkit-scrollbar-track": {
//             backgroundColor: "#f1f1f1", // Scrollbar track color
//           },
//           "&::-webkit-scrollbar-thumb": {
//             backgroundColor: "#888", // Scrollbar thumb color
//             borderRadius: "10px",
//           },
//           "&::-webkit-scrollbar-thumb:hover": {
//             backgroundColor: "#555", // Color on hover
//           },
//         }}
//       >
//         {/* Custom Tab Navigation */}
//         <div className="mt-2 mb-2   flex justify-center bg-[#5787C8] rounded-md">
//           {["Wash", "Wash/Dry", "Wash/Dry/Fold"].map((label, index) => (
//             <button
//               key={index}
//               onClick={() => handleTabChange(index)}
//               className={`w-full p-2 m-1.5 font-bold text-sm rounded-sm transition-colors duration-200 ${
//                 selectedTab === index
//                   ? "bg-white text-[#5787C8]"
//                   : "bg-transparent text-white hover:bg-[#4a6b9c]"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* Customer Selection Dropdown */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Customer</InputLabel>
//           <Select
//             value={selectedCustomer}
//             onChange={handleCustomerChange}
//             label="Customer"
//           >
//             {customers.map((customer) => (
//               <MenuItem key={customer.id} value={customer.name}>
//                 {customer.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl fullWidth margin="normal">
//           <TextField
//             label="Weight (kg)"
//             variant="outlined"
//             type="number" // Ensure only numeric input
//             placeholder="Enter weight in kilograms"
//           />
//         </FormControl>

//         {/* Additional Info Toggle */}
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           marginTop={2}
//         >
//           <Typography variant="body1">Additional Info</Typography>
//           <Button
//             onClick={handleAdditionalInfoToggle}
//             sx={{ textTransform: "none" }}
//           >
//             {showAdditionalInfo ? "Hide" : "Show"}
//           </Button>
//         </Box>

//         {/* Additional Info Text Field (Collapsible) */}
//         <Collapse in={showAdditionalInfo}>
//           <FormControl fullWidth margin="normal">
//             <TextField
//               label="Notes"
//               multiline
//               rows={4} // Adjust the number of rows as needed
//               variant="outlined"
//               //   value={additionalInfo}
//               //   onChange={(event) => setAdditionalInfo(event.target.value)}
//               placeholder="Enter additional details here"
//             />
//           </FormControl>
//         </Collapse>
//       </DialogContent>

//       <DialogActions className="flex justify-end space-x-1 mb-1 mr-3">
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
//           onClick={handleProceedSelectedUnit}
//           sx={{
//             backgroundColor: "#5787C8",
//             borderRadius: "5px",
//             fontWeight: 500,
//             textTransform: "none",
//             "&:hover": {
//               backgroundColor: "#3A5A85",
//             },
//           }}
//         >
//           Proceed
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupSelectUnit;
