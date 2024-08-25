import React, { createContext, useState, useContext, useEffect } from "react";
import { axiosPublic, axiosPrivate } from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    storeId: "",
    fullName: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const refreshAccessToken = async () => {
    try {
      const response = await axiosPublic.get(`/refresh-token`, {
        withCredentials: true,
      });

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        return newAccessToken;
      } else {
        console.error("Error refreshing access token:", response.data.message);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
    return null;
  };

  const fetchUserDetails = async (token) => {
    if (token) {
      try {
        const response = await axiosPrivate(`/user/me`, {
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
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    const checkAccessToken = async () => {
      let token = accessToken;

      if (!token) {
        token = await refreshAccessToken();
      }

      if (token) {
        await fetchUserDetails(token);
      }

      setIsLoading(false);
    };

    checkAccessToken();
  }, [accessToken]);

  const value = {
    accessToken,
    setAccessToken,
    userDetails,
    setUser: setUserDetails,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default useAuth;
