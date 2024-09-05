import React, { useState, useEffect, MouseEvent } from "react";
import useUser from "../../../hooks/admin/useUser";
import styles from "../../../styles/style";
import { Link } from "react-router-dom";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import { PlusCircle } from "@phosphor-icons/react";
import DeleteIcon from "@mui/icons-material/Delete";
import MessageIcon from "@mui/icons-material/Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const stores = [
  {
    id: 1,
    name: "Lizaso Main Store",
    status: "Open",
    users: [
      { id: 1, name: "John Doe", role: "Manager", status: "Online" },
      { id: 2, name: "Jane Smith", role: "Staff", status: "Offline" },
      { id: 3, name: "John Doe", role: "Manager", status: "Online" },
      { id: 4, name: "Jane Smith", role: "Staff", status: "Offline" },
      { id: 5, name: "John Doe", role: "Manager", status: "Online" },
      { id: 6, name: "Jane Smith", role: "Staff", status: "Offline" },
      { id: 7, name: "John Doe", role: "Manager", status: "Online" },
      { id: 8, name: "Jane Smith", role: "Staff", status: "Offline" },
      { id: 9, name: "John Doe", role: "Manager", status: "Online" },
      { id: 10, name: "Jane Smith", role: "Staff", status: "Offline" },
      { id: 11, name: "John Doe", role: "Manager", status: "Online" },
      { id: 12, name: "Jane Smith", role: "Staff", status: "Offline" },
    ],
  },
  {
    id: 2,
    name: "Lizaso Branch Store",
    status: "Closed",
    users: [
      { id: 3, name: "Emily Johnson", role: "Staff", status: "Online" },
      { id: 4, name: "Michael Brown", role: "Delivery", status: "Offline" },
    ],
  },
];

