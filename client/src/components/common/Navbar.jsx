import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
} from "@mui/material";

import useAuth from "../../contexts/AuthContext";
import useLogout from "../../hooks/useLogout";

// icons
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { ArrowDropDown } from "@mui/icons-material";

import React, { useState, useContext } from "react";
import { FiMenu } from "react-icons/fi";
import UserImage from "../admin-components/UserImage";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";

const Navbar = ({ sideBarWidth, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [messageAnchorEl, setMessageAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const { userDetails } = useAuth();

  const open = Boolean(anchorEl);
  const openMessages = Boolean(messageAnchorEl);
  const openNotifications = Boolean(notificationAnchorEl);

  const logout = useLogout();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMessagesClick = (event) => {
    setMessageAnchorEl(event.currentTarget);
  };

  const handleMessagesClose = () => {
    setMessageAnchorEl(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${sideBarWidth}px)` },
        ml: { md: `${sideBarWidth}px` },
        boxShadow: "unset",
        backgroundColor: "background.paper",
        color: "text.primary",
        borderBottomWidth: 1,
        borderBottomColor: "divider",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Tooltip title="Menu" arrow>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <FiMenu />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Dashboard
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Tooltip title="Messages" arrow>
              <IconButton
                className="rounded-circle"
                onClick={handleMessagesClick}
              >
                <Badge badgeContent={4} color="error">
                  <MdOutlineMailOutline />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={messageAnchorEl}
              open={openMessages}
              onClose={handleMessagesClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleMessagesClose}>Message 1</MenuItem>
              <MenuItem onClick={handleMessagesClose}>Message 2</MenuItem>
              <MenuItem onClick={handleMessagesClose}>Message 3</MenuItem>
            </Menu>

            <Tooltip title="Notifications" arrow>
              <IconButton
                className="rounded-circle"
                onClick={handleNotificationsClick}
              >
                <Badge badgeContent={10} color="error">
                  <FaRegBell />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={notificationAnchorEl}
              open={openNotifications}
              onClose={handleNotificationsClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleNotificationsClose}>
                Notification 1
              </MenuItem>
              <MenuItem onClick={handleNotificationsClose}>
                Notification 2
              </MenuItem>
              <MenuItem onClick={handleNotificationsClose}>
                Notification 3
              </MenuItem>
            </Menu>

            <div>
              <UserImage />
            </div>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                textAlign: "right",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "500",
                    textAlign: "right",
                  }}
                >
                  {userDetails.fullName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: "400",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  {userDetails.username}
                </Typography>
              </Box>
              <IconButton sx={{ ml: 1 }} onClick={handleClick}>
                <ArrowDropDown />
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
