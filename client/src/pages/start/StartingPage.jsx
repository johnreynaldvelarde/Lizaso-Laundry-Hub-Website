import React, { useState } from "react";

import LandingNavbar from "../../components/landing-page/LandingNavbar";
import PopupCreateAccount from "../../components/common/PopupCreateAccount";
import PopupLogin from "../../components/common/PopupLogin";
import Home from "../../components/landing-page/Home";
import Features from "../../components/landing-page/Features";
import Pricing from "../../components/landing-page/Pricing";
import Services from "../../components/landing-page/Services";
import Footer from "../../components/landing-page/Footer";
import About from "../../components/landing-page/About";
import Contact from "../../components/landing-page/Contact";

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
          <Home
            HandleLoginPopup={handleLoginPopup}
            HandleCreateAccountPopup={handleCreateAccountPopup}
          />
        </div>
        <div id="features">
          <Features />
        </div>
        <div id="service">
          <Services />
        </div>
        <div id="pricing">
          <Pricing />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="contact">
          <Contact />
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
      <Footer />
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
