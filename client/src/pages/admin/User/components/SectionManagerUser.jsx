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
import usePopup from "../../../../hooks/common/usePopup";
import CustomScheduleTable from "../../../../components/common/table/CustomScheduleTable";
import useFetchData from "../../../../hooks/common/useFetchData";
import {
  dateOptions,
  statusOptions,
} from "../../../../data/schedule/serviceStatus";
import CustomCustomerTable from "../../../../components/common/table/CustomCustomerTable";

const SectionManagerUser = ({ storeId }) => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { data: scheduleData, fetchData: fetchSchedule } = useFetchData();
  const [loading, setLoading] = useState(true);

  const fetchScheduleData = useCallback(async () => {
    setLoading(true);
    await fetchSchedule(
      viewScheduleRequestByUser.getScheduleRequestByUser,
      storeId
    );
    setLoading(false);
  }, [fetchSchedule, storeId]);

  useEffect(() => {
    fetchScheduleData();
  }, [fetchScheduleData]);

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    applyFilters(selectedDate, status);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    applyFilters(date, selectedStatus);
  };

  const applyFilters = (dateOption, status) => {
    const filtered = scheduleData.filter((item) => {
      const requestDate = parseISO(item.request_date); // Parse the request date string into a Date object
      const isDateMatch = dateOption
        ? checkDateMatch(dateOption, requestDate)
        : true;
      const isStatusMatch = status ? item.request_status === status : true;
      return isDateMatch && isStatusMatch;
    });
    setFilteredData(filtered);
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
          title={"Customer Management"}
          subtitle={"Overview of All Customer Accounts and Activities"}
        />
        <CustomAddButton
          onClick={() => openPopup("addCustomer")}
          label={"Add new customer"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
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
          }}
        >
          <Box sx={{ display: "flex" }}>
            {/* Title */}
            <Typography
              variant="h6"
              sx={{ marginRight: 2, color: COLORS.text, fontWeight: 600 }}
            >
              All Customers
            </Typography>
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
            <FormControl sx={{ minWidth: 200 }} size="small" fullWidth>
              <Select
                value={selectedDate}
                onChange={handleDateChange}
                displayEmpty
                IconComponent={KeyboardArrowDown}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: COLORS.primary }}>
                        Select creation date
                      </span>
                    );
                  }
                  return selected;
                }}
                sx={{
                  borderRadius: 2,
                  color: COLORS.primary,
                  "& .MuiSvgIcon-root": {
                    color: COLORS.primary,
                  },
                }}
              >
                {/* Creation date options */}
                {dateOptions.map((date) => (
                  <MenuItem key={date} value={date}>
                    {date}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Filter Status */}
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
            <FormControl sx={{ minWidth: 200 }} size="small" fullWidth>
              <Select
                value={selectedStatus}
                onChange={handleStatusChange}
                displayEmpty
                IconComponent={KeyboardArrowDown}
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <span style={{ color: COLORS.primary }}>
                        Select status
                      </span>
                    );
                  }
                  return selected;
                }}
                sx={{
                  borderRadius: 2,
                  color: COLORS.primary,
                  "& .MuiSvgIcon-root": {
                    color: COLORS.primary,
                  },
                }}
              >
                {/* Status options */}
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Clear Filters Button */}
          <Box sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: "1px" } }}>
            <Button
              variant="outlined"
              onClick={() => {
                setSelectedDate("");
                setSelectedStatus("");
                setFilteredData(scheduleData);
              }}
              sx={{
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

export default SectionManagerUser;
