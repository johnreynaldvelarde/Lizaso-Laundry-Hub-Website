import { axiosPublic } from "../axios";

const handleError = (error) => {
  console.error("API Error:", error);
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

// Create new branch
const createBranch = {
  login: async (data) => {
    try {
      const response = await axiosPublic.post("/create-branch", data);
      const { success, message } = response.data;

      if (success) {
        return { success, message };
      } else {
        throw new Error(message || "Create Branch is failed.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Get branch list
const viewBranch = {
  login: async (data) => {
    try {
      const response = await axiosPublic.post("/view-branch", data);
      const { success, message } = response.data;

      if (success) {
        return { success, message };
      } else {
        throw new Error(message || "Login failed.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

export { createBranch, viewBranch };
