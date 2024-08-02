import React from "react";
import logo1 from "../../assets/images/logo1.jpg";
import { Button } from "@mui/material";
import styles from "../../style";

import { Link } from "react-router-dom";

// icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";

const AdminSidebar = () => {
  return (
    <div className="sidebar fixed top-0 left-0 z-[100] w-[15%]">
      <Link to="/">
        <div className="logoWrapper py-4 px-3">
          <img src={logo1} alt="Lizaso Laundry Hub" className="w-100" />
        </div>
      </Link>

      <div className="sidebarTabs">
        <Button className="w-100">
          <span className="icon w-[30px] h-[30px] flex items-center justify-center rounded-md">
            <DashboardOutlinedIcon />
          </span>
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
