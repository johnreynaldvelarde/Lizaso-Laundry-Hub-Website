import React from "react";

const PopupInLaundry = () => {
  return <div></div>;
};

export default PopupInLaundry;

// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Paper,
//   Button,
// } from "@mui/material";
// import styles from "../../../styles/style";
// import { Link } from "react-router-dom";
// import {
//   CalendarDots,
//   SlidersHorizontal,
//   MinusSquare,
// } from "@phosphor-icons/react";
// import CloseIcon from "@mui/icons-material/Close";
// import nodata from "../../../assets/images/no_data.png";

// const PopupInLaundry = ({ open, onClose }) => {
//   // Sample data of customers in laundry
//   const customers = [
//     { id: 1, name: "John Doe", status: "Washing", timeInQueue: "30 minutes" },
//     { id: 2, name: "Jane Smith", status: "Drying", timeInQueue: "15 minutes" },
//     {
//       id: 3,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//   ];

//   const availableUnits = [
//     { id: 1, name: "Unit 1", status: 0 },
//     { id: 2, name: "Unit 2", status: 0 },
//     { id: 3, name: "Unit 3", status: 0 },
//     { id: 4, name: "Unit 4", status: 0 },
//     { id: 5, name: "Unit 4", status: 1 },
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       classes={{
//         paper: "rounded-lg shadow-lg",
//       }}
//     >
//       <DialogTitle className="flex flex-col">
//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold">In Progress Laundry</span>
//           <IconButton
//             onClick={onClose}
//             className="text-[#5787C8] hover:text-[#5787C8]"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">
//           Here you can track the status of laundry currently in progress.
//         </p>
//         <div className="mt-4 flex gap-2 justify-between">
//           <Link to="/main/schedule" style={{ textDecoration: "none" }}>
//             <Button
//               variant="outlined"
//               startIcon={
//                 <CalendarDots size={24} color="#5787C8" weight="duotone" />
//               }
//               sx={{
//                 borderRadius: "5px",
//                 fontWeight: 600,
//                 textTransform: "none",
//                 paddingLeft: "20px",
//                 paddingRight: "20px",
//                 fontSize: "16px",
//                 color: "#5787C8",
//                 borderColor: "#5787C8",
//                 "&:hover": {
//                   borderColor: "#5787C8",
//                   backgroundColor: "rgba(87, 135, 200, 0.1)",
//                 },
//               }}
//             >
//               View Schedule Details
//             </Button>
//           </Link>

//           <Button
//             variant="outlined"
//             startIcon={
//               <SlidersHorizontal size={24} color="#5787C8" weight="duotone" />
//             }
//             sx={{
//               borderRadius: "5px",
//               fontWeight: 600,
//               textTransform: "none",
//               paddingLeft: "20px",
//               paddingRight: "20px",
//               fontSize: "16px",
//               color: "#5787C8",
//               borderColor: "#5787C8",
//               "&:hover": {
//                 borderColor: "#5787C8",
//                 backgroundColor: "rgba(87, 135, 200, 0.1)",
//               },
//             }}
//           >
//             Mark
//           </Button>
//         </div>
//         <div className="flex items-center mt-6 ">
//           <span className="text-base font-semibold flex items-center">
//             Laundry Units
//             <span className="ml-4 flex items-center">
//               <span className="px-3 py-1 rounded-full border-2 border-[#0ba360]  text-[#0ba360] bg-[#3cba92] bg-opacity-10 font-normal mr-2">
//                 Available
//               </span>
//               <span className="px-3 py-1 rounded-full border-2 border-[#eb3941] bg-[#f15e64] bg-opacity-10 text-[#eb3941] font-normal">
//                 Occupied
//               </span>
//             </span>
//           </span>
//         </div>
//         <div>
//           <div className="mt-4 flex overflow-x-auto space-x-3 hori-scrollable">
//             {availableUnits.map((unit) => (
//               <div
//                 key={unit.id}
//                 className={`flex-shrink-0 p-4 rounded-lg min-w-[100px] text-center mb-1 ${
//                   unit.status === 0
//                     ? "bg-gradient-to-r from-[#0ba360] to-[#3cba92] text-white"
//                     : "bg-gradient-to-r from-[#B4162C] to-[#e14e53] text-white"
//                 }`}
//                 EA384D
//               >
//                 <span className="text-base block font-medium text-white">
//                   {unit.name}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </DialogTitle>

//       <DialogContent className="bg-white px-4 py-6">
//         {customers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-sm">
//             <img
//               src={nodata} // Update with the correct path
//               alt="No Data"
//               className="w-32 h-32 mb-4"
//             />
//             <p
//               className="text-base font-semibold"
//               style={{ color: styles.textColor2 }}
//             >
//               No data available at the moment
//             </p>
//           </div>
//         ) : (
//           <ul className="space-y-4">
//             {customers.map((customer) => (
//               <Paper
//                 key={customer.id}
//                 sx={{
//                   padding: 2,
//                   boxShadow: "none !important",
//                   borderRadius: "10px",
//                   borderStyle: "solid",
//                   borderWidth: "1px",
//                   borderColor: "divider",
//                 }}
//                 className="flex justify-between items-center"
//               >
//                 <div>
//                   <h3 className="text-lg font-semibold">{customer.name}</h3>
//                   <p className="text-sm">
//                     <span className="font-normal">Service Type:</span>
//                     <span className="font-normal"> {customer.status}</span>
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Time in Queue: {customer.timeInQueue}
//                   </p>
//                 </div>
//                 <div className="flex gap-1">
//                   <Button
//                     variant="contained"
//                     disableElevation
//                     color="primary"
//                     size="small"
//                     className="ml-4"
//                     sx={{
//                       backgroundColor: "#5787C8",
//                       borderRadius: "5px",
//                       fontWeight: 500,
//                       textTransform: "none",
//                       "&:hover": {
//                         backgroundColor: "#3A5A85",
//                       },
//                     }}
//                   >
//                     Assign
//                   </Button>
//                   <IconButton>
//                     <MinusSquare size={20} color="#DB524B" weight="duotone" />
//                   </IconButton>
//                 </div>
//               </Paper>
//             ))}
//           </ul>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PopupInLaundry;

{
  /* <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
            onClick={() => console.log("View Details Clicked")}
          >
            View Details
          </button> */
}
{
  /* <button
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            onClick={() => console.log("Mark as Complete Clicked")}
          >
            Mark as Complete
          </button> */
}

// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Paper,
//   Button,
// } from "@mui/material";
// import styles from "../../../styles/style";
// import CloseIcon from "@mui/icons-material/Close";
// import nodata from "../../../assets/images/no_data.png";

// const PopupInLaundry = ({ open, onClose }) => {
//   // Sample data of customers in laundry
//   const customers = [
//     // Uncomment or add more sample data if needed
//     { id: 1, name: "John Doe", status: "Washing", timeInQueue: "30 minutes" },
//     { id: 2, name: "Jane Smith", status: "Drying", timeInQueue: "15 minutes" },
//     {
//       id: 3,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       classes={{
//         paper: "rounded-lg shadow-lg",
//       }}
//     >
//       <DialogTitle className="flex flex-col">
//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold">In Progress Laundry</span>
//           <IconButton
//             onClick={onClose}
//             className="text-red-500 hover:text-red-700"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">
//           Here you can track the status of laundry currently in progress.
//         </p>
//         <div className="mt-4 flex gap-2">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
//             onClick={() => console.log("View Details Clicked")}
//           >
//             View Details
//           </button>
//           <button
//             className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
//             onClick={() => console.log("Mark as Complete Clicked")}
//           >
//             Mark as Complete
//           </button>
//         </div>
//       </DialogTitle>

//       <DialogContent className="bg-white px-4 py-6">
//         {customers.length === 0 ? (
//           <div className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg shadow-sm">
//             <img
//               src={nodata} // Update with the correct path
//               alt="No Data"
//               className="w-32 h-32 mb-4"
//             />
//             <p
//               className="text-base font-semibold"
//               style={{ color: styles.textColor2 }}
//             >
//               No data available at the moment
//             </p>
//           </div>
//         ) : (
//           <ul className="space-y-4">
//             {customers.map((customer) => (
//               <Paper
//                 key={customer.id}
//                 sx={{
//                   padding: 2,
//                   boxShadow: "none !important",
//                   borderRadius: "10px",
//                   borderStyle: "solid",
//                   borderWidth: "1px",
//                   borderColor: "divider",
//                 }}
//                 className="flex justify-between items-center"
//               >
//                 <div>
//                   <h3 className="text-lg font-semibold">{customer.name}</h3>
//                   <p className="text-sm text-gray-600">
//                     Status: {customer.status}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     Time in Queue: {customer.timeInQueue}
//                   </p>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     size="small"
//                     className="ml-4"
//                   >
//                     Finish
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="secondary"
//                     size="small"
//                     className="ml-2"
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </Paper>
//             ))}
//           </ul>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PopupInLaundry;

// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Paper,
//   Button,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const PopupInLaundry = ({ open, onClose }) => {
//   // Sample data of customers in laundry
//   const customers = [
//     { id: 1, name: "John Doe", status: "Washing", timeInQueue: "30 minutes" },
//     { id: 2, name: "Jane Smith", status: "Drying", timeInQueue: "15 minutes" },
//     {
//       id: 3,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },

//     // Additional sample data...
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       classes={{
//         paper: "rounded-lg shadow-lg",
//       }}
//     >
//       <DialogTitle className="flex flex-col">
//         <div className="flex justify-between items-center">
//           <span className="text-lg font-semibold">In Progress Laundry</span>
//           <IconButton
//             onClick={onClose}
//             className="text-red-500 hover:text-red-700"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//         <p className="mt-2 text-sm text-gray-600">
//           Here you can track the status of laundry currently in progress.
//         </p>
//         <div className="mt-4 flex gap-2">
//           <button
//             className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
//             onClick={() => console.log("View Details Clicked")}
//           >
//             View Details
//           </button>
//           <button
//             className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
//             onClick={() => console.log("Mark as Complete Clicked")}
//           >
//             Mark as Complete
//           </button>
//         </div>
//       </DialogTitle>

//       <DialogContent className="bg-white px-4 py-6">
//         <ul className="space-y-4">
//           {customers.map((customer) => (
//             <Paper
//               key={customer.id}
//               sx={{
//                 padding: 2,
//                 boxShadow: "none !important",
//                 borderRadius: "10px",
//                 borderStyle: "solid",
//                 borderWidth: "1px",
//                 borderColor: "divider",
//               }}
//               className="flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="text-lg font-semibold">{customer.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Status: {customer.status}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Time in Queue: {customer.timeInQueue}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="small"
//                   className="ml-4"
//                 >
//                   Finish
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   size="small"
//                   className="ml-2"
//                 >
//                   Delete
//                 </Button>
//               </div>
//             </Paper>
//           ))}
//         </ul>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PopupInLaundry;

// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   IconButton,
//   Paper,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const PopupInLaundry = ({ open, onClose }) => {
//   // Sample data of customers in laundry
//   const customers = [
//     { id: 1, name: "John Doe", status: "Washing", timeInQueue: "30 minutes" },
//     { id: 2, name: "Jane Smith", status: "Drying", timeInQueue: "15 minutes" },
//     {
//       id: 3,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 5,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 6,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 7,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 8,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 9,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 10,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//     {
//       id: 11,
//       name: "Michael Johnson",
//       status: "Waiting",
//       timeInQueue: "45 minutes",
//     },
//   ];

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       fullWidth
//       maxWidth="sm"
//       classes={{
//         paper: "rounded-lg shadow-lg", // Tailwind customizations on the modal paper
//       }}
//     >
//       <DialogTitle className="flex justify-between items-center">
//         <span className="text-lg font-bold">Laundry Queue</span>
//         <IconButton
//           onClick={onClose}
//           className="text-red-500 hover:text-red-700"
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent className="bg-white px-4 py-6">
//         <ul className="space-y-4">
//           {customers.map((customer) => (
//             <Paper
//               key={customer.id}
//               sx={{
//                 padding: 2,
//                 boxShadow: "none !important",
//                 borderRadius: "10px",
//                 borderStyle: "solid",
//                 borderWidth: "1px",
//                 borderColor: "divider",
//               }}
//               // className="p-4 border border-gray-100 rounded-lg"
//             >
//               <h3 className="text-lg font-semibold">{customer.name}</h3>
//               <p className="text-sm text-gray-600">Status: {customer.status}</p>
//               <p className="text-sm text-gray-600">
//                 Time in Queue: {customer.timeInQueue}
//               </p>
//             </Paper>
//           ))}
//         </ul>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default PopupInLaundry;

// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
// } from "@mui/material";

// const PopupInLaundry = ({ open, onClose }) => {
//   return (
//     <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogContent>
//         <Typography variant="h6">In Progress</Typography>
//         {/* Add more content as needed */}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupInLaundry;

const customers = [
  { id: 1, name: "John Doe", status: "Washing", timeInQueue: "30 minutes" },
  { id: 2, name: "Jane Smith", status: "Drying", timeInQueue: "15 minutes" },
  {
    id: 3,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 5,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 6,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 7,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 8,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 9,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 10,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
  {
    id: 11,
    name: "Michael Johnson",
    status: "Waiting",
    timeInQueue: "45 minutes",
  },
];
