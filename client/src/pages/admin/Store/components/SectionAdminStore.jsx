import React from "react";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { PlusCircle, Trash, PencilLine, Eye } from "@phosphor-icons/react";
import { COLORS } from "../../../../constants/color";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import CustomerAddButton from "../../../../components/common/CustomAddButton";
import usePopup from "../../../../hooks/common/usePopup";
import PopAddNewStore from "./PopAddNewStore";

const PerformanceMetrics = ({ storeName }) => {
  const performanceData = {
    totalSales: "$20,000",
    inStoreVisits: 300,
    remoteServiceCustomers: 200,
    performanceRating: 4.5,
  };

  return (
    <Box
      sx={{
        my: 4,
        padding: 2,
        border: "1px solid",
        borderColor: COLORS.secondary,
        borderRadius: "8px",
        backgroundColor: COLORS.white,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Performance Metrics for {storeName}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography>Total Sales:</Typography>
          <Typography fontWeight="bold">
            {performanceData.totalSales}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>In-Store Visits:</Typography>
          <Typography fontWeight="bold">
            {performanceData.inStoreVisits}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Remote Service Usage:</Typography>
          <Typography fontWeight="bold">
            {performanceData.remoteServiceCustomers}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography>Performance Rating:</Typography>
          <Typography fontWeight="bold">
            {performanceData.performanceRating} ⭐
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

const SectionAdminStore = () => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const sampleStores = [
    {
      id: 1,
      storeName: "LIZASO Main",
      storeAddress: "123 Main St, City",
      storeContact: "123-456-7890",
      manager: "John Doe",
      dateCreated: "2024-01-01",
    },
    {
      id: 2,
      storeName: "LIZASO Branch 1",
      storeAddress: "456 Elm St, City",
      storeContact: "234-567-8901",
      manager: "Jane Smith",
      dateCreated: "2024-02-15",
    },
    {
      id: 3,
      storeName: "LIZASO Branch 2",
      storeAddress: "789 Oak St, City",
      storeContact: "345-678-9012",
      manager: "Michael Johnson",
      dateCreated: "2024-03-10",
    },
    {
      id: 4,
      storeName: "LIZASO Branch 3",
      storeAddress: "321 Pine St, City",
      storeContact: "456-789-0123",
      manager: "Emily Davis",
      dateCreated: "2024-04-20",
    },
  ];

  // Sample notification state
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddStore = () => {
    // setSnackbarMessage("New store added successfully!");
    // setOpenSnackbar(true);
  };

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
          title={" Store Management"}
          subtitle={"Add New Stores and Track Stats"}
        />
        <CustomerAddButton
          onClick={() => openPopup("addNewStore")}
          label={"Add new store"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>

      {/* Popup */}
      {isOpen && popupType === "addNewStore" && (
        <PopAddNewStore open={isOpen} onClose={closePopup} />
      )}
    </>
  );
};

export default SectionAdminStore;

{
  /* Search and Filter Section */
}
{
  /* <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search Store..."
            sx={{ backgroundColor: COLORS.white }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Filter by Manager</InputLabel>
            <Select
              label="Filter by Manager"
              sx={{ backgroundColor: COLORS.white }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="John Doe">John Doe</MenuItem>
              <MenuItem value="Jane Smith">Jane Smith</MenuItem>
              <MenuItem value="Michael Johnson">Michael Johnson</MenuItem>
              <MenuItem value="Emily Davis">Emily Davis</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid> */
}

{
  /* Sample list of stores */
}
{
  /* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Store Name</TableCell>
              <TableCell>Store Address</TableCell>
              <TableCell>Store Contact</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleStores.map((store) => (
              <TableRow key={store.id}>
                <TableCell>{store.id}</TableCell>
                <TableCell>
                  {store.storeName}
                  <PerformanceMetrics storeName={store.storeName} />
                </TableCell>
                <TableCell>{store.storeAddress}</TableCell>
                <TableCell>{store.storeContact}</TableCell>
                <TableCell>{store.manager}</TableCell>
                <TableCell>{store.dateCreated}</TableCell>
                <TableCell align="right">
                  <Tooltip title="View Details" arrow>
                    <IconButton>
                      <Eye size={20} color={COLORS.primary} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Store" arrow>
                    <IconButton>
                      <PencilLine size={20} color={COLORS.secondary} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Store" arrow>
                    <IconButton>
                      <Trash size={20} color={COLORS.error} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */
}

{
  /* <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar> */
}
