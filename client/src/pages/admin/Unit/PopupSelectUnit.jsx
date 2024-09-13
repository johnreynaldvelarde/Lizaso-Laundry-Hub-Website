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
  Tabs,
  Tab,
  Box,
  Collapse,
} from "@mui/material";

const PopupSelectUnit = ({ open, onClose, unitName, unitId }) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedService, setSelectedService] = useState(0); // Tab index for wash options
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleServiceChange = (event, newValue) => {
    setSelectedService(newValue);
  };

  const handleAdditionalInfoToggle = () => {
    setShowAdditionalInfo((prev) => !prev);
  };

  const handleSubmit = () => {
    // Handle form submission or data processing here
    console.log("Selected Customer:", selectedCustomer);
    console.log("Selected Service:", selectedService);
    onClose(); // Close the dialog after submission if needed
  };

  // Sample customer list
  const customers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Michael Johnson" },
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Unit</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{unitName}</Typography>
        <Typography variant="h6">{unitId}</Typography>
        <Typography variant="body1">
          Details about the selected unit can be displayed here.
        </Typography>

        {/* Service Selection Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 2 }}>
          <Tabs value={selectedService} onChange={handleServiceChange}>
            <Tab label="Wash" />
            <Tab label="Wash/Dry" />
            <Tab label="Wash/Dry/Fold" />
          </Tabs>
        </Box>

        {/* Customer Selection Dropdown */}
        <FormControl fullWidth margin="normal">
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

        {/* Additional Info Dropdown (Collapsible) */}
        <Collapse in={showAdditionalInfo}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Additional Info</InputLabel>
            <Select label="Additional Info">
              <MenuItem value="Notes">Notes</MenuItem>
              <MenuItem value="Preferences">Preferences</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Collapse>
      </DialogContent>

      <DialogActions className="flex justify-end space-x-2 mb-1">
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
          onClick={handleSubmit}
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
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const PopupSelectUnit = ({ open, onClose, unitName, unitId }) => {
//   const [selectedCustomer, setSelectedCustomer] = useState("");
//   const [field2, setField2] = useState("");

//   const handleCustomerChange = (event) => {
//     setSelectedCustomer(event.target.value);
//   };

//   const handleField2Change = (event) => {
//     setField2(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Handle form submission or data processing here
//     console.log("Selected Customer:", selectedCustomer);
//     console.log("Field 2:", field2);
//     onClose(); // Close the dialog after submission if needed
//   };

//   // Sample customer list
//   const customers = [
//     { id: 1, name: "John Doe" },
//     { id: 2, name: "Jane Smith" },
//     { id: 3, name: "Michael Johnson" },
//   ];

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Select Unit</DialogTitle>
//       <DialogContent>
//         <Typography variant="h6">{unitName}</Typography>
//         <Typography variant="h6">{unitId}</Typography>
//         <Typography variant="body1">
//           Details about the selected unit can be displayed here.
//         </Typography>

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

//         <TextField
//           label="Field 2"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={field2}
//           onChange={handleField2Change}
//         />
//       </DialogContent>
//       <DialogActions className="flex justify-end space-x-2 mb-1">
//           <Button
//             // onClick={onClose}
//             variant="outlined"
//             sx={{
//               marginRight: 1,
//               borderColor: "#595959",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               color: "#595959",
//               "&:hover": {
//                 borderColor: "#595959",
//                 backgroundColor: "rgba(144, 144, 144, 0.1)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disableElevation
//             // onClick={() => handleAssignUnitConfirm(inqueueID, onClose)}
//             sx={{
//               backgroundColor: "#5787C8",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#3A5A85",
//               },
//             }}
//           >
//             Proceed
//           </Button>
//         </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupSelectUnit;

// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   TextField,
// } from "@mui/material";

// const PopupSelectUnit = ({ open, onClose, unitName, unitId }) => {
//   const [field1, setField1] = useState("");
//   const [field2, setField2] = useState("");

//   const handleField1Change = (event) => {
//     setField1(event.target.value);
//   };

//   const handleField2Change = (event) => {
//     setField2(event.target.value);
//   };

//   const handleSubmit = () => {
//     // Handle form submission or data processing here
//     console.log("Field 1:", field1);
//     console.log("Field 2:", field2);
//     onClose(); // Close the dialog after submission if needed
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Select Unit</DialogTitle>
//       <DialogContent>
//         <Typography variant="h6">{unitName}</Typography>
//         <Typography variant="h6">{unitId}</Typography>
//         <Typography variant="body1">
//           Details about the selected unit can be displayed here.
//         </Typography>
//         <TextField
//           label="Field 1"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={field1}
//           onChange={handleField1Change}
//         />
//         <TextField
//           label="Field 2"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={field2}
//           onChange={handleField2Change}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleSubmit} color="primary">
//           Submit
//         </Button>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupSelectUnit;
