import React, { useState, useEffect } from "react";
import useUnitMonitor from "../../../hooks/admin/useUnitMonitor";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import CustomPopFooterButton from "../../../components/common/CustomPopFooterButton";
import { COLORS } from "../../../constants/color";

function PopupAssignUnit({ open, onClose, inqueueID }) {
  const [loading, setLoading] = useState(false);
  const [weight, setWeight] = useState("");
  const [selectedSupplies, setSelectedSupplies] = useState([]);
  const [quantities, setQuantities] = useState({});

  const [laundrySupplies] = useState([
    { id: 1, name: "Detergent" },
    { id: 2, name: "Fabric Softener" },
    { id: 3, name: "Bleach" },
    { id: 4, name: "Stain Remover" },
  ]);

  const {
    avaiableUnitData,
    selectedAssignUnit,
    setSelectedAssignUnit,
    fetchAvailableUnit,
  } = useUnitMonitor();

  useEffect(() => {
    if (open) {
      fetchAvailableUnit();
    }
  }, [open]);

  const handleSupplySelect = (event) => {
    setSelectedSupplies(event.target.value);
  };

  const handleQuantityChange = (supplyId, quantity) => {
    setQuantities((prev) => ({
      ...prev,
      [supplyId]: quantity,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      <CustomPopHeaderTitle
        title={"Choose an Available Unit"}
        subtitle={"Fill in the necessary details"}
        onClose={onClose}
      />
      <DialogContent>
        <div className="mt-4 mb-5 flex overflow-x-auto space-x-3 hori-scrollable">
          {avaiableUnitData.length > 0 ? (
            avaiableUnitData.map((unit) => (
              <Paper
                key={unit.id}
                elevation={0}
                sx={{
                  padding: "15px",
                  border: "1px solid",
                  borderColor:
                    selectedAssignUnit === unit.id
                      ? COLORS.secondary
                      : COLORS.border,
                  marginBottom: "10px",
                  borderRadius: "8px",
                  color:
                    selectedAssignUnit === unit.id
                      ? COLORS.white
                      : COLORS.primary,
                  backgroundColor:
                    selectedAssignUnit === unit.id ? COLORS.secondary : "white",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease",
                }}
                onClick={() => setSelectedAssignUnit(unit.id)}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 600, textAlign: "center" }}
                >
                  {unit.unit_name}
                </Typography>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary" align="center">
              No available units at the moment.
            </Typography>
          )}
        </div>

        {/* Weight Input */}
        <TextField
          label="Weight (kg)"
          variant="outlined"
          fullWidth
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter weight in kilograms"
        />

        {/* Laundry Supplies Multiple Select */}
        <FormControl fullWidth variant="outlined" sx={{ marginTop: "20px" }}>
          <InputLabel>Select Laundry Supplies</InputLabel>
          <Select
            label="Select Laundry Supplies"
            multiple
            value={selectedSupplies}
            onChange={handleSupplySelect}
            renderValue={(selected) =>
              selected.map((supplyId) => {
                const supply = laundrySupplies.find((s) => s.id === supplyId);
                return (
                  <Chip
                    key={supplyId}
                    label={supply ? supply.name : ""}
                    sx={{ margin: "5px" }}
                  />
                );
              })
            }
          >
            {laundrySupplies.map((supply) => (
              <MenuItem key={supply.id} value={supply.id}>
                {supply.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Quantities for Selected Supplies */}
        {selectedSupplies.length > 0 && (
          <div style={{ marginTop: "20px" }}>
            {selectedSupplies.map((supplyId) => {
              const supply = laundrySupplies.find((s) => s.id === supplyId);
              return (
                <div key={supplyId} style={{ marginBottom: "10px" }}>
                  <Typography variant="body2">
                    {supply.name} Quantity:
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    value={quantities[supplyId] || 1}
                    onChange={(e) =>
                      handleQuantityChange(supplyId, parseInt(e.target.value))
                    }
                    inputProps={{ min: 1 }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>

      {/* Footer */}
      <CustomPopFooterButton
        label={"Proceed"}
        onClose={onClose}
        loading={loading}
      />
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
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Paper,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
// import CustomPopFooterButton from "../../../components/common/CustomPopFooterButton";
// import { COLORS } from "../../../constants/color";

// function PopupAssignUnit({ open, onClose, inqueueID }) {
//   const [loading, setLoading] = useState(false);
//   const [weight, setWeight] = useState("");
//   const {
//     avaiableUnitData,
//     selectedAssignUnit,
//     setSelectedAssignUnit,
//     handleAssignUnitSelect,
//     handleAssignUnitConfirm,
//     fetchAvailableUnit,
//   } = useUnitMonitor();

//   const dialogVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0 },
//   };

//   useEffect(() => {
//     if (open) {
//       fetchAvailableUnit();
//     }
//   }, [open]);

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       maxWidth="xs"
//       fullWidth
//       PaperProps={{
//         style: {
//           borderRadius: 16,
//         },
//       }}
//     >
//       <CustomPopHeaderTitle
//         title={"Choose an Available Unit"}
//         subtitle={"Fill in the necessary details"}
//         onClose={onClose}
//       />
//       <DialogContent>
//         <div className="mt-4 mb-5 flex overflow-x-auto space-x-3 hori-scrollable">
//           {avaiableUnitData.length > 0 ? (
//             avaiableUnitData.map((unit) => (
//               <Paper
//                 key={unit.id}
//                 elevation={0}
//                 sx={{
//                   padding: "15px",
//                   border: "1px solid",
//                   borderColor:
//                     selectedAssignUnit === unit.id
//                       ? COLORS.secondary
//                       : COLORS.border,
//                   marginBottom: "10px",
//                   borderRadius: "8px",
//                   color:
//                     selectedAssignUnit === unit.id
//                       ? COLORS.white
//                       : COLORS.primary,
//                   backgroundColor:
//                     selectedAssignUnit === unit.id ? COLORS.secondary : "white",
//                   cursor: "pointer",
//                   transition: "background-color 0.2s ease",
//                 }}
//                 onClick={() => setSelectedAssignUnit(unit.id)}
//               >
//                 <Typography
//                   variant="body1"
//                   sx={{ fontWeight: 600, textAlign: "center" }}
//                 >
//                   {unit.unit_name}
//                 </Typography>
//               </Paper>
//             ))
//           ) : (
//             <Typography variant="body1" color="text.secondary" align="center">
//               No available units at the moment.
//             </Typography>
//           )}
//         </div>
//         <TextField
//           label="Weight (kg)"
//           variant="outlined"
//           fullWidth
//           type="number"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//           placeholder="Enter weight in kilograms"
//           // error={!!errors.weight}
//         />
//       </DialogContent>
//       {/* Footer */}
//       <CustomPopFooterButton
//         label={"Proceed"}
//         onClose={onClose}
//         loading={loading}
//       />
//     </Dialog>
//   );
// }

// export default PopupAssignUnit;

{
  /* <TextField
          margin="dense"
          label="Item Code"
          type="text"
          fullWidth
          variant="outlined"
          value={itemCode}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.itemCode)}
          helperText={errors.itemCode}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        />
        <TextField
          margin="dense"
          label="Item Name"
          type="text"
          fullWidth
          variant="outlined"
          value={itemName}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.itemName)}
          helperText={errors.itemName}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        />
        <TextField
          margin="dense"
          label="Price"
          type="text"
          fullWidth
          variant="outlined"
          value={itemPrice}
          onChange={handleInputChange("rolename")}
          error={Boolean(errors.itemPrice)}
          helperText={errors.itemPrice}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        />
        <TextField
          select
          margin="dense"
          label="Category"
          fullWidth
          variant="outlined"
          value={selectedCategory}
          onChange={handleInputChange("selectedStore")}
          error={Boolean(errors.selectedCategory)}
          helperText={errors.selectedCategory}
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        >
          <MenuItem value="" disabled>
            Select a category
          </MenuItem>
          {data.map((category) => (
            <MenuItem key={category.category_id} value={category.category_id}>
              {category.category_name}
            </MenuItem>
          ))}
        </TextField> */
}

{
  /* <div className="relative">
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
            <RadioGroup
              value={selectedAssignUnit}
              onChange={handleAssignUnitSelect}
            >
              {avaiableUnitData.length > 0 ? (
                avaiableUnitData.map((unit) => (
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
                    onClick={() => setSelectedAssignUnit(unit.id)}
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
          <div className="mt-4">
            <TextField
              label="Weight (kg)"
              // value={weight}
              onChange={(e) => setWeight(e.target.value)}
              fullWidth
              margin="dense"
              variant="outlined"
            />
            <TextField
              label="Quantity"
              // value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
              margin="dense"
              variant="outlined"
              className="mt-2"
            />
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
            onClick={() => handleAssignUnitConfirm(inqueueID, onClose)}
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
            Proceed
          </Button>
        </DialogActions>
      </div> */
}
