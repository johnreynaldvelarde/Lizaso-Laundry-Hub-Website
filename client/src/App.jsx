import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

// Import pages
import { StartingPage, Main, MainCustomer } from "./pages";
import NotFound from "./pages/NotFound";

// Import the AuthProvider
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* This is public route */}
          <Route path="/" element={<StartingPage />} />
          <Route path="*" element={<NotFound />} />

          {/* This is protected route */}
          <Route path="/main/*" element={<ProtectedRoute component={Main} />} />
          <Route
            path="/customer-page/*"
            element={<ProtectedRoute component={MainCustomer} />}
          />
        </Routes>
        <Toaster position="bottom-right" />
      </Router>
    </AuthProvider>
  );
};

export default App;
