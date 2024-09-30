import React, { useState } from "react";

import LandingNavbar from "../../components/landing-page/LandingNavbar";
import LandingHeroSection from "../../components/landing-page/Home";
import LandingFeatures from "../../components/landing-page/Features";
import PopupCreateAccount from "../../components/common/PopupCreateAccount";
import PopupLogin from "../../components/common/PopupLogin";
import LandingHome from "../../components/landing-page/LandingHome1";
import Home from "../../components/landing-page/Home";
import Features from "../../components/landing-page/Features";
import Pricing from "../../components/landing-page/Pricing";

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
      <div className="bg-[#f1f1f1]">
        <div id="#">
          <Home />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="pricing">
          <Pricing />
        </div>

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

// <div className="bg-white max-w-7xl mx-auto pt-20 px-6">
// <div id="#">
//   <Home />
// </div>
// <div id="features">
//   <Features />
// </div>
// <div id="pricing">
//   <Pricing />
// </div>

// <PopupLogin
//   showLoginPopup={showLoginPopup}
//   setLoginShowPopup={setLoginShowPopup}
// />
// <PopupCreateAccount
//   showCreateAccountPopup={showCreateAccountPopup}
//   setShowCreateAccountPopup={setShowCreateAccountPopup}
// />
// </div>
