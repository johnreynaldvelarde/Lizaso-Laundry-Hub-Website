import React, { useEffect, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import { viewUnits } from "../../services/api/getApi";

const useUnitMonitor = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
  const [openInProgress, setOpenInProgress] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [unitsData, setUnitsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetails } = useAuth();

  const handleOpenDialog = (unit) => {
    setSelectedUnit(unit);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUnit(null);
  };

  const handleOpenCustomerRequest = () => {
    setOpenCustomerRequest(true);
  };

  const handleCloseCustomerRequest = () => {
    setOpenCustomerRequest(false);
  };

  const handleOpenInProgress = () => {
    setOpenInProgress(true);
  };

  const handleCloseInProgress = () => {
    setOpenInProgress(false);
  };

  useEffect(() => {
    setFilteredUnits(
      unitsData.filter((unit) =>
        unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, unitsData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
    openDialog,
    setOpenDialog,
    selectedUnit,
    setSelectedUnit,
    openCustomerRequest,
    openInProgress,
    searchTerm,
    setSearchTerm,
    filteredUnits,
    unitsData,
    loading,
    error,
    handleOpenDialog,
    handleCloseDialog,
    handleOpenCustomerRequest,
    handleCloseCustomerRequest,
    handleOpenInProgress,
    handleCloseInProgress,
    handleSearchChange,
  };
};

export default useUnitMonitor;
