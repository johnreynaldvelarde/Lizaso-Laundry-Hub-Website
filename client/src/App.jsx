import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// pages routes
import { StartingPage, Main, MainCustomer } from "./pages";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  const [auth, setAuth] = React.useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartingPage />} />
        <Route
          path="/main/*"
          element={<ProtectedRoute element={<Main />} isAuthenticated={auth} />}
        />
        <Route
          path="/customer-page/*"
          element={
            <ProtectedRoute element={<MainCustomer />} isAuthenticated={auth} />
          }
        />
        <Route path="*" element={<NotFound />} />{" "}
        {/* Catch-all route for 404 */}
      </Routes>
    </Router>
  );
};

export default App;

// <Router>
//   <Routes>
//     <Route path="/" element={<StartingPage />} />
//     <Route
//       path="/main/*"
//       element={<ProtectedRoute element={<Main />} isAuthenticated={auth} />}
//     />
//     <Route
//       path="/customer-page/*"
//       element={
//         <ProtectedRoute element={<MainCustomer />} isAuthenticated={auth} />
//       }
//     />
//     {/* <Route path="/main/*" element={<Main />} />
//     <Route path="/customer-page/*" element={<MainCustomer />} /> */}
//   </Routes>
// </Router>
{
  /* <Route path="/main/*" element={auth ? <Main /> : <Navigate to="/" />} /> */
}
