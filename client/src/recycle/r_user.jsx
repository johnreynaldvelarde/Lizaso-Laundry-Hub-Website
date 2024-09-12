{
  /* <Box
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
        </Box> */
}
// import React from "react";
// import {
//   Box,
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
//   const users = [
//     {
//       id: 1,
//       username: "johndoe",
//       role: "Admin",
//       created: "2024-09-01",
//       permissionStatus: "Active",
//       permissions: {
//         read: true,
//         write: true,
//         delete: false,
//       },
//     },
//     {
//       id: 2,
//       username: "janedoe",
//       role: "User",
//       created: "2024-09-02",
//       permissionStatus: "Inactive",
//       permissions: {
//         read: true,
//         write: false,
//         delete: false,
//       },
//     },
//   ];

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: 1 }}>
//       <Paper
//         sx={{
//           padding: 2,
//           boxShadow: "none !important",
//           borderRadius: "10px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           marginBottom: "20px",
//         }}
//         className="flex justify-between items-center"
//       >
//         <Typography variant="body1">This is the first row</Typography>
//       </Paper>

//       <Paper
//         sx={{
//           padding: 2,
//           boxShadow: "none !important",
//           borderRadius: "10px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           marginBottom: "20px",
//         }}
//         className="flex justify-between items-center"
//       >
//         <Typography variant="body1">This is the second row</Typography>
//       </Paper>

//       {/* Third Row: User List */}
//       <Box>
//         <TableContainer
//           component={Paper}
//           sx={{
//             maxWidth: "100%",
//             boxShadow: "none !important",
//             borderRadius: "10px",
//             borderStyle: "solid",
//             borderWidth: "1px",
//             borderColor: "divider",
//             marginBottom: "20px",
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>Username</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Created</TableCell>
//                 <TableCell>Permission Status</TableCell>
//                 <TableCell></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.username}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>{user.created}</TableCell>
//                   <TableCell>
//                     {user.permissions.read && (
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           padding: "4px 8px",
//                           border: "1px solid #4caf50", // Green border for 'Read'
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           backgroundColor: "#e8f5e9", // Light green background (optional)
//                         }}
//                       >
//                         <span style={{ color: "#4caf50", fontWeight: "500" }}>
//                           Read
//                         </span>
//                       </Box>
//                     )}
//                     {user.permissions.write && (
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           padding: "4px 8px",
//                           border: "1px solid #ff9800", // Orange border for 'Write'
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           backgroundColor: "#fff3e0", // Light orange background (optional)
//                         }}
//                       >
//                         Write
//                       </Box>
//                     )}
//                     {user.permissions.delete && (
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           padding: "4px 8px",
//                           border: "1px solid #f44336", // Red border for 'Delete'
//                           borderRadius: "5px",
//                           backgroundColor: "#ffebee", // Light red background (optional)
//                         }}
//                       >
//                         Delete
//                       </Box>
//                     )}
//                   </TableCell>

//                   {/* <TableCell>{user.permissionStatus}</TableCell> */}
//                   {/* <TableCell>
//                     <IconButton color="primary">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton color="secondary">
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton color="error">
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell> */}
//                   <TableCell>
//                     <IconButton
//                       color="primary"
//                       sx={{
//                         border: "1px solid #5787C8",
//                         borderRadius: "5px",
//                         marginRight: "8px",
//                       }}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       color="secondary"
//                       sx={{
//                         border: "1px solid #9c27b0", // Border color for View button (secondary color)
//                         borderRadius: "5px",
//                         marginRight: "8px",
//                       }}
//                     >
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton
//                       color="error"
//                       sx={{
//                         border: "1px solid #f44336", // Border color for Delete button (error color)
//                         borderRadius: "5px",
//                       }}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default User;
// import React from "react";
// import {
//   Box,
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
// import useAuth from "../../../contexts/AuthContext";

// const User = () => {
//   const { userDetails } = useAuth();
//   console.log(userDetails.user_type);
//   const users = [
//     {
//       id: 1,
//       username: "johndoe",
//       role: "Admin",
//       created: "2024-09-01",
//       permissionStatus: "Active",
//       permissions: {
//         read: true,
//         write: true,
//         delete: false,
//       },
//     },
//     {
//       id: 2,
//       username: "janedoe",
//       role: "User",
//       created: "2024-09-02",
//       permissionStatus: "Inactive",
//       permissions: {
//         read: true,
//         write: false,
//         delete: false,
//       },
//     },
//   ];

