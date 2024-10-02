export const getCustomerServiceType = {
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
