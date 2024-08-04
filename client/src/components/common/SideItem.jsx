// import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
// import React from "react";
// import { NavLink } from "react-router-dom";

// const SideItem = ({ name, icon, url }) => {
//   return (
//     <NavLink
//       to={url}
//       style={{ textDecoration: "none" }}
//       end
//       activeclassname="active"
//     >
//       <ListItemButton
//         className="linkBtn"
//         sx={{
//           "&:hover": { backgroundColor: "sidebar.hoverBg" },
//           paddingY: "8px",
//           paddingX: "24px",
//         }}
//       >
//         <ListItemIcon sx={{ color: "sidebar.textColor" }}>{icon}</ListItemIcon>
//         <ListItemText
//           primary={name}
//           sx={{ ml: "-10px", color: "sidebar.textColor" }}
//         />
//       </ListItemButton>
//     </NavLink>
//   );
// };

// export default SideItem;

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../../styles/style";

const SideItem = ({ name, icon, url }) => {
  return (
    <NavLink
      to={url}
      style={{ textDecoration: "none" }}
      end
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      <ListItemButton
        className="linkBtn"
        sx={{
          "&:hover": { backgroundColor: "sidebar.hoverBg" }, // Light blue background on hover
          paddingY: "8px",
          paddingX: "24px",
          color: styles.textColor1, // Set the text color using textColor1
        }}
      >
        <ListItemIcon sx={{ color: styles.textColor2 }}>{icon}</ListItemIcon>{" "}
        {/* Set the icon color using textColor1 */}
        <ListItemText
          primary={name}
          sx={{ ml: "-10px", color: styles.textColor2 }} // Set the text color using textColor1
        />
      </ListItemButton>
    </NavLink>
  );
};

export default SideItem;
