import { axiosPrivate } from "../api/axios";

// Utility function to handle errors
const handleError = (error) => {
  console.error('API Error:', error); // Log the error for debugging

  // Extract and return a user-friendly error message
  const message = error.response?.data?.message || 'An unexpected error occurred.';
  return new Error(message);
};

// Login Service
const loginService = {
  login: async (data) => {
    try {
      const response = await axiosPrivate.post('/login', data);
      const { success, userType, accessToken, message } = response.data;

      if (success) {
        return { success, userType, accessToken };
      } else {
        throw new Error(message || 'Login failed.');
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Register Service
const registerService = {
  register: async (data) => {
    try {
      const response = await axiosPrivate.post('/register', data);
      const { success, message, redirectUrl } = response.data;

      if (success) {
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

