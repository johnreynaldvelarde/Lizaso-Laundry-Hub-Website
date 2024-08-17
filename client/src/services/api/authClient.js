import axios from "axios";

const API_URL = "http://localhost:3002/api";

// for login
const loginService = {
  login: async (data) => {
      try {
          const response = await axios.post(`${API_URL}/login`, data, { withCredentials: true });
          const { success, token, userType, message } = response.data;
          if (success) {
              return { success, token, userType };
          } else {
              throw new Error(message || "Login failed.");
          }
      } catch (error) {
          // console.error("Error in loginService:", error);
          throw new Error(error.response?.data.message || "An unexpected error occurred.");
      }
  },
};

// for register
const registerService = {
    register: async (data) => {
      try {
        const response = await axios.post(`${API_URL}/register`, data);
        return response.data;
      } catch (error) {
        console.error("Error in registerService:", error);
        throw error;
      } 
    },
};


export { loginService, registerService };

