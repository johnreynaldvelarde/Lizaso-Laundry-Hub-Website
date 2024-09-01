import { useState, useRef } from "react";
import { viewStore } from "../../services/api/getApi";
import { useNavigate } from "react-router-dom";

const useCheckStartingPoint = () => {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const hasFetchedRef = useRef(false);

  // Step 1
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [country, setCountry] = useState("PH");
  const [region, setRegion] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Set 2

  const [selectedStore, setSelectedStore] = useState(null);
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

      // Log the store details to console
      response.data.forEach((store) => {
        console.log(`Store Name: ${store.store_name}`);
        console.log(
          `Store Address: ${store.address_line1}, ${store.address_line2}, ${store.city}, ${store.province}, ${store.postal_code}, ${store.country}`
        );
        console.log(`Latitude: ${store.latitude}`);
        console.log(`Longitude: ${store.longitude}`);
      });
    } catch (error) {
      console.error("Error fetching store data:", error);
      setLoading(false);
    }
  };

  return {
    storeData,
    loading,
    step,
    setStep,
    hasFetchedRef,

    // Step 1
    addressLine1,
    addressLine2,
    country,
    region,
    province,
    city,
    postalCode,
    setAddressLine1,
    setAddressLine2,
    setCountry,
    setRegion,
    setProvince,
    setCity,
    setPostalCode,

    // Step 2
    selectedStore,
    email,
    phoneNumber,
    setSelectedStore,
    setEmail,
    setPhoneNumber,

    //
    handleSubmitDetails,
    fetchStoreData,

    // Handle

    // Fetch Data
  };
};

export default useCheckStartingPoint;
