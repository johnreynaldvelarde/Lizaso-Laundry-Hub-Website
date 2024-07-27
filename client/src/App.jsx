import React from "react";
import "./index.css";
import LandingNavbar from "./components/Landing_Page/LandingNavbar";
import LandingHeroSection from "./components/Landing_Page/LandingHeroSection";
import LandingFeatures from "./components/Landing_Page/LandingFeatures";
import Popup from "./components/Popup/Popup";

const App = () => {
  const [showPopup, setShowPopup] = React.useState(false);
  const HandlePopup = () => {
    setShowPopup(true);
  };
  return (
    <>
      <LandingNavbar HandlePopup={HandlePopup} />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <LandingHeroSection />
        <LandingFeatures />
        <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
      </div>
    </>
  );
};

export default App;
