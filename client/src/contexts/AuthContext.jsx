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
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/refresh-token`, {
        withCredentials: true, // This will send cookies, including the refresh token
      });

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        // Log the receipt of the new access token
        // console.log("New access token received:", newAccessToken);

        return newAccessToken;
      } else {
        // console.error("Error refreshing access token:", response.data.message);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
    return null;
  };

  const fetchUserDetails = async (token) => {
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
          console.error("Error fetching user details:", response.data.message);
          // Optionally handle logout if fetching user details fails
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      if (!accessToken) {
        const token = await refreshAccessToken();
        if (token) {
          await fetchUserDetails(token);
        }
      }
      setIsLoading(false);
    };

    checkAccessToken();
  }, [accessToken]); // This should ideally only run when `accessToken` changes

  // useEffect(() => {
  //   const checkAccessToken = async () => {
  //     let token = accessToken;

  //     if (!token) {
  //       token = await refreshAccessToken();
  //     }

  //     if (token) {
  //       await fetchUserDetails(token);
  //     }

  //     setIsLoading(false); // Set loading to false after the token is checked
  //   };

  //   checkAccessToken();
  // }, [accessToken]); // Depend on accessToken so it checks whenever it changes

  const value = {
    accessToken,
    setAccessToken,
    userDetails,
    setUser: setUserDetails,
    isLoading,
    setIsLoading, // Provide setIsLoading to the context if needed
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
