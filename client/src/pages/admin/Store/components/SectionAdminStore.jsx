import React, { useCallback, useEffect } from "react";
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
import CustomMap from "../../../../components/common/CustomMap";
import CustomStarRating from "../../../../components/common/CustomStartRating";
import OutlinedIconButton from "../../../../components/table/OutlinedIconButton";
import DateCell from "../../../../components/table/DateCell";
import useFetchData from "../../../../hooks/common/useFetchData";
import { viewStoreByAdmin } from "../../../../services/api/getApi";

const PerformanceMetrics = ({
  storeName,
  online_count,
  walkin_count,
  average_rating,
  total_sales,
}) => {
  const formattedRating =
    typeof average_rating === "number" && !isNaN(average_rating)
      ? average_rating.toFixed(1)
      : "0.0";

  const formattedTotalSales =
    total_sales !== null && !isNaN(Number(total_sales))
      ? Number(total_sales).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "0.00";
  return (
    <Paper
      sx={{
        my: 2,
        padding: 2,
        boxShadow: "none",
        border: "1px solid",
        borderColor: COLORS.border,
        borderRadius: "8px",
        backgroundColor: COLORS.white,
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 2, color: COLORS.text, fontWeight: 600 }}
      >
        Performance Metrics for
        <span className="ml-1 font-bold" style={{ color: COLORS.secondary }}>
          {storeName}
        </span>
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} lg={4}>
          <Typography sx={{ fontWeight: 500, color: COLORS.primary }}>
            Total Sales:
          </Typography>
          <Typography fontWeight="bold" sx={{ color: COLORS.secondary }}>
            ₱{formattedTotalSales}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Typography sx={{ fontWeight: 500, color: COLORS.primary }}>
            In-Store Visits:
          </Typography>
          <Typography fontWeight="bold" sx={{ color: COLORS.secondary }}>
            {walkin_count}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Typography sx={{ fontWeight: 500, color: COLORS.primary }}>
            Online Laundry Usage:
          </Typography>
          <Typography fontWeight="bold" sx={{ color: COLORS.secondary }}>
            {online_count}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Typography sx={{ fontWeight: 500, color: COLORS.primary }}>
            Performance Rating:
          </Typography>
          <CustomStarRating rating={formattedRating} />
        </Grid>
      </Grid>
    </Paper>
  );
};

const SectionAdminStore = () => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const { data: storeData, fetchData: fetchStores } = useFetchData();

  const fetchStoresData = useCallback(() => {
    fetchStores(viewStoreByAdmin.getStoreByAdmin);
  }, [fetchStores]);

  useEffect(() => {
    fetchStoresData();
  }, [fetchStoresData]);

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
  ];

  // Sample notification state
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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

      <Box>
        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto",
            borderRadius: 2, // No rounded corners
            boxShadow: "none",
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <Table>
            <TableHead className="bg-[#F1F1F1] border-b">
              <TableRow>
                <TableCell sx={cellHeadStyles}>ID</TableCell>
                <TableCell sx={cellHeadStyles}>Store Name</TableCell>
                <TableCell sx={cellHeadStyles}>Address</TableCell>
                <TableCell sx={cellHeadStyles}>Contact</TableCell>
                <TableCell sx={cellHeadStyles}>Manager</TableCell>
                <TableCell sx={cellHeadStyles}>Date Created</TableCell>
                <TableCell sx={cellHeadStyles}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {storeData.map((store) => (
                <TableRow key={store.store_id}>
                  <TableCell sx={{ paddingY: 2, paddingX: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: COLORS.secondary }}
                    >
                      # {store.store_id}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 2, paddingX: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: COLORS.text }}
                    >
                      {store.store_name}
                    </Typography>
                    <PerformanceMetrics
                      storeName={store.storeName}
                      online_count={store.online_count}
                      walkin_count={store.walkin_count}
                      average_rating={store.average_rating}
                      total_sales={store.total_sales}
                    />
                  </TableCell>
                  <TableCell sx={{ paddingY: 2, paddingX: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "600", color: COLORS.text }}
                    >
                      {store.address_line}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "500", color: COLORS.text4 }}
                    >
                      {store.province}, {store.city}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 2, paddingX: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "500", color: COLORS.text4 }}
                    >
                      {store.store_contact}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 2, paddingX: 2 }}>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "500", color: COLORS.text4 }}
                    >
                      {store.manager}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ paddingY: 2, paddingX: 2 }}>
                    <DateCell dateCreated={store.date_created} />
                  </TableCell>
                  <TableCell sx={{ paddingY: 3, paddingX: 2 }}>
                    <Tooltip title="View Store" arrow>
                      <OutlinedIconButton>
                        <Eye color={COLORS.primary} weight="duotone" />
                      </OutlinedIconButton>
                    </Tooltip>
                    <Tooltip title="Edit Store" arrow>
                      <OutlinedIconButton>
                        <PencilLine color={COLORS.secondary} weight="duotone" />
                      </OutlinedIconButton>
                    </Tooltip>
                    <Tooltip title="Delete Store" arrow>
                      <OutlinedIconButton>
                        <Trash color={COLORS.error} weight="duotone" />
                      </OutlinedIconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Popup */}
      {isOpen && popupType === "addNewStore" && (
        <PopAddNewStore open={isOpen} onClose={closePopup} />
      )}
    </>
  );
};

export default SectionAdminStore;

const cellHeadStyles = {
  paddingY: 2,
  paddingX: 2,
  textAlign: "left",
  color: "#595959",
  fontSize: "1",
  fontWeight: 600, // Changed to semi-bold
  textTransform: "uppercase",
};

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
