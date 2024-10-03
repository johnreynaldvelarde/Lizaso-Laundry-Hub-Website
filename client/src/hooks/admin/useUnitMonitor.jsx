import React, { useEffect, useState, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import useAuth from "../../contexts/AuthContext";
import {
  viewUnits,
  viewRequestInQueue,
  viewUnitAvailable,
  getCountRequestInQueue,
  getAssignmentInProgress,
  getCountLaundryAssignment,
} from "../../services/api/getApi";
import { createLaundryAssignment } from "../../services/api/postApi";
import {
  updateRemoveAssignment,
  updateRemoveInQueue,
} from "../../services/api/putApi";

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

  // <----- COUNTING SECTION ----->
  const [countInQueueData, setCountInQueueData] = useState(null);
  const [countAssignmentData, setCountAssignmentData] = useState({
    count_in_progress: 0,
    count_completed: 0,
    count_canceled: 0,
  });
  const hasCountAssignment = useRef(false);
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

  const fetchCountLaundryAssignment = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCountLaundryAssignment.getCountAssignment(
        userDetails.storeId
      );

      if (response) {
        setCountAssignmentData({
          count_in_progress: Number(response.count_in_progress),
          count_completed: Number(response.count_completed),
          count_canceled: Number(response.count_canceled),
        });
      } else {
        setError("Failed to fetch count data.");
      }
    } catch (error) {
      console.error("Error fetching count data:", error);
      setError(error.message || "An error occurred while fetching count data.");
    } finally {
      setLoading(false);
    }
  }, [userDetails?.storeId]);

  // <--------------------------->

  // <----- DRAWER INPROGRESS SECTION ----->
  const [inProgressData, setInProgressData] = useState([]);
  const [dialogProgressOpen, setDialogProgressOpen] = useState(false);
  const [selectedProgressID, setSelectedProgressId] = useState(null);
  const [onSuccessCallback, setOnSuccessCallback] = useState(null);
  const hasInProgress = useRef(false);

  const handleDialogRemoveInProgress = (id, onSuccess) => {
    setSelectedProgressId(id);
    setDialogProgressOpen(true);
    setOnSuccessCallback(() => onSuccess);
  };

  const handleConfirmRemoveInProgress = async (id) => {
    if (id) {
      try {
        const response = await updateRemoveAssignment.putAssignment(id);
        if (!response.success) {
          toast.success(response.message);
          if (onSuccessCallback) {
            onSuccessCallback();
          }
        } else {
          toast.error(response.message);
          console.log("Error message from API:", response.message);
        }
      } catch (error) {
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      }
    } else {
      toast.error("Select an assignment before proceeding");
    }
  };

  const handleConfirmInProgress = async (id) => {
    setLoading(true);
    console.log(`Item is assign with ID: ${id}`);
    setLoading(false);
  };

  const fetchInProgress = useCallback(async () => {
    if (hasInProgress.current) return;
    setLoading(true);
    try {
      const response = await getAssignmentInProgress.getInProgress(
        userDetails.storeId
      );

      if (response) {
        setInProgressData(response);
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

  //  <----- POPUPINQUEUE SECTION ----->
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

  const handleConfrimRemoveQueue = async (id) => {
    if (id) {
      try {
        const response = await updateRemoveInQueue.putRemoveInQueue(id);

        if (response.success) {
          toast.error(response.message);
        } else {
          toast.success(response.message);
        }
      } catch (error) {
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      }
      // onClose();
    } else {
      // Handle case when no assignment is selected
      toast.error("Select an assignment before proceeding");
    }
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
    countAssignmentData,
    fetchCountInQueue,
    fetchCountLaundryAssignment,

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
    // <----- Drawer InProgress Section ----->
    inQueueData,
    inProgressData,
    dialogProgressOpen,
    selectedProgressID,
    setDialogProgressOpen,
    fetchInProgress,
    handleDialogRemoveInProgress,
    handleConfirmRemoveInProgress,
    handleConfirmInProgress,
    // <------------------------->

    userDetails,
    requestData,
    inQueueData,
  };
};

export default useUnitMonitor;

// const handleConfirmRemoveInProgress = async (id, onSuccess) => {
//   if (id) {
//     try {
//       const response = await updateRemoveAssignment.putAssignment(id);

//       if (response.success) {
//         toast.error(response.message);
//         if (onSuccess) onSuccess();
//       } else {
//         toast.success(response.message);
//       }
//     } catch (error) {
//       toast.error(`Error: ${error.message || "Something went wrong"}`);
//     }
//     // onClose();
//   } else {
//     // Handle case when no assignment is selected
//     toast.error("Select an assignment before proceeding");
//   }
// };

// const fetchCountLaundryAssignment = useCallback(async () => {
//   console.log(
//     "Has Count Assignment Before Fetch:",
//     hasCountAssignment.current
//   );
//   if (hasCountAssignment.current) return;
//   console.log("Fetching count assignment...");
//   setLoading(true);
//   try {
//     const response = await getCountLaundryAssignment.getCountAssignment(
//       userDetails.storeId
//     );

//     console.log("API Response Data:", response);

//     if (response) {
//       setCountAssignmentData({
//         count_in_progress: Number(response.count_in_progress),
//         count_completed: Number(response.count_completed),
//         count_canceled: Number(response.count_canceled),
//       });
//       hasCountAssignment.current = true;
//     } else {
//       console.error("No response data received.");
//       setError("Failed to fetch count data.");
//     }
//   } catch (error) {
//     console.error("Error fetching count data:", error);
//     setError(error.message || "An error occurred while fetching count data.");
//   } finally {
//     setLoading(false);
//   }
// }, [userDetails?.storeId]);

// const fetchCountLaundryAssignment = useCallback(async () => {
//   if (hastCountAssignment.current) return;
//   console.log("Okay");
//   setLoading(true);
//   try {
//     const response = await getCountLaundryAssignment.getCountAssignment(
//       userDetails.storeId
//     );

//     if (response) {
//       setCountAssignmentData({
//         count_in_progress: Number(response.count_in_progress),
//         count_completed: Number(response.count_completed),
//         count_canceled: Number(response.count_canceled),
//       });
//       hastCountAssignment.current = true;
//     } else {
//       setError("Failed to fetch count data.");
//     }
//   } catch (error) {
//     setError(error.message || "An error occurred while fetching count data.");
//   } finally {
//     setLoading(false);
//   }
// }, [userDetails?.storeId]);

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
