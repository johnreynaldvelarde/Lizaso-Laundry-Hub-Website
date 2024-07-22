import React from "react";
import "./index.css";
import LandingNavbar from "./components/Landing_Page/LandingNavbar";
import LandingHero from "./components/Landing_Page/LandingHero";

const App = () => {
  return (
    <>
      <LandingNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <LandingHero />
      </div>
    </>
  );
};

export default App;
