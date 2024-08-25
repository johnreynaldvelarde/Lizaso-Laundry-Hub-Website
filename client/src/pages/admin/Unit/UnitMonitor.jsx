// import React, { useState } from "react";
// import { Box, Button, Grid, Typography, TextField } from "@mui/material";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import PopupSelectUnit from "./PopupSelectUnit"; // Adjust the path as necessary
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

//       <Grid container spacing={1} sx={{ height: "100%" }}>
//         {filteredUnits.length === 0 ? (
//           <Grid item xs={12}>
//             <Box
//               sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 height: "calc(100vh - 400px)", // Adjust height based on your layout
//                 textAlign: "center",
//               }}
//             >
//               <img
//                 src={noData}
//                 alt="No data"
//                 style={{
//                   width: "500px", // Adjust width as needed
//                   height: "auto",
//                   marginBottom: "20px", // Space between image and text
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
//     </Box>
//   );
// };

// export default UnitMonitor;

// import React, { useState } from "react";
// import { Box, Button, Grid, Typography, TextField } from "@mui/material";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import PopupSelectUnit from "./PopupSelectUnit"; // Adjust the path as necessary
// import PopupCustomerRequest from "./PopupCustomerRequest"; // Adjust the path as necessary
// import PopupInProgress from "./PopupInProgress"; // Adjust the path as necessary
// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import In_Maintaince from "../../../assets/images/Not_Available.png";
// import noData from "../../../assets/images/no_data.png";

// const UnitMonitor = () => {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
//   const [showInProgress, setShowInProgress] = useState(false);

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

//   const handleShowInProgress = () => {
//     setShowInProgress(true);
//   };

//   const handleHideInProgress = () => {
//     setShowInProgress(false);
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
//         <Button
//           variant="contained"
//           sx={{
//             ml: 2,
//             backgroundColor: "#28a745",
//             "&:hover": { backgroundColor: "#218838" },
//           }}
//           onClick={handleOpenCustomerRequest}
//         >
//           Customer Request
//         </Button>
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

//       {showInProgress && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             right: 0,
//             width: "300px",
//             height: "100%",
//             backgroundColor: "white",
//             boxShadow: "-2px 0 5px rgba(0,0,0,0.3)",
//             transform: showInProgress ? "translateX(0)" : "translateX(100%)",
//             transition: "transform 0.3s ease",
//             zIndex: 1200, // Ensure it overlays above other content
//           }}
//         >
//           <PopupInProgress onClose={handleHideInProgress} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default UnitMonitor;
import React, { useState } from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import PopupSelectUnit from "./PopupSelectUnit";
import PopupCustomerRequest from "./PopupCustomerRequest";
import PopupInProgress from "./PopupInProgress"; // Import the PopupInProgress component
import Available from "../../../assets/images/Available.png";
import Occupied from "../../../assets/images/Occupied.png";
import Reserved from "../../../assets/images/Reserved.png";
import In_Maintaince from "../../../assets/images/Not_Available.png";
import noData from "../../../assets/images/no_data.png";

const UnitMonitor = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
  const [openInProgress, setOpenInProgress] = useState(false);

  const handleOpenDialog = (unit) => {
    setSelectedUnit(unit);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUnit(null);
  };

  const handleOpenCustomerRequest = () => {
    setOpenCustomerRequest(true);
  };

  const handleCloseCustomerRequest = () => {
    setOpenCustomerRequest(false);
  };

  const handleOpenInProgress = () => {
    setOpenInProgress(true);
  };

  const handleCloseInProgress = () => {
    setOpenInProgress(false);
  };

  const { unitsData, loading, error } = useUnitMonitor();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);

  React.useEffect(() => {
    setFilteredUnits(
      unitsData.filter((unit) =>
        unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, unitsData]);

  const getImage = (status) => {
    switch (status) {
      case 0:
        return Available;
      case 1:
        return Occupied;
      case 2:
        return Reserved;
      case 3:
        return In_Maintaince;
      default:
        return Available;
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
        <Box>
          <Button
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "#28a745",
              "&:hover": { backgroundColor: "#218838" },
            }}
            onClick={handleOpenCustomerRequest}
          >
            Customer Request
          </Button>
          <Button
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "#17a2b8",
              "&:hover": { backgroundColor: "#117a8b" },
            }}
            onClick={handleOpenInProgress}
          >
            In Progress
          </Button>
        </Box>
      </Box>

      <Grid container spacing={1} sx={{ height: "100%" }}>
        {filteredUnits.length === 0 ? (
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 400px)",
                textAlign: "center",
              }}
            >
              <img
                src={noData}
                alt="No data"
                style={{
                  width: "500px",
                  height: "auto",
                  marginBottom: "20px",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "text.secondary",
                  fontSize: "1.5rem",
                }}
              >
                No units available
              </Typography>
            </Box>
          </Grid>
        ) : (
          filteredUnits.map((unit) => (
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
                    fontWeight: 600,
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
                    maxHeight: "calc(341px - 80px)",
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
                        ? "#4690FF"
                        : unit.isUnitStatus === 1
                        ? "#B4162C"
                        : unit.isUnitStatus === 2
                        ? "#FFA500"
                        : unit.isUnitStatus === 3
                        ? "gray"
                        : "gray",
                    color: "white",
                    "&:hover": {
                      backgroundColor:
                        unit.isUnitStatus === 0
                          ? "#3576CC"
                          : unit.isUnitStatus === 1
                          ? "#8B1A2C"
                          : unit.isUnitStatus === 2
                          ? "#FF8C00"
                          : unit.isUnitStatus === 3
                          ? "darkgray"
                          : "darkgray",
                    },
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                  onClick={() => handleOpenDialog(unit)}
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
          ))
        )}
      </Grid>

      {selectedUnit && (
        <PopupSelectUnit
          open={openDialog}
          onClose={handleCloseDialog}
          unitName={selectedUnit.unit_name}
        />
      )}

      {openCustomerRequest && (
        <PopupCustomerRequest
          open={openCustomerRequest}
          onClose={handleCloseCustomerRequest}
        />
      )}

      {openInProgress && (
        <PopupInProgress
          open={openInProgress}
          onClose={handleCloseInProgress}
        />
      )}
    </Box>
  );
};

export default UnitMonitor;
