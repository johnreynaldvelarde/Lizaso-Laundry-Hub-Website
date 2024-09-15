import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLocalLaundryService, MdOutlineWarehouse } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5"
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
    subLinks: [
      {
        name: "All Laundry Units",
        url: "/main/unit-monitor",
      },
      {
        name: "Add new laundry units",
        url: "/main/add-unit",  
      },
      {
        name: "Services Configuration",
        url: "/main/add-unit",  
      },
      {
        name: "Units Statistic",
        url: "",
      },
    ],
  },
  {
    name: "Manage Schedules",
    icon: React.createElement(AiOutlineSchedule),
    url: "/main/schedule",
  },
  {
    name: "Store Operations",
    icon: React.createElement(IoStorefrontOutline),
    subLinks: [
      {
        name: "All Branch Store",
        url: "/main/store",
      },
      {
        name: "Add new store",
        url: "/main/add-store",  
      },
      {
        name: "Branch Statistic",
        url: "",
      },
    ],
  },
  {
    name: "Inventory",
    icon: React.createElement(MdOutlineWarehouse),
    subLinks: [
      {
        name: "All Items",
        url: "/main/inventory",
      },
      {
        name: "Add Item",
        url: "/main/add-item",
      },
      {
        name: "Item Category",
        url: "/main/item-category",
      },
    ],
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
    url: "/",
  },
  {
    name: "Configuration",
    icon: React.createElement(FiLayers),
    url: "",
  },
  {
    name: "Reviews",
    icon: React.createElement(FiMessageCircle),
    url: "",
  },

  {
    name: "Inbox",
    icon: React.createElement(FiMail),
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

