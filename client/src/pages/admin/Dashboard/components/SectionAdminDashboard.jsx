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
              <Paper
                sx={{
                  p: 4,
                  boxShadow: "none",
                  border: 1,
                  borderColor: COLORS.border,
                  borderRadius: "14px",
                }}
              >
                <Typography variant="h6">Employee List</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData1.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Paper
                sx={{
                  p: 4,
                  boxShadow: "none",
                  border: 1,
                  borderColor: COLORS.border,
                  borderRadius: "14px",
                }}
              >
                <Typography variant="h6">Employee List</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData1.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Paper
                sx={{
                  p: 4,
                  boxShadow: "none",
                  border: 1,
                  borderColor: COLORS.border,
                  borderRadius: "14px",
                }}
              >
                <Typography variant="h6">Employee List</Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Role</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData1.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.role}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Box>
          </Grid>

          {/* Right Column with Paper List */}
          <Grid item xs={12} sm={4}>
            <Paper
              sx={{
                p: 4,
                boxShadow: "none",
                border: 1,
                borderColor: COLORS.border,
                borderRadius: "14px",
              }}
            >
              <Typography variant="h6">Notifications</Typography>
              <Box sx={{ mt: 2 }}>
                <ul>
                  <li>New order placed</li>
                  <li>Inventory updated</li>
                  <li>Customer inquiry</li>
                </ul>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SectionAdminDashboard;
