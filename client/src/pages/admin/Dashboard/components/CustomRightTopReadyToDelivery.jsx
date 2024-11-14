import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import useFetchData from "../../../../hooks/common/useFetchData";
import Chart from "react-apexcharts";
import { COLORS } from "../../../../constants/color";
import CustomActivityLogTable from "../../../../components/common/table/CustomActivityLogTable";
import CustomTableReadyForDelivery from "./table/CustomTableReadyForDelivery";
import { getTableListReadyForDeliveryAndAttemptedDelivery } from "../../../../services/api/getApi";
import CustomSearch from "../../../../components/common/table/filter/CustomSearch";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";

const CustomRightTopReadyToDelivery = ({ storeId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: data, fetchData: fetchListofReadyDelivery } = useFetchData();

  const fetchListofReadyDeliveryData = useCallback(async () => {
    setLoading(true);
    await fetchListofReadyDelivery(
      getTableListReadyForDeliveryAndAttemptedDelivery.getTableListReadyDelivery,
      storeId
    );
    setLoading(false);
  }, [fetchListofReadyDelivery, storeId]);

  useEffect(() => {
    fetchListofReadyDeliveryData();
  }, [fetchListofReadyDeliveryData]);

  const handleRefreshData = () => {
    fetchListofReadyDeliveryData();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    applyFilters(event.target.value);
  };

  const applyFilters = (search) => {
    const filtered = data.filter((item) => {
      const isSearchMatch =
        item.customer_fullname.toLowerCase().includes(search.toLowerCase()) ||
        item.tracking_code.toLowerCase().includes(search.toLowerCase());

      return isSearchMatch;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters(searchTerm); // Only passes the search term
  }, [searchTerm, data]); // Depends on search term and data

  return (
    <Paper
      sx={{
        p: 5,
        boxShadow: "none",
        border: 1,
        borderColor: COLORS.border,
        borderRadius: "14px",
      }}
    >
      <Box
        className="flex items-center"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: { xs: 0, sm: 1, md: 1 },
          justifyContent: "space-between",
        }}
      >
        <Typography fontWeight={600} color={COLORS.primary} fontSize={20}>
          Ready for Delivery
        </Typography>
        {/* Filter by search */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "auto",
            },
            mt: {
              xs: 2,
              sm: 0,
            },
            ml: "auto", // Pushes the search box to the right edge
          }}
        >
          <CustomSearch
            searchTerm={searchTerm}
            handleSearchChange={handleSearchChange}
            placeholder={"Search name or code..."}
          />
        </Box>
      </Box>

      <Box mt={2}>
        <CustomTableReadyForDelivery
          tableData={filteredData}
          loading={loading}
          refreshData={handleRefreshData}
        />
      </Box>
    </Paper>
  );
};

export default CustomRightTopReadyToDelivery;

{
  /* Filter by created date */
}
{
  /* <Box
          sx={{
            width: {
              xs: "100%", // Full width on small screens
              sm: "auto", // Auto width on larger screens
            },
            mt: {
              xs: 2, // Margin top on small screens
              sm: 0, // No margin top on larger screens
            },
          }}
        >
          <CustomCreatedDate
            selectedDate={selectedDate}
            handleDateChange={handleDateChange}
            dateOptions={dateOptions}
          />
        </Box> */
}

{
  /* Filter Status */
}
{
  /* <Box
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              mt: {
                xs: 2,
                sm: 0,
              },
            }}
          >
            <CustomPaymentStatus
              statusOptions={statusOptions}
              selectedStatus={selectedStatus}
              handleStatusChange={handleStatusChange}
            />
          </Box> */
}

{
  /* Clear Filters Button */
}
{
  /* <Box
            sx={{
              width: {
                xs: "100%", // Full width on small screens
                sm: "auto", // Auto width on larger screens
              },
              mt: { xs: 2, sm: 0 },
              ml: { sm: "1px" },
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                setSearchTerm("");
                setSelectedDate("");
                setSelectedStatus("");
                setFilteredData(transactionData);
              }}
              sx={{
                width: {
                  xs: "100%", // Full width on small screens
                  sm: "auto", // Auto width on larger screens
                },
                textTransform: "none",
                borderColor: COLORS.border,
                color: COLORS.primary,
                "&:hover": {
                  borderColor: COLORS.secondary,
                  backgroundColor: COLORS.secondaryLight,
                  color: COLORS.secondary,
                },
              }}
            >
              Clear Filters
            </Button>
          </Box> */
}
