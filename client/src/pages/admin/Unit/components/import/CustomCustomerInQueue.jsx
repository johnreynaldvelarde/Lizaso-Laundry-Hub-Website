import React, { useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  Skeleton,
  Button,
  IconButton,
} from "@mui/material";
import { COLORS } from "../../../../../constants/color";
import { formatDistanceToNow } from "date-fns";
import nodata from "../../../../../assets/images/no_data_table.jpg";
import {
  ArrowArcLeft,
  ArrowFatLeft,
  ArrowFatRight,
  CaretLeft,
} from "@phosphor-icons/react";

const CustomCustomerInQueue = ({ customers, loading }) => {
  const scrollRef = useRef(null);

  // Function to scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  // Function to scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        flexDirection: "row",
        position: "relative", // For positioning the arrows
        overflow: "hidden", // Hide overflow to keep arrows contained
      }}
    >
      {/* Left arrow button */}
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: "absolute",
          left: 5,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: COLORS.secondary,
          boxShadow: 5, // Adjust the shadow level as needed (0-24)
          "&:hover": {
            backgroundColor: COLORS.secondaryHover,
            color: COLORS.white,
            boxShadow: 5, // Optional: Increase shadow on hover
          },
        }}
      >
        <ArrowFatLeft color={COLORS.white} weight="duotone" />
      </IconButton>

      <Box
        className="hori-scrollable"
        ref={scrollRef} // Attach ref to this box
        sx={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto", // Allow horizontal scrolling if needed
          gap: 2,
          flexWrap: "nowrap", // Prevent wrapping to ensure single-line display
        }}
      >
        {loading ? (
          // Render skeletons when loading
          [...Array(6)].map((_, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensure space between elements
                alignItems: "center",
                padding: 2,
                borderRadius: "8px",
                height: "250px", // Fixed height
                width: "200px", // Fixed width
                minWidth: "200px", // Ensure a minimum width
              }}
            >
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="text" sx={{ fontSize: "1rem", mt: 1 }} />
              <Skeleton variant="text" sx={{ fontSize: "0.875rem", mt: 1 }} />
              <Skeleton variant="text" sx={{ fontSize: "0.875rem", mt: 1 }} />
              <Skeleton variant="text" sx={{ fontSize: "0.875rem", mt: 1 }} />
              <Skeleton
                variant="rectangular"
                width={100}
                height={40}
                sx={{ mt: 2 }}
              />
            </Paper>
          ))
        ) : customers && customers.length > 0 ? (
          customers.map((customer) => (
            <Paper
              key={customer.tracking_code} // Unique key for each customer
              elevation={1} // Subtle shadow for elevation
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Ensure space between elements
                alignItems: "center",
                padding: 2,
                borderRadius: "8px",
                border: `1px solid ${COLORS.secondary}`, // Outline color
                backgroundColor: "#fff", // White background
                height: "250px", // Fixed height
                width: "100%",
                minWidth: "220px",
                position: "relative", // To position the circle
              }}
            >
              {/* Customer Type on Top Left */}
              <Typography
                variant="body2"
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  padding: "2px 4px",
                  borderRadius: "4px",
                  fontWeight: 500,
                  zIndex: 1,
                  color: COLORS.success,
                }}
              >
                {customer.customer_type}
              </Typography>

              {/* Queue Number in a Red Circle on Top Right */}
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: COLORS.error, // Red color for circle
                  borderRadius: "50%",
                  width: "24px", // Circle diameter
                  height: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff", // White text
                  fontWeight: "bold",
                  zIndex: 1, // Ensure it's above the background
                }}
              >
                {customer.queue_number} {/* Display queue number */}
              </Box>

              <Typography
                variant="body2"
                sx={{ mt: 6, fontWeight: "bold", color: COLORS.text }}
              >
                {customer.customer_fullname}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, fontWeight: 600, color: COLORS.subtitle }}
              >
                {customer.service_name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 1, color: COLORS.subtitle }}
              >
                Waiting Time
              </Typography>
              <Typography variant="body2" sx={{ color: COLORS.secondary }}>
                {formatDistanceToNow(new Date(customer.request_date), {
                  addSuffix: true,
                })}
              </Typography>
              <Box sx={{ mt: 2, width: "100%" }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: COLORS.secondary,
                    color: COLORS.white,
                    borderRadius: "4px",
                    padding: "8px 0", // Vertical padding for the button
                    "&:hover": {
                      backgroundColor: COLORS.secondaryHover,
                    },
                  }}
                >
                  Assign Unit
                </Button>
              </Box>
            </Paper>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 5,
              width: "100%",
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <img
              src={nodata}
              alt="No Data"
              style={{ width: 128, height: 128 }}
            />
            <Typography
              variant="body1"
              sx={{ color: COLORS.subtitle, fontWeight: 500 }}
            >
              No customers in the queue at the moment.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Right arrow button */}
      <IconButton
        onClick={scrollRight}
        sx={{
          position: "absolute",
          right: 5,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 1,
          backgroundColor: COLORS.secondary,
          boxShadow: 5,
          "&:hover": {
            backgroundColor: COLORS.secondaryHover,
            color: COLORS.white,
            boxShadow: 5,
          },
        }}
      >
        <ArrowFatRight color={COLORS.white} weight="duotone" />
      </IconButton>
    </Box>
  );
};

export default CustomCustomerInQueue;
