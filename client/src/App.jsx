import React from "react";
import "./index.css";
import LandingNavbar from "./components/Landing_Page/LandingNavbar";
import LandingHeroSection from "./components/Landing_Page/LandingHeroSection";
import LandingFeatures from "./components/Landing_Page/LandingFeatures";

const App = () => {
  return (
    <>
      <LandingNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <LandingHeroSection />
        <LandingFeatures />
      </div>
    </>
  );
};

export default App;
