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
//         delete: true,
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
//     { id: 1, name: "Store A", contact: "123-456-7890" },
//     { id: 2, name: "Customer B", contact: "987-654-3210" },
//     { id: 3, name: "Customer C", contact: "111-222-3333" },
//   ];

//   return (
//     <Box sx={{ pt: "100px", pb: "20px" }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
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

//       <Box className="flex flex-col md:flex-row gap-4 pt-10">
//         {userDetails.user_type === 0 && (
//           <Paper
//             className="flex-grow p-4 md:w-1/6"
//             sx={{
//               boxShadow: "none !important",
//               borderRadius: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "divider",
//             }}
//           >
//             <Typography variant="h6" className="mb-4">
//               Customers
//             </Typography>
//             <Box>
//               {customers.map((customer) => (
//                 <Box
//                   key={customer.id}
//                   className="mb-4 p-2 border rounded-lg"
//                   sx={{
//                     borderColor: "divider",
//                   }}
//                 >
//                   <Typography variant="body1" className="font-semibold">
//                     {customer.name}
//                   </Typography>
//                   <Typography variant="body2">{customer.contact}</Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Paper>
//         )}

//         {/* Second Column: Rows */}
//         <Box
//           className={`flex flex-col gap-4 ${
//             userDetails.user_type === 0 ? "flex-grow" : "w-full"
//           }`}
//         >
//           {/* First Row */}
//           <Paper
//             className="p-4"
//             sx={{
//               boxShadow: "none !important",
//               borderRadius: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "divider",
//             }}
//           >
//             <Typography variant="body1">This is the first row</Typography>
//           </Paper>

//           {/* Second Row */}
//           <Paper
//             className="p-4"
//             sx={{
//               boxShadow: "none !important",
//               borderRadius: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "divider",
//             }}
//           >
//             <Typography variant="body1">This is the second row</Typography>
//           </Paper>

