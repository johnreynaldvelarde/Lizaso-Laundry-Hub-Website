import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../../../contexts/AuthContext";
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
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  PlusCircle,
  FolderUser,
  Trash,
  PencilLine,
  Eye,
} from "@phosphor-icons/react";
import { MoreVert } from "@mui/icons-material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import noData from "../../../../assets/images/no_data.png";
import { COLORS } from "../../../../constants/color";
import A_PopupAddUser from "./A_PopupAddUser";
import A_PopupAddRole from "./A_PopupAddRole";
import {
  viewAdminBasedStore,
  viewRolesAndPermissions,
} from "../../../../services/api/getApi";
import PermissionBox from "../../../../components/table/PermissionBox";
import StatusCell from "../../../../components/table/StatusCell";
import DateCell from "../../../../components/table/DateCell";
import OutlinedIconButton from "../../../../components/table/OutlinedIconButton";

const stores = [
  { id: 1, name: "Main Branch", totalUsers: 10 },
  { id: 2, name: "East Branch", totalUsers: 5 },
  { id: 3, name: "West Branch", totalUsers: 7 },
  { id: 4, name: "South Branch", totalUsers: 4 },
];

const users = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe123",
    role: "Admin",
    storeId: 1, // Updated to follow your preferred store ID format
    dateCreated: "2024-02-05T14:30:00",
    permissions: {
      read: true,
      write: true,
      edit: true,
      delete: true,
    },
    status: "Active", // Options: pending, active, deactivated
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith456",
    role: "User",
    storeId: 1,
    dateCreated: "2024-02-06T09:15:00",
    permissions: {
      read: true,
      write: false,
      edit: false,
      delete: false,
    },
    status: "Pending",
  },
  {
    id: 3,
    name: "Mike Johnson",
    username: "mikejohnson789",
    role: "Delivery",
    storeId: 2,
    dateCreated: "2024-02-07T11:45:00",
    permissions: {
      read: true,
      write: false,
      edit: false,
      delete: false,
    },
    status: "Pending", // Example status
  },
  {
    id: 4,
    name: "Alice Brown",
    username: "alicebrown101",
    role: "Admin",
    storeId: 1,
    dateCreated: "2024-02-08T08:00:00",
    permissions: {
      read: true,
      write: true,
      edit: true,
      delete: true,
    },
    status: "Deactivated", // Example status
  },
];

