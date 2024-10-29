import { axiosPrivate } from "./axios";

export const checkCustomerDetails = {
  getCheckCustomerDetails: async (id) => {
    console.log(id);
    try {
      const response = await axiosPrivate.get(
        `customers/${id}/check-customer-details-web`
      );

      if (response.data.success) {
        const { storeIdIsNull, addressIsNull } = response.data.data;
        return { storeIdIsNull, addressIsNull };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return { success: false, message: "Failed to check customer details" };
    }
  },
};

// export const checkCustomerDetails = {
//   getCheckCustomerDetails: async (customerId) => {
//     try {

//       const response = await axiosPrivate.get("/check-customer-details", {
//         params: {
//           customerId: customerId,
//         },
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error checking customer details:", error);

//       // Handle errors as needed, e.g., return a custom error message or null
//       return {
//         success: false,
//         message: "Failed to check customer details",
//       };
//     }
//   },
// };
