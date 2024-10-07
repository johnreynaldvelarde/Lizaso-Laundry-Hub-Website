import { axiosPrivate } from "../api/axios";

const handleError = (error) => {
  console.error("API Error:", error);

  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

// Login Service
export const loginService = {
  login: async (data) => {
    try {
      const response = await axiosPrivate.post("/login", data);
      const { success, userType, roleName, permissions, accessToken, message } =
        response.data;

      if (success) {
        return { success, userType, roleName, permissions, accessToken };
      } else {
        throw new Error(message || "Login failed.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Register Service
export const registerService = {
  register: async (data) => {
    try {
      const response = await axiosPrivate.post("/register", data);
      const { success, message, redirectUrl } = response.data;

      if (success) {
        return { success, message, redirectUrl };
      } else {
        throw new Error(message || "Registration failed.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

export const checkUsername = {
  getCheckUsername: async (data) => {
    try {
      const response = await axiosPrivate.post("/check-username", data);
      return response.data;
    } catch (error) {
      console.error("Error checking username:", error);
      throw error;
    }
  },
};
