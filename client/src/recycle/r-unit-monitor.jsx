// import { Box, Button, Typography } from "@mui/material";
// import styles from "../../../styles/style";
// import React from "react";

// // images
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";

// const UnitMonitor = () => {
//   const laundryUnits = [
//     { id: 1, name: "Unit 1", status: "Available" },
//     { id: 2, name: "Unit 2", status: "Occupied" },
//     { id: 3, name: "Unit 3", status: "Reserved" },
//     { id: 4, name: "Unit 4", status: "Available" },
//     { id: 5, name: "Unit 5", status: "Occupied" },
//     { id: 6, name: "Unit 6", status: "Reserved" },
//     { id: 7, name: "Unit 7", status: "Available" },
//     { id: 8, name: "Unit 8", status: "Occupied" },
//     { id: 9, name: "Unit 9", status: "Reserved" },
//     { id: 10, name: "Unit 10", status: "Available" },
//   ];

//   const getImage = (status) => {
//     switch (status) {
//       case "Available":
//         return Available;
//       case "Occupied":
//         return Occupied;
//       case "Reserved":
//         return Reserved;
//       default:
//         return Available;
//     }
//   };

//   return (
//     <Box sx={{ pt: "80px", pb: "20px", px: { xs: 1, md: 2 } }}>
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px", // Space between boxes
//           justifyContent: "flex-start", // Align boxes to the start
//         }}
//       >
//         {laundryUnits.map((unit) => (
//           <Box
//             key={unit.id}
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               backgroundColor: "white",
//               border: "1px solid #ccc",
//               borderRadius: "20px",
//               p: 2,
//               textAlign: "center",
//               width: "249px", // Fixed width
//               height: "341px", // Fixed height
//               position: "relative",
//               boxSizing: "border-box",
//               overflow: "hidden", // Prevent content from overflowing
//             }}
//           >
//             <Typography
//               variant="h6"
//               sx={{
//                 position: "absolute",
//                 top: 15,
//                 left: 20,
//                 fontWeight: "600",
//                 color: styles.textColor2,
//               }}
//             >
//               {unit.name}
//             </Typography>
//             <img
//               src={getImage(unit.status)}
//               alt={unit.name}
//               style={{
//                 width: "170px", // Fixed width for image
//                 height: "auto", // Maintain aspect ratio
//                 maxHeight: "calc(341px - 80px)", // Ensure image fits within the box (adjusting for padding and title)
//                 objectFit: "contain", // Ensure the image is contained within its box
//                 marginTop: "20px",
//               }}
//             />
//             <Button
//               variant="contained"
//               sx={{
//                 borderRadius: "20px",
//                 position: "absolute",
//                 bottom: 25,
//                 width: "80%", // Fixed width for the button
//                 backgroundColor:
//                   unit.status === "Available"
//                     ? "#4690FF"
//                     : unit.status === "Occupied"
//                     ? "#B4162C"
//                     : "yellow",
//                 color: unit.status === "Reserved" ? "black" : "white",
//                 "&:hover": {
//                   backgroundColor:
//                     unit.status === "Available"
//                       ? "#3576CC"
//                       : unit.status === "Occupied"
//                       ? "#8B1A2C"
//                       : "gold",
//                 },
//               }}
//             >
//               {unit.status === "Available"
//                 ? "Select"
//                 : unit.status === "Occupied"
//                 ? "In Use"
//                 : "Reserved"}
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default UnitMonitor;

import { Box, Button, Grid, Typography } from "@mui/material";
// import styles from "../../../styles/style";
// import React from "react";

// // images
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";

// const UnitMonitor = () => {
//   const laundryUnits = [
//     { id: 1, name: "Unit 1", status: "Available" },
//     { id: 2, name: "Unit 2", status: "Occupied" },
//     { id: 3, name: "Unit 3", status: "Reserved" },
//     { id: 4, name: "Unit 4", status: "Available" },
//     { id: 5, name: "Unit 5", status: "Occupied" },
//     { id: 6, name: "Unit 6", status: "Reserved" },
//     { id: 7, name: "Unit 7", status: "Available" },
//     { id: 8, name: "Unit 8", status: "Occupied" },
//     { id: 9, name: "Unit 9", status: "Reserved" },
//     { id: 10, name: "Unit 10", status: "Available" },
//   ];

//   const getImage = (status) => {
//     switch (status) {
//       case "Available":
//         return Available;
//       case "Occupied":
//         return Occupied;
//       case "Reserved":
//         return Reserved;
//       default:
//         return Available;
//     }
//   };

