import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages routes
import { StartingPage, Main } from "./pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
