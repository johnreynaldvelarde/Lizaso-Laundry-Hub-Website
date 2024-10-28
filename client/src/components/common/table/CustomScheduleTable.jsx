import React, { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Box,
  Typography,
} from "@mui/material";
import { COLORS } from "../../../constants/color";
import no_data from "../../../assets/images/no_data_table.jpg";

const CustomScheduleTable = ({ tableData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          overflowX: "auto",
          borderRadius: 2, // No rounded corners
          boxShadow: "none", // No shadow
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Table>
          <TableHead className="bg-[#F1F1F1] border-b">
            <TableRow>
              <TableCell sx={cellHeadStyles}>ID</TableCell>
              <TableCell sx={cellHeadStyles}>Date Created</TableCell>
              <TableCell sx={cellHeadStyles}>Name</TableCell>
              <TableCell sx={cellHeadStyles}>Customer Type</TableCell>
              <TableCell sx={cellHeadStyles}>Payment Method</TableCell>
              <TableCell sx={cellHeadStyles}>Status</TableCell>
              <TableCell sx={cellHeadStyles}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7} // Adjust based on the number of columns
                  align="center"
                  sx={{ paddingY: 5, paddingX: 1 }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <img
                      src={no_data}
                      alt="No data"
                      style={{ width: "150px" }}
                    />
                    <Typography
                      variant="body1"
                      sx={{ color: COLORS.primary, fontWeight: 500 }}
                    >
                      No available data
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              tableData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((data) => (
                  <TableRow
                    key={data.id}
                    className="border-b"
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.dateCreated}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.customerType}</TableCell>
                    <TableCell>{data.paymentMethod}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{/* Add your action buttons here */}</TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CustomScheduleTable;

const cellHeadStyles = {
  paddingY: 2,
  paddingX: 4,
  textAlign: "left",
  color: "#595959",
  fontSize: "1",
  fontWeight: 600, // Changed to semi-bold
  textTransform: "uppercase",
};

{
  /* <TableCell padding="checkbox">
                        <Checkbox
                          checked={selected.includes(user.user_id)}
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClickCheckbox(user.user_id);
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: COLORS.secondary }}
                        >
                          #{user.user_id}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: COLORS.text }}
                        >
                          {user.first_name}{" "}
                          {user.middle_name && `${user.middle_name} `}
                          {user.last_name}
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
                          {user.role_name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <DateCell dateCreated={user.date_created} />
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <Box display="flex" gap={1}>
                          {user.can_read ? (
                            <PermissionBox label="Read" />
                          ) : null}
                          {user.can_write ? (
                            <PermissionBox label="Write" />
                          ) : null}
                          {user.can_edit ? (
                            <PermissionBox label="Edit" />
                          ) : null}
                          {user.can_delete ? (
                            <PermissionBox label="Delete" />
                          ) : null}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <StatusCell status={user.isStatus} />
                      </TableCell>
                      <TableCell sx={{ paddingY: 3, paddingX: 4 }}>
                        <Tooltip title="View User" arrow>
                          <OutlinedIconButton
                            onClick={() => handleOpenPopupViewUser(user)}
                          >
                            <Eye color={COLORS.primary} weight="duotone" />
                          </OutlinedIconButton>
                        </Tooltip>
                        <Tooltip title="Edit User" arrow>
                          <OutlinedIconButton
                            onClick={() => handleOpenPopupEditUser(user)}
                          >
                            <PencilLine
                              color={COLORS.secondary}
                              weight="duotone"
                            />
                          </OutlinedIconButton>
                        </Tooltip>
                        <Tooltip title="Delete User" arrow>
                          <OutlinedIconButton
                            onClick={() => handleDialogDelete(user.user_id, "")}
                          >
                            <Trash color={COLORS.error} weight="duotone" />
                          </OutlinedIconButton>
                        </Tooltip>
                      </TableCell> */
}
