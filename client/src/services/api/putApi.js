import { axiosPrivate } from "../../api/axios";

// export const updateCustomerBasicInformation = {
//     setCustomerInformation: async (data) => {

//     },
//   };

export const updateCustomerBasicInformation = {
  setCustomerInformation: async (customerId, data) => {
    try {
      const response = await axiosPrivate.put(
        `/customers/${customerId}/start`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating customer information:", error);
      throw error;
    }
  },
};

export const updateRemoveInQueue = {
  putRemoveInQueue: async (inqueueID) => {
    try {
      const response = await axiosPrivate.put(
        `/user/${inqueueID}/remove-request`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  },
};

export const updateRemoveAssignment = {
  putAssignment: async (assignmentID) => {
    try {
      const response = await axiosPrivate.put(
        `/user/${assignmentID}/update-assignment`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  },
};

// USER MANAGEMENT SECTION
// #Admin
export const updateAdminBasedUser = {
  putAdminBasedUser: async (userId, data) => {
    try {
      const response = await axiosPrivate.put(
        `/usermanage/${userId}/update-admin-based-user`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const updateRemoveUser = {
  putRemoveUser: async (userId, data) => {
    try {
      const response = await axiosPrivate.put(
        `/usermanage/${userId}/update-remove-user`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// #Manager
export const updateManagerBasedUser = {
  putManagerBasedUser: async (userId, data) => {
    try {
      const response = await axiosPrivate.put(
        `/usermanage/${userId}/update-manager-based-user`,
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
export const updateServiceType = {
  putServiceType: async (serviceId, data) => {
    try {
      const response = await axiosPrivate.put(
        `/settings/${serviceId}/update-service-types`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const updateDeleteServiceType = {
  putDeleteServiceType: async (id) => {
    try {
      const response = await axiosPrivate.put(
        `/settings/${id}/delete-service-types`
      );
      return response.data;
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  },
};