const User = () => {
  const { userData, fetchUserData, getUserRole, getUserisOnline } = useUser();
  const [selectedStore, setSelectedStore] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  const handleDeleteStore = (storeId, event) => {
    event.stopPropagation(); // Prevent row click event
    // Logic to delete the store
    console.log(`Store with ID ${storeId} deleted`);
  };

  const handleSendMessage = (userId) => {
    // Logic to send a message to the user
    console.log(`Message sent to User ID ${userId}`);
  };

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setCurrentUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box sx={{ pt: "100px", pb: "20px" }}>
      {/* First Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {/* <Paper
          sx={{
            boxShadow: "none !important",
            borderRadius: "12px",
            borderStyle: "solid",
            borderWidth: "1px",
            borderColor: "divider",
            p: "20px",
          }}
        >
          <Typography variant="h6" className="text-center">
            Store Selection
          </Typography>
        </Paper> */}
        <Typography variant="h6">User Management</Typography>
        <Link to="/main/add-user" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={
              <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
            }
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
            Add User
          </Button>
        </Link>
      </Box>

      {/* Second Row with Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Column 1: List of Stores */}
        <Box>
          <Typography variant="h6" className="text-center mb-4">
            Stores
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none !important",
              borderRadius: "12px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
            }}
          >
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "#F1F1F1", // Background color for the table head
                }}
              >
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: "500",
                        color: styles.textColor2,
                      }}
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "500", color: styles.textColor2 }}
                    >
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "500", color: styles.textColor2 }}
                    >
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((store) => (
                  <TableRow
                    key={store.store_id}
                    hover
                    onClick={() => handleStoreClick(store)}
                    className="cursor-pointer"
                  >
                    <TableCell>{store.store_name}</TableCell>
                    <TableCell>{store.isStatus ? "Open" : "Closed"}</TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={(e) => handleDeleteStore(store.store_id, e)}
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

        {/* Column 2: List of Users */}
        <Box>
          <Typography variant="h6" className="text-center mb-4">
            Users
          </Typography>
          {selectedStore ? (
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedStore.users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        {user.first_name} {user.last_name}
                      </TableCell>
                      <TableCell>{getUserRole(user.isRole)}</TableCell>
                      <TableCell>
                        <Typography
                          className={`text-center ${
                            user.status === "Online"
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        >
                          {getUserisOnline(user.isOnline)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={(e) => handleClick(e, user.id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl && currentUserId === user.id)}
                          onClose={handleClose}
                        >
                          <MenuItem
                            onClick={() => {
                              handleSendMessage(user.id);
                              handleClose();
                            }}
                          >
                            <MessageIcon /> &nbsp; Message
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              // Logic to delete the user
                              console.log(`User with ID ${user.id} deleted`);
                              handleClose();
                            }}
                          >
                            <DeleteIcon /> &nbsp; Delete
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography className="text-center">
              Select a store to view users
            </Typography>
          )}
        </Box>
      </div>
    </Box>
  );
};

export default User;

{
  /* <div className="pt-20 pb-5 p-4"></div>; */
}

// import React, { useState } from "react";
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
// } from "@mui/material";
// import { Box } from "@mui/system";
// import DeleteIcon from "@mui/icons-material/Delete";
// import MessageIcon from "@mui/icons-material/Message";

// const stores = [
//   {
//     id: 1,
//     name: "Lizaso Main Store",
//     status: "Open",
//     users: [
//       { id: 1, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 2, name: "Jane Smith", role: "Staff", status: "Offline" },
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
//   const [selectedStore, setSelectedStore] = useState(null);

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

//   return (
//     <div className="pt-20 pb-5 p-4">
//       {/* First Row */}
//       <Box className="mb-4">
//         <Paper elevation={3} className="p-4">
//           <Typography variant="h6" className="text-center">
//             Store Selection
//           </Typography>
//         </Paper>
//       </Box>

//       {/* Second Row with Two Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Column 1: List of Stores */}
//         <Box className="p-2">
//           <Typography variant="h6" className="text-center mb-4">
//             Stores
//           </Typography>
//           <TableContainer component={Paper} elevation={3}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {stores.map((store) => (
//                   <TableRow
//                     key={store.id}
//                     hover
//                     onClick={() => handleStoreClick(store)}
//                     className="cursor-pointer"
//                   >
//                     <TableCell>{store.name}</TableCell>
//                     <TableCell>
//                       <Typography
//                         className={`text-center ${
//                           store.status === "Open"
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {store.status}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <IconButton
//                         color="error"
//                         onClick={(e) => handleDeleteStore(store.id, e)}
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
//         <Box className="p-2">
//           <Typography variant="h6" className="text-center mb-4">
//             Users
//           </Typography>
//           {selectedStore ? (
//             <TableContainer component={Paper} elevation={3}>
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
//                       <TableCell>{user.name}</TableCell>
//                       <TableCell>{user.role}</TableCell>
//                       <TableCell>
//                         <Typography
//                           className={`text-center ${
//                             user.status === "Online"
//                               ? "text-green-500"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {user.status}
//                         </Typography>
//                       </TableCell>
//                       <TableCell>
//                         <IconButton
//                           color="primary"
//                           onClick={() => handleSendMessage(user.id)}
//                         >
//                           <MessageIcon />
//                         </IconButton>
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
//     </div>
//   );
// };

// export default User;

// import React, { useState } from "react";
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
// } from "@mui/material";
// import { Box } from "@mui/system";

// const stores = [
//   {
//     id: 1,
//     name: "Lizaso Main Store",
//     status: "Open",
//     users: [
//       { id: 1, name: "John Doe", role: "Manager", status: "Online" },
//       { id: 2, name: "Jane Smith", role: "Staff", status: "Offline" },
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
//   {
//     id: 3,
//     name: "Lizaso Branch Store",
//     status: "Closed",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff", status: "Online" },
//       { id: 4, name: "Michael Brown", role: "Delivery", status: "Offline" },
//     ],
//   },
//   {
//     id: 4,
//     name: "Lizaso Branch Store",
//     status: "Closed",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff", status: "Online" },
//       { id: 4, name: "Michael Brown", role: "Delivery", status: "Offline" },
//     ],
//   },
//   {
//     id: 5,
//     name: "Lizaso Branch Store",
//     status: "Closed",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff", status: "Online" },
//       { id: 4, name: "Michael Brown", role: "Delivery", status: "Offline" },
//     ],
//   },
//   {
//     id: 6,
//     name: "Lizaso Branch Store",
//     status: "Closed",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff", status: "Online" },
//       { id: 4, name: "Michael Brown", role: "Delivery", status: "Offline" },
//     ],
//   },
// ];

// const User = () => {
//   const [selectedStore, setSelectedStore] = useState(null);

//   const handleStoreClick = (store) => {
//     setSelectedStore(store);
//   };

//   const handleDeleteStore = (storeId, event) => {
//     event.stopPropagation(); // Prevent row click event
//     // Logic to delete the store
//     console.log(`Store with ID ${storeId} deleted`);
//   };

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Box className="mb-4">
//         <Paper className="p-4">
//           <Typography variant="h6" className="text-center">
//             Store Selection
//           </Typography>
//         </Paper>
//       </Box>

//       {/* Second Row with Two Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Column 1: List of Stores */}
//         <Box className="p-2">
//           <Typography variant="h6" className="text-center mb-4">
//             Stores
//           </Typography>
//           <TableContainer component={Paper} elevation={3}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {stores.map((store) => (
//                   <TableRow
//                     key={store.id}
//                     hover
//                     onClick={() => handleStoreClick(store)}
//                     className="cursor-pointer"
//                   >
//                     <TableCell>{store.name}</TableCell>
//                     <TableCell>
//                       <Typography
//                         className={`text-center ${
//                           store.status === "Open"
//                             ? "text-green-500"
//                             : "text-red-500"
//                         }`}
//                       >
//                         {store.status}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="error"
//                         onClick={(e) => handleDeleteStore(store.id, e)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>

//         {/* Column 2: List of Users */}
//         <Box className="p-2">
//           <Typography variant="h6" className="text-center mb-4">
//             Users
//           </Typography>
//           {selectedStore ? (
//             <TableContainer component={Paper} elevation={3}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Role</TableCell>
//                     <TableCell>Status</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {selectedStore.users.map((user) => (
//                     <TableRow key={user.id}>
//                       <TableCell>{user.name}</TableCell>
//                       <TableCell>{user.role}</TableCell>
//                       <TableCell>
//                         <Typography
//                           className={`text-center ${
//                             user.status === "Online"
//                               ? "text-green-500"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {user.status}
//                         </Typography>
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
//     // <div className="pt-20 pb-5 p-4">

//     // </div>
//   );
// };

// export default User;

// import React, { useState } from "react";
// import {
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { Box } from "@mui/system";

// const stores = [
//   {
//     id: 1,
//     name: "Lizaso Main Store",
//     users: [
//       { id: 1, name: "John Doe", role: "Manager" },
//       { id: 2, name: "Jane Smith", role: "Staff" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Lizaso Branch Store",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff" },
//       { id: 4, name: "Michael Brown", role: "Delivery" },
//     ],
//   },
// ];

// const User = () => {
//   const [selectedStore, setSelectedStore] = useState(null);

//   const handleStoreClick = (store) => {
//     setSelectedStore(store);
//   };

//   return (
//     <div className="pt-20 pb-5 p-4">
//       {/* First Row */}
//       <div className="bg-blue-300 h-40 mb-4 flex items-center justify-center">
//         <Typography variant="h6" className="text-white font-bold">
//           Store Selection
//         </Typography>
//       </div>

//       {/* Second Row with Two Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {/* Column 1: List of Stores */}
//         <Box className="bg-green-300 h-40 p-4">
//           <Typography
//             variant="h6"
//             className="text-center text-white font-bold mb-4"
//           >
//             Stores
//           </Typography>
//           <List>
//             {stores.map((store) => (
//               <ListItem
//                 button
//                 key={store.id}
//                 onClick={() => handleStoreClick(store)}
//               >
//                 <ListItemText primary={store.name} className="text-white" />
//               </ListItem>
//             ))}
//           </List>
//         </Box>

//         {/* Column 2: List of Users */}
//         <Box className="bg-red-300 h-40 p-4">
//           <Typography
//             variant="h6"
//             className="text-center text-white font-bold mb-4"
//           >
//             Users
//           </Typography>
//           {selectedStore ? (
//             <List>
//               {selectedStore.users.map((user) => (
//                 <ListItem key={user.id}>
//                   <ListItemText
//                     primary={`${user.name} (${user.role})`}
//                     className="text-white"
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           ) : (
//             <Typography className="text-center text-white">
//               Select a store to view users
//             </Typography>
//           )}
//         </Box>
//       </div>
//     </div>
//   );
// };

// export default User;

// import React from "react";

// const stores = [
//   {
//     id: 1,
//     name: "Lizaso Main Store",
//     users: [
//       { id: 1, name: "John Doe", role: "Manager" },
//       { id: 2, name: "Jane Smith", role: "Staff" },
//     ],
//   },
//   {
//     id: 2,
//     name: "Lizaso Branch Store",
//     users: [
//       { id: 3, name: "Emily Johnson", role: "Staff" },
//       { id: 4, name: "Michael Brown", role: "Delivery" },
//     ],
//   },
// ];

// const User = () => {
//   return (
//     <div className="pt-20 pb-5 p-4">
//       {/* First Row */}
//       <div className="bg-blue-300 h-40 mb-4">
//         <p className="text-center text-white font-bold">First Row</p>
//       </div>

//       {/* Second Row with Two Columns */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-green-300 h-40">
//           <p className="text-center text-white font-bold">Column 1</p>
//         </div>
//         <div className="bg-red-300 h-40">
//           <p className="text-center text-white font-bold">Column 2</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default User;
{
  /* {stores.map((store) => (
        <div key={store.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{store.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.users.map((user) => (
              <div
                key={user.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            ))}
          </div>
        </div>
      ))} */
}
