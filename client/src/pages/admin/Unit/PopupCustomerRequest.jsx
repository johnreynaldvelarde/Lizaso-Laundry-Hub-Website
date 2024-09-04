import React, { useEffect, useState } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import {
  createTheme,
  ThemeProvider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Stack,
} from "@mui/material";

const PopupCustomerRequest = ({ open, onClose }) => {
  const { fetchCustomerRequestData, requestData } = useUnitMonitor();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const theme = createTheme({
    typography: {
      fontFamily: "Poppins",
    },
  });

  useEffect(() => {
    fetchCustomerRequestData();
  }, [fetchCustomerRequestData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the data to display on the current page
  const paginatedData = requestData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Customer Requests</DialogTitle>
      <DialogContent>
        <ThemeProvider theme={theme}>
          <Typography variant="body1" paragraph>
            Details of the customer requests:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.customer_fullname}</TableCell>
                    <TableCell>{request.service_type}</TableCell>
                    <TableCell>{request.request_date}</TableCell>
                    <TableCell>{request.request_status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAssign(request.id)}
                        sx={{
                          backgroundColor: "#5787C8",
                          borderRadius: "20px",
                          fontWeight: 500,
                          textTransform: "none",
                          paddingLeft: "23px",
                          paddingRight: "23px",
                          fontSize: "16px",
                          "&:hover": {
                            backgroundColor: "#3b5c9f",
                          },
                        }}
                      >
                        Assign
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={requestData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </ThemeProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Example function for handling the assign action
const handleAssign = (requestId) => {
  console.log(`Assign action clicked for request ID: ${requestId}`);
  // Add your assign logic here
};

export default PopupCustomerRequest;

// import React, { useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import {
//   createTheme,
//   ThemeProvider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const PopupCustomerRequest = ({ open, onClose }) => {
//   const { fetchCustomerRequestData, requestData } = useUnitMonitor();

//   const options = {
//     selectableRows: false,
//     elevation: 0,
//     rowsPerPage: 5,
//     rowsPerPageOptions: [5, 10, 20, 30],
//   };

//   const getMuiTheme = () => {
//     createTheme({
//       typography: {
//         fontFamily: "Poppins",
//       },
//     });
//   };

//   useEffect(() => {
//     fetchCustomerRequestData();
//   }, []);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Customer Requests</DialogTitle>
//       <DialogContent>
//         <Typography variant="body1" paragraph>
//           Details of the customer requests:
//         </Typography>
//         <ThemeProvider theme={getMuiTheme}></ThemeProvider>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupCustomerRequest;
// import React, { useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import {
//   createTheme,
//   ThemeProvider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const PopupCustomerRequest = ({ open, onClose }) => {
//   const { fetchCustomerRequestData, requestData } = useUnitMonitor();

//   const options = {
//     selectableRows: false,
//     elevation: 0,
//     rowsPerPage: 5,
//     rowsPerPageOptions: [5, 10, 20, 30],
//   };

//   // Return the theme object correctly
//   const getMuiTheme = createTheme({
//     typography: {
//       fontFamily: "Poppins",
//     },
//   });

//   useEffect(() => {
//     fetchCustomerRequestData();
//   }, []);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Customer Requests</DialogTitle>
//       <DialogContent>
//         <Typography variant="body1" paragraph>
//           Details of the customer requests:
//         </Typography>
//         <ThemeProvider theme={getMuiTheme}></ThemeProvider>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupCustomerRequest;
{
  /* <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Request Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requestData.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.customer_fullname}</TableCell>
                    <TableCell>{request.service_type}</TableCell>
                    <TableCell>{request.request_date}</TableCell>
                    <TableCell>{request.request_status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */
}

// import React, { useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import {
//   createTheme,
//   ThemeProvider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const PopupCustomerRequest = ({ open, onClose }) => {
//   const { fetchCustomerRequestData, requestData } = useUnitMonitor();

//   const theme = createTheme({
//     typography: {
//       fontFamily: "Poppins",
//     },
//   });

//   useEffect(() => {
//     fetchCustomerRequestData();
//   }, [fetchCustomerRequestData]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Customer Requests</DialogTitle>
//       <DialogContent>
//         <ThemeProvider theme={theme}>
//           <Typography variant="body1" paragraph>
//             Details of the customer requests:
//           </Typography>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Service Type</TableCell>
//                   <TableCell>Request Date</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {requestData.map((request) => (
//                   <TableRow key={request.id}>
//                     <TableCell>{request.customer_fullname}</TableCell>
//                     <TableCell>{request.service_type}</TableCell>
//                     <TableCell>{request.request_date}</TableCell>
//                     <TableCell>{request.request_status}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleAssign(request.id)}
//                       >
//                         Assign
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </ThemeProvider>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Example function for handling the assign action
// const handleAssign = (requestId) => {
//   console.log(`Assign action clicked for request ID: ${requestId}`);
//   // Add your assign logic here
// };

// export default PopupCustomerRequest;

// import React, { useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import {
//   createTheme,
//   ThemeProvider,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const PopupCustomerRequest = ({ open, onClose }) => {
//   const { fetchCustomerRequestData, requestData } = useUnitMonitor();

//   const theme = createTheme({
//     typography: {
//       fontFamily: "Poppins",
//     },
//   });

//   useEffect(() => {
//     fetchCustomerRequestData();
//   }, [fetchCustomerRequestData]);

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Customer Requests</DialogTitle>
//       <DialogContent>
//         <ThemeProvider theme={theme}>
//           <Typography variant="body1" paragraph>
//             Details of the customer requests:
//           </Typography>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Service Type</TableCell>
//                   <TableCell>Request Date</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Action</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {requestData.map((request) => (
//                   <TableRow key={request.id}>
//                     <TableCell>{request.customer_fullname}</TableCell>
//                     <TableCell>{request.service_type}</TableCell>
//                     <TableCell>{request.request_date}</TableCell>
//                     <TableCell>{request.request_status}</TableCell>
//                     <TableCell>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => handleAssign(request.id)}
//                       >
//                         Assign
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </ThemeProvider>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Example function for handling the assign action
// const handleAssign = (requestId) => {
//   console.log(`Assign action clicked for request ID: ${requestId}`);
//   // Add your assign logic here
// };

// export default PopupCustomerRequest;
