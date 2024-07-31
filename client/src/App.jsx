import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import LandingNavbar from "./components/landing-page/LandingNavbar";
import LandingHeroSection from "./components/landing-page/LandingHeroSection";
import LandingFeatures from "./components/landing-page/LandingFeatures";
import PopupCreateAccount from "./components/Popup/PopupCreateAccount";
import PopupLogin from "./components/Popup/PopupLogin";

import AdminLayout from "./pages/admin/AdminLayout";

const App = () => {
  const [showLoginPopup, setLoginShowPopup] = useState(false);
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false);

  const handleLoginPopup = () => {
    setLoginShowPopup(true);
  };

  const handleCreateAccountPopup = () => {
    setShowCreateAccountPopup(true);
  };

  return (
    <Router>
      <LandingNavbar
        HandleLoginPopup={handleLoginPopup}
        HandleCreateAccountPopup={handleCreateAccountPopup}
      />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/admin" element={<AdminLayout />} />
        </Routes>
        <LandingHeroSection />
        <LandingFeatures />
        <PopupLogin
          showLoginPopup={showLoginPopup}
          setLoginShowPopup={setLoginShowPopup}
        />
        <PopupCreateAccount
          showCreateAccountPopup={showCreateAccountPopup}
          setShowCreateAccountPopup={setShowCreateAccountPopup}
        />
      </div>
    </Router>
  );
};

export default App;
