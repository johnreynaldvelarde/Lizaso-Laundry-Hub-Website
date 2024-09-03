// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import useAuth from "../../contexts/AuthContext";
// import UserImage from "../admin-components/UserImage";
// import useLogout from "../../hooks/useLogout";
// import logo from "../../assets/images/logo.png";
// import styles from "../../styles/style";
// import { c_navItems } from "../../constants/index";
// import { Menu, MenuItem, IconButton, Tooltip, Badge } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import NotificationsIcon from "@mui/icons-material/Notifications";

// const C_Navbar = () => {
//   const { userDetails } = useAuth();
//   const logout = useLogout();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logout();
//     handleClose();
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white bg-opacity-80 border-b border-neutral-700/40">
//       <div className="container px-4 mx-auto flex items-center justify-between">
//         <div className="flex items-center flex-shrink-0 space-x-2">
//           <img className="h-10 w-10 md:h-12 md:w-12" src={logo} alt="logo" />
//           <span className="text-lg md:text-xl tracking-tight">
//             <span className="font-bold" style={{ color: styles.textColor1 }}>
//               Lizaso
//             </span>
//             <span className="font-regular" style={{ color: styles.textColor2 }}>
//               {" "}
//               Laundry Hub
//             </span>
//           </span>
//         </div>
//         <ul
//           className="hidden lg:flex space-x-8 font-medium text-sm md:text-base"
//           style={{ color: styles.textColor2 }}
//         >
//           {c_navItems.map((item, index) => (
//             <li key={index}>
//               <Link to={item.href} className="hover:underline">
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="flex items-center space-x-3">
//           <div className="relative flex items-center space-x-3">
//             <Tooltip title="Notifications" arrow>
//               <IconButton
//                 className="rounded-circle"
//                 // onClick={}
//               >
//                 <Badge badgeContent={10} color="error">
//                   <NotificationsIcon />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             <UserImage className="h-8 w-8 md:h-10 md:w-10" />
//             <div className="hidden md:flex flex-col items-start ml-3">
//               <span className="font-semibold text-sm md:text-base">
//                 {userDetails.fullName}
//               </span>
//               <span className="text-gray-500 text-xs md:text-sm">
//                 {userDetails.username}
//               </span>
//             </div>
//             <IconButton
//               onClick={handleClick}
//               aria-controls="user-menu"
//               aria-haspopup="true"
//             >
//               <ArrowDropDownIcon />
//             </IconButton>
//             <Menu
//               id="user-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               {/* Add more menu items here if needed */}
//             </Menu>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default C_Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import useAuth from "../../contexts/AuthContext";
// import UserImage from "../admin-components/UserImage";
// import useLogout from "../../hooks/useLogout";
// import logo from "../../assets/images/logo.png";
// import styles from "../../styles/style";
// import { c_navItems } from "../../constants/index";
// import { Menu, MenuItem, IconButton, Tooltip, Badge } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import NotificationsIcon from "@mui/icons-material/Notifications";

// const C_Navbar = () => {
//   const { userDetails } = useAuth();
//   const logout = useLogout();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeLink, setActiveLink] = useState("/customer-page/laundry-plans"); // Default active link

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     logout();
//     handleClose();
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white bg-opacity-80 border-b border-neutral-700/40">
//       <div className="container px-4 mx-auto flex items-center justify-between">
//         <div className="flex items-center flex-shrink-0 space-x-2">
//           <img className="h-10 w-10 md:h-12 md:w-12" src={logo} alt="logo" />
//           <span className="text-lg md:text-xl tracking-tight">
//             <span className="font-bold" style={{ color: styles.textColor1 }}>
//               Lizaso
//             </span>
//             <span className="font-regular" style={{ color: styles.textColor2 }}>
//               {" "}
//               Laundry Hub
//             </span>
//           </span>
//         </div>
//         <ul
//           className="hidden lg:flex space-x-8 font-medium text-sm md:text-base"
//           style={{ color: styles.textColor2 }}
//         >
//           {c_navItems.map((item, index) => (
//             <li key={index}>
//               <Link
//                 to={item.href}
//                 className={`hover:underline ${
//                   activeLink === item.href
//                     ? "text-blue-500 font-semibold transition duration-300 ease-in-out"
//                     : ""
//                 }`}
//                 onClick={() => setActiveLink(item.href)}
//               >
//                 {item.label}
//               </Link>
//             </li>
//           ))}
//         </ul>
//         <div className="flex items-center space-x-3">
//           <div className="relative flex items-center space-x-3">
//             <Tooltip title="Notifications" arrow>
//               <IconButton
//                 className="rounded-circle"
//                 // onClick={}
//               >
//                 <Badge badgeContent={10} color="error">
//                   <NotificationsIcon />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             <UserImage className="h-8 w-8 md:h-10 md:w-10" />
//             <div className="hidden md:flex flex-col items-start ml-3">
//               <span className="font-semibold text-sm md:text-base">
//                 {userDetails.fullName}
//               </span>
//               <span className="text-gray-500 text-xs md:text-sm">
//                 {userDetails.username}
//               </span>
//             </div>
//             <IconButton
//               onClick={handleClick}
//               aria-controls="user-menu"
//               aria-haspopup="true"
//             >
//               <ArrowDropDownIcon />
//             </IconButton>
//             <Menu
//               id="user-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             >
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//               {/* Add more menu items here if needed */}
//             </Menu>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default C_Navbar;
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
  const [activeLink, setActiveLink] = useState("/customer-page/laundry-plans"); // Default active link

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
            <li key={index} className="relative">
              <Link
                to={item.href}
                className={`block px-3 py-2 transition-colors duration-300 ${
                  activeLink === item.href
                    ? "text-blue-500 bg-white"
                    : "text-gray-500 hover:text-blue-500"
                }`}
                onClick={() => setActiveLink(item.href)}
              >
                {item.label}
                {activeLink === item.href && (
                  <span
                    className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 transition-transform duration-300"
                    style={{
                      transform: `translateY(${
                        activeLink === item.href ? "0" : "100%"
                      })`,
                    }}
                  />
                )}
              </Link>
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
