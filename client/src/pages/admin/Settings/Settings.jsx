import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";

const Settings = () => {
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Typography variant="h6" sx={{ marginBottom: "14px" }}>
        Settings
      </Typography>
    </Box>
  );
};

export default Settings;
