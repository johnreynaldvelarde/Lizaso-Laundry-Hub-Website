// import {
//   Box,
//   Button,
//   Paper,
//   Select,
//   TextField,
//   Typography,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   InputAdornment,
// } from "@mui/material";
// import styled from "@emotion/styled";
// import React from "react";
// import useAddUnit from "../../../hooks/admin/useAddUnit";
// import { unitStatus } from "../../../data/unit_status";
// import { BiImageAdd } from "react-icons/bi";

// import Available from "../../../assets/images/Available.png";
// import Occupied from "../../../assets/images/Occupied.png";
// import Reserved from "../../../assets/images/Reserved.png";
// import Not_Available from "../../../assets/images/Not_Available.png";

// const AddUnits = () => {
//   const {
//     isUnitStatus,
//     unitName,
//     errors,
//     image,
//     handleChange,
//     handleInputChange,
//     handleClear,
//     handleSubmit,
//   } = useAddUnit();

//   const UploadBox = styled(Box)({
//     marginTop: 30,
//     height: 400,
//     borderRadius: "10px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "column",
//     borderStyle: "dashed",
//     borderWidth: "2px",
//     borderColor: "divider",
//   });

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Typography variant="h6" sx={{ marginBottom: "14px" }}>
//         Add new laundry units
//       </Typography>
//       <Paper
//         sx={{
//           boxShadow: "none !important",
//           borderRadius: "12px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           p: "20px",
//           maxWidth: "800px",
//           margin: "0 auto",
//           cursor: "pointer",
//           overflow: "hidden",
//           mt: "50px",
//         }}
//       >
//         <Box sx={{ my: 2 }}>
//           <TextField
//             label="Laundry Unit Name"
//             variant="outlined"
//             size="medium"
//             fullWidth
//             value={unitName}
//             onChange={handleInputChange("unitName")}
//             error={Boolean(errors.unitName)}
//             helperText={errors.unitName}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-error": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//         </Box>
//         <Box sx={{ mt: 4 }}>
//           <FormControl fullWidth size="medium">
//             <InputLabel id="demo-simple-select-label">Unit Status</InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               label="Unit Status"
//               value={isUnitStatus}
//               onChange={handleChange}
//             >
//               {unitStatus?.map(({ unit_id, status }) => (
//                 <MenuItem value={status} key={unit_id}>
//                   {status}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <UploadBox onClick={() => imageInput.current.click()}>
//           {image ? (
//             <img
//               src={image && URL.createObjectURL(image)}
//               alt=""
//               style={{ width: "100%", height: "100%", objectFit: "contain" }}
//             />
//           ) : (
//             <Box sx={{ textAlign: "center" }}>
//               <BiImageAdd style={{ fontSize: "50px", color: "#027edd" }} />
//               <Typography>Select a unit status to display the image</Typography>
//               <Typography sx={{ fontSize: "12px" }}>
//                 JPG, PNG and GIF images are allowed
//               </Typography>
//             </Box>
//           )}
//         </UploadBox>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             mt: "30px",
//           }}
//         >
//           <Button
//             variant="contained"
//             sx={{ borderRadius: "20px", marginRight: 2 }}
//             onClick={handleSubmit}
//           >
//             Submit
//           </Button>
//           <Button
//             variant="outlined"
//             sx={{ borderRadius: "20px" }}
//             onClick={handleClear}
//           >
//             Clear
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AddUnits;
import React from "react";
import {
  Box,
  Button,
  Paper,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import { BiImageAdd } from "react-icons/bi";
import useAddUnit from "../../../hooks/admin/useAddUnit";
import { unitStatus } from "../../../data/unit_status";

// Images for each unit status
import Available from "../../../assets/images/Available.png";
import Occupied from "../../../assets/images/Occupied.png";
import Reserved from "../../../assets/images/Reserved.png";
import Not_Available from "../../../assets/images/Not_Available.png";

// Styled component for the upload box
const UploadBox = styled(Box)({
  marginTop: 30,
  height: 400,
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  borderStyle: "dashed",
  borderWidth: "2px",
  borderColor: "divider",
});

const AddUnits = () => {
  const {
    isUnitStatus,
    unitName,
    errors,
    image,
    handleInputChange,
    handleClear,
    handleSubmit,
  } = useAddUnit();

  // Function to select the appropriate image based on the unit status
  const getUnitImage = (status) => {
    switch (status) {
      case "Available":
        return Available;
      case "Occupied":
        return Occupied;
      case "Reserved":
        return Reserved;
      case "Not Available":
        return Not_Available;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Add New Laundry Units
      </Typography>
      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
          p: "20px",
          maxWidth: "800px",
          margin: "0 auto",
          mt: "50px",
        }}
      >
        {/* Laundry Unit Name Field */}
        <Box sx={{ my: 2 }}>
          <TextField
            label="Laundry Unit Name"
            variant="outlined"
            size="medium"
            fullWidth
            value={unitName}
            onChange={handleInputChange("unitName")}
            error={Boolean(errors.unitName)}
            helperText={errors.unitName}
          />
        </Box>

        {/* Unit Status Dropdown */}
        <Box sx={{ mt: 4 }}>
          <FormControl
            fullWidth
            size="medium"
            error={Boolean(errors.unitStatus)}
          >
            <InputLabel>Unit Status</InputLabel>
            <Select
              value={isUnitStatus}
              onChange={handleInputChange("unitStatus")}
              label="Unit Status"
            >
              {unitStatus.map(({ unit_id, status }) => (
                <MenuItem value={status} key={unit_id}>
                  {status}
                </MenuItem>
              ))}
            </Select>
            {errors.unitStatus && (
              <Typography
                variant="caption"
                sx={{ marginTop: "3px", marginLeft: "14px" }}
                color="error"
              >
                {errors.unitStatus}
              </Typography>
            )}
          </FormControl>
        </Box>

        {/* Upload Box */}
        <UploadBox onClick={() => imageInput.current.click()}>
          {isUnitStatus ? (
            <img
              src={getUnitImage(isUnitStatus)}
              alt={`${isUnitStatus} Image`}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <BiImageAdd style={{ fontSize: "50px", color: "#027edd" }} />
              <Typography>Select a unit status to display the image</Typography>
              <Typography sx={{ fontSize: "12px" }}>
                JPG, PNG, and GIF images are allowed
              </Typography>
            </Box>
          )}
        </UploadBox>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "30px",
          }}
        >
          <Button
            variant="contained"
            sx={{ borderRadius: "20px", marginRight: 2 }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            sx={{ borderRadius: "20px" }}
            onClick={handleClear}
          >
            Clear
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddUnits;
