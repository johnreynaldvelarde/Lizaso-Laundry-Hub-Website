// import React, { createContext, useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import AdminDashboard from "./AdminDashboard";
// import Settings from "./AdminSettings";
// import AdminSidebar from "../../components/admin-components/AdminSidebar";
// import styles from "../../style";
// import AdminSidebar1 from "./AdminSidebar1";

// import AdminHeader from "../../components/admin-components/AdminHeader";
// import Navbar from "../../components/common/Navbar";
// const MyContext = createContext();

// const AdminLayout = () => {
//   const values = {};
//   return (
//     <MyContext.Provider value={values}>
//       <section className="main flex">
//         <div className="sidebarWrapper w-[15%]">
//           <Navbar />
//         </div>
//         <div className="content-right w-[85%] px-3">
//           <AdminHeader />
//           <div className="space"></div>
//           <Routes>
//             <Route path="/" element={<AdminDashboard />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </div>
//       </section>
//     </MyContext.Provider>
//   );
// };

// export default AdminLayout;
