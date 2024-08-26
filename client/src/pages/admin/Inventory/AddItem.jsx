import styled from "@emotion/styled";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { categories } from "../../../data/categories";
import { BiImageAdd } from "react-icons/bi";
import useInventory from "../../../hooks/admin/useInventory";

const AddItem = () => {
  const { itemName, handleClear, handleInputChange } = useInventory();

  const [category, setCategory] = useState("");
  const imageInput = useRef(null);
  const [image, setImage] = useState("");

  const handleChange = (event) => {
    setCategory(event.target.value);
    console.log(category);
  };

  const UploadBox = styled(Box)({
    marginTop: 30,
    height: 200,
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: "divider",
  });

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Add new item
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
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <Box sx={{ my: 2 }}>
          <TextField
            label="Item Name"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label="Item Description"
            variant="outlined"
            rows={4}
            fullWidth
            multiline
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <FormControl fullWidth size="medium">
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={category}
              onChange={handleChange}
            >
              {categories?.map(({ category_id, name }) => (
                <MenuItem value={name} key={category_id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ mt: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <TextField
            label="Price"
            variant="outlined"
            rows={4}
            fullWidth
            size="medium"
            defaultValue={"₱234.24"}
          />
          <TextField
            label="Discount"
            variant="outlined"
            rows={4}
            fullWidth
            size="medium"
            defaultValue={"20%"}
          />
        </Box>
        <input
          type="file"
          hidden
          ref={imageInput}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <UploadBox onClick={() => imageInput.current.click()}>
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
        </UploadBox>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "30px",
          }}
        >
          <Button variant="contained" sx={{ borderRadius: "20px" }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddItem;

{
  /* <Box>
          <Autocomplete
            sx={{ mt: 4 }}
            multiple
            id="tags-filled"
            options={categories.map((option) => option.name)}
            defaultValue={[categories[0].name, categories[3].name]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="standard"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                helperText="Select a tag or type any tag and press enter"
                variant="outlined"
                label="Item Tags"
                placeholder="Item Tags"
              />
            )}
          />
        </Box> */
}
