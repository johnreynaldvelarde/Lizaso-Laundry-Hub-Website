// import styled from "@emotion/styled";
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   TextField,
//   Typography,
//   FormHelperText,
// } from "@mui/material";
// import React, { useRef, useState } from "react";
// import { BiImageAdd } from "react-icons/bi";
// import { CheckCircle, Backspace } from "@phosphor-icons/react";
// import useInventory from "../../../hooks/admin/useInventory";

// const AddItem = () => {
//   const {
//     errors,
//     itemName,
//     itemCode,
//     itemCategory,
//     itemPrice,
//     itemDiscount,
//     categories,
//     handleItemClear,
//     handleInputChange,
//     handleSubmitItem,
//   } = useInventory();

//   const [category, setCategory] = useState("");
//   const imageInput = useRef(null);
//   const [image, setImage] = useState("");

//   const handleChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const UploadBox = styled(Box)({
//     marginTop: 30,
//     height: 200,
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
//         Add new item
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
//         }}
//       >
//         <Box sx={{ my: 2 }}>
//           <TextField
//             label="Item Name"
//             variant="outlined"
//             size="medium"
//             fullWidth
//             value={itemName}
//             onChange={handleInputChange("itemName")}
//             error={Boolean(errors.itemName)}
//             helperText={errors.itemName}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-error": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//         </Box>

//         <Box sx={{ my: 4 }}>
//           <TextField
//             label="Item Code"
//             variant="outlined"
//             size="medium"
//             fullWidth
//             value={itemCode}
//             onChange={handleInputChange("itemCode")}
//             error={Boolean(errors.itemCode)}
//             helperText={errors.itemCode}
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
//           <FormControl
//             fullWidth
//             size="medium"
//             error={Boolean(errors.itemCategory)}
//           >
//             <InputLabel id="category-select-label">Category</InputLabel>
//             <Select
//               labelId="category-select-label"
//               id="category-select"
//               label="Category"
//               value={itemCategory}
//               onChange={handleInputChange("itemCategory")}
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   "&.Mui-error .MuiOutlinedInput-notchedOutline": {
//                     borderColor: "red",
//                   },
//                 },
//               }}
//             >
//               {categories.map(({ id, category_name }) => (
//                 <MenuItem value={category_name} key={id}>
//                   {category_name}
//                 </MenuItem>
//               ))}
//             </Select>
//             {errors.itemCategory && (
//               <FormHelperText>{errors.itemCategory}</FormHelperText>
//             )}
//           </FormControl>
//         </Box>

//         <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
//           <TextField
//             label="Price"
//             variant="outlined"
//             rows={4}
//             fullWidth
//             size="medium"
//             value={itemPrice}
//             onChange={handleInputChange("itemPrice")}
//             error={Boolean(errors.itemPrice)}
//             helperText={errors.itemPrice}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-error": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//           <TextField
//             label="Discount"
//             variant="outlined"
//             rows={4}
//             fullWidth
//             size="medium"
//             value={itemDiscount}
//             onChange={handleInputChange("itemDiscount")}
//             error={Boolean(errors.itemDiscount)}
//             helperText={errors.itemDiscount}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-error": {
//                   borderColor: "red",
//                 },
//               },
//             }}
//           />
//         </Box>

//         <input
//           type="file"
//           hidden
//           ref={imageInput}
//           onChange={(e) => setImage(e.target.files[0])}
//         />
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
//               <Typography>
//                 Drop your image here or{" "}
//                 <span style={{ color: "#027edd", cursor: "pointer" }}>
//                   browse
//                 </span>
//               </Typography>
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
//             startIcon={
//               <CheckCircle size={24} color="#fcfcfc" weight="duotone" />
//             }
//             variant="contained"
//             sx={{
//               backgroundColor: "#5787C8",
//               fontWeight: 600,
//               textTransform: "none",
//               paddingLeft: "25px",
//               paddingRight: "25px",
//               fontSize: "16px",
//               borderRadius: "5px",
//               marginRight: 2,
//               "&:hover": {
//                 backgroundColor: "#3b5c9f",
//               },
//             }}
//             onClick={handleSubmitItem}
//           >
//             Submit
//           </Button>
//           <Button
//             startIcon={<Backspace size={24} color="#5787C8" weight="regular" />}
//             variant="outlined"
//             sx={{
//               fontWeight: 500,
//               textTransform: "none",
//               paddingLeft: "25px",
//               paddingRight: "25px",
//               fontSize: "16px",
//               borderRadius: "5x",
//             }}
//             onClick={handleItemClear}
//           >
//             Clear
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default AddItem;

// {
//   /* <Box>
//           <Autocomplete
//             sx={{ mt: 4 }}
//             multiple
//             id="tags-filled"
//             options={categories.map((option) => option.name)}
//             defaultValue={[categories[0].name, categories[3].name]}
//             freeSolo
//             renderTags={(value, getTagProps) =>
//               value.map((option, index) => (
//                 <Chip
//                   variant="standard"
//                   label={option}
//                   {...getTagProps({ index })}
//                 />
//               ))
//             }
//             renderInput={(params) => (
//               <TextField
//                 {...params}
//                 helperText="Select a tag or type any tag and press enter"
//                 variant="outlined"
//                 label="Item Tags"
//                 placeholder="Item Tags"
//               />
//             )}
//           />
//         </Box> */
// }
// import { BiImageAdd } from "react-icons/bi";

// const imageInput = useRef(null);
// const [image, setImage] = useState("");

// const UploadBox = styled(Box)({
//   marginTop: 30,
//   height: 200,
//   borderRadius: "10px",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   flexDirection: "column",
//   borderStyle: "dashed",
//   borderWidth: "2px",
//   borderColor: "divider",
// });
{
  /* <UploadBox onClick={() => imageInput.current.click()}>
          {image ? (
            <img
              src={image && URL.createObjectURL(image)}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (

          
            <Box sx={{ textAlign: "center" }}>
              <BiImageAdd style={{ fontSize: "50px", color: "#027edd" }} />
              <Typography>
                Drop your image here or{" "}
                <span style={{ color: "#027edd", cursor: "pointer" }}>
                  browse
                </span>
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>
                JPG, PNG and GIF images are allowed
              </Typography>
            </Box>
          )}
        </UploadBox> */
}

{
  /* <input
          type="file"
          hidden
          ref={imageInput}
          onChange={(e) => setImage(e.target.files[0])}
        /> */
}
