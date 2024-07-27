import React from "react";
import "./index.css";
import LandingNavbar from "./components/Landing_Page/LandingNavbar";
import LandingHeroSection from "./components/Landing_Page/LandingHeroSection";
import LandingFeatures from "./components/Landing_Page/LandingFeatures";
import PopupCreateAccount from "./components/Popup/PopupCreateAccount";
import PopupLogin from "./components/Popup/PopupLogin";

const App = () => {
  const [showLoginPopup, setLoginShowPopup] = React.useState(false);
  const [showCreateAccoutPopup, setShowCreateAccountPopup] =
    React.useState(false);
  const HandleLoginPopup = () => {
    setLoginShowPopup(true);
  };
  const HandleCreateAccountPopup = () => {
    setShowCreateAccountPopup(true);
  };
  return (
    <>
      <LandingNavbar
        HandleLoginPopup={HandleLoginPopup}
        HandleCreateAccountPopup={HandleCreateAccountPopup}
      />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <LandingHeroSection />
        <LandingFeatures />
        <PopupLogin
          showLoginPopup={showLoginPopup}
          setLoginShowPopup={setLoginShowPopup}
        />
        <PopupCreateAccount
          showCreateAccountPopup={showCreateAccoutPopup}
          setShowCreateAccountPopup={setShowCreateAccountPopup}
        />
      </div>
    </>
  );
};

export default App;
