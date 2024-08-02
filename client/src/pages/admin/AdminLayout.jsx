import React, { createContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import AdminSidebar from "../../components/admin-components/AdminSidebar";
import styles from "../../style";
const MyContext = createContext();

const AdminLayout = () => {
  const values = {};

  // useEffect(() => {
  //   // Apply the class to the body when the component mounts
  //   document.body.classList.add("body-admin");

  //   // Remove the class from the body when the component unmounts
  //   return () => {
  //     document.body.classList.remove("body-admin");
  //   };
  // }, []);

  return (
    <MyContext.Provider value={values}>
      <section className="main flex">
        <div className="sidebarWrapper w-[15%]">
          <AdminSidebar />
        </div>
        <div className="content-right w-[85%] px-3">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
          </Routes>
        </div>
      </section>
    </MyContext.Provider>
  );
};

export default AdminLayout;
