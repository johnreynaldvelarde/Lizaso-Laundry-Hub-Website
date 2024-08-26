import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { CheckCircle, Backspace } from "@phosphor-icons/react";
import useInventory from "../../../hooks/admin/useInventory";
import backGroundImage from "../../../assets/images/b_2.jpg";

const AddItem = () => {
  const {
    errors,
    itemName,
    itemCode,
    itemCategory,
    itemPrice,
    categories,
    handleItemClear,
    handleInputChange,
    handleSubmitItem,
  } = useInventory();

  return (
    <Box
      sx={{
        pt: "80px",
        pb: "20px",
        // backgroundImage: `url(${backGroundImage})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // height: "100vh",
        // width: "100%",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          marginBottom: "90px",
          fontWeight: 600,
          color: "#717171",
          fontSize: "24px",
        }}
      >
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
            value={itemName}
            onChange={handleInputChange("itemName")}
            error={Boolean(errors.itemName)}
            helperText={errors.itemName}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-error": {
                  borderColor: "red",
                },
              },
            }}
          />
        </Box>

        <Box sx={{ my: 4 }}>
          <TextField
            label="Item Code"
            variant="outlined"
            size="medium"
            fullWidth
            value={itemCode}
            onChange={handleInputChange("itemCode")}
            error={Boolean(errors.itemCode)}
            helperText={errors.itemCode}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-error": {
                  borderColor: "red",
                },
              },
            }}
          />
        </Box>

        <Box sx={{ mt: 4 }}>
          <FormControl
            fullWidth
            size="medium"
            error={Boolean(errors.itemCategory)}
          >
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              value={itemCategory}
              onChange={handleInputChange("itemCategory")}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                    borderColor: "red",
                  },
                },
              }}
            >
              {categories.map(({ id, category_name }) => (
                <MenuItem value={id} key={id}>
                  {category_name}
                </MenuItem>
              ))}
            </Select>
            {errors.itemCategory && (
              <FormHelperText>{errors.itemCategory}</FormHelperText>
            )}
          </FormControl>
        </Box>

        <Box sx={{ mt: 4 }}>
          <TextField
            label="Price"
            variant="outlined"
            rows={4}
            fullWidth
            size="medium"
            value={itemPrice}
            onChange={handleInputChange("itemPrice")}
            error={Boolean(errors.itemPrice)}
            helperText={errors.itemPrice}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-error": {
                  borderColor: "red",
                },
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: "30px",
          }}
        >
          <Button
            startIcon={
              <CheckCircle size={24} color="#fcfcfc" weight="duotone" />
            }
            variant="contained"
            sx={{
              backgroundColor: "#5787C8",
              fontWeight: 600,
              textTransform: "none",
              paddingLeft: "25px",
              paddingRight: "25px",
              fontSize: "16px",
              borderRadius: "5px",
              marginRight: 2,
              "&:hover": {
                backgroundColor: "#3b5c9f",
              },
            }}
            onClick={handleSubmitItem}
          >
            Submit
          </Button>
          <Button
            startIcon={<Backspace size={24} color="#5787C8" weight="regular" />}
            variant="outlined"
            sx={{
              fontWeight: 500,
              textTransform: "none",
              paddingLeft: "25px",
              paddingRight: "25px",
              fontSize: "16px",
              borderRadius: "5x",
            }}
            onClick={handleItemClear}
          >
            Clear
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddItem;
