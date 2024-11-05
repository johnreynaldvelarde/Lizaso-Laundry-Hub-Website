import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { COLORS } from "../../../../constants/color";
import {
  ArrowFatLineLeft,
  ArrowFatLineRight,
  UserCircle,
} from "@phosphor-icons/react";

const CustomDashHorizontal = ({ keyMetrics }) => {
  const scrollRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    // Check if scrolling is necessary
    if (scrollRef.current.scrollWidth > scrollRef.current.clientWidth) {
      setIsScrollable(true);
      setShowRightArrow(true);
    }
  }, [keyMetrics]);

  const handleScroll = (direction) => {
    const scrollAmount = 200;
    if (scrollRef.current) {
      const newScrollLeft =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });
    }
  };

  const handleScrollEvent = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 0);
      setShowRightArrow(
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth <
          scrollRef.current.scrollWidth
      );
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", width: "100%" }}>
      {/* Left Arrow */}
      {isScrollable && showLeftArrow && (
        <IconButton
          onClick={() => handleScroll("left")}
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: COLORS.secondary,
            boxShadow: 5,
            "&:hover": { backgroundColor: COLORS.secondaryHover },
          }}
        >
          <ArrowFatLineLeft color={COLORS.white} weight="duotone" />
        </IconButton>
      )}

      {/* Scrollable Metrics */}
      <Box
        ref={scrollRef}
        onScroll={handleScrollEvent}
        sx={{
          display: "flex",
          overflowX: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for aesthetic
        }}
      >
        {keyMetrics.map((metric, index) => (
          <Box key={index} sx={{ minWidth: 450, flexShrink: 0, p: 1 }}>
            <Paper
              sx={{
                p: 4,
                boxShadow: "none",
                border: 1,
                borderColor: COLORS.border,
                borderRadius: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                {/* Icon on the left side */}
                <Box mr={1}>
                  <img
                    src={metric.gif_icon}
                    alt="metric icon"
                    style={{ width: 80, height: 80 }}
                  />
                </Box>

                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography variant="h6" sx={{ color: COLORS.primary }}>
                    {metric.title}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 600, color: COLORS.text }}
                  >
                    {metric.amount.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {metric.change} last month
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ textAlign: "center" }}>
                <CircularProgress
                  variant="determinate"
                  value={metric.progress}
                  size={50}
                  sx={{ color: metric.color, mt: 2 }}
                />
                <Typography variant="body2">{metric.progress}%</Typography>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Right Arrow */}
      {isScrollable && showRightArrow && (
        <IconButton
          onClick={() => handleScroll("right")}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            backgroundColor: COLORS.secondary,
            boxShadow: 5,
            "&:hover": { backgroundColor: COLORS.secondaryHover },
          }}
        >
          <ArrowFatLineRight color={COLORS.white} weight="duotone" />
        </IconButton>
      )}
    </Box>
  );
};

export default CustomDashHorizontal;
