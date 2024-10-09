// import React from "react";
// import useAuth from "../../../contexts/AuthContext";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
//   Grid,
// } from "@mui/material";
// import { PlusCircle, Trash, PencilLine, Eye } from "@phosphor-icons/react";
// import { COLORS } from "../../../constants/color";

// const Store = () => {
//   // Sample data for stores
//   const sampleStores = [
//     {
//       id: 1,
//       storeName: "LIZASO Main",
//       storeAddress: "123 Main St, City",
//       storeContact: "123-456-7890",
//       manager: "John Doe",
//       dateCreated: "2024-01-01",
//     },
//     {
//       id: 2,
//       storeName: "LIZASO Branch 1",
//       storeAddress: "456 Elm St, City",
//       storeContact: "234-567-8901",
//       manager: "Jane Smith",
//       dateCreated: "2024-02-15",
//     },
//     {
//       id: 3,
//       storeName: "LIZASO Branch 2",
//       storeAddress: "789 Oak St, City",
//       storeContact: "345-678-9012",
//       manager: "Michael Johnson",
//       dateCreated: "2024-03-10",
//     },
//     {
//       id: 4,
//       storeName: "LIZASO Branch 3",
//       storeAddress: "321 Pine St, City",
//       storeContact: "456-789-0123",
//       manager: "Emily Davis",
//       dateCreated: "2024-04-20",
//     },
//   ];

