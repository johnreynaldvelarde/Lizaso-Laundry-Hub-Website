// import { axiosPublic, axiosPrivate } from "../api/axios";
// import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthContext from "../contexts/AuthContext";

// const useLogout = () => {
//   const setUserDetails = useContext(AuthContext); // Adjust according to your context
//   const navigate = useNavigate();

//   //   const logout = async () => {
//   //     try {
//   //       // Send logout request to server
//   //       await axiosPrivate.post("/logout");

//   //       // Clear access token from app state
//   //       setUserDetails(null);

//   //       // Redirect to the login page or home page
//   //       navigate("/"); // Adjust the path as needed
//   //     } catch (error) {
//   //       console.error("Logout failed:", error);
//   //     }
//   //   };

//   const logout = async () => {
//     try {
//       await axiosPrivate.post("/logout", {}, { withCredentials: true });
//       setAccessToken(null);
//       setUserDetails({
//         userId: "",
//         storeId: "",
//         fullName: "",
//         username: "",
//       });
//       // Optionally redirect to login page
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return logout;
// };

// export default useLogout;

// src/hooks/useLogout.js
import { useAuth } from "../contexts/AuthContext"; // Adjust the path to your AuthContext
import axios from "axios";

const API_URL = "http://localhost:3002/api"; // Define your API base URL

const useLogout = () => {
  const { setAccessToken, setUser, setIsLoading } = useAuth();

  const logout = async () => {
    try {
      // Send logout request to server
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

      // Clear access token and user details from app state
      setAccessToken(null);
      setUser({
        userId: "",
        storeId: "",
        fullName: "",
        username: "",
      });

      // Optionally, redirect to login page
      window.location.href = "/";

      // Optionally, handle additional cleanup if needed
      setIsLoading(true); // Set loading to true during logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return logout;
};

export default useLogout;
