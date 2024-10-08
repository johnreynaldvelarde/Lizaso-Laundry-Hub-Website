import { Box, IconButton } from "@mui/material";
import React from "react";
import { COLORS } from "../../constants/color";

const OutlinedIconButton = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Box
      sx={{
        display: "inline-flex",
        border: `1px solid ${COLORS.border2}`,
        borderRadius: "4px",
        marginRight: "5px",
        // padding: "4px",
      }}
    >
      <IconButton ref={ref} {...props}>
        {children}
      </IconButton>
    </Box>
  );
});

export default OutlinedIconButton;
