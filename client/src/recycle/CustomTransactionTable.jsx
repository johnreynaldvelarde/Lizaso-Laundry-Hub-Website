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
import { COLORS } from "../../../constants/color";
import OutlinedIconButton from "../../table/OutlinedIconButton";
import { CaretCircleDown } from "@phosphor-icons/react";
import StatusTransactionCellTable from "./custom/StatusTransactionCellTable";
import CustomPaymentMethodDisplay from "./custom/CustomPaymentMethodDisplay";
import { motion } from "framer-motion"; // Import motion from framer-motion

const CustomTransactionTable = ({ tableData, loading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRows, setExpandedRows] = useState({}); // State to track expanded rows

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle the expansion of a row
  const handleToggleRow = (transactionId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [transactionId]: !prev[transactionId],
    }));
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
              <TableCell sx={cellHeadStyles}>Customer Name</TableCell>
              <TableCell sx={cellHeadStyles}>Payment Method</TableCell>
              <TableCell sx={cellHeadStyles}>Date Created</TableCell>
              <TableCell sx={cellHeadStyles}>Total Amount</TableCell>
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
                  <React.Fragment key={data.transaction_id}>
                    <TableRow
                      className="border-b"
                      role="checkbox"
                      tabIndex={-1}
                    >
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: COLORS.secondary }}
                        >
                          #{data.transaction_id}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ paddingY: 2, paddingX: 4, maxWidth: 400 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: COLORS.text }}
                        >
                          {data.customer_fullname}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "500",
                            color:
                              data.customer_type === "Online"
                                ? COLORS.success
                                : COLORS.error,
                            marginTop: 1,
                          }}
                        >
                          {data.customer_type}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <CustomPaymentMethodDisplay
                          paymentMethod={data.payment_method}
                        />
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <DateCell dateCreated={data.created_at} />
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "600", color: COLORS.secondary }}
                        >
                          {data.total_amount}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
                        <StatusTransactionCellTable
                          status={data.transaction_status}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {data.related_items.length > 0 && (
                            <Tooltip title="Collapse" arrow>
                              <OutlinedIconButton
                                onClick={() =>
                                  handleToggleRow(data.transaction_id)
                                }
                              >
                                <CaretCircleDown
                                  color={COLORS.secondary}
                                  weight="duotone"
                                />
                              </OutlinedIconButton>
                            </Tooltip>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>

                    {/* Collapsible related items */}
                    {expandedRows[data.transaction_id] &&
                      data.related_items.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={7}>
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                              }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Box sx={{ padding: 2 }}>
                                <Typography variant="h6">
                                  Related Items:
                                </Typography>
                                {data.related_items.map((item, index) => (
                                  <Typography key={index} variant="body2">
                                    {item.item_name} (Quantity: {item.quantity},
                                    Amount: {item.amount})
                                  </Typography>
                                ))}
                              </Box>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                  </React.Fragment>
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

export default CustomTransactionTable;

const cellHeadStyles = {
  paddingY: 2,
  paddingX: 4,
  textAlign: "left",
  color: "#595959",
  fontSize: "1",
  fontWeight: 600,
  textTransform: "uppercase",
};

// import React, { useState } from "react";
// import {
//   Paper,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableBody,
//   TablePagination,
//   Box,
//   Typography,
//   Button,
//   Skeleton,
//   Tooltip,
// } from "@mui/material";
// import no_data from "../../../assets/images/no_data_table.jpg";
// import DateCell from "../../table/DateCell";
// import { COLORS } from "../../../constants/color";
// import OutlinedIconButton from "../../table/OutlinedIconButton";
// import { CaretCircleDown } from "@phosphor-icons/react";
// import StatusTransactionCellTable from "./custom/StatusTransactionCellTable";
// import CustomPaymentMethodDisplay from "./custom/CustomPaymentMethodDisplay";

// const CustomTransactionTable = ({ tableData, loading }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [expandedRows, setExpandedRows] = useState({}); // State to track expanded rows

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Toggle the expansion of a row
//   const handleToggleRow = (transactionId) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [transactionId]: !prev[transactionId],
//     }));
//   };

//   return (
//     <>
//       <TableContainer
//         component={Paper}
//         sx={{
//           overflowX: "auto",
//           borderRadius: 2,
//           boxShadow: "none",
//           border: `1px solid ${COLORS.border}`,
//         }}
//       >
//         <Table>
//           <TableHead className="bg-[#F1F1F1] border-b">
//             <TableRow>
//               <TableCell sx={cellHeadStyles}>ID</TableCell>
//               <TableCell sx={cellHeadStyles}>Customer Name</TableCell>
//               <TableCell sx={cellHeadStyles}>Payment Method</TableCell>
//               <TableCell sx={cellHeadStyles}>Date Created</TableCell>
//               <TableCell sx={cellHeadStyles}>Total Amount</TableCell>
//               <TableCell sx={cellHeadStyles}>Status</TableCell>
//               <TableCell sx={cellHeadStyles}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               // Skeleton loading state
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   {Array.from(new Array(7)).map((_, colIndex) => (
//                     <TableCell key={colIndex}>
//                       <Skeleton variant="rectangular" height={30} />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : tableData.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={7}
//                   align="center"
//                   sx={{ paddingY: 5, paddingX: 1 }}
//                 >
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                   >
//                     <img
//                       src={no_data}
//                       alt="No data"
//                       style={{ width: "150px" }}
//                     />
//                     <Typography
//                       variant="body1"
//                       sx={{ color: COLORS.primary, fontWeight: 500 }}
//                     >
//                       No available data
//                     </Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               tableData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((data) => (
//                   <React.Fragment key={data.transaction_id}>
//                     <TableRow
//                       className="border-b"
//                       role="checkbox"
//                       tabIndex={-1}
//                     >
//                       <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                         <Typography
//                           variant="body2"
//                           sx={{ fontWeight: "600", color: COLORS.secondary }}
//                         >
//                           #{data.transaction_id}
//                         </Typography>
//                       </TableCell>
//                       <TableCell
//                         sx={{ paddingY: 2, paddingX: 4, maxWidth: 400 }}
//                       >
//                         <Typography
//                           variant="body2"
//                           sx={{ fontWeight: "600", color: COLORS.text }}
//                         >
//                           {data.customer_fullname}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             fontWeight: "500",
//                             color:
//                               data.customer_type === "Online"
//                                 ? COLORS.success
//                                 : COLORS.error,
//                             marginTop: 1,
//                           }}
//                         >
//                           {data.customer_type}
//                         </Typography>
//                       </TableCell>

//                       <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                         <CustomPaymentMethodDisplay
//                           paymentMethod={data.payment_method}
//                         />
//                       </TableCell>
//                       <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                         <DateCell dateCreated={data.created_at} />
//                       </TableCell>
//                       <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                         <Typography
//                           variant="body2"
//                           sx={{ fontWeight: "600", color: COLORS.secondary }}
//                         >
//                           {data.total_amount}
//                         </Typography>
//                       </TableCell>
//                       <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                         <StatusTransactionCellTable
//                           status={data.transaction_status}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "center",
//                             alignItems: "center",
//                           }}
//                         >
//                           {data.related_items.length > 0 && (
//                             <Tooltip title="Collapse" arrow>
//                               <OutlinedIconButton
//                                 onClick={() =>
//                                   handleToggleRow(data.transaction_id)
//                                 }
//                               >
//                                 <CaretCircleDown
//                                   color={COLORS.secondary}
//                                   weight="duotone"
//                                 />
//                               </OutlinedIconButton>
//                             </Tooltip>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>

//                     {/* Collapsible related items */}
//                     {expandedRows[data.transaction_id] &&
//                       data.related_items.length > 0 && (
//                         <TableRow>
//                           <TableCell colSpan={7}>
//                             <Box sx={{ padding: 2 }}>
//                               <Typography variant="h6">
//                                 Related Items:
//                               </Typography>
//                               {data.related_items.map((item, index) => (
//                                 <Typography key={index} variant="body2">
//                                   {item.item_name} (Quantity: {item.quantity},
//                                   Amount: {item.amount})
//                                 </Typography>
//                               ))}
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       )}
//                   </React.Fragment>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={tableData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };

// export default CustomTransactionTable;

// const cellHeadStyles = {
//   paddingY: 2,
//   paddingX: 4,
//   textAlign: "left",
//   color: "#595959",
//   fontSize: "1",
//   fontWeight: 600,
//   textTransform: "uppercase",
// };

// import React, { useState } from "react";
// import {
//   Paper,
//   Table,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableBody,
//   TablePagination,
//   Box,
//   Typography,
//   Button,
//   Skeleton,
//   Tooltip,
// } from "@mui/material";
// import no_data from "../../../assets/images/no_data_table.jpg";
// import DateCell from "../../table/DateCell";
// import { COLORS } from "../../../constants/color";
// import OutlinedIconButton from "../../table/OutlinedIconButton";
// import { CaretCircleDown } from "@phosphor-icons/react";
// import StatusTransactionCellTable from "./custom/StatusTransactionCellTable";
// import CustomPaymentMethodDisplay from "./custom/CustomPaymentMethodDisplay";

// const CustomTransactionTable = ({ tableData, loading }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <>
//       <TableContainer
//         component={Paper}
//         sx={{
//           overflowX: "auto",
//           borderRadius: 2,
//           boxShadow: "none",
//           border: `1px solid ${COLORS.border}`,
//         }}
//       >
//         <Table>
//           <TableHead className="bg-[#F1F1F1] border-b">
//             <TableRow>
//               <TableCell sx={cellHeadStyles}>ID</TableCell>
//               <TableCell sx={cellHeadStyles}>Customer Name</TableCell>
//               <TableCell sx={cellHeadStyles}>Payment Method</TableCell>
//               <TableCell sx={cellHeadStyles}>Date Created</TableCell>
//               <TableCell sx={cellHeadStyles}>Total Amount</TableCell>
//               <TableCell sx={cellHeadStyles}>Status</TableCell>
//               <TableCell sx={cellHeadStyles}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               // Skeleton loading state
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   {Array.from(new Array(7)).map((_, colIndex) => (
//                     <TableCell key={colIndex}>
//                       <Skeleton variant="rectangular" height={30} />
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : tableData.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={7}
//                   align="center"
//                   sx={{ paddingY: 5, paddingX: 1 }}
//                 >
//                   <Box
//                     display="flex"
//                     flexDirection="column"
//                     alignItems="center"
//                   >
//                     <img
//                       src={no_data}
//                       alt="No data"
//                       style={{ width: "150px" }}
//                     />
//                     <Typography
//                       variant="body1"
//                       sx={{ color: COLORS.primary, fontWeight: 500 }}
//                     >
//                       No available data
//                     </Typography>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               tableData
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((data) => (
//                   <TableRow
//                     key={data.transaction_id}
//                     className="border-b"
//                     role="checkbox"
//                     tabIndex={-1}
//                   >
//                     <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: "600", color: COLORS.secondary }}
//                       >
//                         #{data.transaction_id}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ paddingY: 2, paddingX: 4, maxWidth: 400 }}>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: "600", color: COLORS.text }}
//                       >
//                         {data.customer_fullname}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         sx={{
//                           fontWeight: "500",
//                           color:
//                             data.customer_type === "Online"
//                               ? COLORS.success
//                               : COLORS.error,
//                           marginTop: 1,
//                         }}
//                       >
//                         {data.customer_type}
//                       </Typography>
//                     </TableCell>

//                     <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                       <CustomPaymentMethodDisplay
//                         paymentMethod={data.payment_method}
//                       />
//                     </TableCell>
//                     <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                       <DateCell dateCreated={data.created_at} />
//                     </TableCell>
//                     <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                       <Typography
//                         variant="body2"
//                         sx={{ fontWeight: "600", color: COLORS.secondary }}
//                       >
//                         {data.total_amount}
//                       </Typography>
//                     </TableCell>
//                     <TableCell sx={{ paddingY: 2, paddingX: 4 }}>
//                       <StatusTransactionCellTable
//                         status={data.transaction_status}
//                       />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "center",
//                           alignItems: "center",
//                         }}
//                       >
//                         <Tooltip title="Collapse" arrow>
//                           <OutlinedIconButton>
//                             <CaretCircleDown
//                               color={COLORS.secondary}
//                               weight="duotone"
//                             />
//                           </OutlinedIconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={tableData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </>
//   );
// };
// export default CustomTransactionTable;

// const cellHeadStyles = {
//   paddingY: 2,
//   paddingX: 4,
//   textAlign: "left",
//   color: "#595959",
//   fontSize: "1",
//   fontWeight: 600,
//   textTransform: "uppercase",
// };
