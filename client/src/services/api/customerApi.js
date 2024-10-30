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
        `/customers/set-messages-sender-customer`,
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
export const getCustomerMessageConvo = {
  getCustomerConvo: async (customerId) => {
    try {
      const response = await axiosPrivate.get(
        `/customers/${customerId}/get-customer-convo`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },
};

// #PUT

// export const createCustomerServiceRequest = {
//   setCustomerServiceRequest: async (customerId, data) => {
//     try {
//       const response = await axiosPrivate.post(
//         `/customers/${customerId}/set-service-request`,
//         data
//       );
//       if (response.status === 201) {
//         return response.data;
//       } else {
//         throw new Error("Failed to create service request");
//       }
//     } catch (error) {
//       console.error("Error creating customer service request:", error);

//       if (error.response) {
//         console.error("Server responded with:", error.response.data);
//       }
//       throw error;
//     }
//   },
// };
