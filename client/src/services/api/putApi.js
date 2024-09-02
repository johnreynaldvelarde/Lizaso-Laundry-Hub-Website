import { axiosPrivate } from "../../api/axios";


// export const updateCustomerBasicInformation = {
//     setCustomerInformation: async (data) => {
      
//     },
//   };


export const updateCustomerBasicInformation = {
  setCustomerInformation: async (customerId, data) => {
      try {
          const response = await axiosPrivate.put(`/customers/${customerId}/start`, data);
          return response.data;
      } catch (error) {
          console.error("Error updating customer information:", error);
          throw error;
      }
  },
};