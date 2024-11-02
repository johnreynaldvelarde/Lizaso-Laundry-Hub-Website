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
import { KeyboardArrowDown } from "@mui/icons-material";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import CustomAddButton from "../../../../components/common/CustomAddButton";
import { COLORS } from "../../../../constants/color";
import { PlusCircle } from "@phosphor-icons/react";
import PopAddNewCustomer from "./PopAddNewCustomer";
import usePopup from "../../../../hooks/common/usePopup";
import CustomScheduleTable from "../../../../components/common/table/CustomScheduleTable";
import useFetchData from "../../../../hooks/common/useFetchData";
import { dateOptions } from "../../../../data/schedule/serviceStatus";
import CustomCustomerTable from "../../../../components/common/table/CustomCustomerTable";
import CustomHeaderTitleTable from "../../../../components/common/CustomHeaderTitleTable";
import CustomSearch from "../../../../components/common/table/filter/CustomSearch";
import CustomCreatedDate from "../../../../components/common/table/filter/CustomCreatedDate";
import { getCustomerList } from "../../../../services/api/getApi";
import { parseISO } from "date-fns";
import { checkDateMatch } from "../../../../utils/method";

const SectionAdminCustomers = ({ storeId }) => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data: customerListData, fetchData: fetchCustomerList } =
    useFetchData();
  const [loading, setLoading] = useState(true);

  const fetchCustomerListData = useCallback(async () => {
    setLoading(true);
    await fetchCustomerList(getCustomerList.viewCustomerList, storeId);
    setLoading(false);
  }, [fetchCustomerList, storeId]);

  useEffect(() => {
    fetchCustomerListData();
  }, [fetchCustomerListData]);

  useEffect(() => {
    if (customerListData) {
      setFilteredData(customerListData);
    }
  }, [customerListData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    applyFilters(selectedDate, event.target.value);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    applyFilters(date, searchTerm);
  };

  const applyFilters = (dateOption, search) => {
    const filtered = customerListData.filter((item) => {
      const requestDate = parseISO(item.date_created);
      const isDateMatch = dateOption
        ? checkDateMatch(dateOption, requestDate)
        : true;

      // Filter by search term in customer fullname
      const isSearchMatch =
        item.full_name.toLowerCase().includes(search.toLowerCase()) ||
        item.username.toLowerCase().includes(search.toLowerCase());

      return isDateMatch && isSearchMatch;
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters(selectedDate, searchTerm);
  }, [selectedDate, searchTerm, customerListData]);

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
          title={"View Customer List"}
          subtitle={"Overview of All Customer Accounts and Activities"}
        />
        <CustomAddButton
          onClick={() => openPopup("addCustomer")}
          label={"Add new customer"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>

      {/* Sub Header */}
      <Box
        display="flex"
        sx={{ width: "100%", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 8px)",
              md: "calc(60% - 8px)",
              lg: "calc(35% - 8px)",
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                color: COLORS.primary,
                fontWeight: 600,
                textAlign: "center",
                mt: 2,
              }}
            >
              Top Customers
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "300px",
                height: "300px",
                mt: 2,
              }}
            ></Box>
          </Paper>
          {/* <CustomPieChart data={customerTypeData} /> */}
        </Box>

        {/* Sales Graph */}
        <Box
          sx={{
            width: {
              xs: "100%",
              sm: "calc(50% - 8px)",
              md: "calc(40% - 8px)",
              lg: "calc(65% - 8px)",
            },
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          {/* <SalesTrendChart salesByMonthData={salesByMonthData} /> */}
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
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CustomHeaderTitleTable title={"All Customers"} />
          </Box>

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
              placeholder={"Search name or username..."}
            />
          </Box>

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
              mx: {
                xs: 0,
                sm: 2,
              },
            }}
          >
            <CustomCreatedDate
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
              dateOptions={dateOptions}
            />
          </Box>

          {/* Clear Filters Button */}
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
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
                setFilteredData(customerListData);
              }}
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
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
          <CustomCustomerTable
            tableData={filteredData}
            loading={loading}
            // refreshData={handleRefreshData}
          />
        </Box>
      </Box>

      {/* Popup */}
      {isOpen && popupType === "addCustomer" && (
        <PopAddNewCustomer open={isOpen} onClose={closePopup} />
      )}
    </>
  );
};

export default SectionAdminCustomers;
