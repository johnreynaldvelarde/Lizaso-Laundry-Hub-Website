// // src/contexts/AuthContext.jsx
// import React, { createContext, useState, useContext } from "react";

// // Create a context for authentication
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);

//   return (
//     <AuthContext.Provider value={{ accessToken, setAccessToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the authentication context
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// import React, { createContext, useState } from "react";

// // Create the context
// export const AuthContext = createContext();

// // Create the provider component
// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);

//   const login = (token) => {
//     setAccessToken(token);
//   };

//   const logout = () => {
//     setAccessToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // Create AuthContext
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);

//   useEffect(() => {
//     const fetchToken = async () => {
//       try {
//         const response = await axios.get("/api/get-token"); // Replace with your API call
//         setAccessToken(response.data.accessToken);
//         console.log("Access Token received:", response.data.accessToken);
//       } catch (error) {
//         console.error("Error fetching access token:", error);
//       }
//     };

//     fetchToken();
//   }, []);

//   // Function to set token manually
//   const setToken = (token) => {
//     setAccessToken(token);
//     console.log("Access Token set:", token);
//   };

//   return (
//     <AuthContext.Provider value={{ accessToken, setToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap around your app
// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     userId: "",
//     fullName: "", // Replace with actual default or fetched value
//     username: "", // Replace with actual default or fetched value
//   });

//   // Fetch user details function
//   // const fetchUserDetails = async () => {
//   //   if (accessToken) {
//   //     try {
//   //       const response = await fetch("/api/user/me", {
//   //         headers: {
//   //           Authorization: `Bearer ${accessToken}`,
//   //         },
//   //       });
//   //       const data = await response.json();
//   //       if (data.success) {
//   //         setUserDetails({
//   //           userId: data.user.userId,
//   //           fullName: data.fullName,
//   //           username: data.username,
//   //         });
//   //       } else {
//   //         // Handle unsuccessful response
//   //       }
//   //     } catch (error) {
//   //       // Handle error
//   //     }
//   //   }
//   // };

//   const fetchUserDetails = async () => {
//     if (accessToken) {
//       try {
//         const response = await fetch("/api/user/me", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         // Debugging line to log the response
//         const text = await response.text();
//         console.log("Response Text:", text);

//         // Attempt to parse as JSON
//         const data = JSON.parse(text);

//         if (data.success) {
//           setUserDetails({
//             userId: data.user.userId,
//             fullName: data.user.fullName,
//             username: data.user.username,
//           });
//         } else {
//           // Handle unsuccessful response
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [accessToken]);

//   const value = {
//     accessToken,
//     setAccessToken,
//     userDetails,
//     setUser: (user) => setUserDetails(user),
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap around your app
// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     userId: "",
//     fullName: "", // Replace with actual default or fetched value
//     username: "", // Replace with actual default or fetched value
//   });

//   const fetchUserDetails = async () => {
//     if (accessToken) {
//       try {
//         const response = await fetch("/api/user/me", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         // Check if the response is HTML
//         const contentType = response.headers.get("Content-Type");
//         if (contentType && contentType.includes("text/html")) {
//           // If it's HTML, log the response text for debugging
//           const text = await response.text();
//           console.error("Received HTML instead of JSON:", text);
//           return;
//         }

//         // Otherwise, parse the JSON response
//         const data = await response.json();

//         // Log the raw data for debugging
//         console.log("Response Data:", data);

//         if (data.success) {
//           // Log user details received
//           console.log("User ID:", data.user.userId);
//           console.log("Full Name:", data.user.fullName);

//           setUserDetails({
//             userId: data.user.userId,
//             fullName: data.user.fullName,
//             username: data.user.username,
//           });
//         } else {
//           // Handle unsuccessful response
//           console.error("API Error:", data.message);
//         }
//       } catch (error) {
//         // Log the full error object for debugging
//         console.error("Error fetching user details:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [accessToken]);

//   const value = {
//     accessToken,
//     setAccessToken,
//     userDetails,
//     setUser: (user) => setUserDetails(user),
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import React, { createContext, useState, useContext, useEffect } from "react";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap around your app
// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     userId: "",
//     fullName: "",
//     username: "",
//   });