//   return (
//     <Box sx={{ pt: "80px", pb: "20px", px: { xs: 1, md: 2 } }}>
//       <Grid container spacing={1} justifyContent="flex">
//         {" "}
//         {/* Center items in the grid */}
//         {laundryUnits.map((unit) => (
//           <Grid item key={unit.id}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "white",
//                 border: "1px solid #ccc",
//                 borderRadius: "20px",
//                 p: 2,
//                 textAlign: "center",
//                 width: "249px", // Fixed width
//                 height: "341px", // Fixed height
//                 position: "relative",
//                 boxSizing: "border-box",
//                 overflow: "hidden", // Prevent content from overflowing
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   position: "absolute",
//                   top: 15,
//                   left: 20,
//                   fontWeight: "600",
//                   color: styles.textColor2,
//                 }}
//               >
//                 {unit.name}
//               </Typography>
//               <img
//                 src={getImage(unit.status)}
//                 alt={unit.name}
//                 style={{
//                   width: "170px", // Fixed width for image
//                   height: "auto", // Maintain aspect ratio
//                   maxHeight: "calc(341px - 80px)", // Ensure image fits within the box (adjusting for padding and title)
//                   objectFit: "contain", // Ensure the image is contained within its box
//                   marginTop: "20px",
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{
//                   borderRadius: "20px",
//                   position: "absolute",
//                   bottom: 25,
//                   width: "80%", // Fixed width for the button
//                   backgroundColor:
//                     unit.status === "Available"
//                       ? "#4690FF"
//                       : unit.status === "Occupied"
//                       ? "#B4162C"
//                       : "yellow",
//                   color: unit.status === "Reserved" ? "black" : "white",
//                   "&:hover": {
//                     backgroundColor:
//                       unit.status === "Available"
//                         ? "#3576CC"
//                         : unit.status === "Occupied"
//                         ? "#8B1A2C"
//                         : "gold",
//                   },
//                 }}
//               >
//                 {unit.status === "Available"
//                   ? "Select"
//                   : unit.status === "Occupied"
//                   ? "In Use"
//                   : "Reserved"}
//               </Button>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default UnitMonitor;

// import { Box, Button, Grid, Typography, TextField } from "@mui/material";
// import styles from "../../../styles/style";
// import React, { useState } from "react";

// // images
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";

// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

// const UnitMonitor = () => {
//   const {} = useUnitMonitor();

//   const laundryUnits = [
//     { id: 1, name: "Unit 1", status: "Available" },
//     { id: 2, name: "Unit 2", status: "Occupied" },
//     { id: 3, name: "Unit 3", status: "Reserved" },
//     { id: 4, name: "Unit 4", status: "Available" },
//     { id: 5, name: "Unit 5", status: "Occupied" },
//     { id: 6, name: "Unit 6", status: "Reserved" },
//     { id: 7, name: "Unit 7", status: "Available" },
//     { id: 8, name: "Unit 8", status: "Occupied" },
//     { id: 9, name: "Unit 9", status: "Reserved" },
//     { id: 10, name: "Unit 10", status: "Available" },
//   ];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUnits, setFilteredUnits] = useState(laundryUnits);

//   const getImage = (status) => {
//     switch (status) {
//       case "Available":
//         return Available;
//       case "Occupied":
//         return Occupied;
//       case "Reserved":
//         return Reserved;
//       default:
//         return Available;
//     }
//   };

//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     setFilteredUnits(
//       laundryUnits.filter((unit) =>
//         unit.name.toLowerCase().includes(value.toLowerCase())
//       )
//     );
//   };

//   return (
//     <Box sx={{ pt: "90px", pb: "20px", px: { xs: 1, md: 2 } }}>
//       <Box
//         sx={{
//           mb: 3,
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <TextField
//           variant="outlined"
//           placeholder="Search units..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           sx={{ width: "100%", maxWidth: "400px" }}
//         />
//         <Button
//           variant="contained"
//           sx={{
//             ml: 2,
//             backgroundColor: "#28a745",
//             "&:hover": { backgroundColor: "#218838" },
//           }}
//         >
//           Add
//         </Button>
//       </Box>

//       <Grid container spacing={1}>
//         {filteredUnits.map((unit) => (
//           <Grid item key={unit.id}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: "white",
//                 border: "1px solid #ccc",
//                 borderRadius: "20px",
//                 p: 2,
//                 textAlign: "center",
//                 width: "249px",
//                 height: "341px",
//                 position: "relative",
//                 boxSizing: "border-box",
//                 overflow: "hidden",
//               }}
//             >
//               <Typography
//                 variant="h6"
//                 sx={{
//                   position: "absolute",
//                   top: 15,
//                   left: 20,
//                   fontWeight: "600",
//                   color: styles.textColor2,
//                 }}
//               >
//                 {unit.name}
//               </Typography>
//               <img
//                 src={getImage(unit.status)}
//                 alt={unit.name}
//                 style={{
//                   width: "170px",
//                   height: "auto",
//                   maxHeight: "calc(341px - 80px)",
//                   objectFit: "contain",
//                   marginTop: "20px",
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 sx={{
//                   borderRadius: "20px",
//                   position: "absolute",
//                   bottom: 25,
//                   width: "80%",
//                   backgroundColor:
//                     unit.status === "Available"
//                       ? "#4690FF"
//                       : unit.status === "Occupied"
//                       ? "#B4162C"
//                       : "yellow",
//                   color: unit.status === "Reserved" ? "black" : "white",
//                   "&:hover": {
//                     backgroundColor:
//                       unit.status === "Available"
//                         ? "#3576CC"
//                         : unit.status === "Occupied"
//                         ? "#8B1A2C"
//                         : "gold",
//                   },
//                 }}
//               >
//                 {unit.status === "Available"
//                   ? "Select"
//                   : unit.status === "Occupied"
//                   ? "In Use"
//                   : "Reserved"}
//               </Button>
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default UnitMonitor;
