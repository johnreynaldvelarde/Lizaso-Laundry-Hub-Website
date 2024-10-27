import { axiosPrivate } from "./axios";

const handleError = (error) => {
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

// UNIT MONITORED SECTION

export const getCalculatedTransaction = {
  getTransaction: async (assignmentId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${assignmentId}/get-calculated-transaction`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer requests:", error);
      throw error;
    }
  },
};

export const getInventoryLaundryItem = {
  getInventoryItem: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/get-laundry-item`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer requests:", error);
      throw error;
    }
  },
};

export const getCountRequestInQueue = {
  getCountInQueue: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/count-inqueue`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer requests:", error);
      throw error;
    }
  },
};

export const getCountLaundryAssignment = {
  getCountAssignment: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/count-assignment`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching laundry assignment:", error);
      throw error;
    }
  },
};

export const getAssignmentInProgress = {
  getInProgress: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/get-assignment`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching laundry assignment:", error);
      throw error;
    }
  },
};

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

export const viewRequestInQueue = {
  getRequestInQueue: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/get-inqueue`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer requests:", error);
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

export const viewUnitAvailable = {
  getUnitAvailable: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/unit-available`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

export const getListCustomer = {
  getSelectedCustomer: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/get-inqueue`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer requests:", error);
      throw error;
    }
  },
};

export const getSelectedCustomer = {
  getSelectCustomer: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/monitored-unit/${storeId}/get-customer`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching selected customer:", error);
      throw error;
    }
  },
};

export const getServiceType = {
  getService: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/unit/${storeId}/get-service-types`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching selected customer:", error);
      throw error;
    }
  },
};

// INVENTORY SECTION
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
    // try {
    //   const response = await axiosPrivate.get(
    //     `/usermanage/${userId}/admin-get-store`
    //   );
    //   return response.data;
    // } catch (error) {
    //   console.error("Error fetching:", error);
    //   throw error;
    // }
    try {
      const response = await axiosPrivate.get("inventory/view-inventory", {
        params: { store_id: storeId },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const viewCategory = {
  getViewCategoryList: async (storeId) => {
    try {
      const response = await axiosPrivate.get("/view-category", {
        params: { store_id: storeId },
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

// STORE SECTION
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

export const viewStoreByAdmin = {
  getStoreByAdmin: async () => {
    try {
      const response = await axiosPrivate.get("/stores/admin-get-stores");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// USER MANAGEMENT SECTION
export const viewUser = {
  getUser: async (userId) => {
    try {
      const response = await axiosPrivate.get(`/user/${userId}/admin-get-user`);
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// #For get role and permission
export const viewRolesAndPermissions = {
  getRoleAndPermission: async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/usermanage/${userId}/admin-get-role-permissions`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// #For get store list based admin
export const viewAdminBasedStore = {
  getAdminBasedStore: async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/usermanage/${userId}/admin-get-store`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// #For get users list based admin
export const viewAdminBasedUser = {
  getAdminBasedUser: async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/usermanage/${userId}/admin-get-user`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// INBOX SECTION
export const getInbox = {
  viewInbox: async (userId) => {
    try {
      const response = await axiosPrivate.get(`/inbox/${userId}/get-inbox`);
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// REVIEWS SECTION
export const getReviews = {
  viewReviews: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/reviews/${storeId}/get-reviews`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// SETTINGS SECTION
//  <----- Service Type Section ----->
export const getServiceTypeAndStore = {
  getServiceType: async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/settings/${userId}/get-service-types`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// ---> CUSTOMER SECTION <---

//  <----- Laundry Services Section ----->
// export const getCustomerServiceType = {
//   getServiceType: async (userId) => {
//     try {
//       const response = await axiosPrivate.get(
//         `/settings/${userId}/get-service-types`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching:", error);
//       throw error;
//     }
//   },
// };

//  <----- Track Order Section ----->
// export const getCustomerTrackOrder = {
//   getServiceType: async (userId) => {
//     try {
//       const response = await axiosPrivate.get(
//         `/settings/${userId}/get-service-types`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching:", error);
//       throw error;
//     }
//   },
// };