//   // Sample notification state
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState("");

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   const handleAddStore = () => {
//     // Add store logic here
//     setSnackbarMessage("New store added successfully!");
//     setOpenSnackbar(true);
//   };

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box
//         className="flex items-center justify-between mb-8"
//         sx={{
//           flexDirection: { xs: "column", sm: "row" },
//           alignItems: { xs: "center", sm: "flex-start" },
//           width: "100%",
//         }}
//       >
//         <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: { xs: "18px", sm: "24px", md: "28px" },
//               fontWeight: 500,
//               marginBottom: { xs: "8px", sm: "0" },
//             }}
//           >
//             Store Management
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               color: COLORS.subtitle,
//               fontSize: { xs: "12px", sm: "14px", md: "16px" },
//               fontWeight: 500,
//               marginBottom: { xs: "16px", sm: "0" },
//             }}
//           >
//             Add New Store & Manage Access
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={
//             <PlusCircle
//               size={24}
//               color={COLORS.white}
//               weight="duotone"
//               sx={{ display: { xs: "none", sm: "inline" } }}
//             />
//           }
//           onClick={handleAddStore}
//           sx={{
//             backgroundColor: COLORS.secondary,
//             borderRadius: "5px",
//             fontWeight: 500,
//             textTransform: "none",
//             paddingX: { xs: 1, sm: 2, md: 3 },
//             fontSize: { xs: "14px", sm: "14px", md: "16px" },
//             "&:hover": {
//               backgroundColor: COLORS.secondaryHover,
//             },
//             width: { xs: "100%", sm: "auto" },
//             mt: { xs: 2, sm: 0 },
//           }}
//         >
//           Add New Store
//         </Button>
//       </Box>

//       {/* Search and Filter Section */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search Store..."
//             sx={{ backgroundColor: COLORS.white }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Filter by Manager</InputLabel>
//             <Select
//               label="Filter by Manager"
//               sx={{ backgroundColor: COLORS.white }}
//             >
//               <MenuItem value="">
//                 <em>All</em>
//               </MenuItem>
//               <MenuItem value="John Doe">John Doe</MenuItem>
//               <MenuItem value="Jane Smith">Jane Smith</MenuItem>
//               <MenuItem value="Michael Johnson">Michael Johnson</MenuItem>
//               <MenuItem value="Emily Davis">Emily Davis</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Sample list of stores */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Store Name</TableCell>
//               <TableCell>Store Address</TableCell>
//               <TableCell>Store Contact</TableCell>
//               <TableCell>Manager</TableCell>
//               <TableCell>Date Created</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sampleStores.map((store) => (
//               <TableRow key={store.id}>
//                 <TableCell>{store.id}</TableCell>
//                 <TableCell>{store.storeName}</TableCell>
//                 <TableCell>{store.storeAddress}</TableCell>
//                 <TableCell>{store.storeContact}</TableCell>
//                 <TableCell>{store.manager}</TableCell>
//                 <TableCell>{store.dateCreated}</TableCell>
//                 <TableCell align="right">
//                   <Tooltip title="View Details" arrow>
//                     <IconButton>
//                       <Eye size={20} color={COLORS.primary} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Edit Store" arrow>
//                     <IconButton>
//                       <PencilLine size={20} color={COLORS.secondary} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete Store" arrow>
//                     <IconButton>
//                       <Trash size={20} color={COLORS.error} />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Store;

// import React, { useEffect, useState } from "react";
// import { Box, Button, Typography } from "@mui/material";
// import { FiPlus } from "react-icons/fi";
// import { Link } from "react-router-dom";

// import Table from "../../../components/common/Table";
// import { storeColumns } from "../../../data/columns/stores";

// import useStore from "../../../hooks/admin/useStore";

// const Store = () => {
//   const { storeData, loading, error, fetchStoreData } = useStore();

//   // Fetch store data when the component mounts
//   useEffect(() => {
//     fetchStoreData();
//   }, []);

//   const handleEdit = (row) => {
//     console.log("Editing row:", row);
//   };

//   // Handle loading and error states
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       {/* <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: "16px",
//         }}
//       >
//         <Typography variant="h6">Branch Store</Typography>
//         <Link to="/main/add-store" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<FiPlus />}
//             sx={{ borderRadius: "20px" }}
//           >
//             Add new store
//           </Button>
//         </Link>
//       </Box> */}
//       {/* <Table
//         data={storeData}
//         fields={storeColumns}
//         numberOfRows={storeData.length}
//         enableTopToolBar={true}
//         enableBottomToolBar={true}
//         enablePagination={true}
//         enableRowSelection={true}
//         enableColumnFilters={true}
//         enableEditing={true}
//         enableColumnDragging={true}
//         showPreview={true}
//         onEdit={handleEdit}
//         routeLink="products"
//       /> */}
//     </Box>
//   );
// };

// export default Store;

// import React from "react";
// import useAuth from "../../../contexts/AuthContext";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
//   Grid,
// } from "@mui/material";
// import { PlusCircle, Trash, PencilLine, Eye } from "@phosphor-icons/react";
// import { COLORS } from "../../../constants/color";

// // PerformanceMetrics component
// const PerformanceMetrics = ({ storeName }) => {
//   // Sample performance metrics data
//   const performanceData = {
//     totalSales: "$20,000",
//     customerVisits: 500,
//     performanceRating: 4.5,
//   };

//   return (
//     <Box
//       sx={{
//         my: 4,
//         padding: 2,
//         border: "1px solid",
//         borderColor: COLORS.secondary,
//         borderRadius: "8px",
//       }}
//     >
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Performance Metrics for {storeName}
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={4}>
//           <Typography>Total Sales:</Typography>
//           <Typography fontWeight="bold">
//             {performanceData.totalSales}
//           </Typography>
//         </Grid>
//         <Grid item xs={4}>
//           <Typography>Customer Visits:</Typography>
//           <Typography fontWeight="bold">
//             {performanceData.customerVisits}
//           </Typography>
//         </Grid>
//         <Grid item xs={4}>
//           <Typography>Performance Rating:</Typography>
//           <Typography fontWeight="bold">
//             {performanceData.performanceRating} ⭐
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const Store = () => {
//   // Sample data for stores
//   const sampleStores = [
//     {
//       id: 1,
//       storeName: "LIZASO Main",
//       storeAddress: "123 Main St, City",
//       storeContact: "123-456-7890",
//       manager: "John Doe",
//       dateCreated: "2024-01-01",
//     },
//     {
//       id: 2,
//       storeName: "LIZASO Branch 1",
//       storeAddress: "456 Elm St, City",
//       storeContact: "234-567-8901",
//       manager: "Jane Smith",
//       dateCreated: "2024-02-15",
//     },
//     {
//       id: 3,
//       storeName: "LIZASO Branch 2",
//       storeAddress: "789 Oak St, City",
//       storeContact: "345-678-9012",
//       manager: "Michael Johnson",
//       dateCreated: "2024-03-10",
//     },
//     {
//       id: 4,
//       storeName: "LIZASO Branch 3",
//       storeAddress: "321 Pine St, City",
//       storeContact: "456-789-0123",
//       manager: "Emily Davis",
//       dateCreated: "2024-04-20",
//     },
//   ];

//   // Sample notification state
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState("");

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   const handleAddStore = () => {
//     // Add store logic here
//     setSnackbarMessage("New store added successfully!");
//     setOpenSnackbar(true);
//   };

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box
//         className="flex items-center justify-between mb-8"
//         sx={{
//           flexDirection: { xs: "column", sm: "row" },
//           alignItems: { xs: "center", sm: "flex-start" },
//           width: "100%",
//         }}
//       >
//         <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: { xs: "18px", sm: "24px", md: "28px" },
//               fontWeight: 500,
//               marginBottom: { xs: "8px", sm: "0" },
//             }}
//           >
//             Store Management
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               color: COLORS.subtitle,
//               fontSize: { xs: "12px", sm: "14px", md: "16px" },
//               fontWeight: 500,
//               marginBottom: { xs: "16px", sm: "0" },
//             }}
//           >
//             Add New Store & Manage Access
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={
//             <PlusCircle
//               size={24}
//               color={COLORS.white}
//               weight="duotone"
//               sx={{ display: { xs: "none", sm: "inline" } }}
//             />
//           }
//           onClick={handleAddStore}
//           sx={{
//             backgroundColor: COLORS.secondary,
//             borderRadius: "5px",
//             fontWeight: 500,
//             textTransform: "none",
//             paddingX: { xs: 1, sm: 2, md: 3 },
//             fontSize: { xs: "14px", sm: "14px", md: "16px" },
//             "&:hover": {
//               backgroundColor: COLORS.secondaryHover,
//             },
//             width: { xs: "100%", sm: "auto" },
//             mt: { xs: 2, sm: 0 },
//           }}
//         >
//           Add New Store
//         </Button>
//       </Box>

//       {/* Sample list of stores */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Store Name</TableCell>
//               <TableCell>Store Address</TableCell>
//               <TableCell>Store Contact</TableCell>
//               <TableCell>Manager</TableCell>
//               <TableCell>Date Created</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sampleStores.map((store) => (
//               <TableRow key={store.id}>
//                 <TableCell>{store.id}</TableCell>
//                 <TableCell>
//                   {store.storeName}
//                   <PerformanceMetrics storeName={store.storeName} />
//                 </TableCell>
//                 <TableCell>{store.storeAddress}</TableCell>
//                 <TableCell>{store.storeContact}</TableCell>
//                 <TableCell>{store.manager}</TableCell>
//                 <TableCell>{store.dateCreated}</TableCell>
//                 <TableCell align="right">
//                   <Tooltip title="View Details" arrow>
//                     <IconButton>
//                       <Eye size={20} color={COLORS.primary} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Edit Store" arrow>
//                     <IconButton>
//                       <PencilLine size={20} color={COLORS.secondary} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete Store" arrow>
//                     <IconButton>
//                       <Trash size={20} color={COLORS.error} />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Store;

// import React from "react";
// import useAuth from "../../../contexts/AuthContext";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Tooltip,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Snackbar,
//   Alert,
//   Grid,
// } from "@mui/material";
// import { PlusCircle, Trash, PencilLine, Eye } from "@phosphor-icons/react";
// import { COLORS } from "../../../constants/color";

// // PerformanceMetrics component
// const PerformanceMetrics = ({ storeName }) => {
//   // Sample performance metrics data
//   const performanceData = {
//     totalSales: "$20,000",
//     customerVisits: 500,
//     performanceRating: 4.5,
//   };

//   return (
//     <Box
//       sx={{
//         my: 4,
//         padding: 2,
//         border: "1px solid",
//         borderColor: COLORS.secondary,
//         borderRadius: "8px",
//         backgroundColor: COLORS.white,
//       }}
//     >
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Performance Metrics for {storeName}
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}>
//           <Typography>Total Sales:</Typography>
//           <Typography fontWeight="bold">
//             {performanceData.totalSales}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Typography>Customer Visits:</Typography>
//           <Typography fontWeight="bold">
//             {performanceData.customerVisits}
//           </Typography>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Typography>Performance Rating:</Typography>
//           <Typography fontWeight="bold">
//             {performanceData.performanceRating} ⭐
//           </Typography>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const Store = () => {
//   // Sample data for stores
//   const sampleStores = [
//     {
//       id: 1,
//       storeName: "LIZASO Main",
//       storeAddress: "123 Main St, City",
//       storeContact: "123-456-7890",
//       manager: "John Doe",
//       dateCreated: "2024-01-01",
//     },
//     {
//       id: 2,
//       storeName: "LIZASO Branch 1",
//       storeAddress: "456 Elm St, City",
//       storeContact: "234-567-8901",
//       manager: "Jane Smith",
//       dateCreated: "2024-02-15",
//     },
//     {
//       id: 3,
//       storeName: "LIZASO Branch 2",
//       storeAddress: "789 Oak St, City",
//       storeContact: "345-678-9012",
//       manager: "Michael Johnson",
//       dateCreated: "2024-03-10",
//     },
//     {
//       id: 4,
//       storeName: "LIZASO Branch 3",
//       storeAddress: "321 Pine St, City",
//       storeContact: "456-789-0123",
//       manager: "Emily Davis",
//       dateCreated: "2024-04-20",
//     },
//   ];

//   // Sample notification state
//   const [openSnackbar, setOpenSnackbar] = React.useState(false);
//   const [snackbarMessage, setSnackbarMessage] = React.useState("");

//   const handleSnackbarClose = () => {
//     setOpenSnackbar(false);
//   };

//   const handleAddStore = () => {
//     // Add store logic here
//     setSnackbarMessage("New store added successfully!");
//     setOpenSnackbar(true);
//   };

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box
//         className="flex items-center justify-between mb-8"
//         sx={{
//           flexDirection: { xs: "column", sm: "row" },
//           alignItems: { xs: "center", sm: "flex-start" },
//           width: "100%",
//         }}
//       >
//         <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
//           <Typography
//             variant="h6"
//             sx={{
//               fontSize: { xs: "18px", sm: "24px", md: "28px" },
//               fontWeight: 500,
//               marginBottom: { xs: "8px", sm: "0" },
//             }}
//           >
//             Store Management
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             sx={{
//               color: COLORS.subtitle,
//               fontSize: { xs: "12px", sm: "14px", md: "16px" },
//               fontWeight: 500,
//               marginBottom: { xs: "16px", sm: "0" },
//             }}
//           >
//             Add New Store & Manage Access
//           </Typography>
//         </Box>
//         <Button
//           variant="contained"
//           startIcon={
//             <PlusCircle
//               size={24}
//               color={COLORS.white}
//               weight="duotone"
//               sx={{ display: { xs: "none", sm: "inline" } }}
//             />
//           }
//           onClick={handleAddStore}
//           sx={{
//             backgroundColor: COLORS.secondary,
//             borderRadius: "5px",
//             fontWeight: 500,
//             textTransform: "none",
//             paddingX: { xs: 1, sm: 2, md: 3 },
//             fontSize: { xs: "14px", sm: "14px", md: "16px" },
//             "&:hover": {
//               backgroundColor: COLORS.secondaryHover,
//             },
//             width: { xs: "100%", sm: "auto" },
//             mt: { xs: 2, sm: 0 },
//           }}
//         >
//           Add New Store
//         </Button>
//       </Box>

//       {/* Search and Filter Section */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={4}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Search Store..."
//             sx={{ backgroundColor: COLORS.white }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6} md={4}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Filter by Manager</InputLabel>
//             <Select
//               label="Filter by Manager"
//               sx={{ backgroundColor: COLORS.white }}
//             >
//               <MenuItem value="">
//                 <em>All</em>
//               </MenuItem>
//               <MenuItem value="John Doe">John Doe</MenuItem>
//               <MenuItem value="Jane Smith">Jane Smith</MenuItem>
//               <MenuItem value="Michael Johnson">Michael Johnson</MenuItem>
//               <MenuItem value="Emily Davis">Emily Davis</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Sample list of stores */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Store Name</TableCell>
//               <TableCell>Store Address</TableCell>
//               <TableCell>Store Contact</TableCell>
//               <TableCell>Manager</TableCell>
//               <TableCell>Date Created</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sampleStores.map((store) => (
//               <TableRow key={store.id}>
//                 <TableCell>{store.id}</TableCell>
//                 <TableCell>
//                   {store.storeName}
//                   <PerformanceMetrics storeName={store.storeName} />
//                 </TableCell>
//                 <TableCell>{store.storeAddress}</TableCell>
//                 <TableCell>{store.storeContact}</TableCell>
//                 <TableCell>{store.manager}</TableCell>
//                 <TableCell>{store.dateCreated}</TableCell>
//                 <TableCell align="right">
//                   <Tooltip title="View Details" arrow>
//                     <IconButton>
//                       <Eye size={20} color={COLORS.primary} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Edit Store" arrow>
//                     <IconButton>
//                       <PencilLine size={20} color={COLORS.secondary} />
//                     </IconButton>
//                   </Tooltip>
//                   <Tooltip title="Delete Store" arrow>
//                     <IconButton>
//                       <Trash size={20} color={COLORS.error} />
//                     </IconButton>
//                   </Tooltip>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Snackbar for notifications */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity="success"
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Store;
import React from "react";
import useAuth from "../../../contexts/AuthContext";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { PlusCircle, Trash, PencilLine, Eye } from "@phosphor-icons/react";
import { COLORS } from "../../../constants/color";

// PerformanceMetrics component
const PerformanceMetrics = ({ storeName }) => {
  // Sample performance metrics data
  const performanceData = {
    totalSales: "$20,000",
    inStoreVisits: 300,
    remoteServiceCustomers: 200,
    performanceRating: 4.5,
  };

  return (
    <Box
      sx={{
        my: 4,
        padding: 2,
        border: "1px solid",
        borderColor: COLORS.secondary,
        borderRadius: "8px",
        backgroundColor: COLORS.white,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Performance Metrics for {storeName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography>Total Sales:</Typography>
          <Typography fontWeight="bold">
            {performanceData.totalSales}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>In-Store Visits:</Typography>
          <Typography fontWeight="bold">
            {performanceData.inStoreVisits}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Remote Service Usage:</Typography>
          <Typography fontWeight="bold">
            {performanceData.remoteServiceCustomers}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Performance Rating:</Typography>
          <Typography fontWeight="bold">
            {performanceData.performanceRating} ⭐
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const Store = () => {
  // Sample data for stores
  const sampleStores = [
    {
      id: 1,
      storeName: "LIZASO Main",
      storeAddress: "123 Main St, City",
      storeContact: "123-456-7890",
      manager: "John Doe",
      dateCreated: "2024-01-01",
    },
    {
      id: 2,
      storeName: "LIZASO Branch 1",
      storeAddress: "456 Elm St, City",
      storeContact: "234-567-8901",
      manager: "Jane Smith",
      dateCreated: "2024-02-15",
    },
    {
      id: 3,
      storeName: "LIZASO Branch 2",
      storeAddress: "789 Oak St, City",
      storeContact: "345-678-9012",
      manager: "Michael Johnson",
      dateCreated: "2024-03-10",
    },
    {
      id: 4,
      storeName: "LIZASO Branch 3",
      storeAddress: "321 Pine St, City",
      storeContact: "456-789-0123",
      manager: "Emily Davis",
      dateCreated: "2024-04-20",
    },
  ];

  // Sample notification state
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddStore = () => {
    // Add store logic here
    setSnackbarMessage("New store added successfully!");
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
      <Box
        className="flex items-center justify-between mb-8"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "18px", sm: "24px", md: "28px" },
              fontWeight: 500,
              marginBottom: { xs: "8px", sm: "0" },
            }}
          >
            Store Management
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: COLORS.subtitle,
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              fontWeight: 500,
              marginBottom: { xs: "16px", sm: "0" },
            }}
          >
            Add New Store & Manage Access
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={
            <PlusCircle
              size={24}
              color={COLORS.white}
              weight="duotone"
              sx={{ display: { xs: "none", sm: "inline" } }}
            />
          }
          onClick={handleAddStore}
          sx={{
            backgroundColor: COLORS.secondary,
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            paddingX: { xs: 1, sm: 2, md: 3 },
            fontSize: { xs: "14px", sm: "14px", md: "16px" },
            "&:hover": {
              backgroundColor: COLORS.secondaryHover,
            },
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          Add New Store
        </Button>
      </Box>

      {/* Search and Filter Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Store..."
            sx={{ backgroundColor: COLORS.white }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Manager</InputLabel>
            <Select
              label="Filter by Manager"
              sx={{ backgroundColor: COLORS.white }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="John Doe">John Doe</MenuItem>
              <MenuItem value="Jane Smith">Jane Smith</MenuItem>
              <MenuItem value="Michael Johnson">Michael Johnson</MenuItem>
              <MenuItem value="Emily Davis">Emily Davis</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Sample list of stores */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Store Address</TableCell>
              <TableCell>Store Contact</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.id}</TableCell>
                <TableCell>
                  {store.storeName}
                  <PerformanceMetrics storeName={store.storeName} />
                </TableCell>
                <TableCell>{store.storeAddress}</TableCell>
                <TableCell>{store.storeContact}</TableCell>
                <TableCell>{store.manager}</TableCell>
                <TableCell>{store.dateCreated}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details" arrow>
                    <IconButton>
                      <Eye size={20} color={COLORS.primary} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Store" arrow>
                    <IconButton>
                      <PencilLine size={20} color={COLORS.secondary} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Store" arrow>
                    <IconButton>
                      <Trash size={20} color={COLORS.error} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Store;
