import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../contexts/AuthContext";
import UserImage from "../admin-components/UserImage";
import useLogout from "../../hooks/useLogout";
import logo from "../../assets/images/logo.png";
import styles from "../../styles/style";
import { c_navItems } from "../../constants/index";
import { Menu, MenuItem, IconButton, Tooltip, Badge } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsIcon from "@mui/icons-material/Notifications";

const C_Navbar = () => {
  const { userDetails } = useAuth();
  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white bg-opacity-80 border-b border-neutral-700/40">
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center flex-shrink-0 space-x-2">
          <img className="h-10 w-10 md:h-12 md:w-12" src={logo} alt="logo" />
          <span className="text-lg md:text-xl tracking-tight">
            <span className="font-bold" style={{ color: styles.textColor1 }}>
              Lizaso
            </span>
            <span className="font-regular" style={{ color: styles.textColor2 }}>
              {" "}
              Laundry Hub
            </span>
          </span>
        </div>
        <ul
          className="hidden lg:flex space-x-8 font-medium text-sm md:text-base relative"
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
                className="relative px-1 py-1"
                style={{
                  color: activeIndex === index ? "#5787C8" : "#595959",
                  backgroundColor:
                    activeIndex === index ? "white" : "transparent",
                }}
              >
                {item.label}
                {/* Show badge if notificationCount exists */}
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
              {/* Blue line for the active item */}
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
            <Tooltip title="Notifications" arrow>
              <IconButton className="rounded-circle">
                <Badge badgeContent={10} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <UserImage className="h-8 w-8 md:h-10 md:w-10" />
            <div className="hidden md:flex flex-col items-start ml-3">
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
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              {/* Add more menu items here if needed */}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default C_Navbar;
