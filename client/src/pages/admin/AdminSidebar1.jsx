import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../style";
import {
  AiTwotoneAppstore,
  AiTwotoneSetting,
  AiTwotoneFileText,
  AiOutlineTeam,
} from "react-icons/ai";

const AdminSidebar1 = () => {
  return (
    <div className="sidebar fixed top-0 left-0 z-[100] w-[15%] h-full bg-white shadow-md">
      <div className="flex items-center justify-center py-4">
        <img src="/path/to/logo.png" alt="Logo" className="h-12 w-12 mr-2" />
        <span
          className="text-xl font-bold"
          style={{ color: styles.textColor1 }}
        >
          Admin Dashboard
        </span>
      </div>
      <nav className="mt-10">
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 transform"
        >
          <AiTwotoneAppstore className="w-5 h-5" />
          <span className="mx-4 font-medium">Dashboard</span>
        </Link>
        <Link
          to="/settings"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 transform"
        >
          <AiTwotoneSetting className="w-5 h-5" />
          <span className="mx-4 font-medium">Settings</span>
        </Link>
        <Link
          to="/reports"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 transform"
        >
          <AiTwotoneFileText className="w-5 h-5" />
          <span className="mx-4 font-medium">Reports</span>
        </Link>
        <Link
          to="/users"
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors duration-200 transform"
        >
          <AiOutlineTeam className="w-5 h-5" />
          <span className="mx-4 font-medium">Users</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar1;
