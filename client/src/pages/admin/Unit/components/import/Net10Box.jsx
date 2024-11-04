import React from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material"; // Example icon
import { COLORS } from "../../../../../constants/color";

const Net10Box = () => (
  <Paper
    elevation={3}
    sx={{
      padding: 2,
      borderRadius: "8px",
      textAlign: "center",
      backgroundColor: COLORS.secondaryLight, // Light background color
      border: 1,
      borderColor: COLORS.secondary,
    }}
  >
    <CheckCircle sx={{ color: COLORS.error, fontSize: 40 }} />
    <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
      Net 10
    </Typography>
    <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>
      Enjoy unlimited talk and text with 10GB of high-speed data.
    </Typography>
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: "none",
          fontWeight: 500,
          color: COLORS.white,
          backgroundColor: COLORS.secondary,
          "&:hover": {
            backgroundColor: COLORS.secondaryHover,
          },
        }}
      >
        Assign
      </Button>
    </Box>
  </Paper>
);

const Net10Grid = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Net10Box />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Net10Grid;
