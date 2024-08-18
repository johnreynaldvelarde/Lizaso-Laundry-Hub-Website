import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedAuth from "./hooks/ProtectedAuth";

// Pages and components
import { StartingPage, Main, MainCustomer } from "./pages";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

const App = () => {
  const { auth, setAuth } = ProtectedAuth();
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;

// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Cookies from "js-cookie";

// // Pages and components
// import { StartingPage, Main, MainCustomer } from "./pages";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/common/ProtectedRoute";

// const App = () => {
//   const [auth, setAuth] = useState(false);

//   useEffect(() => {
//     const token = Cookies.get("auth_token");
//     console.log("Token from cookies:", token); // Debugging line
//     if (token) {
//       setAuth(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<StartingPage />} />
//         <Route
//           path="/main/*"
//           element={<ProtectedRoute element={<Main />} isAuthenticated={auth} />}
//         />
//         <Route
//           path="/customer-page/*"
//           element={
//             <ProtectedRoute element={<MainCustomer />} isAuthenticated={auth} />
//           }
//         />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Cookies from "js-cookie";

// // pages routes
// import { StartingPage, Main, MainCustomer } from "./pages";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/common/ProtectedRoute";

// const App = () => {
//   const [auth, setAuth] = React.useState(false);
//   useEffect(() => {
//     const token = Cookies.get("auth_token");
//     if (token) {
//       setAuth(true);
//     }
//   }, []);

//   useEffect(() => {});

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<StartingPage />} />
//         <Route
//           path="/main/*"
//           element={<ProtectedRoute element={<Main />} isAuthenticated={auth} />}
//         />
//         <Route
//           path="/customer-page/*"
//           element={
//             <ProtectedRoute element={<MainCustomer />} isAuthenticated={auth} />
//           }
//         />
//         <Route path="*" element={<NotFound />} />{" "}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

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
