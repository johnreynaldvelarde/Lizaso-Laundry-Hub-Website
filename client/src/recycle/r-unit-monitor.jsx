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

// import { Box, Button, Grid, Typography, TextField } from "@mui/material";
// import React, { useState } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

// // images
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import In_Maintaince from "../../../assets/images/Not_Available.png";

// const UnitMonitor = () => {
//   const { unitsData, loading, error } = useUnitMonitor();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUnits, setFilteredUnits] = useState([]);

//   // Filter units based on the search term
//   React.useEffect(() => {
//     setFilteredUnits(
//       unitsData.filter((unit) =>
//         unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, unitsData]);

//   const getImage = (status) => {
//     switch (status) {
//       case 0: // Available
//         return Available;
//       case 1: // Occupied
//         return Occupied;
//       case 2: // Reserved
//         return Reserved;
//       case 3: // In Maintenance
//         return In_Maintaince;
//       default:
//         return Available; // Fallback image if status is unknown
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

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
//                   color: "text.secondary", // Adjust color based on your styles
//                 }}
//               >
//                 {unit.unit_name}
//               </Typography>
//               <img
//                 src={getImage(unit.isUnitStatus)}
//                 alt={unit.unit_name}
//                 style={{
//                   width: "170px",
//                   height: "auto",
//                   maxHeight: "calc(341px - 80px)",
//                   objectFit: "contain",
//                   marginTop: "10px",
//                   marginBottom: "30px",
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
//                     unit.isUnitStatus === 0
//                       ? "#4690FF" // Blue for Available
//                       : unit.isUnitStatus === 1
//                       ? "#B4162C" // Red for Occupied
//                       : unit.isUnitStatus === 2
//                       ? "#FFA500" // Orange for Reserved
//                       : unit.isUnitStatus === 3
//                       ? "gray" // Gray for In Maintenance
//                       : "gray", // Default to gray for any unknown status
//                   color: "white", // White text color for all statuses
//                   "&:hover": {
//                     backgroundColor:
//                       unit.isUnitStatus === 0
//                         ? "#3576CC" // Darker blue for Available
//                         : unit.isUnitStatus === 1
//                         ? "#8B1A2C" // Darker red for Occupied
//                         : unit.isUnitStatus === 2
//                         ? "#FF8C00" // Darker orange for Reserved
//                         : unit.isUnitStatus === 3
//                         ? "darkgray" // Darker gray for In Maintenance
//                         : "darkgray", // Default to dark gray for any unknown status
//                   },
//                   fontSize: "1rem",
//                   fontWeight: 500,
//                 }}
//               >
//                 {unit.isUnitStatus === 0
//                   ? "Select"
//                   : unit.isUnitStatus === 1
//                   ? "Occupied"
//                   : unit.isUnitStatus === 2
//                   ? "Reserved"
//                   : unit.isUnitStatus === 3
//                   ? "In Maintenance"
//                   : "Unknown"}
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
// import SelectUnit from "./SelectUnit";
// import React, { useState, useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

// // images
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import In_Maintaince from "../../../assets/images/Not_Available.png";
// import noData from "../../../assets/images/no_data.png";

// const UnitMonitor = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(null);

//   const handleOpenDialog = (unit) => {
//     setSelectedUnit(unit);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUnit(null);
//   };

//   const { unitsData, loading, error } = useUnitMonitor();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUnits, setFilteredUnits] = useState([]);

//   useEffect(() => {
//     if (unitsData) {
//       setFilteredUnits(
//         unitsData.filter((unit) =>
//           unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//   }, [searchTerm, unitsData]);

//   const getImage = (status) => {
//     switch (status) {
//       case 0: // Available
//         return Available;
//       case 1: // Occupied
//         return Occupied;
//       case 2: // Reserved
//         return Reserved;
//       case 3: // In Maintenance
//         return In_Maintaince;
//       default:
//         return In_Maintaince; // Use the "Not Available" image for unknown statuses
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

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

