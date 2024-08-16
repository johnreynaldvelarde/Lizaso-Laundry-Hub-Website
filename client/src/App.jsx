import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages routes
import { StartingPage, Main } from "./pages";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route path="/main/*" element={<PrivateRoute element={Main} />} />
        {/* <Route path="/main/*" element={<Main />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
