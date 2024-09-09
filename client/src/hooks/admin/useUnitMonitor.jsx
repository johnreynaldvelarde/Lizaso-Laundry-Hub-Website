import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import useAuth from "../../contexts/AuthContext";
import {
  viewUnits,
  viewRequestInQueue,
  viewUnitAvailable,
  getCountRequestInQueue,
} from "../../services/api/getApi";
import { createLaundryAssignment } from "../../services/api/postApi";

const useUnitMonitor = () => {
  const { userDetails } = useAuth();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [openCustomerRequest, setOpenCustomerRequest] = useState(false);
  const [openInProgress, setOpenInProgress] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [unitsData, setUnitsData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetchedCustomerRequestData = useRef(false);
  const hasUnits = useRef(false);

  // <----- Counting Section ----->
  const [countInQueueData, setCountInQueueData] = useState(null);
  const hasCountInQueue = useRef(false);

  const fetchCountInQueue = useCallback(async () => {
    if (hasCountInQueue.current) return;
    setLoading(true);
    try {
      const response = await getCountRequestInQueue.getCountInQueue(
        userDetails.storeId
      );

      if (response && response.count !== undefined) {
        setCountInQueueData(response.count);
        hasCountInQueue.current = true;
      } else {
        setError("Failed to fetch count data.");
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching count data.");
    } finally {
      setLoading(false);
    }
  }, [userDetails?.storeId]);

  // <--------------------------->

  // Filter

  // PopupInLaundry

  //  <----- PopupInQueue ----->
  const [inQueueData, setInQueueData] = useState([]);
  const [openInQueue, setInQueue] = useState(false);
  const [dialogQueueOpen, setDialogQueueOpen] = useState(false);
  const [dialogAssignUnitOpen, setDialogAssignUnitOpen] = useState(false);
  const [selectedQueueID, setSelectedQueueId] = useState(null);

  const handleDialogRemoveInQueue = (id) => {
    setSelectedQueueId(id);
    setDialogQueueOpen(true);
  };

  const handleDialogAssignUnit = (id) => {
    setSelectedQueueId(id);
    setDialogAssignUnitOpen(true);
  };

  const handleConfrimRemoveQueue = (id) => {
    console.log(`Item removed with ID: ${id}`);
  };

  const handleConfirmQueue = (id) => {
    console.log(`Item is assign with ID: ${id}`);
    console.log(`Item is assign with ID: ${selectedAssignUnit}`);
  };

  // <--------------------------->
  // <----- PopupAssignUnit ----->
  const [avaiableUnitData, setAvailableUnitsData] = useState([]);
  const [selectedAssignUnit, setSelectedAssignUnit] = useState(null);
  const isFetchUnitAvailableData = useRef(false);

  const handleAssignUnitSelect = (event) => {
    setSelectedAssignUnit(event.target.value);
  };

  const handleAssignUnitConfirm = async (inqueueID, onClose) => {
    if (selectedAssignUnit) {
      const assignData = {
        requestId: inqueueID,
        unitId: selectedAssignUnit,
        weight: "",
      };

      try {
        const response = await createLaundryAssignment.setLaundryAssignment(
          userDetails.userId,
          assignData
        );

        if (!response.success) {
          toast.success(response.message);
          await fetchInQueueLaundry();
          await fetchUnitsData();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Error:", error);
      }
      onClose();
    } else {
      toast.error("Select a unit before proceeding");
    }
  };

  const fetchAvailableUnit = async () => {
    if (isFetchUnitAvailableData.current) return;

    try {
      const response = await viewUnitAvailable.getUnitAvailable(
        userDetails.storeId
      );
      if (response) {
        setAvailableUnitsData(response);
        isFetchUnitAvailableData.current = true;
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // <------------------------->

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

  // Open and Close
  const handleOpenInQueue = () => {
    setInQueue(true);
  };

  const handleCloseInQueue = () => {
    setInQueue(false);
  };

  useEffect(() => {
    // Filter units based on search term and filter status
    setFilteredUnits(
      unitsData
        .filter((unit) =>
          unit.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(
          (unit) => filterStatus === "" || unit.isUnitStatus === filterStatus
        )
    );
  }, [searchTerm, unitsData, filterStatus]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchUnitsData = useCallback(async () => {
    if (hasUnits.current) return;
    setLoading(true);
    if (!userDetails?.storeId) {
      setError("Store ID is undefined.");
      setLoading(false);
      return;
    }
    try {
      const response = await viewUnits.getUnitsList(userDetails.storeId);
      if (response.success) {
        setUnitsData(response.data);
      } else {
        setError("Failed to fetch units data.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [userDetails?.storeId]);

  // Fetch In Queue Service Request
  const fetchInQueueLaundry = async () => {
    if (hasFetchedCustomerRequestData.current) return;

    try {
      const response = await viewRequestInQueue.getRequestInQueue(
        userDetails.storeId
      );
      if (response) {
        setInQueueData(response);
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
    openInQueue,
    openInProgress,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus, // Added setter for filter status
    filteredUnits,
    unitsData,
    loading,
    error,
    handleOpenDialog,
    handleCloseDialog,
    handleOpenCustomerRequest,
    handleCloseCustomerRequest,
    handleOpenInQueue,
    handleCloseInQueue,
    handleOpenInProgress,
    handleCloseInProgress,
    handleSearchChange,
    fetchUnitsData,
    fetchInQueueLaundry,

    // <----- Counting Section ----->
    countInQueueData,
    fetchCountInQueue,

    // <----- PopupInQueue ----->
    dialogQueueOpen,
    dialogAssignUnitOpen,
    selectedQueueID,
    setDialogQueueOpen,
    setDialogAssignUnitOpen,
    handleDialogAssignUnit,
    handleDialogRemoveInQueue,
    handleConfrimRemoveQueue,
    handleConfirmQueue,

    // <----- PopupAssignUnit ----->
    avaiableUnitData,
    selectedAssignUnit,
    setSelectedAssignUnit,
    handleAssignUnitSelect,
    handleAssignUnitConfirm,
    fetchAvailableUnit,
    // <------------------------->

    userDetails,
    requestData,
    inQueueData,
  };
};

export default useUnitMonitor;

// const fetchCountInQueue = useCallback(async () => {
//   if (hasCountInQueue.current) return;
//   setLoading(true);
//   try {
//     const response = await getCountRequestInQueue.getCountInQueue(
//       userDetails.storeId
//     );
//     if (response && response.success) {
//       setCountInQueueData(response.data);
//       hasCountInQueue.current = true;
//     } else {
//       setError("Failed to fetch count data.");
//     }
//   } catch (error) {
//     setError(error.message);
//   } finally {
//     setLoading(false);
//   }
// }, [userDetails?.storeId]);

// const fetchCountInQueue = async () => {
//   if (hasCountInQueue.current) return;
//   try {
//     const response = await getCountRequestInQueue.getRequestInQueue(
//       userDetails.storeId
//     );
//     if (response && response.data) {
//       console.log("Data:" + response.data.count);
//       setCountInQueueData(response.data.count);
//     } else {
//       setError("Failed to fetch data");
//     }
//   } catch (error) {
//     setError(error.message || "An unexpected error occurred.");
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchUnitsData = async () => {
//   if (hasUnits.current) return;

//   if (!userDetails?.storeId) {
//     setError("Store ID is undefined.");
//     setLoading(false);
//     return;
//   }

//   try {
//     const response = await viewUnits.getUnitsList(userDetails.storeId);
//     if (response.success) {
//       setUnitsData(response.data); // Adjust if the data structure is different
//     } else {
//       setError("Failed to fetch units data.");
//     }
//   } catch (error) {
//     setError(error.message);
//   } finally {
//     setLoading(false);
//   }
// };

// const fetchCustomerRequestData = async () => {
//   if (hasFetchedCustomerRequestData.current) return;

//   try {
//     const response = await viewCustomerRequest.getCustomerRequest(
//       userDetails.storeId
//     );
//     if (response) {
//       setRequestData(response);
//       hasFetchedCustomerRequestData.current = true;
//     } else {
//       setError("Failed to fetch customer request data.");
//     }
//   } catch (error) {
//     setError(error.message || "An unexpected error occurred.");
//   } finally {
//     setLoading(false);
//   }
// };
