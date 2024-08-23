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
  InputAdornment,
} from "@mui/material";
import styled from "@emotion/styled";
import React from "react";
import useAddUnit from "../../../hooks/admin/useAddUnit";
import { unitStatus } from "../../../data/unit_status";
import { BiImageAdd } from "react-icons/bi";

const AddUnits = () => {
  const {
    isUnitStatus,
    unitName,
    errors,
    image,
    handleChange,
    handleInputChange,
    handleClear,
    handleSubmit,
  } = useAddUnit();

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
        Add new laundry units
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
          mt: "50px",
        }}
      >
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
          <FormControl fullWidth size="medium">
            <InputLabel id="demo-simple-select-label">Unit Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Unit Status"
              value={isUnitStatus}
              onChange={handleChange}
            >
              {unitStatus?.map(({ unit_id, status }) => (
                <MenuItem value={status} key={unit_id}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
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