//   // Fetch user details function
//   const fetchUserDetails = async () => {
//     if (accessToken) {
//       console.log("TOKEN: " + accessToken);
//       try {
//         const response = await fetch("/api/user/me", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         // Ensure the response is in JSON format
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Fetched user details:", data);

//           if (data.success) {
//             setUserDetails({
//               userId: data.user.userId,
//               fullName: data.user.fullName,
//               username: data.user.username,
//             });
//           } else {
//             console.error("Error:", data.message);
//           }
//         } else {
//           // Handle non-200 status codes
//           console.error("Server responded with status:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     } else {
//       console.error("Sire ang ullol");
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [accessToken]);

//   const value = {
//     accessToken,
//     setAccessToken,
//     userDetails,
//     setUser: (user) => setUserDetails(user),
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap around your app
// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     userId: "",
//     fullName: "",
//     username: "",
//   });

//   // Fetch user details function
//   const fetchUserDetails = async () => {
//     if (accessToken) {
//       console.log("1: " + accessToken);
//       try {
//         const response = await axios.get("/api/user/me", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });

//         // console.log("Fetched user details:", response.data);

//         const data = response.data;

//         console.log(data.message);

//         if (data.success) {
//           setUserDetails({
//             userId: data.user.userId,
//             fullName: data.user.fullName,
//             username: data.user.username,
//           });
//         } else {
//           console.error("Error:", data.message);
//         }
//       } catch (error) {
//         if (error.response) {
//           // Server responded with a status other than 2xx
//           console.error("Error response data:", error.response.data);
//           console.error("Error response status:", error.response.status);
//           console.error("Error response headers:", error.response.headers);
//         } else if (error.request) {
//           // Request was made but no response received
//           console.error("Error request:", error.request);
//         } else {
//           // Something happened in setting up the request
//           console.error("Error message:", error.message);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [accessToken]);

//   const value = {
//     accessToken,
//     setAccessToken,
//     userDetails,
//     setUser: (user) => setUserDetails(user),
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// import React, { createContext, useState, useContext, useEffect } from "react";
// import axios from "axios";

// // Create the AuthContext
// const AuthContext = createContext();

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);

// // AuthProvider component to wrap around your app
// export const AuthProvider = ({ children }) => {
//   const [accessToken, setAccessToken] = useState(null);
//   const [userDetails, setUserDetails] = useState({
//     userId: "",
//     fullName: "", // Replace with actual default or fetched value
//     username: "", // Replace with actual default or fetched value
//   });

//   // Fetch user details function
//   const fetchUserDetails = async () => {
//     if (accessToken) {
//       console.log("Fetching user details with token:", accessToken);
//       try {
//         const response = await axios.get("/api/user/me", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         if (response.data.success) {
//           const user = response.data.user;
//           setUserDetails({
//             userId: user.userId,
//             fullName: user.fullName,
//             username: user.username,
//           });
//         } else {
//           console.error("Error:", response.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails();
//   }, [accessToken]);

//   const value = {
//     accessToken,
//     setAccessToken,
//     userDetails,
//     setUser: (user) => setUserDetails(user),
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

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
  const [accessToken, setAccessToken] = useState(null);
  const [userDetails, setUserDetails] = useState({
    userId: "",
    storeId: "",
    fullName: "",
    username: "",
  });

  // Function to refresh the access token using the refresh token
  // const refreshAccessToken = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/refresh-token`,
  //       {},
  //       {
  //         withCredentials: true, // send cookies with the request
  //       }
  //     );

  //     if (response.data.success) {
  //       setAccessToken(response.data.accessToken);
  //     } else {
  //       console.error("Error refreshing access token:", response.data.message);
  //       // Optionally handle logout or redirect
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing access token:", error);
  //     // Optionally handle logout or redirect
  //   }
  // };

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
          // Try to refresh the token if fetching user details fails
          // await refreshAccessToken();
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Try to refresh the token if fetching user details fails
        // await refreshAccessToken();
      }
    } else {
      // No access token, try to refresh it
      // await refreshAccessToken();
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

// const fetchUserDetails = async () => {
//   if (accessToken) {
//     try {
//       const response = await axios.get(`${API_URL}/user/me`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
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
//         console.error("Error:", response.data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   }
// };
