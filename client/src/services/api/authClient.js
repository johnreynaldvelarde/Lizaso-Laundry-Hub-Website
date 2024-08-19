// import axios from "axios";
// import Cookies from "js-cookie";

// const API_URL = "http://localhost:3002/api";

// // for login
// const loginService = {
//   login: async (data) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
//       const { success, token, userType, message } = response.data;
//       if (success) {
//         Cookies.set('auth_token', token, { expires: 1 }); // Set token in cookies
//         return { success, token, userType };
//       } else {
//         throw new Error(message || "Login failed.");
//       }
//     } catch (error) {
//       throw new Error(error.response?.data.message || "An unexpected error occurred.");
//     }
//   },
// };

// // for register
// const registerService = {
//   register: async (data) => {
//     try {
//       const response = await axios.post(`${API_URL}/register`, data);
//       return response.data;
//     } catch (error) {
//       console.error("Error in registerService:", error);
//       throw error;
//     }
//   },
// };

// export { loginService, registerService };
// import axios from "axios";

// const API_URL = "http://localhost:3002/api";

// // for login
// const loginService = {
//   login: async (data) => {
//       try {
//           const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
//           const { success, userType, message } = response.data;
//           if (success) {
//               return { success, userType };
//           } else {
//               throw new Error(message || "Login failed.");
//           }
//       } catch (error) {
//           // console.error("Error in loginService:", error);
//           throw new Error(error.response?.data.message || "An unexpected error occurred.");
//       }
//   },
// };

// // for register
// const registerService = {
//     register: async (data) => {
//       try {
//         const response = await axios.post(`${API_URL}/register`, data);
//         return response.data;
//       } catch (error) {
//         console.error("Error in registerService:", error);
//         throw error;
//       } 
//     },
// };


// export { loginService, registerService };

// import axios from "axios";

// const API_URL = "http://localhost:3002/api";

// const instance = axios.create({
//   baseURL: API_URL,
//   withCredentials: true, // This ensures cookies are included in requests
// });

// const loginService = {
//   login: async (data) => {
//     try {
//       const response = await instance.post('/login', data);
//       const { success, token, userType, message } = response.data;
//       if (success) {
//         return { success, token, userType };
//       } else {
//         throw new Error(message || "Login failed.");
//       }
//     } catch (error) {
//       throw new Error(error.response?.data.message || "An unexpected error occurred.");
//     }
//   },
// };

// const registerService = {
//   register: async (data) => {
//     try {
//       const response = await instance.post('/register', data);
//       return response.data;
//     } catch (error) {
//       console.error("Error in registerService:", error);
//       throw error;
//     }
//   },
// };

// export { loginService, registerService };

import axios from 'axios';

const API_URL = 'http://localhost:3002/api';

// Utility function to handle errors
const handleError = (error) => {
  // Log the error for debugging
  console.error('API Error:', error);

  // Extract error message
  const message = error.response?.data?.message || 'An unexpected error occurred.';
  return new Error(message);
};

// Login Service
const loginService = {
  login: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
      const { success, userType, accessToken, message } = response.data;

      if (success) {
        // Return the success status, userType, and accessToken
        return { success, userType, accessToken};
      } else {
        // If the server returns a failure, throw an error with the provided message
        throw new Error(message || 'Login failed.');
      }
    } catch (error) {
      // Handle and throw the error using the handleError utility
      throw handleError(error);
    }
  },
};


// // Login Service
// const loginService = {
//   login: async (data) => {
//     try {
//       const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
//       const { success, userType, message } = response.data;
//       if (success) {
//         return { success, userType };
//       } else {
//         throw new Error(message || 'Login failed.');
//       }
//     } catch (error) {
//       throw handleError(error);
//     }
//   },
// };

// Register Service
const registerService = {
  register: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/register`, data);
      const { success, message, redirectUrl } = response.data;
      if (success) {
        // Return success and redirection URL if provided
        return { success, message, redirectUrl };
      } else {
        throw new Error(message || 'Registration failed.');
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

export { loginService, registerService };

