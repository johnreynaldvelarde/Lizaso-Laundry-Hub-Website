// import React, { useState, useEffect, MouseEvent } from "react";
// import useUser from "../../../hooks/admin/useUser";
// import styles from "../../../styles/style";
// import { Link } from "react-router-dom";

// import {
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   IconButton,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Box } from "@mui/system";
// import { PlusCircle } from "@phosphor-icons/react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageIcon from "@mui/icons-material/Message";
// import MoreVertIcon from "@mui/icons-material/MoreVert";

// const stores = [
//   {
//     id: 1,
//     name: "Lizaso Main Store",
//     status: "Open",
//     users: [
//       { id: 1, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 2, name: "Jane Smith", role: "Staff", status: "Offline" },
//       { id: 3, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 4, name: "Jane Smith", role: "Staff", status: "Offline" },
//       { id: 5, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 6, name: "Jane Smith", role: "Staff", status: "Offline" },
//       { id: 7, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 8, name: "Jane Smith", role: "Staff", status: "Offline" },
//       { id: 9, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 10, name: "Jane Smith", role: "Staff", status: "Offline" },
//       { id: 11, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 12, name: "Jane Smith", role: "Staff", status: "Offline" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Lizaso Branch Store",
//     status: "Closed",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff", status: "Online" },
//       { id: 4, name: "Michael Brown", role: "Delivery", status: "Offline" },
//     ],
//   },
// ];

// const User = () => {
//   const { userData, fetchUserData, getUserRole, getUserisOnline } = useUser();
//   const [selectedStore, setSelectedStore] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [currentUserId, setCurrentUserId] = useState(null);

//   useEffect(() => {
//     fetchUserData();
//   }, [fetchUserData]);

//   const handleStoreClick = (store) => {
//     setSelectedStore(store);
//   };

//   const handleDeleteStore = (storeId, event) => {
//     event.stopPropagation(); // Prevent row click event
//     // Logic to delete the store
//     console.log(`Store with ID ${storeId} deleted`);
//   };

//   const handleSendMessage = (userId) => {
//     // Logic to send a message to the user
//     console.log(`Message sent to User ID ${userId}`);
//   };

//   const handleClick = (event, userId) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentUserId(userId);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <Box sx={{ pt: "100px", pb: "20px" }}>
//       {/* First Row */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: "20px",
//         }}
//       >
//         {/* <Paper
//           sx={{
//             boxShadow: "none !important",
//             borderRadius: "12px",
//             borderStyle: "solid",
//             borderWidth: "1px",
//             borderColor: "divider",
//             p: "20px",
//           }}
//         >
//           <Typography variant="h6" className="text-center">
//             Store Selection
//           </Typography>
//         </Paper> */}
//         <Typography variant="h6">User Management</Typography>
//         <Link to="/main/add-user" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             startIcon={
//               <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
//             }
//             sx={{
//               backgroundColor: "#5787C8",
//               borderRadius: "5px",
//               fontWeight: 600,
//               textTransform: "none",
//               paddingLeft: "23px",
//               paddingRight: "23px",
//               fontSize: "16px",
//               "&:hover": {
//                 backgroundColor: "#3b5c9f",
//               },
//             }}
//           >
//             Add User
//           </Button>
//         </Link>
//       </Box>

