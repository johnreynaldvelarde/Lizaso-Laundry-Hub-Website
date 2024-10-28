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
} from "@mui/material";
import React from "react";
import usePopup from "../../../../hooks/common/usePopup";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import CustomeAddButton from "../../../../components/common/CustomAddButton";
import {
  AddressBookTabs,
  ArrowRight,
  ArrowUpRight,
  CalendarSlash,
  Hourglass,
  PlusCircle,
  Truck,
} from "@phosphor-icons/react";
import { COLORS } from "../../../../constants/color";
import CustomAddButton from "../../../../components/common/CustomAddButton";

const SectionAdminSchedule = () => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();

  const data = [
    {
      title: "Total Service Request",
      value: 150,
      percentageChange: "+20%",
      icon: <AddressBookTabs size={35} color={COLORS.white} weight="duotone" />,
      backgroundColor: COLORS.secondary, // Custom background color
    },
    {
      title: "Pending Request",
      value: 120,
      percentageChange: "+20%",
      icon: <Hourglass size={35} color={COLORS.white} weight="duotone" />,
      backgroundColor: COLORS.accent, // Custom background color
    },
    {
      title: "Complete Delivery",
      value: 30,
      percentageChange: "+20%",
      icon: <Truck size={35} color={COLORS.white} weight="duotone" />,
      backgroundColor: COLORS.success,
    },
    {
      title: "Canceled Request",
      value: 10,
      percentageChange: "+20%",
      icon: <CalendarSlash size={35} color={COLORS.white} weight="duotone" />,
      backgroundColor: COLORS.error, // Custom background color
    },
  ];

  const handleGoToMonitoredUnits = () => {
    // Your logic here
  };

  const handleSearchChange = (event) => {
    // Handle search input change
    console.log(event.target.value);
  };

  const handleDateChange = (event) => {
    // Handle date filter change
    console.log(event.target.value);
  };

  const handleTypeChange = (event) => {
    // Handle type filter change
    console.log(event.target.value);
  };

  const handleScheduleChange = (event) => {
    // Handle schedule filter change
    console.log(event.target.value);
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
          title={"Manage Schedules"}
          subtitle={"Organize and Oversee Service Requests"}
        />
        <CustomeAddButton
          onClick={handleGoToMonitoredUnits}
          label={"Create new request"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>

      {/* Header */}
      <Box display="flex" gap={2} flexWrap="wrap" sx={{ width: "100%" }}>
        {data.map((item, index) => (
          <Paper
            key={index}
            sx={{
              borderRadius: "14px",
              boxShadow: "none",
              borderWidth: 1,
              borderColor: COLORS.border,
              width: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(33.33% - 16px)",
                lg: "calc(25% - 16px)",
              },
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              px: 3,
              py: 3,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  marginRight: 2,
                  backgroundColor: item.backgroundColor,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 1,
                }}
              >
                {item.icon} {/* Render the custom icon */}
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  sx={{ color: COLORS.subtitle, fontWeight: 500 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: COLORS.text, fontWeight: 600 }}
                >
                  {item.value}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", marginTop: 1 }}>
              <Box
                sx={{
                  marginRight: 1,
                  backgroundColor: COLORS.pale_sucess,
                  borderRadius: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  height: 40,
                }}
              >
                <ArrowUpRight
                  size={25}
                  color={COLORS.success}
                  weight="duotone"
                />
              </Box>

              <Box sx={{ marginTop: 1 }}>
                <Typography variant="subtitle1" gutterBottom>
                  <span
                    className="text-base font-semibold"
                    style={{ color: COLORS.success }}
                  >
                    {item.percentageChange}
                  </span>
                  <span
                    className="ml-1 font-medium text-sm"
                    style={{ color: COLORS.primary }}
                  >
                    Increased last month
                  </span>
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box sx={{ mt: 5 }}>
        <Box
          className="flex items-center justify-between mb-"
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginRight: 2, color: COLORS.text, fontWeight: 600 }}
          >
            All Service Request
          </Typography>

          <Box
            className="flex items-center"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              "& button": {
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              },
            }}
          >
            <CustomAddButton
              onClick={() => openPopup("addItem")}
              label={"Add new item"}
              icon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SectionAdminSchedule;
