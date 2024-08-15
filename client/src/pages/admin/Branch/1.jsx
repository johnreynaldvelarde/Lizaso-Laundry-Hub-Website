// import styled from "@emotion/styled";
// import {
//   Autocomplete,
//   Box,
//   Button,
//   Chip,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import React, { useRef, useState } from "react";
// import { FiRefreshCcw } from "react-icons/fi";

// const AddItem = () => {
//   const [category, setCategory] = useState("");
//   const [formData, setFormData] = useState({
//     storeName: "",
//     storeNo: "",
//     storeContact: "",
//     location: "",
//   });
//   const [errors, setErrors] = useState({
//     storeName: false,
//     storeNo: false,
//     storeContact: false,
//     location: false,
//   });

//   const imageInput = useRef(null);
//   const [image, setImage] = useState("");

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });

//     // Remove error when the user starts typing
//     setErrors({ ...errors, [name]: value.trim() === "" });
//   };

//   const handleGenerate = () => {
//     setFormData({ ...formData, storeNo: "LIZASO12345" });
//     setErrors({ ...errors, storeNo: false });
//   };

//   const handleSubmit = () => {
//     const newErrors = {
//       storeName: formData.storeName.trim() === "",
//       storeNo: formData.storeNo.trim() === "",
//       storeContact: formData.storeContact.trim() === "",
//       location: formData.location.trim() === "",
//     };
//     setErrors(newErrors);

//     if (Object.values(newErrors).some((error) => error)) {
//       // Prevent form submission if there are errors
//       return;
//     }

//     // Submit the form data
//     console.log("Form submitted successfully!", formData);
//   };

//   const UploadBox = styled(Box)({
//     marginTop: 30,
//     height: 200,
//     borderRadius: "10px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     borderStyle: "dashed",
//     borderWidth: "2px",
//     borderColor: "divider",
//   });

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Typography variant="h6" sx={{ marginBottom: "14px" }}>
//         Add new store
//       </Typography>
//       <Paper
//         sx={{
//           boxShadow: "none !important",
//           borderRadius: "12px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           p: "20px",
//           maxWidth: "800px",
//           margin: "0 auto",
//           cursor: "pointer",
//           overflow: "hidden",
//         }}
//       >
//         <Box sx={{ my: 2 }}>
//           <TextField
//             label="Store Name"
//             variant="outlined"
//             size="medium"
//             fullWidth
//             name="storeName"
//             value={formData.storeName}
//             onChange={handleChange}
//             error={errors.storeName}
//             helperText={errors.storeName ? "Store Name is required" : ""}
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
//                 {
//                   borderColor: "red",
//                 },
//             }}
//           />
//         </Box>
//         <Box sx={{ my: 4 }}>
//           <TextField
//             label="Store No"
//             variant="outlined"
//             size="medium"
//             fullWidth
//             name="storeNo"
//             value={formData.storeNo}
//             onChange={handleChange}
//             error={errors.storeNo}
//             helperText={errors.storeNo ? "Store No is required" : ""}
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
//                 {
//                   borderColor: "red",
//                 },
//             }}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleGenerate}>
//                     <FiRefreshCcw />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//         <Box sx={{ my: 4 }}>
//           <TextField
//             label="Store Contact Number"
//             variant="outlined"
//             size="medium"
//             fullWidth
//             name="storeContact"
//             value={formData.storeContact}
//             onChange={handleChange}
//             error={errors.storeContact}
//             helperText={
//               errors.storeContact ? "Store Contact Number is required" : ""
//             }
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
//                 {
//                   borderColor: "red",
//                 },
//             }}
//           />
//         </Box>
//         <Box sx={{ mt: 4 }}>
//           <TextField
//             label="Location"
//             variant="outlined"
//             rows={4}
//             fullWidth
//             multiline
//             name="location"
//             value={formData.location}
//             onChange={handleChange}
//             error={errors.location}
//             helperText={errors.location ? "Location is required" : ""}
//             sx={{
//               "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
//                 {
//                   borderColor: "red",
//                 },
//             }}
//           />
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             mt: "30px",
//             gap: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             sx={{ borderRadius: "20px" }}
//             onClick={handleSubmit}
//           >
//             Submit
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{ borderRadius: "20px" }}
//             onClick={() =>
//               setFormData({
//                 storeName: "",
//                 storeNo: "",
//                 storeContact: "",
//                 location: "",
//               })
//             }
//           >
//             Clear
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AddItem;
