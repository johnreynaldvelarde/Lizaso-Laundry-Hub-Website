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
  Button,
  Skeleton,
  Tooltip,
} from "@mui/material";
import no_data from "../../../assets/images/no_data_table.jpg";
import DateCell from "../../table/DateCell";
import { getStatusColor } from "./custom/method";
import { COLORS } from "../../../constants/color";
import usePopup from "../../../hooks/common/usePopup";
import PopPendingAssignTo from "../../../pages/admin/Schedule/components/PopPendingAssignTo";
import OutlinedIconButton from "../../table/OutlinedIconButton";
import { PencilLine, StackPlus, Trash } from "@phosphor-icons/react";
import StatusCell from "../../table/StatusCell";
import StatusCellTable from "./custom/StatusCellTable";
import CustomStock from "./custom/CustomStock";
import PopEditItem from "../../../pages/admin/Inventory/components/PopEditItem";
import PopRestock from "../../../pages/admin/Inventory/components/PopRestock";

const CustomInventoryTable = ({ tableData, loading, refreshData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();

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
          borderRadius: 2,
          boxShadow: "none",
          border: `1px solid ${COLORS.border}`,
        }}
      >
        <Table>
          <TableHead className="bg-[#F1F1F1] border-b">
            <TableRow>
              <TableCell sx={cellHeadStyles}>ID</TableCell>
              <TableCell sx={cellHeadStyles}>Item Name</TableCell>
              <TableCell sx={cellHeadStyles}>Category</TableCell>
              <TableCell sx={cellHeadStyles}>Date Created</TableCell>
              <TableCell sx={cellHeadStyles}>Price</TableCell>
              <TableCell sx={cellHeadStyles}>Stock</TableCell>
              <TableCell sx={cellHeadStyles}>Status</TableCell>
              <TableCell sx={cellHeadStyles}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Skeleton loading state
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {Array.from(new Array(7)).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton variant="rectangular" height={30} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : tableData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
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
                    key={data.inventory_id}
                    className="border-b"
                    role="checkbox"
                    tabIndex={-1}
                  >
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "600", color: COLORS.secondary }}
                      >
                        #{data.inventory_id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "600", color: COLORS.text }}
                      >
                        {data.item_name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "600", color: COLORS.secondary }}
                      >
                        {data.category_name}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <DateCell dateCreated={data.date_created} />
                    </TableCell>
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "600", color: COLORS.primary }}
                      >
                        {data.price}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: "600", color: COLORS.primary }}
                      >
                        <CustomStock
                          quantity={data.quantity}
                          lowStockThreshold={20}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                      <StatusCellTable status={data.isStatus} />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Restock Item" arrow>
                        <OutlinedIconButton
                          onClick={() => {
                            openPopup("restockItem", data.inventory_id);
                          }}
                        >
                          <StackPlus color={COLORS.success} weight="duotone" />
                        </OutlinedIconButton>
                      </Tooltip>
                      <Tooltip title="Edit Item" arrow>
                        <OutlinedIconButton
                          onClick={() => {
                            openPopup("editItem", data.inventory_id);
                          }}
                        >
                          <PencilLine
                            color={COLORS.secondary}
                            weight="duotone"
                          />
                        </OutlinedIconButton>
                      </Tooltip>
                      <Tooltip title="Delete User" arrow>
                        <OutlinedIconButton
                        //   onClick={() => handleDialogDelete(user.user_id, "")}
                        >
                          <Trash color={COLORS.error} weight="duotone" />
                        </OutlinedIconButton>
                      </Tooltip>
                    </TableCell>
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

      {/* Popup */}
      {/* {isOpen && popupType === "assignTo" && (
        <PopPendingAssignTo
          open={isOpen}
          onClose={closePopup}
          id={popupData}
          refreshData={refreshData}
        />
      )} */}

      {isOpen && popupType === "editItem" && (
        <PopEditItem open={isOpen} onClose={closePopup} id={popupData} />
      )}

      {isOpen && popupType === "restockItem" && (
        <PopRestock open={isOpen} onClose={closePopup} id={popupData} />
      )}
    </>
  );
};

export default CustomInventoryTable;

const cellHeadStyles = {
  paddingY: 2,
  paddingX: 4,
  textAlign: "left",
  color: "#595959",
  fontSize: "1",
  fontWeight: 600,
  textTransform: "uppercase",
};
