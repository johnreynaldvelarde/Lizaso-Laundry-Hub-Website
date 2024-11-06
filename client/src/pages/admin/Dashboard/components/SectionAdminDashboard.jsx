import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Stack,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import { COLORS } from "../../../../constants/color";
import styled from "@emotion/styled";
import CustomDashHorizontal from "./CustomDashHorizontal";
import total_sales from "../../../../assets/gif/total_sales.gif";
import total_service_request from "../../../../assets/gif/total_service_request.gif";
import total_customers from "../../../../assets/gif/total_customers.gif";

// Mock data for the example
const keyMetrics = [
  {
    title: "Total Sales",
    amount: "₱95,800",
    change: "+32.40%",
    progress: 32,
    color: "#4690FF",
    gif_icon: total_sales,
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 7000 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 8000 },
    ],
  },
  {
    title: "Total Service Request",
    amount: "53,400",
    change: "-18.45%",
    progress: 48,
    color: "#B4162C",
    gif_icon: total_service_request,
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 7000 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 8000 },
    ],
  },
  {
    title: "Total Customers",
    amount: "90,875",
    change: "+20.34%",
    progress: 89,
    color: "#4CAF50",
    gif_icon: total_customers,
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 7000 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 8000 },
    ],
  },
  {
    title: "Total Music",
    amount: "63,076 GB",
    change: "+14.45%",
    progress: 54,
    color: "#FFC107",
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 7000 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 8000 },
    ],
  },
];

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
      <CustomDashHorizontal keyMetrics={keyMetrics} />

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

{
  /* <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Total Storage Used
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", color: COLORS.blue }}
        >
          105,000 GB
        </Typography>
        <Typography variant="body2" color="text.secondary">
          +32.40% last year
        </Typography>
        <Box sx={{ mt: 4, height: 200, backgroundColor: COLORS.lightGray }}>
          <Typography variant="body1" sx={{ p: 2 }}>
            Bar Chart Placeholder
          </Typography>
        </Box>
      </Box>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <CircularProgress
          variant="determinate"
          value={78}
          size={100}
          thickness={5}
          sx={{ color: COLORS.blue }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
          78 GB Used of 100
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 1 }}
        >
          <Typography variant="body2">Available storage 22%</Typography>
          <Typography variant="body2" sx={{ color: COLORS.blue }}>
            Total used storage 78%
          </Typography>
        </Stack>
      </Box> */
}

{
  /* Quick Access */
}
{
  /* <Typography variant="h6" sx={{ mb: 2 }}>
        Quick Access
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>Icon 1</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>Icon 2</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>Icon 3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper sx={{ p: 2 }}>Icon 4</Paper>
        </Grid>
      </Grid> */
}

{
  /* <Typography variant="h6" sx={{ mb: 2 }}>
        Recent Activities
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1">Activity 1</Typography>
        <Typography variant="body1">Activity 2</Typography>
        <Typography variant="body1">Activity 3</Typography>
        <Typography variant="body1">Activity 4</Typography>
      </Paper> */
}
