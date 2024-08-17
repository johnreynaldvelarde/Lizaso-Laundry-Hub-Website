import axios from "axios";

// for login
const loginService = {
  login: async (data) => {
      try {
          const response = await axios.post("http://localhost:3002/api/login", data, { withCredentials: true });
          const { success, token, userType, message } = response.data;

          if (success) {
              localStorage.setItem('token', token); // Store token in localStorage
              return { success, token, userType };
          } else {
              throw new Error(message || "Login failed.");
          }
      } catch (error) {
          console.error("Error in loginService:", error);
          throw new Error(error.response?.data.message || "An unexpected error occurred.");
      }
  },
};

// for register
const registerService = {
    register: async (data) => {
      try {
        const response = await axios.post("http://localhost:3002/api/register", data);
        return response.data;
      } catch (error) {
        console.error("Error in registerService:", error);
        throw error;
      } 
    },
};


export { loginService, registerService };



// const loginService = {
//     login: async (data) => {
//       try {
//         const response = await axios.post("http://localhost:3002/api/login", data);
//           const token = response.data.token;
//           localStorage.setItem('token', token); // Store token in localStorage
//           return response.data;
        
//         // if (response.data.success) {
//         //   const token = response.data.token;
//         //   localStorage.setItem('token', token); // Store token in localStorage
//         //   return response.data;
//         // } else {
//         //   throw new Error(response.data.message);
//         // }
//       } catch (error) {
//         console.error("Error in loginService:", error);
//         throw error;
//       }
//     },
// };