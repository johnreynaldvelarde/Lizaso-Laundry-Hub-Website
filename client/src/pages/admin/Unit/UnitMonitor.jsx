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

import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";

// images
import Available from "../../../assets/images/Available.png";
import Occupied from "../../../assets/images/Occupied.png";
import Reserved from "../../../assets/images/Reserved.png";
import In_Maintaince from "../../../assets/images/Not_Available.png";
import noData from "../../../assets/images/no_data.png";

const UnitMonitor = () => {
  const { unitsData, loading, error } = useUnitMonitor();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);

  useEffect(() => {
    if (unitsData) {
      setFilteredUnits(
        unitsData.filter((unit) =>
          unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, unitsData]);

  const getImage = (status) => {
    switch (status) {
      case 0: // Available
        return Available;
      case 1: // Occupied
        return Occupied;
      case 2: // Reserved
        return Reserved;
      case 3: // In Maintenance
        return In_Maintaince;
      default:
        return In_Maintaince; // Use the "Not Available" image for unknown statuses
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box sx={{ pt: "90px", pb: "20px", px: { xs: 1, md: 2 } }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search units..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "100%", maxWidth: "400px" }}
        />
        <Button
          variant="contained"
          sx={{
            ml: 2,
            backgroundColor: "#28a745",
            "&:hover": { backgroundColor: "#218838" },
          }}
        >
          Add
        </Button>
      </Box>

      {filteredUnits.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 400px)", // Adjust height based on your layout
            textAlign: "center",
            mt: 4, // Margin-top for spacing above the message
          }}
        >
          <img
            src={noData}
            alt="No data"
            style={{
              width: "600px", // Adjust width as needed
              height: "auto",
              marginBottom: "5px", // Space between image and text
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "text.secondary",
              fontSize: "2rem",
            }}
          >
            No units available
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={1}>
          {filteredUnits.map((unit) => (
            <Grid item key={unit.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "20px",
                  p: 2,
                  textAlign: "center",
                  width: "249px",
                  height: "341px",
                  position: "relative",
                  boxSizing: "border-box",
                  overflow: "hidden",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    top: 15,
                    left: 20,
                    fontWeight: "600",
                    color: "text.secondary",
                  }}
                >
                  {unit.unit_name}
                </Typography>
                <img
                  src={getImage(unit.isUnitStatus)}
                  alt={unit.unit_name}
                  style={{
                    width: "170px",
                    height: "auto",
                    maxHeight: "calc(341px - 80px)", // Adjust as needed
                    objectFit: "contain",
                    marginTop: "10px",
                    marginBottom: "30px",
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "20px",
                    position: "absolute",
                    bottom: 25,
                    width: "80%",
                    backgroundColor:
                      unit.isUnitStatus === 0
                        ? "#4690FF" // Blue for Available
                        : unit.isUnitStatus === 1
                        ? "#B4162C" // Red for Occupied
                        : unit.isUnitStatus === 2
                        ? "#FFA500" // Orange for Reserved
                        : unit.isUnitStatus === 3
                        ? "gray" // Gray for In Maintenance
                        : "gray", // Default to gray for any unknown status
                    color: "white", // White text color for all statuses
                    "&:hover": {
                      backgroundColor:
                        unit.isUnitStatus === 0
                          ? "#3576CC" // Darker blue for Available
                          : unit.isUnitStatus === 1
                          ? "#8B1A2C" // Darker red for Occupied
                          : unit.isUnitStatus === 2
                          ? "#FF8C00" // Darker orange for Reserved
                          : unit.isUnitStatus === 3
                          ? "darkgray" // Darker gray for In Maintenance
                          : "darkgray", // Default to dark gray for any unknown status
                    },
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                >
                  {unit.isUnitStatus === 0
                    ? "Select"
                    : unit.isUnitStatus === 1
                    ? "Occupied"
                    : unit.isUnitStatus === 2
                    ? "Reserved"
                    : unit.isUnitStatus === 3
                    ? "In Maintenance"
                    : "Unknown"}
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UnitMonitor;