//       {/* Second Row with Two Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Column 1: List of Stores */}
//         <Box>
//           <Typography variant="h6" className="text-center mb-4">
//             Stores
//           </Typography>
//           <TableContainer
//             component={Paper}
//             sx={{
//               boxShadow: "none !important",
//               borderRadius: "12px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "divider",
//             }}
//           >
//             <Table>
//               <TableHead
//                 sx={{
//                   backgroundColor: "#F1F1F1", // Background color for the table head
//                 }}
//               >
//                 <TableRow>
//                   <TableCell>
//                     <Typography
//                       variant="subtitle1"
//                       sx={{
//                         fontWeight: "500",
//                         color: styles.textColor2,
//                       }}
//                     >
//                       Name
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     {" "}
//                     <Typography
//                       variant="subtitle1"
//                       sx={{ fontWeight: "500", color: styles.textColor2 }}
//                     >
//                       Status
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     {" "}
//                     <Typography
//                       variant="subtitle1"
//                       sx={{ fontWeight: "500", color: styles.textColor2 }}
//                     >
//                       Actions
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {userData.map((store) => (
//                   <TableRow
//                     key={store.store_id}
//                     hover
//                     onClick={() => handleStoreClick(store)}
//                     className="cursor-pointer"
//                   >
//                     <TableCell>{store.store_name}</TableCell>
//                     <TableCell>{store.isStatus ? "Open" : "Closed"}</TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="error"
//                         onClick={(e) => handleDeleteStore(store.store_id, e)}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Column 2: List of Users */}
//         <Box>
//           <Typography variant="h6" className="text-center mb-4">
//             Users
//           </Typography>
//           {selectedStore ? (
//             <TableContainer
//               component={Paper}
//               sx={{
//                 boxShadow: "none !important",
//                 borderRadius: "12px",
//                 borderStyle: "solid",
//                 borderWidth: "1px",
//                 borderColor: "divider",
//               }}
//             >
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Role</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {selectedStore.users.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell>
//                         {user.first_name} {user.last_name}
//                       </TableCell>
//                       <TableCell>{getUserRole(user.isRole)}</TableCell>
//                       <TableCell>
//                         <Typography
//                           className={`text-center ${
//                             user.status === "Online"
//                               ? "text-green-500"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {getUserisOnline(user.isOnline)}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <IconButton onClick={(e) => handleClick(e, user.id)}>
//                           <MoreVertIcon />
//                         </IconButton>
//                         <Menu
//                           anchorEl={anchorEl}
//                           open={Boolean(anchorEl && currentUserId === user.id)}
//                           onClose={handleClose}
//                         >
//                           <MenuItem
//                             onClick={() => {
//                               handleSendMessage(user.id);
//                               handleClose();
//                             }}
//                           >
//                             <MessageIcon /> &nbsp; Message
//                           </MenuItem>
//                           <MenuItem
//                             onClick={() => {
//                               // Logic to delete the user
//                               console.log(`User with ID ${user.id} deleted`);
//                               handleClose();
//                             }}
//                           >
//                             <DeleteIcon /> &nbsp; Delete
//                           </MenuItem>
//                         </Menu>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <Typography className="text-center">
//               Select a store to view users
//             </Typography>
//           )}
//         </Box>
//       </div>
//     </Box>
//   );
// };

// export default User;

// import React from "react";
// import { Box, Grid, Paper } from "@mui/material";

// const User = () => {
//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: 1 }}>
//       <Grid container spacing={2}>
//         {/* First Column - Now takes 4/12 of the width */}
//         <Grid
//           item
//           xs={12}
//           md={4}
//           sx={{
//             height: "100%",
//           }}
//         >
//           <Paper
//             sx={{
//               padding: 2,
//               boxShadow: "none !important",
//               borderRadius: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "divider",
//             }}
//           >
//             {/* Content for the first column */}
//             First Column Content
//           </Paper>
//         </Grid>

//         {/* Second Column - Takes the remaining 8/12 of the width */}
//         <Grid item xs={12} md={8}>
//           {" "}
//           {/* Increased width to 8/12 */}
//           {/* First Row of Second Column */}
//           <Box
//             sx={{
//               backgroundColor: "#e0e0e0",
//               height: "calc(50% - 8px)", // Adjust height for two rows with spacing
//               padding: 2,
//               mb: 2,
//             }}
//           >
//             {/* Content for first row */}
//             Second Column, First Row Content
//           </Box>
//           {/* Second Row of Second Column */}
//           <Box
//             sx={{
//               backgroundColor: "#e0e0e0",
//               height: "calc(50% - 8px)", // Adjust height for second row
//               padding: 2,
//             }}
//           >
//             {/* Content for second row */}
//             Second Column, Second Row Content
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default User;

// import React from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const users = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   // Add more users as needed
// ];

// const User = () => {
//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: 1 }}>
//       <Typography variant="h4" gutterBottom>
//         User Management
//       </Typography>
//       <Grid container spacing={3}>
//         {users.map((user) => (
//           <Grid item xs={12} sm={6} md={4} key={user.id}>
//             <Paper elevation={3} sx={{ padding: "16px", borderRadius: "12px" }}>
//               <Typography variant="h6">{user.name}</Typography>
//               <Typography variant="body1">{user.email}</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Role: {user.role}
//               </Typography>
//               <Box mt={2} display="flex" justifyContent="space-between">
//                 <IconButton color="primary">
//                   <EditIcon />
//                 </IconButton>
//                 <IconButton color="secondary">
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
//       <Box mt={4}>
//         <Button variant="contained" color="primary">
//           Add New User
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default User;

// import React from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
// } from "@mui/material";
// import { PlusCircle } from "@phosphor-icons/react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const stores = [
//   { id: 1, name: "Store 1", address: "123 Main St" },
//   { id: 2, name: "Store 2", address: "456 Maple Ave" },
//   { id: 3, name: "Store 3", address: "789 Oak Dr" },
//   { id: 4, name: "Store 4", address: "101 Pine Ln" },
//   { id: 5, name: "Store 5", address: "202 Cedar St" },
//   // Add more stores as needed
// ];

// const users = [
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
//   // Add more users as needed
// ];

// const User = () => {
//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: 1 }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: "50px",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           User Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
//           sx={{
//             backgroundColor: "#5787C8",
//             borderRadius: "5px",
//             fontWeight: 600,
//             textTransform: "none",
//             paddingLeft: "23px",
//             paddingRight: "23px",
//             fontSize: "16px",
//             "&:hover": {
//               backgroundColor: "#3b5c9f",
//             },
//           }}
//         >
//           Add new role
//         </Button>
//       </Box>
//       {/* Grid Container for Two Columns */}
//       <Grid container spacing={3}>
//         {/* First Column - Stores and Users Section */}
//         <Grid item xs={12} md={6}>
//           {/* Stores Section */}
//           <Typography variant="h5" gutterBottom>
//             Stores
//           </Typography>
//           <Box
//             sx={{
//               overflowX: "auto",
//               whiteSpace: "nowrap",
//               mb: 4,
//               padding: "8px 0",
//             }}
//           >
//             <Box sx={{ display: "inline-flex" }}>
//               {stores.map((store) => (
//                 <Paper
//                   key={store.id}
//                   elevation={3}
//                   sx={{
//                     padding: "16px",
//                     borderRadius: "12px",
//                     marginRight: 2, // Space between cards
//                     minWidth: "200px", // Ensure a minimum width for each card
//                     flexShrink: 0, // Prevent shrinking of cards
//                   }}
//                 >
//                   <Typography variant="h6">{store.name}</Typography>
//                   <Typography variant="body1">{store.address}</Typography>
//                 </Paper>
//               ))}
//             </Box>
//           </Box>

//           {/* Users Section */}
//           <Typography variant="h5" gutterBottom>
//             Users
//           </Typography>
//           <Box>
//             {users.map((user) => (
//               <Paper
//                 key={user.id}
//                 elevation={1}
//                 sx={{
//                   padding: "16px",
//                   borderRadius: "12px",
//                   mb: 2,
//                   boxShadow: "none !important",
//                   borderRadius: "10px",
//                   borderStyle: "solid",
//                   borderWidth: "1px",
//                   borderColor: "divider",
//                 }}
//               >
//                 <Typography variant="h6">{user.name}</Typography>
//                 <Typography variant="body1">{user.email}</Typography>
//                 <Typography variant="body2" color="textSecondary">
//                   Role: {user.role}
//                 </Typography>
//                 <Box mt={2} display="flex" justifyContent="space-between">
//                   <IconButton color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="secondary">
//                     <DeleteIcon />
//                   </IconButton>
//                 </Box>
//               </Paper>
//             ))}
//           </Box>
//         </Grid>

//         {/* Second Column - Empty or Reserved for Future Content */}
//         <Grid item xs={12} md={6}>
//           {/* Empty or Reserved for Future Content */}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default User;

// import React from "react";
// import {
//   Box,
//   Grid,
//   Typography,
//   Button,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { PlusCircle } from "@phosphor-icons/react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const User = () => {
//   // Sample user data
//   const users = [
//     {
//       id: 1,
//       username: "johndoe",
//       role: "Admin",
//       created: "2024-09-01",
//       permissionStatus: "Active",
//     },
//     {
//       id: 2,
//       username: "janedoe",
//       role: "User",
//       created: "2024-09-02",
//       permissionStatus: "Inactive",
//     },
//   ];

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: 1 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: "50px",
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           User Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
//           sx={{
//             backgroundColor: "#5787C8",
//             borderRadius: "5px",
//             fontWeight: 600,
//             textTransform: "none",
//             paddingLeft: "23px",
//             paddingRight: "23px",
//             fontSize: "16px",
//             "&:hover": {
//               backgroundColor: "#3b5c9f",
//             },
//           }}
//         >
//           Add new role
//         </Button>
//       </Box>

//       {/* User Table */}
//       <TableContainer component={Paper} sx={{ maxWidth: "100%" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>User ID</TableCell>
//               <TableCell>Username</TableCell>
//               <TableCell>Role</TableCell>
//               <TableCell>Created</TableCell>
//               <TableCell>Permission Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.username}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.created}</TableCell>
//                 <TableCell>{user.permissionStatus}</TableCell>
//                 <TableCell>
//                   <IconButton color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton color="secondary">
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default User;

import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { PlusCircle } from "@phosphor-icons/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const User = () => {
  const users = [
    {
      id: 1,
      username: "johndoe",
      role: "Admin",
      created: "2024-09-01",
      permissionStatus: "Active",
      permissions: {
        read: true,
        write: true,
        delete: false,
      },
    },
    {
      id: 2,
      username: "janedoe",
      role: "User",
      created: "2024-09-02",
      permissionStatus: "Inactive",
      permissions: {
        read: true,
        write: false,
        delete: false,
      },
    },
  ];

  return (
    <Box sx={{ pt: "100px", pb: "20px", px: 1 }}>
      {/* First Row: Header and Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 600,
            textTransform: "none",
            paddingLeft: "23px",
            paddingRight: "23px",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#3b5c9f",
            },
          }}
        >
          Add new role
        </Button>
      </Box>

      <Paper
        sx={{
          padding: 2,
          boxShadow: "none !important",
          borderRadius: "10px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          marginBottom: "20px",
        }}
        className="flex justify-between items-center"
      >
        <Typography variant="body1">This is the first row</Typography>
      </Paper>

      {/* Second Row: User List */}
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "100%",
            boxShadow: "none !important",
            borderRadius: "10px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            marginBottom: "20px",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Permission Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.created}</TableCell>
                  <TableCell>
                    {user.permissions.read && (
                      <Box
                        sx={{
                          display: "inline-block",
                          padding: "4px 8px",
                          border: "1px solid #4caf50", // Green border for 'Read'
                          borderRadius: "5px",
                          marginRight: "8px",
                          backgroundColor: "#e8f5e9", // Light green background (optional)
                        }}
                      >
                        Read
                      </Box>
                    )}
                    {user.permissions.write && (
                      <Box
                        sx={{
                          display: "inline-block",
                          padding: "4px 8px",
                          border: "1px solid #ff9800", // Orange border for 'Write'
                          borderRadius: "5px",
                          marginRight: "8px",
                          backgroundColor: "#fff3e0", // Light orange background (optional)
                        }}
                      >
                        Write
                      </Box>
                    )}
                    {user.permissions.delete && (
                      <Box
                        sx={{
                          display: "inline-block",
                          padding: "4px 8px",
                          border: "1px solid #f44336", // Red border for 'Delete'
                          borderRadius: "5px",
                          backgroundColor: "#ffebee", // Light red background (optional)
                        }}
                      >
                        Delete
                      </Box>
                    )}
                  </TableCell>

                  {/* <TableCell>{user.permissionStatus}</TableCell> */}
                  {/* <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell> */}
                  <TableCell>
                    <IconButton
                      color="primary"
                      sx={{
                        border: "1px solid #5787C8", // Border color for Edit button
                        borderRadius: "5px", // Optional: Border radius for rounded corners
                        marginRight: "8px", // Add some spacing between buttons
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      sx={{
                        border: "1px solid #9c27b0", // Border color for View button (secondary color)
                        borderRadius: "5px",
                        marginRight: "8px",
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      sx={{
                        border: "1px solid #f44336", // Border color for Delete button (error color)
                        borderRadius: "5px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default User;
