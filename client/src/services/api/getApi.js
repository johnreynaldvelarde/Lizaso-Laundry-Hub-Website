import { axiosPrivate } from "./axios";

const handleError = (error) => {
  const message =
    error.response?.data?.message || "An unexpected error occurred.";
  return new Error(message);
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
