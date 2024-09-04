import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../contexts/AuthContext";
import { viewUnits, viewCustomerRequest } from "../../services/api/getApi";

const useUnitMonitor = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
  const [openInProgress, setOpenInProgress] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [unitsData, setUnitsData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDetails } = useAuth();

  const hasFetchedCustomerRequestData = useRef(false);

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

  const fetchCustomerRequestData = async () => {
    if (hasFetchedCustomerRequestData.current) return;

    try {
      const response = await viewCustomerRequest.getCustomerRequest(
        userDetails.storeId
      );
      if (response) {
        setRequestData(response);
        hasFetchedCustomerRequestData.current = true;
      } else {
        setError("Failed to fetch customer request data.");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
    fetchUnitsData,
    fetchCustomerRequestData,
    userDetails,
    requestData,
  };
};

export default useUnitMonitor;
