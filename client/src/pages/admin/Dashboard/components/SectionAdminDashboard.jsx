import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import { COLORS } from "../../../../constants/color";
import CustomDashHorizontal from "./CustomDashHorizontal";
import CustomTopNewCustomer from "./CustomTopNewCustomer";
import CustomTotalRevenueByMonth from "./CustomTotalRevenueByMonth";
import CustomTopReadyToDelivery from "./CustomTopReadyToDelivery";

const tableData1 = [
  { id: 1, name: "John Doe", role: "Manager" },
  { id: 2, name: "Jane Smith", role: "Employee" },
];

const tableData2 = [
  { id: 1, product: "Laundry Detergent", stock: 50 },
  { id: 2, product: "Fabric Softener", stock: 20 },
];

const tableData3 = [
  { id: 1, service: "Express", price: "₱100" },
  { id: 2, service: "Regular", price: "₱50" },
];

const newCustomers = [
  {
    first_name: "John",
    middle_name: "Michael",
    last_name: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield",
    serviceRequests: 5,
  },
  {
    first_name: "Jane",
    middle_name: "Ann",
    last_name: "Smith",
    email: "janesmith@example.com",
    address: "456 Oak St, Shelbyville",
    serviceRequests: 2,
  },
  {
    first_name: "John",
    middle_name: "Michael",
    last_name: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield",
    serviceRequests: 5,
  },
  {
    first_name: "Jane",
    middle_name: "Ann",
    last_name: "Smith",
    email: "janesmith@example.com",
    address: "456 Oak St, Shelbyville",
    serviceRequests: 2,
  },
  {
    first_name: "John",
    middle_name: "Michael",
    last_name: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Springfield",
    serviceRequests: 5,
  },
  {
    first_name: "Jane",
    middle_name: "Ann",
    last_name: "Smith",
    email: "janesmith@example.com",
    address: "456 Oak St, Shelbyville",
    serviceRequests: 2,
  },
];

const SectionAdminDashboard = () => {
  return (
    <>
      {/* Header */}
      <Box
        className="flex items-center justify-between mb-8"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        <CustomHeaderTitle
          title={"Dashboard"}
          subtitle={"Overview of Key Metrics and Insights"}
        />
      </Box>

      {/* Key Metrics */}
      <CustomDashHorizontal />

      <Box marginTop={3}>
        <Grid container spacing={3}>
          {/* Left Column with Three Tables */}
          <Grid item xs={12} sm={8}>
            <Box sx={{ mb: 3 }}>
              <CustomTotalRevenueByMonth />
            </Box>
            <Box sx={{ mb: 3 }}></Box>
          </Grid>

          {/* Right Column with Paper List */}
          <Grid item xs={12} sm={4}>
            <Box mb={3}>
              <CustomTopNewCustomer />
            </Box>
            <Box mb={3}>
              <CustomTopReadyToDelivery />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SectionAdminDashboard;
