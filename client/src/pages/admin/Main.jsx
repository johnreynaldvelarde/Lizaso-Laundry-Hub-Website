import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";

// Importing components lazily from the centralized index.js in the pages folder
const Dashboard = lazy(() =>
  import("../../pages").then((module) => ({ default: module.Dashboard }))
);
const UnitMonitor = lazy(() =>
  import("../../pages").then((module) => ({ default: module.UnitMonitor }))
);
const Customers = lazy(() =>
  import("../../pages").then((module) => ({ default: module.Customers }))
);
const Inventory = lazy(() =>
  import("../../pages").then((module) => ({ default: module.Inventory }))
);
const Settings = lazy(() =>
  import("../../pages").then((module) => ({ default: module.Settings }))
);
const AddItem = lazy(() =>
  import("../../pages").then((module) => ({ default: module.AddItem }))
);
const ItemCategory = lazy(() =>
  import("../../pages").then((module) => ({ default: module.ItemCategory }))
);
const Schedule = lazy(() =>
  import("../../pages").then((module) => ({ default: module.Schedule }))
);
const Store = lazy(() =>
  import("../../pages").then((module) => ({ default: module.Store }))
);

// Add Section
// --> Laundry Units <--

// User Section
const User = lazy(() =>
  import("../../pages").then((module) => ({ default: module.User }))
);
const AddUser = lazy(() =>
  import("../../pages").then((module) => ({ default: module.AddUser }))
);

const AddUnits = lazy(() =>
  import("../../pages").then((module) => ({ default: module.AddUnits }))
);

const AddStore = lazy(() =>
  import("../../pages").then((module) => ({ default: module.AddStore }))
);

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="unit-monitor" element={<UnitMonitor />} />
            <Route path="customers" element={<Customers />} />
            <Route path="settings" element={<Settings />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="store" element={<Store />} />
            <Route path="add-store" element={<AddStore />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="add-item" element={<AddItem />} />
            <Route path="add-unit" element={<AddUnits />} />
            <Route path="item-category" element={<ItemCategory />} />
            // User Section
            <Route path="all-user" element={<User />} />
            <Route path="add-user" element={<AddUser />} />
            {/* Catch all undefined routes and redirect to dashboard */}
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </Box>
    </Box>
  );
};

export default Main;
