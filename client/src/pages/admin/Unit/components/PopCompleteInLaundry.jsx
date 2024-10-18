import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";
import { COLORS } from "../../../../constants/color";

const PopCompleteInLaundry = ({ open, onClose, data }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [serviceType, setServiceType] = useState("");

  useEffect(() => {
    if (open) {
      setCustomerName(data.customer_fullname);
      setServiceType(data.service_name);
    }
  }, [open, data]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      <CustomPopHeaderTitle
        title={"Billing Information"}
        subtitle={"Provide the required information"}
        onClose={onClose}
      />

      <DialogContent>
        <Grid container spacing={2}>
          {/* Left Side: Input Information */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 5 }}>
              <TextField
                fullWidth
                margin="dense"
                label="Customer Name"
                type="text"
                variant="outlined"
                value={customerName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: COLORS.secondary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: COLORS.secondary,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Service Type"
                type="text"
                variant="outlined"
                value={serviceType}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  mt: 3,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: COLORS.secondary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: COLORS.secondary,
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Right Side: Sample Receipt */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 3,
                boxShadow: "none !important",
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: COLORS.border,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Receipt
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2">
                Customer: {"John Doe"}
              </Typography>
              <Typography variant="subtitle2">
                Phone: {"(123) 456-7890"}
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary={"Service Type"}
                    secondary={`$${"0.00"}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText primary="Subtotal" secondary={1} />
                </ListItem>

                <ListItem>
                  <ListItemText primary="Tax (12%)" secondary={`$${1}`} />
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem>
                  <ListItemText primary="Total" secondary={`$${1}`} />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle2">
                Payment Method: {"Cash"}
              </Typography>

              <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                Thank you for your business!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <CustomPopFooterButton
        label={"Proceed"}
        onClose={onClose}
        onClick={handleSubmit}
        loading={loading}
      />
    </Dialog>
  );
};

export default PopCompleteInLaundry;

// import React, { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import {
//   Grid,
//   TextField,
//   Typography,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   Divider,
//   Box,
//   Paper,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
// import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";
// import { COLORS } from "../../../../constants/color";

// const PopCompleteInLaundry = ({ open, onClose, service_id }) => {
//   const [customerName, setCustomerName] = useState("");
//   const [customerNumber, setCustomerNumber] = useState("");
//   const [seviceType, setServiceType] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formValues, setFormValues] = useState({
//     fullName: "",
//     phoneNumber: "",
//     serviceType: "",
//     totalAmount: "",
//     paymentMethod: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const handleSubmit = () => {
//     setLoading(true);
//     // Add submission logic
//     setLoading(false);
//   };

//   // Simulated Tax Calculation and Total
//   const taxRate = 0.12; // 12% tax
//   const subtotal = parseFloat(formValues.totalAmount || 0);
//   const taxAmount = (subtotal * taxRate).toFixed(2);
//   const total = (subtotal + parseFloat(taxAmount)).toFixed(2);

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         style: {
//           borderRadius: 16,
//         },
//       }}
//     >
//       <CustomPopHeaderTitle
//         title={"Billing Information"}
//         subtitle={"Provide the required information"}
//         onClose={onClose}
//       />

//       <DialogContent>
//         <Grid container spacing={2}>
//           {/* Left Side: Input Information */}
//           <Grid item xs={12} md={6}>
//             <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
//               <TextField
//                 fullWidth
//                 label="Customer Name"
//                 value={customerName}
//                 // onChange={handleInputChange}
//                 // error={!!errors.fullName}
//                 // helperText={errors.fullName ? "Full name is required" : ""}
//                 margin="normal"
//               />

//               <TextField
//                 fullWidth
//                 label="Phone Number"
//                 value={customerNumber}
//                 // onChange={handleInputChange}
//                 // error={!!errors.phoneNumber}
//                 // helperText={
//                 //   errors.phoneNumber ? "Phone number is required" : ""
//                 // }
//                 margin="normal"
//               />

//               <TextField
//                 fullWidth
//                 label="Service Type"
//                 name=""
//                 // value={formValues.phoneNumber}
//                 // onChange={handleInputChange}
//                 // error={!!errors.phoneNumber}
//                 // helperText={
//                 //   errors.phoneNumber ? "Phone number is required" : ""
//                 // }
//                 margin="normal"
//               />

//               <TextField
//                 fullWidth
//                 label="Total Amount"
//                 name="totalAmount"
//                 value={formValues.totalAmount}
//                 onChange={handleInputChange}
//                 error={!!errors.totalAmount}
//                 helperText={errors.totalAmount ? "Amount is required" : ""}
//                 margin="normal"
//               />

//               <FormControl fullWidth margin="normal">
//                 <InputLabel>Payment Method</InputLabel>
//                 <Select
//                   name="paymentMethod"
//                   value={formValues.paymentMethod}
//                   onChange={handleInputChange}
//                   error={!!errors.paymentMethod}
//                 >
//                   <MenuItem value="Cash">Cash</MenuItem>
//                   <MenuItem value="Credit Card">Credit Card</MenuItem>
//                   <MenuItem value="Mobile Payment">Mobile Payment</MenuItem>
//                 </Select>
//                 {errors.paymentMethod && (
//                   <Typography variant="body2" color="error">
//                     Payment method is required
//                   </Typography>
//                 )}
//               </FormControl>
//             </Box>
//           </Grid>

//           {/* Right Side: Sample Receipt */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               sx={{
//                 padding: 3,
//                 boxShadow: "none !important",
//                 borderRadius: "10px",
//                 borderStyle: "solid",
//                 borderWidth: "2px",
//                 borderColor: COLORS.border,
//               }}
//             >
//               <Typography variant="h6" gutterBottom>
//                 Receipt
//               </Typography>
//               <Divider sx={{ mb: 2 }} />

//               <Typography variant="subtitle2">
//                 Customer: {formValues.fullName || "John Doe"}
//               </Typography>
//               <Typography variant="subtitle2">
//                 Phone: {formValues.phoneNumber || "(123) 456-7890"}
//               </Typography>

//               <List>
//                 <ListItem>
//                   <ListItemText
//                     primary={formValues.serviceType || "Service Type"}
//                     secondary={`$${formValues.totalAmount || "0.00"}`}
//                   />
//                 </ListItem>

//                 <ListItem>
//                   <ListItemText primary="Subtotal" secondary={`$${subtotal}`} />
//                 </ListItem>

//                 <ListItem>
//                   <ListItemText
//                     primary="Tax (12%)"
//                     secondary={`$${taxAmount}`}
//                   />
//                 </ListItem>

//                 <Divider sx={{ my: 1 }} />

//                 <ListItem>
//                   <ListItemText primary="Total" secondary={`$${total}`} />
//                 </ListItem>
//               </List>

//               <Divider sx={{ my: 2 }} />

//               <Typography variant="subtitle2">
//                 Payment Method: {formValues.paymentMethod || "Cash"}
//               </Typography>

//               <Typography variant="h6" align="center" sx={{ mt: 2 }}>
//                 Thank you for your business!
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </DialogContent>

//       <CustomPopFooterButton
//         label={"Proceed"}
//         onClick={handleSubmit}
//         loading={loading}
//       />
//     </Dialog>
//   );
// };

// export default PopCompleteInLaundry;
