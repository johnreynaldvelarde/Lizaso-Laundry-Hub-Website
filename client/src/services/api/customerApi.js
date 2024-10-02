import { axiosPrivate } from "../../api/axios";

// const handleError = (error) => {
//   const message =
//     error.response?.data?.message || "An unexpected error occurred.";
//   return new Error(message);
// };

// POST
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
