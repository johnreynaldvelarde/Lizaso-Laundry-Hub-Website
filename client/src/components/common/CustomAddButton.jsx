import React from "react";
import { Button } from "@mui/material";
import { COLORS } from "../../constants/color";

const CustomAddButton = ({
  label,
  onClick,
  icon,
  backgroundColor = COLORS.secondary, // Default color
  hoverColor = COLORS.secondaryHover, // Default hover color
  width = { xs: "100%", sm: "auto" }, // Default width
  marginTop = { xs: 2, sm: 0 }, // Default margin top
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={icon}
      sx={{
        backgroundColor: backgroundColor,
        borderRadius: "5px",
        fontWeight: 500,
        textTransform: "none",
        paddingX: { xs: 1, sm: 2, md: 3 },
        fontSize: { xs: "14px", sm: "14px", md: "16px" },
        height: "48px", // Set a fixed height
        lineHeight: "1.5", // Ensure consistent line height
        whiteSpace: "nowrap", // Prevent text from wrapping
        display: "flex", // Ensure flex display
        alignItems: "center", // Center icon and text vertically
        "&:hover": {
          backgroundColor: hoverColor,
        },
        width: width,
        mt: marginTop,
      }}
    >
      {label}
    </Button>
  );
};

export default CustomAddButton;

// import React from "react";
// import { Button } from "@mui/material";
// import { COLORS } from "../../constants/color";

// const CustomAddButton = ({
//   label,
//   onClick,
//   icon,
//   backgroundColor = COLORS.secondary, // Default color
//   hoverColor = COLORS.secondaryHover, // Default hover color
//   width = { xs: "100%", sm: "auto" }, // Default width
//   marginTop = { xs: 2, sm: 0 }, // Default margin top
// }) => {
//   return (
//     <Button
//       onClick={onClick}
//       variant="contained"
//       startIcon={icon}
//       sx={{
//         backgroundColor: backgroundColor,
//         borderRadius: "5px",
//         fontWeight: 500,
//         textTransform: "none",
//         paddingX: { xs: 1, sm: 2, md: 3 },
//         fontSize: { xs: "14px", sm: "14px", md: "16px" },
//         "&:hover": {
//           backgroundColor: hoverColor,
//         },
//         width: width,
//         mt: marginTop,
//       }}
//     >
//       {label}
//     </Button>
//   );
// };

// export default CustomAddButton;
