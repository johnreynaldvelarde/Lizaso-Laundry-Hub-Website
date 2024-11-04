import { axiosPrivate } from "../../api/axios";

// #POST
export const createCustomerServiceRequest = {
  setCustomerServiceRequest: async (customerId, data) => {
    try {
      const response = await axiosPrivate.post(
        `/customers/${customerId}/set-service-request`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const createMessageSenderCustomer = {
  setCustomerMessage: async (data) => {
    try {
      const response = await axiosPrivate.post(
        `/customers/set-new-messsages`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export const createFeedbackAndReview = {
  setFeedbackReview: async (data) => {
    try {
      const response = await axiosPrivate.post(
        `/customers/set-feedback-review`,
        data
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// #GET

export const getServicePromoHeader = {
  getPromoHeader: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/${storeId}/get-service-types`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

export const getCustomerServiceAndPromotions = {
  getServiceWithPromotions: async (storeId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/${storeId}/get-service-types`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

//  <----- Track Order Section ----->
export const getCustomerTrackOrderAndProgress = {
  getCustomerTrackOrder: async (userId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/${userId}/get-track-order`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

export const getCalculatedTransactionForCustomer = {
  getTransactionCustomer: async (assignmentId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/${assignmentId}/get-calculated-transaction`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer requests:", error);
      throw error;
    }
  },
};

//  <----- Get Customer Message ----->
export const getChatMessages = {
  getMessages: async (user_one_id, user_two_id) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/${user_one_id}/${user_two_id}/get-messages`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// #PUT
export const updateMessageisRead = {
  putMessageisRead: async (user_one_id, user_two_id) => {
    try {
      const response = await axiosPrivate.put(
        `/customers/${user_one_id}/${user_two_id}/put-update-message`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

export const updateCustomerProfile = {
  putUpdateProfile: async (user_one_id, user_two_id) => {
    try {
      const response = await axiosPrivate.get(
        `/mobile-customer-staff/${user_one_id}/${user_two_id}/get-messages`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};