const SectionAdminUser = () => {
  const { userDetails } = useAuth();
  const [roles, setRole] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  // For fetching data for role and permissions
  const fetchRoleAndPermissions = async () => {
    if (!userDetails?.userId) return;

    try {
      const response = await viewRolesAndPermissions.getRoleAndPermission(
        userDetails.storeId
      );
      if (response) {
        const roledata = response.data || [];
        setRole(roledata);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // For fetching data of stores
  const fetchAdminBasedStores = async () => {
    if (!userDetails?.userId) return;

    try {
      const response = await viewAdminBasedStore.getAdminBasedStore(
        userDetails.storeId
      );
      if (response) {
        const storeData = response.data || [];
        setStores(storeData);
        if (storeData.length > 0) {
          setSelectedStore(storeData[0].id);
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (userDetails?.userId) {
      fetchRoleAndPermissions();
      fetchAdminBasedStores();
    }
  }, [userDetails?.userId]);

  // For Popup
  const [openPopupAddUser, setOpenPopupAddUser] = useState(false);
  const [openPopupAddRole, setOpenPopupAddRole] = useState(false);

  const handleOpenPopupAddUser = () => {
    setOpenPopupAddUser(true);
  };
  const handleClosePopupAddUser = () => {
    setOpenPopupAddUser(false);
  };

  const handleOpenPopupAddRole = () => {
    setOpenPopupAddRole(true);
  };
  const handleClosePopupAddRole = () => {
    setOpenPopupAddRole(false);
  };

  // For Role and Permission Section
  const handleMenuClick = (event, role) => {
    setAnchorEl(event.currentTarget);
    setSelectedRole(role);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Store and User Section
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const checkOverflow = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    checkOverflow();

    const ref = scrollRef.current;
    ref.addEventListener("scroll", checkOverflow);
    window.addEventListener("resize", checkOverflow);

    return () => {
      ref.removeEventListener("scroll", checkOverflow);
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const scrollTo = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleStoreClick = (id) => {
    setSelectedStore(id);
    setSelected([]);
  };

  const filteredUsers = selectedStore
    ? users.filter((user) => user.storeId === selectedStore)
    : [];

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((user) => user.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickCheckbox = (id) => {
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.indexOf(id);
      if (selectedIndex === -1) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((selectedId) => selectedId !== id);
      }
    });
  };

  const handleCheckBoxDelete = () => {
    selected.forEach((id) => {
      console.log(`Deleting user with ID: ${id}`);
    });
    setSnackbarMessage("Selected users have been deleted.");
    setSnackbarOpen(true);
    setSelected([]);
  };

  // For snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // For Update Data
  return (
    <>
      {/* Role and Permission Section */}
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
          onClick={handleOpenPopupAddRole}
          variant="contained"
          startIcon={
            <PlusCircle
              size={24}
              color={COLORS.white}
              weight="duotone"
              sx={{ display: { xs: "none", sm: "inline" } }}
            />
          }
          sx={{
            backgroundColor: COLORS.secondary,
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            paddingX: { xs: 1, sm: 2, md: 3 },
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            "&:hover": {
              backgroundColor: COLORS.secondaryHover,
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
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
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
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  borderRadius: "5px",
                  padding: "4px",
                  backgroundColor: COLORS.secondary,
                }}
              >
                <FolderUser size={30} color="white" weight="duotone" />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  fontWeight: 500,
                  marginLeft: "8px",
                }}
              >
                {role.role_name}
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }} // Stack vertically on small screens
              alignItems="center"
              mt={2}
              mb={5}
            >
              <Box display="flex" alignItems="center" mb={{ xs: 1, sm: 0 }}>
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
                  marginLeft: { xs: 0, sm: "8px" }, // No left margin on small screens
                  marginBottom: "8px",
                  textAlign: { xs: "center", sm: "left" }, // Center text on small screens
                }}
              >
                Total Users: {role.user_count}
              </Typography>
            </Box>

            <Button
              variant="outlined"
              sx={{
                padding: 1,
                marginBottom: "8px",
                textTransform: "none",
                color: COLORS.primary,
                borderColor: COLORS.border,
                "&:hover": {
                  borderColor: COLORS.secondary,
                  color: COLORS.secondary,
                  backgroundColor: COLORS.secondaryLight,
                },
              }}
            >
              <ManageAccountsIcon sx={{ marginRight: "5px" }} />
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

      {/* Store and Permission Section */}
      {/* Store List */}
      <Box
        sx={{
          marginTop: "40px",
          padding: "20px",
          border: `1px solid ${COLORS.border2}`,
          borderRadius: "8px",
          backgroundColor: COLORS.white,
          position: "relative",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "18px", sm: "24px", md: "28px" },
            fontWeight: 500,
            marginBottom: "16px",
          }}
        >
          Stores List
        </Typography>

        {/* Left Arrow */}
        {showLeftArrow && (
          <Box
            onClick={() => scrollTo("left")}
            sx={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 1,
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ArrowBackIos />
          </Box>
        )}

        {/* List of Stores */}
        <Box
          ref={scrollRef}
          className="hori-scrollable"
          sx={{
            display: "flex",
            overflowX: "auto",
            padding: "10px 0",
          }}
        >
          {stores.map((store) => (
            <Box
              key={store.id}
              onClick={() => handleStoreClick(store.id)}
              sx={{
                border: `1px solid ${COLORS.border2}`,
                borderRadius: "8px",
                padding: "25px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                backgroundColor:
                  selectedStore === store.id ? COLORS.secondary : COLORS.white, // Blue when selected
                minWidth: "300px", // Minimum width for each store box
                marginRight: "20px", // Space between boxes
                cursor: "pointer", // Indicate clickable box
                "&:hover": {
                  backgroundColor:
                    selectedStore === store.id
                      ? COLORS.secondary
                      : COLORS.secondaryLight,
                },
              }}
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color:
                      selectedStore === store.id
                        ? COLORS.white
                        : COLORS.textPrimary,
                  }}
                >
                  {store.store_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color:
                      selectedStore === store.id
                        ? COLORS.white
                        : COLORS.subtitle,
                  }}
                >
                  Total Users: {store.user_count}
                </Typography>
              </Box>

              {/* Circular Bar User Total */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Circular progress background */}
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={60}
                  sx={{
                    color: COLORS.border2,
                    position: "absolute",
                  }}
                />
                {/* Filled circular progress */}
                <CircularProgress
                  variant="determinate"
                  value={(store.totalUsers / 99) * 100}
                  size={60}
                  sx={{
                    color:
                      selectedStore === store.id
                        ? COLORS.white
                        : COLORS.secondary,
                  }}
                />
                {/* Centered User Count */}
                <Typography
                  variant="caption"
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color:
                      selectedStore === store.id
                        ? COLORS.white
                        : COLORS.textPrimary,
                  }}
                >
                  {store.user_count} {""}
                  User
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Right Arrow */}
        {showRightArrow && (
          <Box
            onClick={() => scrollTo("right")}
            sx={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              zIndex: 1,
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <ArrowForwardIos />
          </Box>
        )}
      </Box>

      {/* User List */}
      <Box mt={5}>
        {/* Button Header */}
        <Box
          mb={2}
          className="flex items-center justify-between mb-8"
          sx={{
            flexDirection: {
              xs: "column", // Stack vertically on small screens
              sm: "row", // Horizontal on larger screens
            },
          }}
        >
          {/* Filter by Role */}
          <Box
            className="flex items-center"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              marginBottom: {
                xs: 2,
                sm: 0,
              },
            }}
          >
            <FormControl sx={{ minWidth: 200 }} size="small" fullWidth>
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

          {/* Buttons: Delete Selected and Add New User */}
          <Box
            className="flex items-center"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              "& button": {
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              },
            }}
          >
            <Button
              onClick={handleCheckBoxDelete}
              variant="contained"
              disableElevation
              disabled={selected.length === 0}
              sx={{
                backgroundColor: COLORS.error,
                borderRadius: "5px",
                fontWeight: 500,
                textTransform: "none",
                paddingLeft: "23px",
                paddingRight: "23px",
                fontSize: "16px",
                marginLeft: { sm: 2 }, // Spacing between buttons for larger screens
                "&:hover": {
                  backgroundColor: COLORS.errorHover,
                },
              }}
            >
              Delete Selected
            </Button>

            <Button
              variant="contained"
              startIcon={
                <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
              }
              sx={{
                backgroundColor: COLORS.secondary,
                borderRadius: "5px",
                fontWeight: 600,
                textTransform: "none",
                paddingLeft: "23px",
                paddingRight: "23px",
                fontSize: "16px",
                marginLeft: { sm: 2 }, // Spacing between buttons for larger screens
                "&:hover": {
                  backgroundColor: COLORS.secondaryHover,
                },
              }}
              onClick={handleOpenPopupAddUser}
            >
              Add new user
            </Button>
          </Box>
        </Box>

        {/* User Table */}
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            borderRadius: 2, // No rounded corners
            boxShadow: "none", // No shadow
            border: `1px solid ${COLORS.border2}`,
          }}
        >
          <Table>
            <TableHead className="bg-[#F1F1F1] border-b">
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredUsers.length
                    }
                    checked={
                      filteredUsers.length > 0 &&
                      selected.length === filteredUsers.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all users" }}
                    disabled={filteredUsers.length === 0}
                  />
                </TableCell>
                <TableCell sx={cellHeadStyles}>ID</TableCell>
                <TableCell sx={cellHeadStyles}>Name</TableCell>
                <TableCell sx={cellHeadStyles}>Role</TableCell>
                <TableCell sx={cellHeadStyles}>Date Created</TableCell>
                <TableCell sx={cellHeadStyles}>Permissions</TableCell>
                <TableCell sx={cellHeadStyles}>Status</TableCell>
                <TableCell sx={cellHeadStyles}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    sx={{ paddingY: 3, paddingX: 4 }}
                  >
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <img
                        src={noData}
                        alt="No data"
                        style={{ width: "150px", marginBottom: "10px" }}
                      />
                      <Typography variant="body1" color="textSecondary">
                        No available data
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers
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
                            checked={selected.includes(user.id)}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClickCheckbox(user.id);
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "600", color: COLORS.secondary }}
                          >
                            #{user.id}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "600", color: COLORS.text5 }}
                          >
                            {user.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "500", color: COLORS.text4 }}
                          >
                            {user.username}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "500", color: COLORS.text4 }}
                          >
                            {user.role}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                          <DateCell dateCreated={user.dateCreated} />
                        </TableCell>
                        <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                          <Box display="flex" gap={1}>
                            {user.permissions.read && (
                              <PermissionBox label="Read" />
                            )}
                            {user.permissions.write && (
                              <PermissionBox label="Write" />
                            )}
                            {user.permissions.edit && (
                              <PermissionBox label="Edit" />
                            )}
                            {user.permissions.delete && (
                              <PermissionBox label="Delete" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                          <StatusCell status={user.status} />
                        </TableCell>
                        <TableCell sx={{ paddingY: 3, paddingX: 4 }}>
                          <Tooltip title="View User" arrow>
                            <OutlinedIconButton
                              onClick={() => handleOpenPopupAddUser()}
                            >
                              <Eye color={COLORS.primary} weight="duotone" />
                            </OutlinedIconButton>
                          </Tooltip>
                          <Tooltip title="Edit User" arrow>
                            <OutlinedIconButton
                              onClick={() => handleOpenPopupAddUser(users)}
                            >
                              <PencilLine
                                color={COLORS.secondary}
                                weight="duotone"
                              />
                            </OutlinedIconButton>
                          </Tooltip>
                          <Tooltip title="Delete User" arrow>
                            <OutlinedIconButton
                              onClick={() => alert("Delete clicked")}
                            >
                              <Trash color={COLORS.error} weight="duotone" />
                            </OutlinedIconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            borderRadius: 2, // No rounded corners
            boxShadow: "none", // No shadow
            border: `1px solid ${COLORS.border2}`,
          }}
        >
          <Table>
            <TableHead className="bg-gray-100 border-b">
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < filteredUsers.length
                    }
                    checked={
                      filteredUsers.length > 0 &&
                      selected.length === filteredUsers.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all users" }}
                    disabled={filteredUsers.length === 0}
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
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" className="py-3 px-4">
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <img
                        src={noData}
                        alt="No data"
                        style={{ width: "150px", marginBottom: "10px" }}
                      />
                      <Typography variant="body1" color="textSecondary">
                        No available data
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers
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
                            checked={selected.includes(user.id)}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleClickCheckbox(user.id);
                            }}
                          />
                        </TableCell>
                        <TableCell className="py-3 px-4">{user.id}</TableCell>
                        <TableCell className="py-5 px-4">
                          {user.name}
                          <div className="text-green- text-sm">
                            {user.username}
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">{user.role}</TableCell>
                        <TableCell className="py-3 px-4">
                          {user.store}
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <IconButton>
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton>
                            <EditIcon />
                          </IconButton>
                          <IconButton>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer> */}

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* PopupSection */}
      <A_PopupAddUser
        open={openPopupAddUser}
        onClose={handleClosePopupAddUser}
        roleData={roles}
      />

      <A_PopupAddRole
        open={openPopupAddRole}
        onClose={handleClosePopupAddRole}
      />

      {/* Menu Section */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleCloseMenu} sx={{ fontSize: "14px" }}>
          Rename
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={{ fontSize: "14px", color: COLORS.error }}
        >
          Remove Role
        </MenuItem>
      </Menu>
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
    </>
  );
};

const cellHeadStyles = {
  paddingY: 2,
  paddingX: 4,
  textAlign: "left",
  color: "#595959",
  fontSize: "1",
  fontWeight: 600, // Changed to semi-bold
  textTransform: "uppercase",
};

export default SectionAdminUser;

// const [selectedStore, setSelectedStore] = useState(
//   stores.length > 0 ? stores[0].id : null
// );
