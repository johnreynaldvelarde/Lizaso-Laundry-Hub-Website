import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// pages routes
import { StartingPage, Main } from "./pages";

const App = () => {
  const [auth, setAuth] = React.useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        {/* <Route path="/main/*" element={auth ? <Main /> : <Navigate to="/" />} /> */}
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
