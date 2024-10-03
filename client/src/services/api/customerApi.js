import { axiosPrivate } from "../../api/axios";

// const handleError = (error) => {
//   const message =
//     error.response?.data?.message || "An unexpected error occurred.";
//   return new Error(message);
// };

// POST
export const createCustomerServiceRequest = {
  setCustomerServiceRequest: async (customerId, data) => {
    try {
      const response = await axiosPrivate.post(
        `/customers/${customerId}/set-service-request`,
        data
      );
      if (response.status === 201) {
        return response.data;
      } else {
        throw new Error("Failed to create service request");
      }
    } catch (error) {
      console.error("Error creating customer service request:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
      throw error;
    }
  },
};

// export const createCustomerServiceRequest = {
//   setCustomerServiceRequest: async (customerId, data) => {
//     try {
//       const response = await axiosPrivate.post(
//         `/customers/${customerId}/set-service-request`,
//         data
//       );
//       // return response.data;
//     } catch (error) {
//       console.error("Error customer service request:", error);
//       throw error;
//     }
//   },
// };

// GET
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
export const getCustomerTrackOrder = {
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
// PUT
