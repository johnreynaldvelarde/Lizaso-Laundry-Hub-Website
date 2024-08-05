import { Box, Paper, Tab, Tabs, Grid, Typography } from "@mui/material";
import React from "react";

const UnitMonitor = () => {
  const laundryUnits = [
    { id: 1, name: "Unit 1" },
    { id: 2, name: "Unit 2" },
    { id: 3, name: "Unit 3" },
  ];

  const occupiedUnits = [
    { id: 1, customer: "Customer A" },
    { id: 2, customer: "Customer B" },
    { id: 3, customer: "Customer C" },
  ];

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Unit Monitor
      </Typography>
      <Grid container spacing={2}>
        {/* Left Panel: Laundry Units */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Laundry Units
            </Typography>
            {laundryUnits.map((unit) => (
              <Box key={unit.id} sx={{ boxShadow: 3, marginY: 1, padding: 1 }}>
                <Typography>{unit.name}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Right Panel: Occupied Units */}
        <Grid item xs={6}>
          <Paper elevation={3} sx={{ padding: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Occupied Units
            </Typography>
            {occupiedUnits.map((unit) => (
              <Box key={unit.id} sx={{ boxShadow: 3, marginY: 1, padding: 1 }}>
                <Typography>{unit.customer}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UnitMonitor;
