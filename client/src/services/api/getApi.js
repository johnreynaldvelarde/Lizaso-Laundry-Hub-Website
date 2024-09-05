import { axiosPrivate } from "./axios";

const handleError = (error) => {
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

// Laundry Units Section

export const getUnitName = {
  getSuggestedUnitName: async (storeId) => {
    try {
      const response = await axiosPrivate.get("/get-unitname", {
        params: { store_id: storeId }, // Use query parameters
      });
      const { success, unit_name } = response.data;
      if (success) {
        return { success, unit_name };
      } else {
        throw new Error("Failed to fetch suggested unit name.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

export const viewCustomerRequest = {
  getCustomerRequest: async (storeId) => {
    try {
      const response = await axiosPrivate.get(`/user/${storeId}/get-request`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer requests:', error);
      throw error; 
    }
  },
};

export const viewUnits = {
  getUnitsList: async (storeId) => {
    try {
      const response = await axiosPrivate.get("/view-units", {
        params: { store_id: storeId },
      });
      const { success, data } = response.data;

      if (success) {
        return { success, data };
      } else {
        throw new Error("Failed to fetch units list.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

// Inventory Section
export const getCategoryItem = {
  getCategory: async () => {
    try {
      const response = await axiosPrivate.get("/get-category");

      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        throw new Error("Failed to fetch category items.");
      }
    } catch (error) {
      return handleError(error); 
    }
  },
};

export const viewInventory = {
  getViewInventoryList: async (storeId) => {
    try {
      const response = await axiosPrivate.get("/view-inventory", {
        params: { store_id: storeId }
      });
      const { success, data } = response.data;

      if (success) {
        return { success, data };
      } else {
        throw new Error("Failed to fetch inventory list.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};


export const viewCategory = {
  getViewCategoryList: async (storeId) => {
    try {
      const response = await axiosPrivate.get("/view-category", {
        params: { store_id: storeId }
      });
      const { success, data } = response.data;

      if (success) {
        return { success, data };
      } else {
        throw new Error("Failed to fetch category list.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};


// Store Section
export const viewStore = {
  getStoreList: async (data) => {
    try {
      const response = await axiosPrivate.get("/view-store", data);
      const { success, message, data: storeData } = response.data;

      if (success) {
        return { success, message, data: storeData };
      } else {
        throw new Error(message || "Failed.");
      }
    } catch (error) {
      throw handleError(error);
    }
  },
};

// User Management
export const viewUser = {
  getUser: async (userId) => {
    try {
      const response = await axiosPrivate.get(`/user/${userId}/admin-get-user`);
      return response.data;
    } catch (error) {
      console.error('Error fetching:', error);
      throw error; 
    }
  },
};

