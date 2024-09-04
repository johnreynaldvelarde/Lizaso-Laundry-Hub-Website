// // import React from "react";
// // import {
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   Typography,
// // } from "@mui/material";

// // const PopupCustomerRequest = ({ open, onClose }) => {
// //   return (
// //     <Dialog open={open} onClose={onClose}>
// //       <DialogTitle>Customer Request</DialogTitle>
// //       <DialogContent>
// //         <Typography variant="body1">
// //           Details of the customer request go here.
// //         </Typography>
// //         {/* Add form or content for customer request */}
// //       </DialogContent>
// //       <DialogActions>
// //         <Button onClick={onClose}>Close</Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };

// // export default PopupCustomerRequest;
// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
// } from "@mui/material";

// const PopupCustomerRequest = ({ open, onClose }) => {
//   // Sample data for the table
//   const requests = [
//     {
//       id: 1,
//       name: "John Doe",
//       request: "Need urgent delivery",
//       status: "Pending",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       request: "Wash and fold service",
//       status: "Completed",
//     },
//     {
//       id: 3,
//       name: "Emily Johnson",
//       request: "Dry cleaning for suit",
//       status: "In Progress",
//     },
//   ];

//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
//       <DialogTitle>Customer Request</DialogTitle>
//       <DialogContent>
//         <Typography variant="body1" className="mb-4">
//           Details of the customer requests:
//         </Typography>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr className="w-full bg-gray-100 border-b border-gray-300">
//                 <th className="py-2 px-4 text-left text-gray-600">ID</th>
//                 <th className="py-2 px-4 text-left text-gray-600">Name</th>
//                 <th className="py-2 px-4 text-left text-gray-600">Request</th>
//                 <th className="py-2 px-4 text-left text-gray-600">Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {requests.map((request) => (
//                 <tr key={request.id} className="border-b border-gray-200">
//                   <td className="py-2 px-4 text-gray-700">{request.id}</td>
//                   <td className="py-2 px-4 text-gray-700">{request.name}</td>
//                   <td className="py-2 px-4 text-gray-700">{request.request}</td>
//                   <td className="py-2 px-4 text-gray-700">{request.status}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Close</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupCustomerRequest;
import React, { useEffect, useState } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import {
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
} from "@mui/material";

const PopupCustomerRequest = ({ open, onClose }) => {
  const { fetchCustomerRequestData, requestData } = useUnitMonitor();

  // useEffect(() => {
  //   fetchCustomerRequestData();
  // });

  // State to hold table data
  // const [requests, setRequests] = useState([
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     request: "Need urgent delivery",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     request: "Wash and fold service",
  //     status: "Completed",
  //   },
  //   {
  //     id: 3,
  //     name: "Emily Johnson",
  //     request: "Dry cleaning for suit",
  //     status: "In Progress",
  //   },
  // ]);

  // // Update data every second
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Simulate data update
  //     setRequests((prevRequests) =>
  //       prevRequests.map((item) => ({
  //         ...item,
  //         status:
  //           item.status === "Pending"
  //             ? "Completed"
  //             : item.status === "Completed"
  //             ? "In Progress"
  //             : "Pending",
  //       }))
  //     );
  //   }, 1000);

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Customer Requests</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Details of the customer requests:
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requestData.map((requestData) => (
                <TableRow key={requestData.id}>
                  {/* <TableCell>{requestData.id}</TableCell> */}
                  <TableCell>{requestData.customer_fullname}</TableCell>
                  <TableCell>{requestData.service_type}</TableCell>
                  <TableCell>{requestData.request_date}</TableCell>
                  <TableCell>{requestData.request_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupCustomerRequest;
