import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import { axiosPublic, axiosPrivate } from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const isFetchingRef = useRef(false);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    storeId: "",
    firstname: "",
    middlename: "",
    lastname: "",
    email: "",
    phone: "",
    fullName: "",
    username: "",
    roleName: "",
    permissions: {
      canRead: false,
      canWrite: false,
      canEdit: false,
      canDelete: false,
    },
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
        // console.error("Error refreshing access token:", response.data.message);
      }
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
    return null;
  };

  const fetchUserDetails = async (token) => {
    if (!token || isFetchingRef.current) return; // Prevent duplicate fetches

    isFetchingRef.current = true; // Mark fetch as ongoing
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
          firstname: user.firstname,
          middlename: user.middlename,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          fullName: user.fullName,
          username: user.username,
          roleName: user.roleName,
          permissions: {
            canRead: user.permissions.canRead,
            canWrite: user.permissions.canWrite,
            canEdit: user.permissions.canEdit,
            canDelete: user.permissions.canDelete,
          },
        });
      } else {
        console.error("Error fetching user details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      isFetchingRef.current = false; // Mark fetch as completed
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

// const fetchUserDetails = async (token) => {
//   if (token) {
//     try {
//       const response = await axiosPrivate(`/user/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         const user = response.data.user;
//         setUserDetails({
//           userId: user.userId,
//           storeId: user.storeId,
//           fullName: user.fullName,
//           username: user.username,
//         });
//       } else {
//         console.error("Error fetching user details:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   }
// };
