import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLocalLaundryService, MdOutlineWarehouse } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import {
  FiHome,
  FiLayers,
  FiMail,
  FiMessageCircle,
  FiSettings,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
  FiUser,
} from "react-icons/fi";

export const links = [
  {
    name: "Dashboard",
    icon: React.createElement(LuLayoutDashboard),
    url: "/main/dashboard",
  },
  {
    name: "Monitored Units",
    icon: React.createElement(MdLocalLaundryService),
    url: "/main/unit-monitor",
  },
  {
    name: "View Schedules",
    icon: React.createElement(AiOutlineSchedule),
    url: "/main/schedule",
  },
  {
    name: "Store Management",
    icon: React.createElement(IoStorefrontOutline),
    url: "/main/store",
  },
  {
    name: "Inventory",
    icon: React.createElement(MdOutlineWarehouse),
    url: "/main/inventory",
  },
  {
    name: "User Management",
    icon: React.createElement(FaUsers),
    url: "/main/all-user",
  },

  {
    name: "Customers",
    icon: React.createElement(FiUsers),
    url: "/main/customers",
  },
  {
    name: "Inbox",
    icon: React.createElement(FiMail),
    url: "/main/inbox",
  },
  {
    name: "Reviews",
    icon: React.createElement(FiMessageCircle),
    url: "/main/reviews",
  },

  {
    name: "Activity Log",
    icon: React.createElement(FaHandshake),
    url: "",
  },

  {
    name: "Settings",
    icon: React.createElement(FiSettings),
    url: "/main/settings",
  },
  {
    name: "Sales",
    icon: React.createElement(BsCurrencyDollar),
    subLinks: [
      {
        name: "Sales Analytics",
        url: "",
      },
      {
        name: "Product Sales",
        url: "",
      },
    ],
  },
  {
    name: "Orders",
    icon: React.createElement(FiShoppingCart),
    subLinks: [
      {
        name: "All Orders",
        url: "",
      },
      {
        name: "Order Template",
        url: "",
      },
    ],
  },

  {
    name: "Transactions",
    icon: React.createElement(FaHandshake),
    url: "",
  },

  {
    name: "Configuration",
    icon: React.createElement(FiLayers),
    url: "",
  },

  // {
  //   name: "Suppliers",
  //   icon: React.createElement(FaShare),
  //   url: "",
  // },

  // {
  //   name: "User Manage",
  //   icon: React.createElement(FiUser ),
  //   subLinks: [
  //     {
  //       name: "All Users",
  //       url: "/main/all-user",
  //     },
  //     {
  //       name: "Add Users",
  //       url: "/main/add-user",
  //     },
  //   ],
  // },
];

// import React from "react";
// import { BsCurrencyDollar } from "react-icons/bs";
// import { FaHandshake, FaShare } from "react-icons/fa";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { MdLocalLaundryService, MdOutlineWarehouse } from "react-icons/md";
// import { AiOutlineSchedule } from "react-icons/ai";
// import { IoStorefrontOutline } from "react-icons/io5";
// import { FaUsers } from "react-icons/fa6";
// import {
//   FiHome,
//   FiLayers,
//   FiMail,
//   FiMessageCircle,
//   FiSettings,
//   FiShoppingBag,
//   FiShoppingCart,
//   FiUsers,
//   FiUser,
// } from "react-icons/fi";

// export const links = [
//   {
//     name: "Dashboard",
//     icon: React.createElement(LuLayoutDashboard),
//     url: "/main/dashboard",
//   },
//   {
//     name: "Monitored Units",
//     icon: React.createElement(MdLocalLaundryService),
//     url: "/main/unit-monitor",
//     subLinks: [
//       {
//         name: "All Laundry Units",
//         url: "/main/unit-monitor",
//       },
//       {
//         name: "Add new laundry units",
//         url: "/main/add-unit",
//       },
//     ],
//   },
//   {
//     name: "View Schedules",
//     icon: React.createElement(AiOutlineSchedule),
//     url: "/main/schedule",
//   },
//   {
//     name: "Store Management",
//     icon: React.createElement(IoStorefrontOutline),
//     url: "/main/store",
//   },
//   {
//     name: "Inventory",
//     icon: React.createElement(MdOutlineWarehouse),
//     url: "/main/inventory",
//   },
//   {
//     name: "User Management",
//     icon: React.createElement(FaUsers),
//     url: "/main/all-user",
//   },

//   {
//     name: "Customers",
//     icon: React.createElement(FiUsers),
//     url: "/main/customers",
//   },
//   {
//     name: "Inbox",
//     icon: React.createElement(FiMail),
//     url: "/main/inbox",
//   },
//   {
//     name: "Reviews",
//     icon: React.createElement(FiMessageCircle),
//     url: "/main/reviews",
//   },
//   {
//     name: "Settings",
//     icon: React.createElement(FiSettings),
//     url: "/main/settings",
//   },
//   {
//     name: "Sales",
//     icon: React.createElement(BsCurrencyDollar),
//     subLinks: [
//       {
//         name: "Sales Analytics",
//         url: "",
//       },
//       {
//         name: "Product Sales",
//         url: "",
//       },
//     ],
//   },
//   {
//     name: "Orders",
//     icon: React.createElement(FiShoppingCart),
//     subLinks: [
//       {
//         name: "All Orders",
//         url: "",
//       },
//       {
//         name: "Order Template",
//         url: "",
//       },
//     ],
//   },

//   {
//     name: "Transactions",
//     icon: React.createElement(FaHandshake),
//     url: "",
//   },

//   {
//     name: "Configuration",
//     icon: React.createElement(FiLayers),
//     url: "",
//   },