//   const customers = [
//     { id: 1, name: "Customer A", contact: "123-456-7890" },
//     { id: 2, name: "Customer B", contact: "987-654-3210" },
//   ];

//   return (
//     <Box className="flex flex-col md:flex-row gap-4 pt-20 px-4">
//       {/* Left Column: Customer List */}
//       <Paper
//         className="flex-grow p-4 md:w-1/3"
//         sx={{
//           boxShadow: "none !important",
//           borderRadius: "10px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//         }}
//       >
//         <Typography variant="h6" className="mb-4">
//           Customers
//         </Typography>
//         <Box>
//           {customers.map((customer) => (
//             <Box
//               key={customer.id}
//               className="mb-4 p-2 border rounded-lg"
//               sx={{
//                 borderColor: "divider",
//               }}
//             >
//               <Typography variant="body1" className="font-semibold">
//                 {customer.name}
//               </Typography>
//               <Typography variant="body2">{customer.contact}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </Paper>

//       {/* Right Column: Rows */}
//       <Box className="flex flex-col gap-4 flex-grow">
//         {/* First Row */}
//         <Paper
//           className="p-4"
//           sx={{
//             boxShadow: "none !important",
//             borderRadius: "10px",
//             borderStyle: "solid",
//             borderWidth: "1px",
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="body1">This is the first row</Typography>
//         </Paper>

//         {/* Second Row */}
//         <Paper
//           className="p-4"
//           sx={{
//             boxShadow: "none !important",
//             borderRadius: "10px",
//             borderStyle: "solid",
//             borderWidth: "1px",
//             borderColor: "divider",
//           }}
//         >
//           <Typography variant="body1">This is the second row</Typography>
//         </Paper>

//         {/* Third Row: User List */}
//         <TableContainer
//           component={Paper}
//           sx={{
//             maxWidth: "100%",
//             boxShadow: "none !important",
//             borderRadius: "10px",
//             borderStyle: "solid",
//             borderWidth: "1px",
//             borderColor: "divider",
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>User ID</TableCell>
//                 <TableCell>Username</TableCell>
//                 <TableCell>Role</TableCell>
//                 <TableCell>Created</TableCell>
//                 <TableCell>Permission Status</TableCell>
//                 <TableCell>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id}>
//                   <TableCell>{user.id}</TableCell>
//                   <TableCell>{user.username}</TableCell>
//                   <TableCell>{user.role}</TableCell>
//                   <TableCell>{user.created}</TableCell>
//                   <TableCell>
//                     {user.permissions.read && (
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           padding: "4px 8px",
//                           border: "1px solid #4caf50",
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           backgroundColor: "#e8f5e9",
//                         }}
//                       >
//                         <span style={{ color: "#4caf50", fontWeight: "500" }}>
//                           Read
//                         </span>
//                       </Box>
//                     )}
//                     {user.permissions.write && (
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           padding: "4px 8px",
//                           border: "1px solid #ff9800",
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           backgroundColor: "#fff3e0",
//                         }}
//                       >
//                         Write
//                       </Box>
//                     )}
//                     {user.permissions.delete && (
//                       <Box
//                         sx={{
//                           display: "inline-block",
//                           padding: "4px 8px",
//                           border: "1px solid #f44336",
//                           borderRadius: "5px",
//                           backgroundColor: "#ffebee",
//                         }}
//                       >
//                         Delete
//                       </Box>
//                     )}
//                   </TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="primary"
//                       sx={{
//                         border: "1px solid #5787C8",
//                         borderRadius: "5px",
//                         marginRight: "8px",
//                       }}
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       color="secondary"
//                       sx={{
//                         border: "1px solid #9c27b0",
//                         borderRadius: "5px",
//                         marginRight: "8px",
//                       }}
//                     >
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton
//                       color="error"
//                       sx={{
//                         border: "1px solid #f44336",
//                         borderRadius: "5px",
//                       }}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default User;
