import { axiosPrivate } from "../../api/axios";

const handleError = (error) => {
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

// Create new unit
export const createUnit = {
  setUnit: async (data) => {
    try {
      const response = await axiosPrivate.post("/create-unit", data);
      const { success, message } = response.data;
      if (success) {
        return { success, message };
      } else {
        throw new Error(message || "Create Unit is failed.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};


// Create new branch
export const createStore = {
  setStore: async (data) => {
    try {
      const response = await axiosPrivate.post("/create-store", data);
      const { success, message } = response.data;

      if (success) {
        return { success, message };
        
      } else {
        throw new Error(message || "Failed to create branch");
      }
    } catch (error) {
      // Log the error message before throwing the error
      const errorMessage = error.response?.data?.message || 'Cannot Get the message for the server';
      console.log(errorMessage); // Log the message
      throw new Error(errorMessage); // Re-throw the error with the message
    }
  },
};
