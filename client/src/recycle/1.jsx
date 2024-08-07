// import React from 'react'

// const 1 = () => {
//   return (
//     import { Box, Button, Grid, Typography } from "@mui/material";
//     import styles from "../../../styles/style";
//     import React from "react";

//     // images
//     import Available from "../../../assets/images/Available.png";
//     import Occupied from "../../../assets/images/Occupied.png";
//     import Reserved from "../../../assets/images/Reserved.png";

//     const UnitMonitor = () => {
//       const laundryUnits = [
//         { id: 1, name: "Unit 1", status: "Available" },
//         { id: 2, name: "Unit 2", status: "Occupied" },
//         { id: 3, name: "Unit 3", status: "Reserved" },
//         { id: 4, name: "Unit 4", status: "Available" },
//         { id: 5, name: "Unit 5", status: "Occupied" },
//         { id: 6, name: "Unit 6", status: "Reserved" },
//         { id: 7, name: "Unit 7", status: "Available" },
//         { id: 8, name: "Unit 8", status: "Occupied" },
//         { id: 9, name: "Unit 9", status: "Reserved" },
//         { id: 10, name: "Unit 10", status: "Available" },
//       ];

//       const customers = [
//         { id: 1, name: "Customer A" },
//         { id: 2, name: "Customer B" },
//         { id: 3, name: "Customer C" },
//         { id: 4, name: "Customer D" },
//         { id: 5, name: "Customer E" },
//         { id: 1, name: "Customer A" },
//         { id: 2, name: "Customer B" },
//         { id: 3, name: "Customer C" },
//         { id: 4, name: "Customer D" },
//         { id: 5, name: "Customer E" },
//         { id: 1, name: "Customer A" },
//         { id: 2, name: "Customer B" },
//         { id: 3, name: "Customer C" },
//         { id: 4, name: "Customer D" },
//         { id: 5, name: "Customer E" },
//       ];

//       const getImage = (status) => {
//         switch (status) {
//           case "Available":
//             return Available;
//           case "Occupied":
//             return Occupied;
//           case "Reserved":
//             return Reserved;
//           default:
//             return Available;
//         }
//       };

//       return (
//         <Box sx={{ pt: "80px", pb: "20px", display: "flex", height: "100vh" }}>
//           <Box
//             sx={{
//               width: "250px",
//               overflowY: "auto",
//               borderRight: "1px solid #ccc",
//               pr: 2,
//               flexShrink: 0,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "flex-start",
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Customers
//             </Typography>
//             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//               {customers.map((customer) => (
//                 <Typography key={customer.id} variant="body1">
//                   {customer.name}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>
//           <Box
//             sx={{
//               flexGrow: 1,
//               overflowY: "auto",
//               px: 2,
//             }}
//           >
//             <Grid container spacing={2}>
//               {laundryUnits.map((unit) => (
//                 <Grid item xs={8} sm={6} md={4} lg={2} key={unit.id}>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       backgroundColor: "white",
//                       border: "1px solid #ccc",
//                       borderRadius: "20px",
//                       p: 2,
//                       textAlign: "center",
//                       width: "100%", // Set width to 249px
//                       maxWidth: "249px", // Maintain the max width
//                       height: "341px",
//                       position: "relative",
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         position: "absolute",
//                         top: 15,
//                         left: 20,
//                         fontWeight: "600",
//                         color: styles.textColor2,
//                       }}
//                     >
//                       {unit.name}
//                     </Typography>
//                     <img
//                       src={getImage(unit.status)}
//                       alt={unit.name}
//                       width={170} // Adjust the image size as needed
//                       style={{ marginTop: "-15px" }} // Adjust margin to fit the new dimensions
//                     />
//                     <Button
//                       variant="contained"
//                       sx={{
//                         borderRadius: "20px",
//                         position: "absolute",
//                         bottom: 25,
//                       }}
//                     >
//                       Select
//                     </Button>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         </Box>
//       );
//     };

//     export default UnitMonitor;

//   )
// }

// export default 1
