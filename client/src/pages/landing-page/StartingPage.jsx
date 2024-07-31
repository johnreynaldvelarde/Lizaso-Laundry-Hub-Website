import React, { useState } from "react";
import "../../index.css";

import LandingNavbar from "../../components/landing-page/LandingNavbar";
import LandingHeroSection from "../../components/landing-page/LandingHeroSection";
import LandingFeatures from "../../components/landing-page/LandingFeatures";
import PopupCreateAccount from "../../components/Popup/PopupCreateAccount";
import PopupLogin from "../../components/Popup/PopupLogin";

const StartingPage = () => {
  const [showLoginPopup, setLoginShowPopup] = useState(false);
  const [showCreateAccountPopup, setShowCreateAccountPopup] = useState(false);

  const handleLoginPopup = () => {
    setLoginShowPopup(true);
  };

  const handleCreateAccountPopup = () => {
    setShowCreateAccountPopup(true);
  };

  return (
    <>
      <LandingNavbar
        HandleLoginPopup={handleLoginPopup}
        HandleCreateAccountPopup={handleCreateAccountPopup}
      />
      <div className="max-w-7xl mx-auto pt-20 px-6">
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
    </>
  );
};

export default StartingPage;
