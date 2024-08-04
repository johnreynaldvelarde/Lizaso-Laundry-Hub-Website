import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages routes
import StartingPage from "./pages/landing-page/StartingPage";
import AdminLayout from "./pages/admin/AdminLayout";
import Main from "./pages/admin/Main";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/admin" element={<AdminLayout />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
