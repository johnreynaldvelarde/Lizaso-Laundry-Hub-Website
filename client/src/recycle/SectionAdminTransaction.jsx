import React, { useCallback, useEffect, useState } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { parseISO } from "date-fns";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import { COLORS } from "../../../../constants/color";
import usePopup from "../../../../hooks/common/usePopup";
import useFetchData from "../../../../hooks/common/useFetchData";
import {
  dateOptions,
  statusOptions,
} from "../../../../data/schedule/serviceStatus";
import {
  getReviews,
  getTransactionHistory,
  getTransactionSalesByMonth,
} from "../../../../services/api/getApi";
import { checkDateMatch } from "../../../../utils/method";
import CustomSearch from "../../../../components/common/table/filter/CustomSearch";
import CustomHeaderTitleTable from "../../../../components/common/CustomHeaderTitleTable";
import CustomCreatedDate from "../../../../components/common/table/filter/CustomCreatedDate";
import CustomTransactionTable from "../../../../components/common/table/CustomTransactionTable";
import CustomPaymentStatus from "../../../../components/common/table/filter/CustomPaymentStatus";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SectionAdminTransaction = ({ storeId }) => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data: transactionData, fetchData: fetchTransaction } = useFetchData();
  const { data: salesByMonthData, fetchData: fetchSalesByMonth } =
    useFetchData();
  const [loading, setLoading] = useState(true);
  const statusOptions = ["Completed", "Pending"];

  const fetchTransactionData = useCallback(async () => {
    setLoading(true);
    await fetchTransaction(
      getTransactionHistory.viewTransctionHistory,
      storeId
    );
    setLoading(false);
  }, [fetchTransaction, storeId]);

  const fetchSalesByMonthData = useCallback(async () => {
    setLoading(true);
    await fetchSalesByMonth(
      getTransactionSalesByMonth.viewSalesByMonth,
      storeId
    );
    setLoading(false);
  }, [fetchSalesByMonth, storeId]);

  useEffect(() => {
    fetchTransactionData();
    fetchSalesByMonthData();
  }, [fetchTransactionData, fetchSalesByMonthData]);

  console.log(salesByMonthData);

  useEffect(() => {
    if (transactionData) {
      setFilteredData(transactionData);
    }
  }, [transactionData]);

  const handleRefreshData = () => {
    fetchTransactionData();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    applyFilters(selectedDate, selectedStatus, event.target.value);
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    applyFilters(selectedDate, status, searchTerm);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    applyFilters(date, selectedStatus, searchTerm);
  };

  const applyFilters = (dateOption, status, search) => {
    const filtered = transactionData.filter((item) => {
      const requestDate = parseISO(item.created_at);
      const isDateMatch = dateOption
        ? checkDateMatch(dateOption, requestDate)
        : true;

      // Filter by transaction status if selected
      const isStatusMatch = status ? item.transaction_status === status : true;

      // Filter by search term in customer fullname
      const isSearchMatch = item.customer_fullname
        .toLowerCase()
        .includes(search.toLowerCase());

      return isDateMatch && isStatusMatch && isSearchMatch;
    });

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters(selectedDate, selectedStatus, searchTerm);
  }, [selectedDate, selectedStatus, searchTerm, transactionData]);

  useEffect(() => {
    applyFilters(selectedDate, selectedStatus, searchTerm);
  }, [selectedDate, selectedStatus, searchTerm, transactionData]);

  const totalSales = 5000; // Define your total sales here
  const salesData = [
    { month: "Jan", sales: 1000 },
    { month: "Feb", sales: 1200 },
    { month: "Mar", sales: 800 },
    { month: "Apr", sales: 1500 },
    { month: "May", sales: 2000 },
  ];

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
          title={"Transaction History"}
          subtitle={"Complete Overview of Transa  ction Activities"}
        />
      </Box>

      {/* Sub Header */}
      <Box display="flex" sx={{ width: "100%", gap: 2 }}>
        {/* Total Sales Paper */}
        <Paper
          sx={{
            borderRadius: "14px",
            boxShadow: "none",
            borderWidth: 1,
            borderColor: COLORS.border,
            width: {
              xs: "100%",
              sm: "calc(50% - 16px)",
              md: "calc(40% - 16px)",
              lg: "calc(35% - 16px)",
            },
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            px: 3,
            py: 3,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: COLORS.text, fontWeight: 600 }}
          >
            Total Sales
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: COLORS.success, fontWeight: 600 }}
          >
            ${totalSales}
          </Typography>
        </Paper>

        {/* Sales Graph */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 16px)",
              md: "calc(60% - 16px)",
              lg: "calc(65% - 16px)",
            },
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <Paper
            sx={{
              borderRadius: "14px",
              boxShadow: "none",
              borderWidth: 1,
              borderColor: COLORS.border,
              height: "100%",
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: COLORS.text, fontWeight: 600, px: 3, pt: 3 }}
            >
              Sales Trend
            </Typography>
            <Box sx={{ height: "300px", p: 1 }}>
              <ResponsiveContainer>
                <LineChart data={salesByMonthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  {/* Customize grid color */}
                  <XAxis dataKey="month" stroke={COLORS.primary} />
                  {/* Customize X axis tick color */}
                  <YAxis stroke={COLORS.primary} />
                  {/* Customize Y axis tick color */}
                  <Tooltip
                    contentStyle={{ backgroundColor: COLORS.background }} // Customize tooltip background
                    labelStyle={{ color: COLORS.secondary }} // Customize tooltip label color
                  />
                  <Legend wrapperStyle={{ color: COLORS.text }} />{" "}
                  {/* Customize legend text color */}
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke={COLORS.secondary}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Content */}
      <Box mt={5}>
        <Box
          mb={2}
          className="flex items-center"
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            gap: { xs: 0, sm: 1, md: 1 },
          }}
        >
          <Box sx={{ display: "flex" }}>
            {/* Title */}
            <CustomHeaderTitleTable title={"All Transaction History"} />
          </Box>

          {/* Filter by search*/}
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
            }}
          >
            <CustomSearch
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder={"Search name..."}
            />
          </Box>

          {/* Filter by created date */}
          <Box
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
          </Box>

          {/* Filter Rating */}
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
            }}
          >
            <CustomPaymentStatus
              statusOptions={statusOptions}
              selectedStatus={selectedStatus}
              handleStatusChange={handleStatusChange}
            />
          </Box>

          {/* Clear Filters Button */}
          <Box
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
          </Box>
        </Box>

        <Box>
          <CustomTransactionTable
            tableData={filteredData}
            loading={loading}
            refreshData={handleRefreshData}
          />
        </Box>
      </Box>

      {/* Popup */}
    </>
  );
};

export default SectionAdminTransaction;
