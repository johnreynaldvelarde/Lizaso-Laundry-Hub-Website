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
  Checkbox,
  TablePagination,
  Snackbar,
  Alert,
  colors,
  Divider,
  Select,
  MenuItem,
} from "@mui/material";
import { PlusCircle } from "@phosphor-icons/react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { COLORS } from "../../../constants/color";

const User = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      role: "Admin",
      store: "LIZASO Main",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "janesmith@example.com",
      role: "Manager",
      store: "LIZASO Branch 1",
    },
    {
      id: 3,
      name: "Mark Johnson",
      email: "markjohnson@example.com",
      role: "Employee",
      store: "LIZASO Branch 2",
    },
  ]);

  const [roles] = useState(["Admin", "Manager", "Employee"]);
  const [stores] = useState([
    "LIZASO Main",
    "LIZASO Branch 1",
    "LIZASO Branch 2",
  ]);

  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle row selection
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((user) => user.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClickCheckbox = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleDelete = () => {
    const newUsers = users.filter((user) => !selected.includes(user.id));
    setUsers(newUsers);
    setSnackbarMessage("Selected users have been deleted.");
    setSnackbarOpen(true);
    setSelected([]);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
    // Add your edit logic here
  };

  const handleView = (id) => {
    console.log("View user with ID:", id);
    // Add your view logic here
  };

  return (
    <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
      <Box>
        {/* Header */}
        <Box className="flex items-center justify-between mb-8">
          <Typography variant="h6" className="text-2xl font-semibold">
            User Management
          </Typography>
          <Button
            disableElevation
            variant="contained"
            startIcon={
              <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Add new role
          </Button>
        </Box>

        {/* List of Roles */}
        <Box className="mb-6">
          <Typography
            variant="subtitle1"
            className="text-xl font-semibold mb-2"
          >
            Roles
          </Typography>
          <ul className="list-disc list-inside pl-4">
            {roles.map((role, index) => (
              <li key={index} className="text-gray-700">
                {role}
              </li>
            ))}
          </ul>
        </Box>

        {/* List of Stores */}
        <Box className="mb-6">
          <Typography
            variant="subtitle1"
            className="text-xl font-semibold mb-2"
          >
            Stores
          </Typography>
          <ul className="list-disc list-inside pl-4">
            {stores.map((store, index) => (
              <li key={index} className="text-gray-700">
                {store}
              </li>
            ))}
          </ul>
        </Box>

        {/* Table for user list */}
        <Box mb={2}>
          <Box mb={2} className="flex items-center justify-between mb-8">
            {/* Filter by Status */}
            <Box className="flex items-center mr-4">
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Filter by Status:
              </Typography>
              <Select
                // value={filterStatus}
                // onChange={handleFilterStatusChange} // Define this function to handle status change
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{ marginRight: 2 }}
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                {/* Add more status options as needed */}
              </Select>
            </Box>

            {/* Filter by Role */}
            <Box className="flex items-center mr-4">
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Filter by Role:
              </Typography>
              <Select
                // value={filterRole}
                // onChange={handleFilterRoleChange} // Define this function to handle role change
                displayEmpty
              >
                <MenuItem value="">
                  <em>All</em>
                </MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="delivery">Delivery Personnel</MenuItem>
              </Select>
            </Box>

            {/* Button Group */}
            <Box className="flex items-center">
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                disabled={selected.length === 0}
              >
                Delete Selected
              </Button>
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
                  marginLeft: 2, // Add spacing between buttons
                  "&:hover": {
                    backgroundColor: "#3b5c9f",
                  },
                }}
              >
                Add new user
              </Button>
            </Box>
          </Box>

          {/* <Box mb={2} className="flex items-center justify-between mb-8">
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={selected.length === 0}
            >
              Delete Selected
            </Button>
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
              Add new user
            </Button>
          </Box> */}
          {/* User Table */}
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              borderRadius: 2, // No rounded corners
              boxShadow: "none", // No shadow
              border: "1px solid #e0e0e0", // Light gray outline
            }}
          >
            <Table>
              <TableHead className="bg-gray-100 border-b">
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < users.length
                      }
                      checked={
                        users.length > 0 && selected.length === users.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all users" }}
                    />
                  </TableCell>
                  <TableCell className="text-left py-3 px-4">ID</TableCell>
                  <TableCell className="text-left py-3 px-4">Name</TableCell>
                  <TableCell className="text-left py-3 px-4">Role</TableCell>
                  <TableCell className="text-left py-3 px-4">Store</TableCell>
                  <TableCell className="text-left py-3 px-4">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    const isItemSelected = isSelected(user.id);
                    return (
                      <TableRow
                        key={user.id}
                        className="border-b"
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        tabIndex={-1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": `checkbox-${user.id}`,
                            }}
                            onClick={() => handleClickCheckbox(user.id)} // Handle checkbox click
                          />
                        </TableCell>
                        <TableCell className="py-3 px-4">{user.id}</TableCell>
                        <TableCell className="py-3 px-4">
                          <Typography className="font-semibold">
                            {user.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell className="py-3 px-4">{user.role}</TableCell>
                        <TableCell className="py-3 px-4">
                          {user.store}
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <IconButton onClick={() => handleView(user.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEdit(user.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              // Add your delete logic here
                              console.log("Delete user with ID:", user.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>

        <Box mt={5}>
          {/* Delete Selected Button */}
          <Box mb={2}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={selected.length === 0}
            >
              Delete Selected
            </Button>
          </Box>
          {/* User Table */}
          <TableContainer
            component={Paper}
            sx={{
              overflowX: "auto",
              borderRadius: 2, // No rounded corners
              boxShadow: "none", // No shadow
              border: "1px solid #e0e0e0", // Light gray outline
            }}
          >
            <Table>
              <TableHead className="bg-gray-100 border-b">
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      indeterminate={
                        selected.length > 0 && selected.length < users.length
                      }
                      checked={
                        users.length > 0 && selected.length === users.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all users" }}
                    />
                  </TableCell>
                  <TableCell className="text-left py-3 px-4">ID</TableCell>
                  <TableCell className="text-left py-3 px-4">Name</TableCell>
                  <TableCell className="text-left py-3 px-4">Role</TableCell>
                  <TableCell className="text-left py-3 px-4">Store</TableCell>
                  <TableCell className="text-left py-3 px-4">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => {
                    const isItemSelected = isSelected(user.id);
                    return (
                      <TableRow
                        key={user.id}
                        className="border-b"
                        role="checkbox"
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                        tabIndex={-1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": `checkbox-${user.id}`,
                            }}
                            onClick={() => handleClickCheckbox(user.id)} // Handle checkbox click
                          />
                        </TableCell>
                        <TableCell className="py-3 px-4">{user.id}</TableCell>
                        <TableCell className="py-3 px-4">
                          <Typography className="font-semibold">
                            {user.name}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500">
                            {user.email}
                          </Typography>
                        </TableCell>
                        <TableCell className="py-3 px-4">{user.role}</TableCell>
                        <TableCell className="py-3 px-4">
                          {user.store}
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <IconButton onClick={() => handleView(user.id)}>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton onClick={() => handleEdit(user.id)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              // Add your delete logic here
                              console.log("Delete user with ID:", user.id);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Box>
      </Box>
      {/* Snackbar for delete notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Fixed "below" to "bottom"
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "100%",
            color: COLORS.white,
            backgroundColor: COLORS.secondary,
            "& .MuiAlert-icon": {
              color: "white", // Change icon color to white
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {/* <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "below", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar> */}
    </Box>
  );
};

export default User;

// import React, { useState } from "react";
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
//   Checkbox,
//   TablePagination,
// } from "@mui/material";
// import { PlusCircle } from "@phosphor-icons/react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const User = () => {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "johndoe@example.com",
//       role: "Admin",
//       store: "LIZASO Main",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "janesmith@example.com",
//       role: "Manager",
//       store: "LIZASO Branch 1",
//     },
//     {
//       id: 3,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     // Add more users as needed
//   ]);

//   const [roles] = useState(["Admin", "Manager", "Employee"]);
//   const [stores] = useState([
//     "LIZASO Main",
//     "LIZASO Branch 1",
//     "LIZASO Branch 2",
//   ]);

//   const [selected, setSelected] = useState([]);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);

//   // Handle row selection
//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = users.map((user) => user.id);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClickCheckbox = (id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box>
//         {/* Header */}
//         <Box className="flex items-center justify-between mb-8">
//           <Typography variant="h6" className="text-2xl font-semibold">
//             User Management
//           </Typography>
//           <Button
//             disableElevation
//             variant="contained"
//             startIcon={
//               <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
//             }
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
//           >
//             Add new role
//           </Button>
//         </Box>

//         {/* List of Roles */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Roles
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {roles.map((role, index) => (
//               <li key={index} className="text-gray-700">
//                 {role}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* List of Stores */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Stores
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {stores.map((store, index) => (
//               <li key={index} className="text-gray-700">
//                 {store}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* User Table */}
//         <TableContainer
//           component={Paper}
//           sx={{
//             overflowX: "auto",
//             borderRadius: 2, // No rounded corners
//             boxShadow: "none", // No shadow
//             border: "1px solid #e0e0e0", // Light gray outline
//           }}
//         >
//           <Table>
//             <TableHead className="bg-gray-100 border-b">
//               <TableRow>
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     indeterminate={
//                       selected.length > 0 && selected.length < users.length
//                     }
//                     checked={
//                       users.length > 0 && selected.length === users.length
//                     }
//                     onChange={handleSelectAllClick}
//                     inputProps={{ "aria-label": "select all users" }}
//                   />
//                 </TableCell>
//                 <TableCell className="text-left py-3 px-4">ID</TableCell>
//                 <TableCell className="text-left py-3 px-4">Name</TableCell>
//                 <TableCell className="text-left py-3 px-4">Role</TableCell>
//                 <TableCell className="text-left py-3 px-4">Store</TableCell>
//                 <TableCell className="text-right py-3 px-4">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((user) => {
//                   const isItemSelected = isSelected(user.id);
//                   return (
//                     <TableRow
//                       key={user.id}
//                       className="border-b"
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       selected={isItemSelected}
//                       tabIndex={-1}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{
//                             "aria-labelledby": `checkbox-${user.id}`,
//                           }}
//                           onClick={() => handleClickCheckbox(user.id)} // Handle checkbox click
//                         />
//                       </TableCell>
//                       <TableCell className="py-3 px-4">{user.id}</TableCell>
//                       <TableCell className="py-3 px-4">
//                         <Typography className="font-semibold">
//                           {user.name}
//                         </Typography>
//                         <Typography variant="body2" className="text-gray-500">
//                           {user.email}
//                         </Typography>
//                       </TableCell>
//                       <TableCell className="py-3 px-4">{user.role}</TableCell>
//                       <TableCell className="py-3 px-4">{user.store}</TableCell>
//                       <TableCell className="py-3 px-4 text-right">
//                         <IconButton className="text-green-600 hover:text-green-700">
//                           <VisibilityIcon />
//                         </IconButton>
//                         <IconButton className="text-blue-600 hover:text-blue-700">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton className="text-red-600 hover:text-red-700">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={users.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default User;

// import React, { useState } from "react";
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
//   Checkbox,
//   TablePagination,
// } from "@mui/material";
// import { PlusCircle } from "@phosphor-icons/react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// const User = () => {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "johndoe@example.com",
//       role: "Admin",
//       store: "LIZASO Main",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "janesmith@example.com",
//       role: "Manager",
//       store: "LIZASO Branch 1",
//     },
//     {
//       id: 3,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     {
//       id: 4,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     {
//       id: 5,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     {
//       id: 6,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     {
//       id: 7,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     {
//       id: 8,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//   ]);

//   const [roles] = useState(["Admin", "Manager", "Employee"]);
//   const [stores] = useState([
//     "LIZASO Main",
//     "LIZASO Branch 1",
//     "LIZASO Branch 2",
//   ]);

//   const [selected, setSelected] = useState([]);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);

//   // Handle row selection
//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelecteds = users.map((user) => user.id);
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const isSelected = (id) => selected.indexOf(id) !== -1;

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box>
//         {/* Header */}
//         <Box className="flex items-center justify-between mb-8">
//           <Typography variant="h6" className="text-2xl font-semibold">
//             User Management
//           </Typography>
//           <Button
//             disableElevation
//             variant="contained"
//             startIcon={
//               <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
//             }
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
//           >
//             Add new role
//           </Button>
//         </Box>

//         {/* List of Roles */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Roles
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {roles.map((role, index) => (
//               <li key={index} className="text-gray-700">
//                 {role}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* List of Stores */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Stores
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {stores.map((store, index) => (
//               <li key={index} className="text-gray-700">
//                 {store}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* User Table */}
//         <TableContainer
//           component={Paper}
//           sx={{
//             overflowX: "auto",
//             borderRadius: 2, // No rounded corners
//             boxShadow: "none", // No shadow
//             border: "1px solid #e0e0e0", // Light gray outline
//           }}
//         >
//           <Table>
//             <TableHead className="bg-gray-100 border-b">
//               <TableRow>
//                 <TableCell padding="checkbox">
//                   <Checkbox
//                     indeterminate={
//                       selected.length > 0 && selected.length < users.length
//                     }
//                     checked={
//                       users.length > 0 && selected.length === users.length
//                     }
//                     onChange={handleSelectAllClick}
//                     inputProps={{ "aria-label": "select all users" }}
//                   />
//                 </TableCell>
//                 <TableCell className="text-left py-3 px-4">ID</TableCell>
//                 <TableCell className="text-left py-3 px-4">Name</TableCell>
//                 <TableCell className="text-left py-3 px-4">Role</TableCell>
//                 <TableCell className="text-left py-3 px-4">Store</TableCell>
//                 <TableCell className="text-right py-3 px-4">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((user) => {
//                   const isItemSelected = isSelected(user.id);
//                   return (
//                     <TableRow
//                       key={user.id}
//                       className="border-b"
//                       onClick={() => handleClick(user.id)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       selected={isItemSelected}
//                       tabIndex={-1}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           checked={isItemSelected}
//                           inputProps={{
//                             "aria-labelledby": `checkbox-${user.id}`,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell className="py-3 px-4">{user.id}</TableCell>
//                       <TableCell className="py-3 px-4">
//                         <Typography className="font-semibold">
//                           {user.name}
//                         </Typography>
//                         <Typography variant="body2" className="text-gray-500">
//                           {user.email}
//                         </Typography>
//                       </TableCell>
//                       <TableCell className="py-3 px-4">{user.role}</TableCell>
//                       <TableCell className="py-3 px-4">{user.store}</TableCell>
//                       <TableCell className="py-3 px-4 text-right">
//                         <IconButton className="text-green-600 hover:text-green-700">
//                           <VisibilityIcon />
//                         </IconButton>
//                         <IconButton className="text-blue-600 hover:text-blue-700">
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton className="text-red-600 hover:text-red-700">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={users.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default User;

// import React, { useState } from "react";
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
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "johndoe@example.com",
//       role: "Admin",
//       store: "LIZASO Main",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "janesmith@example.com",
//       role: "Manager",
//       store: "LIZASO Branch 1",
//     },
//     {
//       id: 3,
//       name: "Mark Johnson",
//       email: "markjohnson@example.com",
//       role: "Employee",
//       store: "LIZASO Branch 2",
//     },
//     // Add more users if needed
//   ]);

//   const [roles] = useState(["Admin", "Manager", "Employee"]);
//   const [stores] = useState([
//     "LIZASO Main",
//     "LIZASO Branch 1",
//     "LIZASO Branch 2",
//   ]);

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box>
//         {/* Header */}
//         <Box className="flex items-center justify-between mb-8">
//           <Typography variant="h6" className="text-2xl font-semibold">
//             User Management
//           </Typography>
//           <Button
//             disableElevation
//             variant="contained"
//             startIcon={
//               <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
//             }
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
//           >
//             Add new role
//           </Button>
//         </Box>

//         {/* List of Roles */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Roles
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {roles.map((role, index) => (
//               <li key={index} className="text-gray-700">
//                 {role}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* List of Stores */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Stores
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {stores.map((store, index) => (
//               <li key={index} className="text-gray-700">
//                 {store}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* User Table */}
//         <TableContainer
//           component={Paper}
//           className="overflow-x-auto shadow-md rounded-lg"
//         >
//           <Table>
//             <TableHead className="bg-gray-100 border-b">
//               <TableRow>
//                 <TableCell className="text-left py-3 px-4">Name</TableCell>
//                 <TableCell className="text-left py-3 px-4">Role</TableCell>
//                 <TableCell className="text-left py-3 px-4">Store</TableCell>
//                 <TableCell className="text-right py-3 px-4">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id} className="border-b">
//                   <TableCell className="py-3 px-4">
//                     <Typography className="font-semibold">
//                       {user.name}
//                     </Typography>
//                     <Typography variant="body2" className="text-gray-500">
//                       {user.email}
//                     </Typography>
//                   </TableCell>
//                   <TableCell className="py-3 px-4">{user.role}</TableCell>
//                   <TableCell className="py-3 px-4">{user.store}</TableCell>
//                   <TableCell className="py-3 px-4 text-right">
//                     <IconButton className="text-green-600 hover:text-green-700">
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton className="text-blue-600 hover:text-blue-700">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton className="text-red-600 hover:text-red-700">
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

// import React, { useState } from "react";
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
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", role: "Admin", store: "LIZASO Main" },
//     { id: 2, name: "Jane Smith", role: "Manager", store: "LIZASO Branch 1" },
//     { id: 1, name: "John Doe", role: "Admin", store: "LIZASO Main" },
//     { id: 2, name: "Jane Smith", role: "Manager", store: "LIZASO Branch 1" },
//     { id: 1, name: "John Doe", role: "Admin", store: "LIZASO Main" },
//     { id: 2, name: "Jane Smith", role: "Manager", store: "LIZASO Branch 1" },
//     { id: 1, name: "John Doe", role: "Admin", store: "LIZASO Main" },
//     { id: 2, name: "Jane Smith", role: "Manager", store: "LIZASO Branch 1" },
//   ]);

//   const [roles] = useState(["Admin", "Manager", "Employee"]);
//   const [stores] = useState([
//     "LIZASO Main",
//     "LIZASO Branch 1",
//     "LIZASO Branch 2",
//   ]);

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       <Box className="">
//         {/* Header */}
//         <Box className="flex items-center justify-between mb-8">
//           <Typography variant="h6" className="text-2xl font-semibold">
//             User Management
//           </Typography>
//           <Button
//             disableElevation
//             variant="contained"
//             startIcon={
//               <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
//             }
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
//           >
//             Add new role
//           </Button>
//         </Box>

//         {/* List of Roles */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Roles
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {roles.map((role, index) => (
//               <li key={index} className="text-gray-700">
//                 {role}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* List of Stores */}
//         <Box className="mb-6">
//           <Typography
//             variant="subtitle1"
//             className="text-xl font-semibold mb-2"
//           >
//             Stores
//           </Typography>
//           <ul className="list-disc list-inside pl-4">
//             {stores.map((store, index) => (
//               <li key={index} className="text-gray-700">
//                 {store}
//               </li>
//             ))}
//           </ul>
//         </Box>

//         {/* User Table */}
//         <TableContainer
//           component={Paper}
//           className="overflow-x-auto shadow-md rounded-lg"
//         >
//           <Table>
//             <TableHead className="bg-gray-100 border-b">
//               <TableRow>
//                 <TableCell className="text-left py-3 px-4">Name</TableCell>
//                 <TableCell className="text-left py-3 px-4">Role</TableCell>
//                 <TableCell className="text-left py-3 px-4">Store</TableCell>
//                 <TableCell className="text-right py-3 px-4">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {users.map((user) => (
//                 <TableRow key={user.id} className="border-b">
//                   <TableCell className="py-3 px-4">{user.name}</TableCell>
//                   <TableCell className="py-3 px-4">{user.role}</TableCell>
//                   <TableCell className="py-3 px-4">{user.store}</TableCell>
//                   <TableCell className="py-3 px-4 text-right">
//                     <IconButton className="text-green-600 hover:text-green-700">
//                       <VisibilityIcon />
//                     </IconButton>
//                     <IconButton className="text-blue-600 hover:text-blue-700">
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton className="text-red-600 hover:text-red-700">
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

// import React, { useState } from "react";
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
// } from "@mui/material";
// import { PlusCircle } from "@phosphor-icons/react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import useAuth from "../../../contexts/AuthContext";

// const User = () => {
//   const [users, setUsers] = useState([
//     { id: 1, name: "John Doe", role: "Admin", store: "LIZASO Main" },
//     { id: 2, name: "Jane Smith", role: "Manager", store: "LIZASO Branch 1" },
//   ]);

//   const [roles] = useState(["Admin", "Manager", "Employee"]);
//   const [stores] = useState([
//     "LIZASO Main",
//     "LIZASO Branch 1",
//     "LIZASO Branch 2",
//   ]);

//   return (
//     <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           mb: 4,
//         }}
//       >
//         <Typography variant="h6" gutterBottom>
//           User Management
//         </Typography>
//         <Button
//           disableElevation
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

//       {/* List of Roles */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           Roles
//         </Typography>
//         <ul>
//           {roles.map((role, index) => (
//             <li
//               key={index}
//               style={{
//                 listStyleType: "disc",
//                 marginLeft: "20px",
//                 color: "#555",
//               }}
//             >
//               {role}
//             </li>
//           ))}
//         </ul>
//       </Box>

//       {/* List of Stores */}
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h6" gutterBottom>
//           Stores
//         </Typography>
//         <ul>
//           {stores.map((store, index) => (
//             <li
//               key={index}
//               style={{
//                 listStyleType: "disc",
//                 marginLeft: "20px",
//                 color: "#555",
//               }}
//             >
//               {store}
//             </li>
//           ))}
//         </ul>
//       </Box>

//       {/* User Table */}
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Name</TableCell>
//               <TableCell align="left">Role</TableCell>
//               <TableCell align="left">Store</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user) => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.name}</TableCell>
//                 <TableCell>{user.role}</TableCell>
//                 <TableCell>{user.store}</TableCell>
//                 <TableCell align="right">
//                   <IconButton aria-label="view" sx={{ color: "#4caf50" }}>
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton aria-label="edit" sx={{ color: "#1976d2" }}>
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton aria-label="delete" sx={{ color: "#d32f2f" }}>
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

// import React, { useState } from "react";
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
//           disableElevation
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
//     </Box>
//   );
// };

// export default User;

// const { userDetails } = useAuth();
// const [selectedStore, setSelectedStore] = useState(null);

// // Example store data
// const stores = [
//   { id: 1, name: "Store A", contact: "123-456-7890" },
//   { id: 2, name: "Store B", contact: "987-654-3210" },
//   { id: 3, name: "Store C", contact: "111-222-3333" },
// ];

// // Example user data related to stores
// const users = [
//   {
//     id: 1,
//     username: "johndoe",
//     role: "Admin",
//     created: "2024-09-01",
//     permissionStatus: "Active",
//     permissions: {
//       read: true,
//       write: true,
//       delete: true,
//     },
//     storeId: 1,
//   },
//   {
//     id: 2,
//     username: "janedoe",
//     role: "User",
//     created: "2024-09-02",
//     permissionStatus: "Inactive",
//     permissions: {
//       read: true,
//       write: false,
//       delete: false,
//     },
//     storeId: 2,
//   },
// ];

// const handleStoreClick = (storeId) => {
//   setSelectedStore(storeId);
// };

// // Filter users based on the selected store
// const filteredUsers = users.filter((user) => user.storeId === selectedStore);

{
  /* <Box
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
      </Box> */
}

{
  /* <Box className="flex flex-col md:flex-row gap-4 pt-10">
        {userDetails.user_type === 0 && (
          <Paper
            className="flex-shrink-0"
            sx={{
              width: "300px",
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

        <Box className={`flex-grow flex flex-col gap-4`}>
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

          <Paper
            className="p-4"
            sx={{
              boxShadow: "none !important",
              borderRadius: "10px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "divider",
            }}
          ></Paper>

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
      </Box> */
}