//           {/* Third Row: User List */}
//           <TableContainer
//             component={Paper}
//             sx={{
//               maxWidth: "100%",
//               boxShadow: "none !important",
//               borderRadius: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "divider",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>User ID</TableCell>
//                   <TableCell>Username</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Created</TableCell>
//                   <TableCell>Permission Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.id}</TableCell>
//                     <TableCell>{user.username}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>{user.created}</TableCell>
//                     <TableCell>
//                       {user.permissions.read && (
//                         <Box
//                           sx={{
//                             display: "inline-block",
//                             padding: "4px 8px",
//                             border: "1px solid #4caf50",
//                             borderRadius: "5px",
//                             marginRight: "8px",
//                             backgroundColor: "#e8f5e9",
//                           }}
//                         >
//                           <span style={{ color: "#4caf50", fontWeight: "500" }}>
//                             Read
//                           </span>
//                         </Box>
//                       )}
//                       {user.permissions.write && (
//                         <Box
//                           sx={{
//                             display: "inline-block",
//                             padding: "4px 8px",
//                             border: "1px solid #ff9800",
//                             borderRadius: "5px",
//                             marginRight: "8px",
//                             backgroundColor: "#fff3e0",
//                           }}
//                         >
//                           Write
//                         </Box>
//                       )}
//                       {user.permissions.delete && (
//                         <Box
//                           sx={{
//                             display: "inline-block",
//                             padding: "4px 8px",
//                             border: "1px solid #f44336",
//                             borderRadius: "5px",
//                             backgroundColor: "#ffebee",
//                           }}
//                         >
//                           Delete
//                         </Box>
//                       )}
//                     </TableCell>
//                     <TableCell>
//                       <IconButton
//                         // onClick={}
//                         sx={{
//                           backgroundColor: "#255e53",
//                           color: "white",
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           "&:hover": {
//                             backgroundColor: "#1d4f43",
//                           },
//                         }}
//                       >
//                         <VisibilityIcon />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           backgroundColor: "#2B9DDB",
//                           color: "white",
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           "&:hover": {
//                             backgroundColor: "#1a7bb9",
//                           },
//                         }}
//                       >
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton
//                         sx={{
//                           backgroundColor: "#E53538",
//                           color: "white",
//                           borderRadius: "5px",
//                           marginRight: "8px",
//                           "&:hover": {
//                             backgroundColor: "#c72c29",
//                           },
//                         }}
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
//       </Box>
//     </Box>
//   );
// };

// export default User;

// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   IconButton,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// // } from "@mui/material";
// // import { PlusCircle } from "@phosphor-icons/react";
// // import EditIcon from "@mui/icons-material/Edit";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import VisibilityIcon from "@mui/icons-material/Visibility";
// // import useAuth from "../../../contexts/AuthContext";

// // const User = () => {
// //   const { userDetails } = useAuth();
// //   const [selectedStore, setSelectedStore] = useState(null);

// //   const users = [
// //     {
// //       id: 1,
// //       username: "johndoe",
// //       role: "Admin",
// //       created: "2024-09-01",
// //       permissionStatus: "Active",
// //       permissions: {
// //         read: true,
// //         write: true,
// //         delete: false,
// //       },
// //     },
// //     {
// //       id: 2,
// //       username: "janedoe",
// //       role: "User",
// //       created: "2024-09-02",
// //       permissionStatus: "Inactive",
// //       permissions: {
// //         read: true,
// //         write: false,
// //         delete: false,
// //       },
// //     },
// //   ];

// //   const stores = [
// //     { id: 1, name: "Store A", contact: "123-456-7890" },
// //     { id: 2, name: "Store B", contact: "987-654-3210" },
// //     { id: 3, name: "Store C", contact: "111-222-3333" },
// //   ];

// //   const handleStoreClick = (storeId) => {
// //     setSelectedStore(storeId); // Store selected store ID
// //   };

// //   const filteredUsers = selectedStore
// //     ? users.filter((user) => user.id === selectedStore) // Filter based on selected store
// //     : users;

// //   return (
// //     <Box sx={{ pt: "100px", pb: "20px" }}>
// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "space-between",
// //         }}
// //       >
// //         <Typography variant="h6" gutterBottom>
// //           User Management
// //         </Typography>
// //         <Button
// //           variant="contained"
// //           startIcon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
// //           sx={{
// //             backgroundColor: "#5787C8",
// //             borderRadius: "5px",
// //             fontWeight: 600,
// //             textTransform: "none",
// //             paddingLeft: "23px",
// //             paddingRight: "23px",
// //             fontSize: "16px",
// //             "&:hover": {
// //               backgroundColor: "#3b5c9f",
// //             },
// //           }}
// //         >
// //           Add new role
// //         </Button>
// //       </Box>

// //       <Box className="flex flex-col md:flex-row gap-4 pt-10">
// //         {/* Store List (Visible only to Admins) */}
// //         {userDetails.user_type === 0 && (
// //           <Paper
// //             className="flex-grow p-4 md:w-1/6"
// //             sx={{
// //               boxShadow: "none !important",
// //               borderRadius: "10px",
// //               borderStyle: "solid",
// //               borderWidth: "1px",
// //               borderColor: "divider",
// //             }}
// //           >
// //             <Typography variant="h6" className="mb-4">
// //               Stores
// //             </Typography>
// //             <Box>
// //               {stores.map((store) => (
// //                 <Box
// //                   key={store.id}
// //                   className="mb-4 p-2 border rounded-lg cursor-pointer"
// //                   sx={{
// //                     borderColor: "divider",
// //                     backgroundColor:
// //                       selectedStore === store.id ? "#f0f0f0" : "transparent",
// //                   }}
// //                   onClick={() => handleStoreClick(store.id)}
// //                 >
// //                   <Typography variant="body1" className="font-semibold">
// //                     {store.name}
// //                   </Typography>
// //                   <Typography variant="body2">{store.contact}</Typography>
// //                 </Box>
// //               ))}
// //             </Box>
// //           </Paper>
// //         )}

// //         {/* Second Column: Rows */}
// //         <Box
// //           className={`flex flex-col gap-4 ${
// //             userDetails.user_type === 0 ? "flex-grow" : "w-full"
// //           }`}
// //         >
// //           {/* First Row */}
// //           <Paper
// //             className="p-4"
// //             sx={{
// //               boxShadow: "none !important",
// //               borderRadius: "10px",
// //               borderStyle: "solid",
// //               borderWidth: "1px",
// //               borderColor: "divider",
// //             }}
// //           >
// //             <Typography variant="body1">This is the first row</Typography>
// //           </Paper>

// //           {/* Second Row */}
// //           <Paper
// //             className="p-4"
// //             sx={{
// //               boxShadow: "none !important",
// //               borderRadius: "10px",
// //               borderStyle: "solid",
// //               borderWidth: "1px",
// //               borderColor: "divider",
// //             }}
// //           >
// //             <Typography variant="body1">This is the second row</Typography>
// //           </Paper>

// //           {/* Third Row: User List */}
// //           <TableContainer
// //             component={Paper}
// //             sx={{
// //               maxWidth: "100%",
// //               boxShadow: "none !important",
// //               borderRadius: "10px",
// //               borderStyle: "solid",
// //               borderWidth: "1px",
// //               borderColor: "divider",
// //             }}
// //           >
// //             <Table>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>User ID</TableCell>
// //                   <TableCell>Username</TableCell>
// //                   <TableCell>Role</TableCell>
// //                   <TableCell>Created</TableCell>
// //                   <TableCell>Permission Status</TableCell>
// //                   <TableCell>Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {filteredUsers.map((user) => (
// //                   <TableRow key={user.id}>
// //                     <TableCell>{user.id}</TableCell>
// //                     <TableCell>{user.username}</TableCell>
// //                     <TableCell>{user.role}</TableCell>
// //                     <TableCell>{user.created}</TableCell>
// //                     <TableCell>
// //                       {user.permissions.read && (
// //                         <Box
// //                           sx={{
// //                             display: "inline-block",
// //                             padding: "4px 8px",
// //                             border: "1px solid #4caf50",
// //                             borderRadius: "5px",
// //                             marginRight: "8px",
// //                             backgroundColor: "#e8f5e9",
// //                           }}
// //                         >
// //                           <span style={{ color: "#4caf50", fontWeight: "500" }}>
// //                             Read
// //                           </span>
// //                         </Box>
// //                       )}
// //                       {user.permissions.write && (
// //                         <Box
// //                           sx={{
// //                             display: "inline-block",
// //                             padding: "4px 8px",
// //                             border: "1px solid #ff9800",
// //                             borderRadius: "5px",
// //                             marginRight: "8px",
// //                             backgroundColor: "#fff3e0",
// //                           }}
// //                         >
// //                           Write
// //                         </Box>
// //                       )}
// //                       {user.permissions.delete && (
// //                         <Box
// //                           sx={{
// //                             display: "inline-block",
// //                             padding: "4px 8px",
// //                             border: "1px solid #f44336",
// //                             borderRadius: "5px",
// //                             backgroundColor: "#ffebee",
// //                           }}
// //                         >
// //                           Delete
// //                         </Box>
// //                       )}
// //                     </TableCell>
// //                     <TableCell>
// //                       <IconButton
// //                         color="primary"
// //                         sx={{
// //                           border: "1px solid #5787C8",
// //                           borderRadius: "5px",
// //                           marginRight: "8px",
// //                         }}
// //                       >
// //                         <EditIcon />
// //                       </IconButton>
// //                       <IconButton
// //                         color="secondary"
// //                         sx={{
// //                           border: "1px solid #9c27b0",
// //                           borderRadius: "5px",
// //                           marginRight: "8px",
// //                         }}
// //                       >
// //                         <VisibilityIcon />
// //                       </IconButton>
// //                       <IconButton
// //                         color="error"
// //                         sx={{
// //                           border: "1px solid #f44336",
// //                           borderRadius: "5px",
// //                         }}
// //                       >
// //                         <DeleteIcon />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Box>
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default User;
import React, { useState } from "react";
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
import useAuth from "../../../contexts/AuthContext";

const User = () => {
  const { userDetails } = useAuth();
  const [selectedStore, setSelectedStore] = useState(null);

  // Example store data
  const stores = [
    { id: 1, name: "Store A", contact: "123-456-7890" },
    { id: 2, name: "Store B", contact: "987-654-3210" },
    { id: 3, name: "Store C", contact: "111-222-3333" },
  ];

  // Example user data related to stores
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
        delete: true,
      },
      storeId: 1,
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
      storeId: 2,
    },
  ];

  const handleStoreClick = (storeId) => {
    setSelectedStore(storeId);
  };

  // Filter users based on the selected store
  const filteredUsers = users.filter((user) => user.storeId === selectedStore);

  return (
    <Box sx={{ pt: "100px", pb: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom>
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

      <Box className="flex flex-col md:flex-row gap-4 pt-10">
        {/* First Column: Stores */}
        {userDetails.user_type === 0 && (
          <Paper
            className="flex-shrink-0"
            sx={{
              width: "300px", // Fixed width for the store list
              boxShadow: "none !important",
              borderRadius: "10px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
              padding: 2,
            }}
          >
            <Typography variant="h6" className="mb-4">
              Stores
            </Typography>
            <Box>
              {stores.map((store) => (
                <Box
                  key={store.id}
                  className="mb-4 p-2 border rounded-lg cursor-pointer"
                  sx={{
                    borderColor: "divider",
                    backgroundColor: "#317C78",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#255e53",
                    },
                  }}
                  onClick={() => handleStoreClick(store.id)}
                >
                  <Typography variant="body1" className="font-semibold">
                    {store.name}
                  </Typography>
                  <Typography variant="body2">{store.contact}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        )}

        {/* Second Column: User List */}
        <Box className={`flex-grow flex flex-col gap-4`}>
          {/* First Row */}
          <Paper
            className="p-4"
            sx={{
              boxShadow: "none !important",
              borderRadius: "10px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
            }}
          >
            <Typography variant="body1">
              {selectedStore
                ? `Users for Store ${selectedStore}`
                : "Select a store to view users"}
            </Typography>
          </Paper>

          {/* Second Row */}
          <Paper
            className="p-4"
            sx={{
              boxShadow: "none !important",
              borderRadius: "10px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
            }}
          >
            {/* Content of the second row */}
          </Paper>

          {/* Third Row: User List */}
          {selectedStore && (
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: "100%",
                boxShadow: "none !important",
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
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
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
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
                              border: "1px solid #4caf50",
                              borderRadius: "5px",
                              marginRight: "8px",
                              backgroundColor: "#e8f5e9",
                            }}
                          >
                            <span
                              style={{ color: "#4caf50", fontWeight: "500" }}
                            >
                              Read
                            </span>
                          </Box>
                        )}
                        {user.permissions.write && (
                          <Box
                            sx={{
                              display: "inline-block",
                              padding: "4px 8px",
                              border: "1px solid #ff9800",
                              borderRadius: "5px",
                              marginRight: "8px",
                              backgroundColor: "#fff3e0",
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
                              border: "1px solid #f44336",
                              borderRadius: "5px",
                              backgroundColor: "#ffebee",
                            }}
                          >
                            Delete
                          </Box>
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            backgroundColor: "#255e53",
                            color: "white",
                            borderRadius: "5px",
                            marginRight: "8px",
                            "&:hover": {
                              backgroundColor: "#1d4f43",
                            },
                          }}
                        >
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: "#2B9DDB",
                            color: "white",
                            borderRadius: "5px",
                            marginRight: "8px",
                            "&:hover": {
                              backgroundColor: "#1a7bb9",
                            },
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          sx={{
                            backgroundColor: "#E53538",
                            color: "white",
                            borderRadius: "5px",
                            marginRight: "8px",
                            "&:hover": {
                              backgroundColor: "#c72c29",
                            },
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default User;
