import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaHandshake, FaShare } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdLocalLaundryService, MdOutlineWarehouse } from "react-icons/md";
import { AiOutlineSchedule } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5"
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
    name: "Manage Schedules",
    icon: React.createElement(AiOutlineSchedule),
    url: "/main/schedule",
  },
  {
    name: "Branch Operations",
    icon: React.createElement(IoStorefrontOutline),
    subLinks: [
      {
        name: "All Branch Store",
        url: "/main/branch",
      },
      {
        name: "Add Branch",
        url: "/",  
      },
      {
        name: "Branch Statistic",
        url: "/",
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
    name: "User Manage",
    icon: React.createElement(FiUser ),
    subLinks: [
      {
        name: "All Users",
        url: "/",
      },
      {
        name: "Add Users",
        url: "/",
      },
    ],
  },
  {
    name: "Customers",
    icon: React.createElement(FiUsers),
    url: "/main/customers",
  },
  {
    name: "Sales",
    icon: React.createElement(BsCurrencyDollar),
    subLinks: [
      {
        name: "Sales Analytics",
        url: "/sales/analysis",
      },
      {
        name: "Product Sales",
        url: "/sales",
      },
    ],
  },
  {
    name: "Orders",
    icon: React.createElement(FiShoppingCart),
    subLinks: [
      {
        name: "All Orders",
        url: "/orders",
      },
      {
        name: "Order Template",
        url: "/orders/template",
      },
    ],
  },
  {
    name: "Suppliers",
    icon: React.createElement(FaShare),
    url: "/suppliers",
  },
  {
    name: "Transactions",
    icon: React.createElement(FaHandshake),
    url: "/transactions",
  },
  {
    name: "Brands",
    icon: React.createElement(FiLayers),
    url: "/brands",
  },
  {
    name: "Reviews",
    icon: React.createElement(FiMessageCircle),
    url: "/reviews",
  },
  {
    name: "Settings",
    icon: React.createElement(FiSettings),
    url: "/main/settings",
  },
  {
    name: "Inbox",
    icon: React.createElement(FiMail),
    url: "/inbox",
  },
];

