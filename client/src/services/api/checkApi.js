import { axiosPrivate } from "./axios";

const handleError = (error) => {
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
};

export const checkCustomerDetails = {
  getCheckCustomerDetails: async (c_username) => {

    console.log('Checking details for username:', c_username);

    try {
      const response = await axiosPrivate.post("/check-customer-details", {
        c_username
      });

      if (response.data.success) {
        const { storeIdIsNull, cNumberIsNull, cEmailIsNull } = response.data.data;
        return { storeIdIsNull, cNumberIsNull, cEmailIsNull };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error('Error checking customer details:', error);
      return { success: false, message: 'Failed to check customer details' };
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
