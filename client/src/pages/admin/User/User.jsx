import React from "react";
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
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
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
} from "@mui/material";
import { PlusCircle } from "@phosphor-icons/react";
import { MoreVert } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Person } from "@mui/icons-material";
import { UserCircle } from "@phosphor-icons/react";
import { COLORS } from "../../../constants/color";

const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Manager" },
  { id: 3, name: "User" },
  { id: 4, name: "Delivery Personnel" },
  { id: 5, name: "Support" },
];

const User = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedRole, setSelectedRole] = React.useState(null);

  const handleMenuClick = (event, role) => {
    setAnchorEl(event.currentTarget);
    setSelectedRole(role);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
            User Management
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
            Role Management & Permission
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={
            <PlusCircle
              size={24}
              color="#fcfcfc"
              weight="duotone"
              sx={{ display: { xs: "none", sm: "inline" } }}
            />
          }
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            paddingX: { xs: 1, sm: 2, md: 3 },
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            "&:hover": {
              backgroundColor: "#3b5c9f",
            },
            width: { xs: "100%", sm: "auto" },
            mt: { xs: 2, sm: 0 },
          }}
        >
          Add new role
        </Button>
      </Box>
      {/* List of roles */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: "20px",
        }}
      >
        {roles.map((role) => (
          <Box
            key={role.id}
            sx={{
              border: `1px solid ${COLORS.border2}`,
              borderRadius: "8px",
              padding: "30px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: COLORS.white,
            }}
          >
            <Box display="flex" alignItems="center">
              <UserCircle size={24} color="#5787C8" />
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 500,
                  marginLeft: "8px",
                }}
              >
                {role.name}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mt={2} mb={5}>
              <Box display="flex" alignItems="center">
                {[...Array(4)].map((_, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={`https://via.placeholder.com/24`}
                    alt={`User ${index + 1}`}
                    sx={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "50%",
                      marginLeft: index === 0 ? 0 : "4px",
                    }}
                  />
                ))}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.subtitle,
                  marginLeft: "8px", // Adjusted spacing for clarity
                  marginBottom: "8px",
                }}
              >
                Total Users: {role.totalUsers}
              </Typography>
            </Box>

            {/* <Box display="flex" alignItems="center" mt={2}>
              <Person color="#5787C8" />
              <Typography
                variant="body2"
                sx={{
                  color: COLORS.subtitle,
                  marginLeft: "4px", // Add spacing between icon and text
                  marginBottom: "8px",
                }}
              >
                Total Users: {role.totalUsers}
              </Typography>
            </Box> */}

            <Button
              variant="outlined"
              sx={{ marginBottom: "8px", textTransform: "none" }} // Ensure text is not capitalized
            >
              <EditIcon sx={{ marginRight: "4px" }} />{" "}
              {/* Replace with appropriate edit icon */}
              Edit Role
            </Button>

            <IconButton
              onClick={(event) => handleMenuClick(event, role)}
              sx={{ position: "absolute", top: "16px", right: "16px" }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Menu for role options */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
      </Menu>
    </Box>
  );
};

export default User;

{
  /* <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: "16px",
        }}
      >
        {roles.map((role) => (
          <Box
            key={role.id}
            sx={{
              border: "1px solid #5787C8",
              borderRadius: "8px",
              padding: "16px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%", // Make boxes the same height
              backgroundColor: "#ffffff",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                fontWeight: 500,
              }}
            >
              {role.name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: COLORS.subtitle,
                marginBottom: "8px",
              }}
            >
              Total Users: {role.totalUsers}
            </Typography>

            <Button
              variant="outlined"
              sx={{ marginBottom: "8px", marginTop: "20px" }}
            >
              Edit Role
            </Button>

            <IconButton
              onClick={(event) => handleMenuClick(event, role)}
              sx={{ position: "absolute", top: "16px", right: "16px" }}
            >
              <MoreVert />
            </IconButton>
          </Box>
        ))}
      </Box> */
}

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
//   Snackbar,
//   Alert,
//   Divider,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";
// import { PlusCircle } from "@phosphor-icons/react";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { COLORS } from "../../../constants/color";

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

//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");

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

//   const handleDelete = () => {
//     const newUsers = users.filter((user) => !selected.includes(user.id));
//     setUsers(newUsers);
//     setSnackbarMessage("Selected users have been deleted.");
//     setSnackbarOpen(true);
//     setSelected([]);
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const handleEdit = (id) => {
//     console.log("Edit user with ID:", id);
//     // Add your edit logic here
//   };

//   const handleView = (id) => {
//     console.log("View user with ID:", id);
//     // Add your view logic here
//   };

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
//       </Box>
//     </Box>
//   );
// };

// export default User;

{
  /* Table for user list */
}
{
  /* <Box mb={2}>
          <Box mb={2} className="flex items-center justify-between mb-8">
            <Box className="flex items-center mr-4">
              <FormControl sx={{ minWidth: 200 }} size="small">
                <InputLabel id="role-select-label">Filter by Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  label="Filter by Role"
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="delivery">Delivery Personnel</MenuItem>
                </Select>
              </FormControl>
            </Box>

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
        </Box> */
}

{
  /* Snackbar for delete notification */
}
{
  /* <Snackbar
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
      </Snackbar> */
}
