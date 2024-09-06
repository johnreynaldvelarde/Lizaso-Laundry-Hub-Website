import React, { useState, useEffect } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import { Radio, RadioGroup, FormControlLabel, Paper } from "@mui/material";

function PopupAssignUnit({ open, onClose, onConfirm, itemId }) {
  const { fetchUnitsData, unitsData } = useUnitMonitor();
  const [selectedUnit, setSelectedUnit] = useState(null);

  const dialogVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    if (open) {
      fetchUnitsData();
    }
  }, [open]);

  const handleUnitSelect = (event) => {
    setSelectedUnit(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedUnit) {
      onConfirm(itemId, selectedUnit);
      onClose();
    } else {
      alert("Please select a unit before proceeding.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: motion.div,
        variants: dialogVariants,
        initial: "hidden",
        animate: "visible",
        transition: { duration: 0.3, ease: "easeOut" },
        className: "bg-white rounded-3xl max-w-md mx-4 p-1",
      }}
    >
      <div className="relative">
        <DialogTitle className="text-lg font-semibold mb-4">
          Select an Available Unit
        </DialogTitle>
        <DialogContent className="text-sm text-gray-700 mb-4">
          <div
            style={{
              padding: "2px",
              maxHeight: "300px", // Set max height for the list
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <RadioGroup value={selectedUnit} onChange={handleUnitSelect}>
              {unitsData.length > 0 ? (
                unitsData.map((unit) => (
                  <Paper
                    key={unit.id}
                    // elevation={selectedUnit === unit.id ? 6 : 1}
                    sx={{
                      padding: "15px",
                      boxShadow: "none !important",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "divider",
                      marginBottom: "10px",
                      borderRadius: "8px",
                      //   backgroundColor:
                      //     selectedUnit === unit.id ? "#e0f7fa" : "#f5f5f5",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedUnit(unit.id)}
                  >
                    <FormControlLabel
                      value={unit.id}
                      control={<Radio />}
                      label={unit.unit_name}
                    />
                  </Paper>
                ))
              ) : (
                <p>No available units at the moment.</p>
              )}
            </RadioGroup>
          </div>
        </DialogContent>
        <DialogActions className="flex justify-end space-x-2 mb-1">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              marginRight: 1,
              borderColor: "#595959",
              borderRadius: "5px",
              fontWeight: 500,
              textTransform: "none",
              color: "#595959",
              "&:hover": {
                borderColor: "#595959",
                backgroundColor: "rgba(144, 144, 144, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={handleConfirm}
            sx={{
              backgroundColor: "#5787C8",
              borderRadius: "5px",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#3A5A85",
              },
            }}
          >
            Assign Unit
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default PopupAssignUnit;

// import React, { useState, useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import { motion } from "framer-motion";
// import {
//   List,
//   ListItem,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
// } from "@mui/material";

// function PopupAssignUnit({
//   open,
//   onClose,
//   onConfirm,
//   itemId,
//   fetchAvailableUnits,
// }) {
//   const { fetchUnitsData, unitsData } = useUnitMonitor();
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);

//   const dialogVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 },
//   };

//   useEffect(() => {
//     fetchUnitsData();
//   }, []);

//   const handleUnitSelect = (event) => {
//     setSelectedUnit(event.target.value);
//   };

//   const handleConfirm = () => {
//     if (selectedUnit) {
//       onConfirm(itemId, selectedUnit);
//       onClose();
//     } else {
//       alert("Please select a unit before proceeding.");
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         component: motion.div,
//         variants: dialogVariants,
//         initial: "hidden",
//         animate: "visible",
//         transition: { duration: 0.3, ease: "easeOut" },
//         className: "bg-white rounded-lg max-w-md mx-4 p-2",
//       }}
//     >
//       <div className="relative">
//         <DialogTitle className="text-lg font-semibold mb-4">
//           Select an Available Unit
//         </DialogTitle>
//         <DialogContent className="text-sm text-gray-700 mb-4">
//           <List>
//             <RadioGroup value={selectedUnit} onChange={handleUnitSelect}>
//               {unitsData.length > 0 ? (
//                 unitsData.map((unit) => (
//                   <ListItem key={unit.id} button>
//                     <FormControlLabel
//                       value={unit.id}
//                       control={<Radio />}
//                       label={unit.unit_name}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <p>No available units at the moment.</p>
//               )}
//             </RadioGroup>
//           </List>
//         </DialogContent>
//         <DialogActions className="flex justify-end space-x-2">
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             sx={{
//               marginRight: 1,
//               borderColor: "#595959",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               color: "#595959",
//               "&:hover": {
//                 borderColor: "#595959",
//                 backgroundColor: "rgba(144, 144, 144, 0.1)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disableElevation
//             onClick={handleConfirm}
//             sx={{
//               backgroundColor: "#5787C8",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#3A5A85",
//               },
//             }}
//           >
//             Assign Unit
//           </Button>
//         </DialogActions>
//       </div>
//     </Dialog>
//   );
// }

// export default PopupAssignUnit;

// import React, { useState, useEffect } from "react";
// import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import { motion } from "framer-motion";
// import {
//   List,
//   ListItem,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
// } from "@mui/material";

// function PopupAssignUnit({
//   open,
//   onClose,
//   onConfirm,
//   itemId,
//   fetchAvailableUnits,
// }) {
//   const { fetchUnitsData, unitsData } = useUnitMonitor();
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);

//   const dialogVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 },
//   };

//   useEffect(() => {
//     fetchUnitsData();
//   }, []);

//   //   useEffect(() => {
//   //     if (open) {
//   //       const loadUnits = async () => {
//   //         const units = await fetchAvailableUnits();
//   //         setAvailableUnits(units);
//   //       };
//   //       loadUnits();
//   //     }
//   //   }, [open, fetchAvailableUnits]);

//   const handleUnitSelect = (event) => {
//     setSelectedUnit(event.target.value);
//   };

//   const handleConfirm = () => {
//     if (selectedUnit) {
//       onConfirm(itemId, selectedUnit);
//       onClose();
//     } else {
//       alert("Please select a unit before proceeding.");
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         component: motion.div,
//         variants: dialogVariants,
//         initial: "hidden",
//         animate: "visible",
//         transition: { duration: 0.3, ease: "easeOut" },
//         className: "bg-white rounded-lg max-w-md mx-4 p-2",
//       }}
//     >
//       <div className="relative">
//         <DialogTitle className="text-lg font-semibold mb-4">
//           Select an Available Unit
//         </DialogTitle>
//         <DialogContent className="text-sm text-gray-700 mb-4">
//           <List>
//             <RadioGroup value={selectedUnit} onChange={handleUnitSelect}>
//               {unitsData.length > 0 ? (
//                 unitsData.map((unit) => (
//                   <ListItem key={unit.id} button>
//                     <FormControlLabel
//                       value={unit.id}
//                       control={<Radio />}
//                       label={unit.unit_name}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <p>No available units at the moment.</p>
//               )}
//             </RadioGroup>
//           </List>
//         </DialogContent>
//         <DialogActions className="flex justify-end space-x-2">
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             sx={{
//               marginRight: 1,
//               borderColor: "#595959",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               color: "#595959",
//               "&:hover": {
//                 borderColor: "#595959",
//                 backgroundColor: "rgba(144, 144, 144, 0.1)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disableElevation
//             onClick={handleConfirm}
//             sx={{
//               backgroundColor: "#5787C8",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#3A5A85",
//               },
//             }}
//           >
//             Assign Unit
//           </Button>
//         </DialogActions>
//       </div>
//     </Dialog>
//   );
// }

// export default PopupAssignUnit;

// import React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import { motion } from "framer-motion";

// function PopupAssignUnit({ open, onClose, onConfirm, itemId }) {
//   const dialogVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         component: motion.div,
//         variants: dialogVariants,
//         initial: "hidden",
//         animate: "visible",
//         transition: { duration: 0.3, ease: "easeOut" },
//         className: "bg-white rounded-lg max-w-md mx-4 p-2",
//       }}
//     >
//       <div className="relative">
//         <DialogTitle className="text-lg font-semibold mb-4">
//           Select a avaible units
//         </DialogTitle>
//         <DialogContent className="text-sm text-gray-700 mb-1">
//           Are you sure you want to remove this?
//         </DialogContent>
//         <DialogActions className="flex justify-end space-x-2">
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             sx={{
//               marginRight: 1,
//               borderColor: "#595959",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               color: "#595959",
//               "&:hover": {
//                 borderColor: "#595959",
//                 backgroundColor: "rgba(144, 144, 144, 0.1)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disableElevation
//             onClick={() => {
//               onConfirm(itemId);
//               onClose();
//             }}
//             sx={{
//               backgroundColor: "#5787C8",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#3A5A85",
//               },
//             }}
//           >
//             Continue
//           </Button>
//         </DialogActions>
//       </div>
//     </Dialog>
//   );
// }

// export default PopupAssignUnit;
// import React, { useState, useEffect } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import { motion } from "framer-motion";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
// } from "@mui/material";

// function PopupAssignUnit({
//   open,
//   onClose,
//   onConfirm,
//   itemId,
//   fetchAvailableUnits,
// }) {
//   const [selectedUnit, setSelectedUnit] = useState(null);
//   const [availableUnits, setAvailableUnits] = useState([]);

//   const dialogVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 },
//   };

//   // Fetch available units when the popup opens
//   useEffect(() => {
//     if (open) {
//       const loadUnits = async () => {
//         const units = await fetchAvailableUnits(); // Replace with your API call or logic
//         setAvailableUnits(units);
//       };
//       loadUnits();
//     }
//   }, [open, fetchAvailableUnits]);

//   const handleUnitSelect = (event) => {
//     setSelectedUnit(event.target.value);
//   };

//   const handleConfirm = () => {
//     if (selectedUnit) {
//       onConfirm(itemId, selectedUnit);
//       onClose();
//     } else {
//       alert("Please select a unit before proceeding.");
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       PaperProps={{
//         component: motion.div,
//         variants: dialogVariants,
//         initial: "hidden",
//         animate: "visible",
//         transition: { duration: 0.3, ease: "easeOut" },
//         className: "bg-white rounded-lg max-w-md mx-4 p-2",
//       }}
//     >
//       <div className="relative">
//         <DialogTitle className="text-lg font-semibold mb-4">
//           Select an Available Unit
//         </DialogTitle>
//         <DialogContent className="text-sm text-gray-700 mb-4">
//           <List>
//             <RadioGroup value={selectedUnit} onChange={handleUnitSelect}>
//               {availableUnits.length > 0 ? (
//                 availableUnits.map((unit) => (
//                   <ListItem key={unit.id} button>
//                     <FormControlLabel
//                       value={unit.id}
//                       control={<Radio />}
//                       label={unit.unit_name}
//                     />
//                   </ListItem>
//                 ))
//               ) : (
//                 <p>No available units at the moment.</p>
//               )}
//             </RadioGroup>
//           </List>
//         </DialogContent>
//         <DialogActions className="flex justify-end space-x-2">
//           <Button
//             onClick={onClose}
//             variant="outlined"
//             sx={{
//               marginRight: 1,
//               borderColor: "#595959",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               color: "#595959",
//               "&:hover": {
//                 borderColor: "#595959",
//                 backgroundColor: "rgba(144, 144, 144, 0.1)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             disableElevation
//             onClick={handleConfirm}
//             sx={{
//               backgroundColor: "#5787C8",
//               borderRadius: "5px",
//               fontWeight: 500,
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#3A5A85",
//               },
//             }}
//           >
//             Assign Unit
//           </Button>
//         </DialogActions>
//       </div>
//     </Dialog>
//   );
// }

// export default PopupAssignUnit;
