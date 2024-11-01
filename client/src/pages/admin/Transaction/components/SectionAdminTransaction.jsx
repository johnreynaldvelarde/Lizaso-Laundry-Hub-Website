import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import { parseISO } from "date-fns";
import { KeyboardArrowDown } from "@mui/icons-material";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import { COLORS } from "../../../../constants/color";
import usePopup from "../../../../hooks/common/usePopup";
import useFetchData from "../../../../hooks/common/useFetchData";
import {
  dateOptions,
  statusOptions,
} from "../../../../data/schedule/serviceStatus";
import CustomCustomerTable from "../../../../components/common/table/CustomCustomerTable";
import CustomReviewsTable from "../../../../components/common/table/CustomReviewsTable";
import {
  getReviews,
  getTransactionHistory,
} from "../../../../services/api/getApi";
import { checkDateMatch } from "../../../../utils/method";
import CustomRatingFilter from "../../../../components/common/table/filter/CustomRatingFilter";
import CustomSearch from "../../../../components/common/table/filter/CustomSearch";
import CustomHeaderTitleTable from "../../../../components/common/CustomHeaderTitleTable";
import CustomCreatedDate from "../../../../components/common/table/filter/CustomCreatedDate";
import CustomTransactionTable from "../../../../components/common/table/CustomTransactionTable";
import CustomPaymentStatus from "../../../../components/common/table/filter/CustomPaymentStatus";

const SectionAdminTransaction = ({ storeId }) => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data: transactionData, fetchData: fetchTransaction } = useFetchData();
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

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

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
          subtitle={"Complete Overview of Transaction Activities"}
        />
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
