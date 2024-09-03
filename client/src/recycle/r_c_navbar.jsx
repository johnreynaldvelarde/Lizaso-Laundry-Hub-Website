// import React, { useState } from "react";
// import useAuth from "../../contexts/AuthContext";
// import UserImage from "../admin-components/UserImage";
// import useLogout from "../../hooks/useLogout";
// import logo from "../../assets/images/logo.png";
// import styles from "../../styles/style";
// import { c_navItems } from "../../constants/index";
// import { Menu, MenuItem, IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

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
//               <a href={item.href}>{item.label}</a>
//             </li>
//           ))}
//         </ul>
//         <div className="flex items-center space-x-3">
//           <div className="relative flex items-center space-x-3">
//             <UserImage className="h-8 w-8 md:h-10 md:w-10" />{" "}
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
// import UserImage from "../admin-components/UserImage";
// import useLogout from "../../hooks/useLogout";
// import logo from "../../assets/images/logo.png";
// import styles from "../../styles/style";
// import { c_navItems } from "../../constants/index";
// import { Menu, MenuItem, IconButton } from "@mui/material";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

// const C_Navbar = () => {
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
//       <div className="container px-4 mx-auto relative text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-12 w-12 mr-1" src={logo} alt="logo" />
//             <span className="text-xl tracking-tight">
//               <span className="font-bold" style={{ color: styles.textColor1 }}>
//                 Lizaso
//               </span>
//               <span
//                 className="font-regular"
//                 style={{ color: styles.textColor2 }}
//               >
//                 {" "}
//                 Laundry Hub
//               </span>
//             </span>
//           </div>
//           <ul
//             className="hidden lg:flex ml-14 space-x-12 font-medium"
//             style={{ color: styles.textColor2, fontSize: styles.h3FontSize }}
//           >
//             {c_navItems.map((item, index) => (
//               <li key={index}>
//                 <a href={item.href}>{item.label}</a>
//               </li>
//             ))}
//           </ul>
//           <div className="flex items-center space-x-3">
//             <div>
//               <UserImage />
//             </div>
//             <div className="hidden md:flex flex-col items-end">
//               <span className="font-semibold">Fullname</span>
//               <span className="text-gray-500">username</span>
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
// import useLogout from "../../hooks/useLogout";
// import logo from "../../assets/images/logo.png";
// import styles from "../../styles/style";
// import { c_navItems } from "../../constants/index";

// const C_Navbar = () => {
//   const logout = useLogout();
//   const [anchorEl, setAnchorEl] = useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg bg-white bg-opacity-80 border-b border-neutral-700/40">
//       <div className="container px-4 mx-auto relative text-sm">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center flex-shrink-0">
//             <img className="h-12 w-12 mr-1" src={logo} alt="logo" />
//             <span className="text-xl tracking-tight">
//               <span className="font-bold" style={{ color: styles.textColor1 }}>
//                 Lizaso
//               </span>
//               <span
//                 className="font-regular"
//                 style={{ color: styles.textColor2 }}
//               >
//                 {" "}
//                 Laundry Hub
//               </span>
//             </span>
//           </div>
//           <ul
//             className="hidden lg:flex ml-14 space-x-12 font-medium"
//             style={{ color: styles.textColor2, fontSize: styles.h3FontSize }}
//           >
//             {c_navItems.map((item, index) => (
//               <li key={index}>
//                 <a href={item.href}>{item.label}</a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default C_Navbar;

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Menu,
//   MenuItem,
//   IconButton,
// } from "@mui/material";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// <AppBar position="static" className="bg-blue-600">
//   <Toolbar className="flex justify-between items-center">
//     <Typography variant="h6" className="flex-grow">
//       Lizaso Laundry Hub
//     </Typography>
//     <div className="flex-grow flex justify-center space-x-4">
//       <Button color="inherit">Select a Service</Button>
//       <Button color="inherit">Order Tracking</Button>
//       <Button color="inherit">Payment History</Button>
//     </div>
//     <div className="flex items-center">
//       <IconButton color="inherit" onClick={handleClick}>
//         <AccountCircleIcon />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>Profile</MenuItem>
//         <MenuItem onClick={logout}>Logout</MenuItem>
//       </Menu>
//     </div>
//   </Toolbar>
// </AppBar>
