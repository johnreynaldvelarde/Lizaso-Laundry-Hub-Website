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
  Checkbox,
  TablePagination,
  Snackbar,
  Alert,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const A_SectionUser = () => {
  return (
    <>
      <Box mb={2}>
        <Box mb={2} className="flex items-center justify-between mb-8">
          {/* Filter by Role */}
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

          {/* Button Deleted Selected */}
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
                      <TableCell className="py-3 px-4">{user.store}</TableCell>
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

export default A_SectionUser;
