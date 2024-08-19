import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Define the API base URL
const API_URL = "http://localhost:3002/api";

// Create the AuthContext
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    storeId: "",
    fullName: "",
    username: "",
  });

  // Fetch user details function
  const fetchUserDetails = async () => {
    if (accessToken) {
      try {
        const response = await axios.get(`${API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          const user = response.data.user;
          setUserDetails({
            userId: user.userId,
            storeId: user.storeId,
            fullName: user.fullName,
            username: user.username,
          });
        } else {
          console.error("Error:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    } else {
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [accessToken]);

  const value = {
    accessToken,
    setAccessToken,
    userDetails,
    setUser: (user) => setUserDetails(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
