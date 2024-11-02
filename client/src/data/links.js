import React from "react";
import {
  House,
  CurrencyDollar,
  Handshake,
  Share,
  Layout,
  WashingMachine,
  Calendar,
  Storefront,
  Users,
  User,
  ChatsCircle,
  Gear,
  ShoppingCart,
  Stack,
  ArchiveBox,
  EnvelopeSimple,
  Rss,
  Archive,
  ReadCvLogo,
  Pulse,
  CellSignalHigh,
} from "@phosphor-icons/react";

const iconSize = 20; // Set your desired icon size here

export const links = [
  {
    name: "Dashboard",
    icon: React.createElement(Layout, { weight: "duotone", size: iconSize }),
    url: "/main/dashboard",
  },
  {
    name: "Monitored Units",
    icon: React.createElement(WashingMachine, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/unit-monitor",
  },
  {
    name: "View Schedules",
    icon: React.createElement(Calendar, { weight: "duotone", size: iconSize }),
    url: "/main/schedule",
  },
  {
    name: "Store Management",
    icon: React.createElement(Storefront, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/store",
  },
  {
    name: "Inventory",
    icon: React.createElement(ArchiveBox, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/inventory",
  },
  {
    name: "User Management",
    icon: React.createElement(Users, { weight: "duotone", size: iconSize }),
    url: "/main/all-user",
  },
  {
    name: "View Customers",
    icon: React.createElement(User, { weight: "duotone", size: iconSize }),
    url: "/main/customers",
  },
  {
    name: "Inbox",
    icon: React.createElement(ChatsCircle, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/inbox",
  },
  {
    name: "Reviews",
    icon: React.createElement(Rss, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/reviews",
  },
  {
    name: "Transactions History",
    icon: React.createElement(ReadCvLogo, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/transactions-history",
  },
  {
    name: "Activity Log",
    icon: React.createElement(Pulse, { weight: "duotone", size: iconSize }),
    url: "/main/activity-log",
  },
  {
    name: "Services Management",
    icon: React.createElement(CellSignalHigh, {
      weight: "duotone",
      size: iconSize,
    }),
    url: "/main/activity-log",
  },
  {
    name: "Settings",
    icon: React.createElement(Gear, { weight: "duotone", size: iconSize }),
    url: "/main/settings",
  },
  {
    name: "Configuration",
    icon: React.createElement(Stack, { weight: "duotone", size: iconSize }),
    url: "/main/configuration",
  },
  {
    name: "Archived",
    icon: React.createElement(Archive, { weight: "duotone", size: iconSize }),
    url: "/main/configuration",
  },
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
//     name: "Activity Log",
//     icon: React.createElement(FaHandshake),
//     url: "",
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
// ];
