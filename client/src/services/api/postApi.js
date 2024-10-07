import { axiosPrivate } from "../../api/axios";

const handleError = (error) => {
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

// UNIT MONITORED SECTION
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

export const createLaundryAssignment = {
  setLaundryAssignment: async (userId, data) => {
    try {
      const response = await axiosPrivate.post(
        `/unit-monitor/${userId}/set-assignment`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

export const createWalkInServiceRequest = {
  setWalkInRequest: async (storeId, data) => {
    try {
      const response = await axiosPrivate.post(
        `/unit-monitor/${storeId}/set-walkin`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};

// STORE SECTION
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
      const errorMessage =
        error.response?.data?.message ||
        "Cannot Get the message for the server";
      console.log(errorMessage); // Log the message
      throw new Error(errorMessage); // Re-throw the error with the message
    }
  },
};

// INVENTORY SECTION
export const createItem = {
  setItem: async (data) => {
    try {
      const response = await axiosPrivate.post("/create-item", data);
      const { success, message } = response.data;
      if (success) {
        return { success, message };
      } else {
        throw new Error(message || "Failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Cannot Get the message for the server";
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
};

export const createItemCategory = {
  setCategoryItem: async (data) => {
    try {
      const response = await axiosPrivate.post("/create-category-item", data);
      const { success, message } = response.data;

      if (success) {
        return { success, message };
      } else {
        throw new Error(message || "Failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Cannot Get the message for the server";
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
  },
};

// USER MANAGEMENT SECTION
export const createNewRoleAndPermissions = {
  setRoleAndPermissons: async (userId, data) => {
    try {
      const response = await axiosPrivate.post(
        `/user/${userId}/set-role-permisions`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// SETTINGS SECTION
//  <----- Service Type Section ----->
export const createNewServiceType = {
  setServiceType: async (data) => {
    try {
      const response = await axiosPrivate.post(
        `/settings/set-service-types`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Customer Section

// Activity Log Section
export const createActivityLog = {
  setActivtyLog: async (userId, data) => {
    try {
      const response = await axiosPrivate.post(
        `/activity/${userId}/post-log`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
