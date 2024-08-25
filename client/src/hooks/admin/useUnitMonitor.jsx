import React, { useEffect, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import { viewUnits } from "../../services/api/getApi";

const useUnitMonitor = () => {
  const [unitsData, setUnitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetails } = useAuth();

  useEffect(() => {
    const fetchUnitsData = async () => {
      if (!userDetails?.storeId) {
        setError("Store ID is undefined.");
        setLoading(false);
        return;
      }

      try {
        const response = await viewUnits.getUnitsList(userDetails.storeId);
        if (response.success) {
          setUnitsData(response.data); // Adjust if the data structure is different
        } else {
          setError("Failed to fetch units data.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUnitsData();
  }, [userDetails?.storeId]);

  return {
    unitsData,
    loading,
    error,
  };
};

export default useUnitMonitor;
