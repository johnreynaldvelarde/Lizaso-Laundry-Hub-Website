// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ProtectedAuth from "./hooks/ProtectedAuth";

// // Pages and components
// import { StartingPage, Main, MainCustomer } from "./pages";
// import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/common/ProtectedRoute";

// const App = () => {
//   const { auth, setAuth } = ProtectedAuth();
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

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // pages routes
// import { StartingPage, Main, MainCustomer } from "./pages";
// import NotFound from "./pages/NotFound";

// // Import the AuthProvider
// import { AuthProvider } from "./contexts/AuthContext";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<StartingPage />} />
//         <Route path="/main/*" element={<Main />} />
//         <Route path="/customer-page/*" element={<MainCustomer />} />
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

// src/App.jsx
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Import pages
// import { StartingPage, Main, MainCustomer } from "./pages";
// import NotFound from "./pages/NotFound";

// // Import the AuthProvider
// import AuthProvider from "./contexts/AuthContext";
// import ProtectedRoute from "./components/common/ProtectedRoute";

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<StartingPage />} />
//           <Route path="/main/*" element={<Main />} />
//           <Route path="/customer-page/*" element={<MainCustomer />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import { StartingPage, Main, MainCustomer } from "./pages";
import NotFound from "./pages/NotFound";

// Import the AuthProvider
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";

import RequireAuth from "./components/common/RequireAuth";
import PersistLogin from "./components/common/PersistLogin";

const ROLES = {
  Admin: 0,
  Customer: 1,
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<StartingPage />} />

          {/* This is protected route */}
          <Route path="/main/*" element={<ProtectedRoute component={Main} />} />
          <Route
            path="/customer-page/*"
            element={<ProtectedRoute component={MainCustomer} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

{
  /* <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/main/*" element={<Main />} />
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Customer]} />}>
              <Route path="/customer-page/*" element={<MainCustomer />} />
            </Route>
          </Route> */
}

{
  /* <Route path="/main/*" element={<ProtectedRoute component={Main} />} />
          <Route
            path="/customer-page/*"
            element={<ProtectedRoute component={MainCustomer} />}
          />
          <Route path="*" element={<NotFound />} /> */
}

{
  // Import ProtectedRoute
  // import ProtectedRoute from "./components/common/ProtectedRoute";
  /* <Route path="/main/*" element={<ProtectedRoute component={Main} />} />
          <Route
            path="/customer-page/*"
            element={<ProtectedRoute component={MainCustomer} />}

            // import ProtectedRoute from "./components/common/ProtectedRoute";
          /> */
}
