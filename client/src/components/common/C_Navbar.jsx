import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import UserImage from "../admin-components/UserImage";
import useLogout from "../../hooks/useLogout";
import logo from "../../assets/images/logo.png";
import styles from "../../styles/style";
import { c_navItems } from "../../constants/index";
import noti_logo from "../../assets/images/logo.png";
import {
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Badge,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { MdOutlineMailOutline, MdPayments } from "react-icons/md";
import { MdLocalLaundryService } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { Logout, Settings } from "@mui/icons-material";

const C_Navbar = () => {
  const { userDetails } = useAuth();
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMessage, setAnchorElMessage] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const icons = [
    <MdLocalLaundryService />,
    <FaClipboardList />,
    <MdPayments />,
  ];
  const tooltipTitles = ["Laundry Services", "Track Orders", "Payment History"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  const handleClickMessage = (event) => {
    setAnchorElMessage(event.currentTarget);
  };

  const handleCloseMessage = () => {
    setAnchorElMessage(null);
  };

  const handleClickNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };

  const handleClearAll = () => {
    console.log("Clear Notifications");
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const foundIndex = c_navItems.findIndex(
      (item) => item.href === currentPath
    );
    if (foundIndex !== -1) {
      setActiveIndex(foundIndex);
    }
  }, [location.pathname]);

  const messages = [
    {
      senderName: "John Doe",
      avatar: "https://via.placeholder.com/150",
      preview: "Hey, are you available tomorrow?",
      timestamp: "5 min ago",
    },
    {
      senderName: "Jane Smith",
      avatar: "https://via.placeholder.com/150",
      preview: "Let's catch up soon!",
      timestamp: "15 min ago",
    },
    {
      senderName: "Mark Lee",
      avatar: "https://via.placeholder.com/150",
      preview: "Don't forget the meeting at 3 PM.",
      timestamp: "1 hour ago",
    },
  ];

  const notifications = [
    {
      id: 1,
      senderName: "Laundry Hub",
      avatar: "/images/laundry-icon.png", // path to an avatar or icon
      message: "Your laundry is ready for pickup.",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      senderName: "Laundry Hub",
      avatar: "/images/laundry-icon.png", // path to an avatar or icon
      message: "Your laundry is ready for pickup.",
      timestamp: "10 minutes ago",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white bg-opacity-80 border-b border-neutral-700/40">
      <div className=" container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <img className="h-12 w-12 mr-1" src={logo} alt="logo" />
          <span className="flex text-base md:text-lg lg:text-xl tracking-tight">
            <span className="font-bold" style={{ color: styles.textColor1 }}>
              Lizaso
            </span>
            <span
              className="font-regular ml-1"
              style={{ color: styles.textColor2 }}
            >
              {" "}
              Laundry Hub
            </span>
          </span>
        </div>
        <ul
          className="flex space-x-8 font-medium text-sm md:text-base relative mr-5 ml-5"
          style={{ color: styles.textColor2 }}
        >
          {c_navItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onClick={() => setActiveIndex(index)}
            >
              <Link
                to={item.href}
                className="relative flex items-center px-1 py-1"
                style={{
                  color: activeIndex === index ? "#5787C8" : "#595959",
                  backgroundColor:
                    activeIndex === index ? "white" : "transparent",
                }}
              >
                <Tooltip title={tooltipTitles[index]} arrow>
                  <span className="md:hidden" style={{ fontSize: "24px" }}>
                    {icons[index]}
                  </span>
                </Tooltip>
                <span className="hidden md:inline">{item.label}</span>
                {item.notificationCount > 0 && (
                  <span
                    className={`absolute top-[-5px] right-[-10px] bg-[#dc3545] text-white rounded-full flex items-center justify-center ${
                      item.notificationCount > 9
                        ? "text-xs w-6 h-6"
                        : "text-xs w-5 h-5"
                    }`}
                  >
                    {item.notificationCount > 99 ? (
                      <span className="text-[10px]">+99</span>
                    ) : (
                      item.notificationCount
                    )}
                  </span>
                )}
              </Link>
              <div
                className={`absolute left-0 right-0 bottom-[-5px] h-[2px] bg-[#5787C8] transition-transform duration-300 ${
                  activeIndex === index ? "scale-x-100" : "scale-x-0"
                }`}
                style={{
                  transformOrigin: "left",
                  transition: "transform 0.3s ease-in-out",
                }}
              ></div>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-3">
          <div className="relative flex items-center space-x-3">
            {/* Message */}
            <Tooltip title="Message" arrow>
              <IconButton
                className="rounded-circle"
                onClick={handleClickMessage}
              >
                <Badge badgeContent={messages.length} color="error">
                  <MdOutlineMailOutline style={{ color: styles.black }} />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Notifications */}
            <Tooltip title="Notifications" arrow>
              <IconButton
                className="rounded-circle"
                onClick={handleClickNotifications}
              >
                <Badge badgeContent={notifications.length} color="error">
                  <NotificationsIcon style={{ color: styles.black }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <UserImage className="h-8 w-8 md:h-10 md:w-10" />
            <div className="flex flex-col items-start ml-3 flex-shrink-0">
              <span className="font-semibold text-sm md:text-base">
                {userDetails.fullName}
              </span>
              <span className="text-gray-500 text-xs md:text-sm">
                {userDetails.username}
              </span>
            </div>
            <IconButton
              onClick={handleClick}
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <ArrowDropDownIcon />
            </IconButton>
            {/* For Message  */}
            <Menu
              anchorEl={anchorElMessage}
              id="message-menu"
              open={Boolean(anchorElMessage)}
              onClose={handleCloseMessage}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  width: "320px", // Set a wider width for better readability
                  "& .MuiAvatar-root": {
                    width: 40,
                    height: 40,
                    ml: 1,
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
              <div
                className="flex justify-between items-center p-0 py-2 font-bold text-lg text-[#595959]"
                style={{ pointerEvents: "none" }}
              >
                <div className="pl-3 text-lg">Message</div>
                <div>
                  <button
                    className="text-sm pr-4 font-normal"
                    onClick={handleClearAll}
                    style={{ pointerEvents: "auto", color: "#5787C8" }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <Divider />

              <div className="scrollable max-h-[300px] overflow-y-auto">
                {messages.length === 0 ? ( // Check if there are no notifications
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    No message
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      onClick={handleClose}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        alt={message.senderName}
                        src={message.avatar}
                        className="w-10 h-10 rounded-full mr-3 bg-gray-200"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {message.senderName}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                          {message.preview}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }}>
                <Typography variant="body2" color="primary">
                  See All Messages
                </Typography>
              </MenuItem>
            </Menu>

            {/* For Notifications */}
            <Menu
              anchorEl={anchorElNotifications}
              id="notifications-menu"
              open={Boolean(anchorElNotifications)}
              onClose={handleCloseNotifications}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  width: "320px", // Set a wider width for better readability
                  "& .MuiAvatar-root": {
                    width: 40,
                    height: 40,
                    ml: 1,
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
              <div
                className="flex justify-between items-center p-0 py-2 font-bold text-lg text-[#595959]"
                style={{ pointerEvents: "none" }}
              >
                <div className="pl-3 text-lg">Notifications</div>
                <div>
                  <button
                    className="text-sm pr-4 font-normal"
                    onClick={handleClearAll}
                    style={{ pointerEvents: "auto", color: "#5787C8" }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
              <Divider />
              <div className="scrollable max-h-[300px] overflow-y-auto">
                {notifications.length === 0 ? ( // Check if there are no notifications
                  <div className="flex items-center justify-center p-4 text-gray-500">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <div
                      key={index}
                      onClick={handleClose}
                      className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        alt={notification.senderName}
                        src={noti_logo}
                        className="w-10 h-10 rounded-full mr-3 bg-gray-200"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">
                          {notification.senderName}
                        </p>
                        <p className="text-xs text-gray-500 truncate max-w-[200px]">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Divider />
              <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }}>
                <Typography variant="body2" color="#5787C8">
                  See All Notifications
                </Typography>
              </MenuItem>
            </Menu>

            {/* Account Menu */}
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleClose}
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
              {/* Add MenuItems here */}
              <MenuItem onClick={handleClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default C_Navbar;
