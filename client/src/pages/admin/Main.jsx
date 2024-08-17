import { Box } from "@mui/material";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

import {
  Dashboard,
  UnitMonitor,
  Customers,
  Inventory,
  Settings,
  AddItem,
  ItemCategory,
  Schedule,
  Branch,
  AddBranch,
} from "../../pages";

// const sideBarWidth = 250;
const sideBarWidth = 300;

const Main = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar
        sideBarWidth={sideBarWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        sideBarWidth={sideBarWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1, md: 2 },
          width: { xs: "100%", md: `calc(100% - ${sideBarWidth}px)` },
        }}
      >
        {/* Routes */}
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="unit-monitor" element={<UnitMonitor />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="branch" element={<Branch />} />
          <Route path="add-branch" element={<AddBranch />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="item-category" element={<ItemCategory />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Main;
