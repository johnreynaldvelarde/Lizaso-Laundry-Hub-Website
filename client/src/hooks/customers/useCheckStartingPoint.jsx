import { useState } from "react";
import { viewStore } from "../../services/api/getApi";
import { useNavigate } from "react-router-dom";

const useCheckStartingPoint = () => {
  // Step 1
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("PH");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  // Set 2
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
  };

  const fetchStoreData = async () => {
    try {
      const response = await viewStore.getStoreList({});
      setStoreData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return {
    // Step 1
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    postalCode,
    setPostalCode,

    // Step 2
    storeData,
    loading,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    handleSubmitDetails,
    fetchStoreData,

    // Handle

    // Fetch Data
  };
};

export default useCheckStartingPoint;