//       {filteredUnits.length === 0 ? (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "calc(100vh - 400px)", // Adjust height based on your layout
//             textAlign: "center",
//             mt: 4, // Margin-top for spacing above the message
//           }}
//         >
//           <img
//             src={noData}
//             alt="No data"
//             style={{
//               width: "600px", // Adjust width as needed
//               height: "auto",
//               marginBottom: "5px", // Space between image and text
//             }}
//           />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 600,
//               color: "text.secondary",
//               fontSize: "2rem",
//             }}
//           >
//             No units available
//           </Typography>
//         </Box>
//       ) : (
//         <Grid container spacing={1}>
//           {filteredUnits.map((unit) => (
//             <Grid item key={unit.id}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "white",
//                   border: "1px solid #ccc",
//                   borderRadius: "20px",
//                   p: 2,
//                   textAlign: "center",
//                   width: "249px",
//                   height: "341px",
//                   position: "relative",
//                   boxSizing: "border-box",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     position: "absolute",
//                     top: 15,
//                     left: 20,
//                     fontWeight: "600",
//                     color: "text.secondary",
//                   }}
//                 >
//                   {unit.unit_name}
//                 </Typography>
//                 <img
//                   src={getImage(unit.isUnitStatus)}
//                   alt={unit.unit_name}
//                   style={{
//                     width: "170px",
//                     height: "auto",
//                     maxHeight: "calc(341px - 80px)", // Adjust as needed
//                     objectFit: "contain",
//                     marginTop: "10px",
//                     marginBottom: "30px",
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   sx={{
//                     borderRadius: "20px",
//                     position: "absolute",
//                     bottom: 25,
//                     width: "80%",
//                     backgroundColor:
//                       unit.isUnitStatus === 0
//                         ? "#4690FF" // Blue for Available
//                         : unit.isUnitStatus === 1
//                         ? "#B4162C" // Red for Occupied
//                         : unit.isUnitStatus === 2
//                         ? "#FFA500" // Orange for Reserved
//                         : unit.isUnitStatus === 3
//                         ? "gray" // Gray for In Maintenance
//                         : "gray", // Default to gray for any unknown status
//                     color: "white", // White text color for all statuses
//                     "&:hover": {
//                       backgroundColor:
//                         unit.isUnitStatus === 0
//                           ? "#3576CC" // Darker blue for Available
//                           : unit.isUnitStatus === 1
//                           ? "#8B1A2C" // Darker red for Occupied
//                           : unit.isUnitStatus === 2
//                           ? "#FF8C00" // Darker orange for Reserved
//                           : unit.isUnitStatus === 3
//                           ? "darkgray" // Darker gray for In Maintenance
//                           : "darkgray", // Default to dark gray for any unknown status
//                     },
//                     fontSize: "1rem",
//                     fontWeight: 500,
//                   }}
//                   onClick={() => handleOpenDialog(unit)}
//                 >
//                   {unit.isUnitStatus === 0
//                     ? "Select"
//                     : unit.isUnitStatus === 1
//                     ? "Occupied"
//                     : unit.isUnitStatus === 2
//                     ? "Reserved"
//                     : unit.isUnitStatus === 3
//                     ? "In Maintenance"
//                     : "Unknown"}
//                 </Button>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default UnitMonitor;

// import { Box, Button, Grid, Typography, TextField } from "@mui/material";
// import SelectUnit from "./SelectUnit";
// import React, { useState, useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

// // images
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import In_Maintaince from "../../../assets/images/Not_Available.png";
// import noData from "../../../assets/images/no_data.png";

// const UnitMonitor = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(null);

//   const handleOpenDialog = (unit) => {
//     setSelectedUnit(unit);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUnit(null);
//   };

//   const { unitsData, loading, error } = useUnitMonitor();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUnits, setFilteredUnits] = useState([]);

//   useEffect(() => {
//     if (unitsData) {
//       setFilteredUnits(
//         unitsData.filter((unit) =>
//           unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//       );
//     }
//   }, [searchTerm, unitsData]);

//   const getImage = (status) => {
//     switch (status) {
//       case 0: // Available
//         return Available;
//       case 1: // Occupied
//         return Occupied;
//       case 2: // Reserved
//         return Reserved;
//       case 3: // In Maintenance
//         return In_Maintaince;
//       default:
//         return In_Maintaince; // Use the "Not Available" image for unknown statuses
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

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

//       {filteredUnits.length === 0 ? (
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             height: "calc(100vh - 400px)", // Adjust height based on your layout
//             textAlign: "center",
//             mt: 4, // Margin-top for spacing above the message
//           }}
//         >
//           <img
//             src={noData}
//             alt="No data"
//             style={{
//               width: "600px", // Adjust width as needed
//               height: "auto",
//               marginBottom: "5px", // Space between image and text
//             }}
//           />
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 600,
//               color: "text.secondary",
//               fontSize: "2rem",
//             }}
//           >
//             No units available
//           </Typography>
//         </Box>
//       ) : (
//         <Grid container spacing={1}>
//           {filteredUnits.map((unit) => (
//             <Grid item key={unit.id}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "white",
//                   border: "1px solid #ccc",
//                   borderRadius: "20px",
//                   p: 2,
//                   textAlign: "center",
//                   width: "249px",
//                   height: "341px",
//                   position: "relative",
//                   boxSizing: "border-box",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     position: "absolute",
//                     top: 15,
//                     left: 20,
//                     fontWeight: "600",
//                     color: "text.secondary",
//                   }}
//                 >
//                   {unit.unit_name}
//                 </Typography>
//                 <img
//                   src={getImage(unit.isUnitStatus)}
//                   alt={unit.unit_name}
//                   style={{
//                     width: "170px",
//                     height: "auto",
//                     maxHeight: "calc(341px - 80px)", // Adjust as needed
//                     objectFit: "contain",
//                     marginTop: "10px",
//                     marginBottom: "30px",
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   sx={{
//                     borderRadius: "20px",
//                     position: "absolute",
//                     bottom: 25,
//                     width: "80%",
//                     backgroundColor:
//                       unit.isUnitStatus === 0
//                         ? "#4690FF" // Blue for Available
//                         : unit.isUnitStatus === 1
//                         ? "#B4162C" // Red for Occupied
//                         : unit.isUnitStatus === 2
//                         ? "#FFA500" // Orange for Reserved
//                         : unit.isUnitStatus === 3
//                         ? "gray" // Gray for In Maintenance
//                         : "gray", // Default to gray for any unknown status
//                     color: "white", // White text color for all statuses
//                     "&:hover": {
//                       backgroundColor:
//                         unit.isUnitStatus === 0
//                           ? "#3576CC" // Darker blue for Available
//                           : unit.isUnitStatus === 1
//                           ? "#8B1A2C" // Darker red for Occupied
//                           : unit.isUnitStatus === 2
//                           ? "#FF8C00" // Darker orange for Reserved
//                           : unit.isUnitStatus === 3
//                           ? "darkgray" // Darker gray for In Maintenance
//                           : "darkgray", // Default to dark gray for any unknown status
//                     },
//                     fontSize: "1rem",
//                     fontWeight: 500,
//                   }}
//                   onClick={() => handleOpenDialog(unit)}
//                 >
//                   {unit.isUnitStatus === 0
//                     ? "Select"
//                     : unit.isUnitStatus === 1
//                     ? "Occupied"
//                     : unit.isUnitStatus === 2
//                     ? "Reserved"
//                     : unit.isUnitStatus === 3
//                     ? "In Maintenance"
//                     : "Unknown"}
//                 </Button>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// };

// export default UnitMonitor;

// import React, { useState } from "react";
// import { Box, Button, Grid, Typography, TextField } from "@mui/material";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import PopupSelectUnit from "./PopupSelectUnit";
// import PopupCustomerRequest from "./PopupCustomerRequest";
// import PopupInProgress from "./PopupInProgress";
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import In_Maintaince from "../../../assets/images/Not_Available.png";
// import noData from "../../../assets/images/no_data.png";

// const UnitMonitor = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
//   const [openInProgress, setOpenInProgress] = useState(false);

//   const handleOpenDialog = (unit) => {
//     setSelectedUnit(unit);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUnit(null);
//   };

//   const handleOpenCustomerRequest = () => {
//     setOpenCustomerRequest(true);
//   };

//   const handleCloseCustomerRequest = () => {
//     setOpenCustomerRequest(false);
//   };

//   const handleOpenInProgress = () => {
//     setOpenInProgress(true);
//   };

//   const handleCloseInProgress = () => {
//     setOpenInProgress(false);
//   };

//   const { unitsData, loading, error } = useUnitMonitor();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUnits, setFilteredUnits] = useState([]);

//   React.useEffect(() => {
//     setFilteredUnits(
//       unitsData.filter((unit) =>
//         unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, unitsData]);

//   const getImage = (status) => {
//     switch (status) {
//       case 0:
//         return Available;
//       case 1:
//         return Occupied;
//       case 2:
//         return Reserved;
//       case 3:
//         return In_Maintaince;
//       default:
//         return Available;
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

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
//         <Box>
//           <Button
//             variant="contained"
//             sx={{
//               ml: 2,
//               backgroundColor: "#28a745",
//               "&:hover": { backgroundColor: "#218838" },
//             }}
//             onClick={handleOpenCustomerRequest}
//           >
//             Customer Request
//           </Button>
//           <Button
//             variant="contained"
//             sx={{
//               ml: 2,
//               backgroundColor: "#17a2b8",
//               "&:hover": { backgroundColor: "#117a8b" },
//             }}
//             onClick={handleOpenInProgress}
//           >
//             In Progress
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={1} sx={{ height: "100%" }}>
//         {filteredUnits.length === 0 ? (
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "calc(100vh - 400px)",
//                 textAlign: "center",
//               }}
//             >
//               <img
//                 src={noData}
//                 alt="No data"
//                 style={{
//                   width: "500px",
//                   height: "auto",
//                   marginBottom: "20px",
//                 }}
//               />
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 600,
//                   color: "text.secondary",
//                   fontSize: "1.5rem",
//                 }}
//               >
//                 No units available
//               </Typography>
//             </Box>
//           </Grid>
//         ) : (
//           filteredUnits.map((unit) => (
//             <Grid item key={unit.id}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "white",
//                   border: "1px solid #ccc",
//                   borderRadius: "20px",
//                   p: 2,
//                   textAlign: "center",
//                   width: "249px",
//                   height: "341px",
//                   position: "relative",
//                   boxSizing: "border-box",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     position: "absolute",
//                     top: 15,
//                     left: 20,
//                     fontWeight: 600,
//                     color: "text.secondary",
//                   }}
//                 >
//                   {unit.unit_name}
//                 </Typography>
//                 <img
//                   src={getImage(unit.isUnitStatus)}
//                   alt={unit.unit_name}
//                   style={{
//                     width: "170px",
//                     height: "auto",
//                     maxHeight: "calc(341px - 80px)",
//                     objectFit: "contain",
//                     marginTop: "10px",
//                     marginBottom: "30px",
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   sx={{
//                     borderRadius: "20px",
//                     position: "absolute",
//                     bottom: 25,
//                     width: "80%",
//                     backgroundColor:
//                       unit.isUnitStatus === 0
//                         ? "#4690FF"
//                         : unit.isUnitStatus === 1
//                         ? "#B4162C"
//                         : unit.isUnitStatus === 2
//                         ? "#FFA500"
//                         : unit.isUnitStatus === 3
//                         ? "gray"
//                         : "gray",
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor:
//                         unit.isUnitStatus === 0
//                           ? "#3576CC"
//                           : unit.isUnitStatus === 1
//                           ? "#8B1A2C"
//                           : unit.isUnitStatus === 2
//                           ? "#FF8C00"
//                           : unit.isUnitStatus === 3
//                           ? "darkgray"
//                           : "darkgray",
//                     },
//                     fontSize: "1rem",
//                     fontWeight: 500,
//                   }}
//                   onClick={() => handleOpenDialog(unit)}
//                 >
//                   {unit.isUnitStatus === 0
//                     ? "Select"
//                     : unit.isUnitStatus === 1
//                     ? "Occupied"
//                     : unit.isUnitStatus === 2
//                     ? "Reserved"
//                     : unit.isUnitStatus === 3
//                     ? "In Maintenance"
//                     : "Unknown"}
//                 </Button>
//               </Box>
//             </Grid>
//           ))
//         )}
//       </Grid>

//       {selectedUnit && (
//         <PopupSelectUnit
//           open={openDialog}
//           onClose={handleCloseDialog}
//           unitName={selectedUnit.unit_name}
//         />
//       )}

//       {openCustomerRequest && (
//         <PopupCustomerRequest
//           open={openCustomerRequest}
//           onClose={handleCloseCustomerRequest}
//         />
//       )}

//       {openInProgress && (
//         <PopupInProgress
//           open={openInProgress}
//           onClose={handleCloseInProgress}
//         />
//       )}
//     </Box>
//   );
// };

// export default UnitMonitor;
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import PopupSelectUnit from "./PopupSelectUnit";
// import PopupCustomerRequest from "./PopupCustomerRequest";
// import PopupInProgress from "./PopupInProgress";
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import In_Maintaince from "../../../assets/images/Not_Available.png";
// import noData from "../../../assets/images/no_data.png";

// const UnitMonitor = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
//   const [openInProgress, setOpenInProgress] = useState(false);

//   const handleOpenDialog = (unit) => {
//     setSelectedUnit(unit);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedUnit(null);
//   };

//   const handleOpenCustomerRequest = () => {
//     setOpenCustomerRequest(true);
//   };

//   const handleCloseCustomerRequest = () => {
//     setOpenCustomerRequest(false);
//   };

//   const handleOpenInProgress = () => {
//     setOpenInProgress(true);
//   };

//   const handleCloseInProgress = () => {
//     setOpenInProgress(false);
//   };

//   const { unitsData, loading, error } = useUnitMonitor();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredUnits, setFilteredUnits] = useState([]);

//   useEffect(() => {
//     setFilteredUnits(
//       unitsData.filter((unit) =>
//         unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, unitsData]);

//   const getImage = (status) => {
//     switch (status) {
//       case 0:
//         return Available;
//       case 1:
//         return Occupied;
//       case 2:
//         return Reserved;
//       case 3:
//         return In_Maintaince;
//       default:
//         return Available;
//     }
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <Box sx={{ pt: "90px", pb: "20px", px: { xs: 1, md: 2 } }}>
//       <Box
//         sx={{
//           mb: 3,
//           display: "flex",
//           flexDirection: isSmallScreen ? "column" : "row",
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
//         <Box sx={{ mt: isSmallScreen ? 2 : 0, display: "flex", gap: 2 }}>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#28a745",
//               "&:hover": { backgroundColor: "#218838" },
//             }}
//             onClick={handleOpenCustomerRequest}
//           >
//             Customer Request
//           </Button>
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#17a2b8",
//               "&:hover": { backgroundColor: "#117a8b" },
//             }}
//             onClick={handleOpenInProgress}
//           >
//             In Progress
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         {filteredUnits.length === 0 ? (
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 minHeight: "calc(100vh - 400px)",
//                 textAlign: "center",
//               }}
//             >
//               <img
//                 src={noData}
//                 alt="No data"
//                 style={{
//                   width: "100%",
//                   maxWidth: "500px",
//                   height: "auto",
//                   marginBottom: "20px",
//                 }}
//               />
//               <Typography
//                 variant="h6"
//                 sx={{
//                   fontWeight: 600,
//                   color: "text.secondary",
//                   fontSize: "1.5rem",
//                 }}
//               >
//                 No units available
//               </Typography>
//             </Box>
//           </Grid>
//         ) : (
//           filteredUnits.map((unit) => (
//             <Grid item key={unit.id} xs={12} sm={6} md={4} lg={3} xl={2}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "white",
//                   border: "1px solid #ccc",
//                   borderRadius: "20px",
//                   p: 2,
//                   textAlign: "center",
//                   width: "100%",
//                   // maxWidth: "249px",
//                   height: "341px",
//                   position: "relative",
//                   boxSizing: "border-box",
//                   overflow: "hidden",
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     position: "absolute",
//                     top: 15,
//                     left: 20,
//                     fontWeight: 600,
//                     color: "text.secondary",
//                     whiteSpace: "nowrap",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                   }}
//                 >
//                   {unit.unit_name}
//                 </Typography>
//                 <img
//                   src={getImage(unit.isUnitStatus)}
//                   alt={unit.unit_name}
//                   style={{
//                     width: "100%",
//                     maxWidth: "170px",
//                     height: "auto",
//                     maxHeight: "calc(341px - 80px)",
//                     objectFit: "contain",
//                     marginTop: "10px",
//                     marginBottom: "30px",
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   sx={{
//                     borderRadius: "20px",
//                     position: "absolute",
//                     bottom: 25,
//                     width: "80%",
//                     backgroundColor:
//                       unit.isUnitStatus === 0
//                         ? "#4690FF"
//                         : unit.isUnitStatus === 1
//                         ? "#B4162C"
//                         : unit.isUnitStatus === 2
//                         ? "#FFA500"
//                         : unit.isUnitStatus === 3
//                         ? "gray"
//                         : "gray",
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor:
//                         unit.isUnitStatus === 0
//                           ? "#3576CC"
//                           : unit.isUnitStatus === 1
//                           ? "#8B1A2C"
//                           : unit.isUnitStatus === 2
//                           ? "#FF8C00"
//                           : unit.isUnitStatus === 3
//                           ? "darkgray"
//                           : "darkgray",
//                     },
//                     fontSize: "1rem",
//                     fontWeight: 500,
//                   }}
//                   onClick={() => handleOpenDialog(unit)}
//                 >
//                   {unit.isUnitStatus === 0
//                     ? "Select"
//                     : unit.isUnitStatus === 1
//                     ? "Occupied"
//                     : unit.isUnitStatus === 2
//                     ? "Reserved"
//                     : unit.isUnitStatus === 3
//                     ? "In Maintenance"
//                     : "Unknown"}
//                 </Button>
//               </Box>
//             </Grid>
//           ))
//         )}
//       </Grid>

//       {selectedUnit && (
//         <PopupSelectUnit
//           open={openDialog}
//           onClose={handleCloseDialog}
//           unitName={selectedUnit.unit_name}
//         />
//       )}

//       {openCustomerRequest && (
//         <PopupCustomerRequest
//           open={openCustomerRequest}
//           onClose={handleCloseCustomerRequest}
//         />
//       )}

//       {openInProgress && (
//         <PopupInProgress
//           open={openInProgress}
//           onClose={handleCloseInProgress}
//         />
//       )}
//     </Box>
//   );
// };

// export default UnitMonitor;
