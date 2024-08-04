import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/images/logo.png";
import { links } from "../../data/links";
import styles from "../../styles/style";
import SideItem from "./SideItem";
import SideCollapse from "./SideCollapse";

const Sidebar = ({ window, sideBarWidth, mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <div>
      <Toolbar>
        <img src={logo} alt="Logo" width="40" />
        <span className="text-xl tracking-tight">
          <span className="font-bold" style={{ color: styles.textColor1 }}>
            Lizaso
          </span>
          <span className="font-regular" style={{ color: styles.textColor2 }}>
            {" "}
            Laundry Hub
          </span>
        </span>
        {/* <Typography
          variant="h6"
          sx={{ fontWeight: "bold", ml: 2 }}
        ></Typography> */}
      </Toolbar>
      <Divider />
      <List disablePadding>
        {links?.map((link, index) =>
          link?.subLinks ? (
            <SideCollapse {...link} key={index} />
          ) : (
            <SideItem {...link} key={index} />
          )
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: sideBarWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* For Mobile and Small Sized Tablets. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sideBarWidth,
            backgroundColor: "sidebar.background",
            color: "sidebar.textColor",
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* For Desktop and large Sized Tablets. */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
          "& .MuiDrawer-paper": {
            width: sideBarWidth,
            boxSizing: "border-box",
            borderRight: 0,
            backgroundColor: "sidebar.background",
            color: "sidebar.textColor",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
