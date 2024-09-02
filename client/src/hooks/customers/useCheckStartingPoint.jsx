import { useState, useRef, useEffect } from "react";
import useAuth from "../../contexts/AuthContext";
import { viewStore } from "../../services/api/getApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Function to fetch latitude and longitude from an address using Nominatim API
const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      address
    )}`
  );
  const data = await response.json();
  if (data.length > 0) {
    const location = data[0];
    return { lat: location.lat, lng: location.lon };
  }
  return null;
};

const useCheckStartingPoint = () => {
  const { userDetails } = useAuth();
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

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setRegion("");
    setCity("");
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setProvince("");
    setCity("");
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setCity("");
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      console.log("Lat: " + latitude + " Lon: " + longitude);
    }
  }, [latitude, longitude]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (
      !addressLine1 ||
      !country ||
      !region ||
      !province ||
      !city ||
      !postalCode
    ) {
      toast.error("Please complete all fields.");
      return;
    }

    const address = `${addressLine1}, ${
      addressLine2 ? addressLine2 + ", " : ""
    }${city}, ${province}, ${postalCode}, ${country}`;
    const location = await geocodeAddress(address);

    if (location) {
      console.log("1");
      setLatitude(location.lat);
      setLongitude(location.lng);
      setStep(2);
    } else {
      // Address not found, use browser geolocation
      if (navigator.geolocation) {
        console.log("2");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            console.log(`Latitude: ${position.coords.latitude}`);
            console.log(`Longitude: ${position.coords.longitude}`);
            setStep(2);
          },
          (error) => {
            console.error("Error getting location:", error);
            toast.error("Unable to get your location.");
          }
        );
      } else {
        toast.error("Geolocation is not supported by this browser.");
      }
    }
    setStep(2);
  };

  // Set 2

  const [selectedStore, setSelectedStore] = useState(null);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleStoreSelection = (store) => {
    setSelectedStore(store);
  };

  const handleSubmitDetails = async (e) => {
    e.preventDefault();
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStore) {
      alert("Please select a store.");
      return;
    }

    try {
      const storeId = selectedStore.id;
      const response = await updateCustomer.updateCustomer({
        store_id: storeId,
        c_email: email,
        c_number: phoneNumber,
        address_line1: addressLine1,
        address_line2: addressLine2,
        country: country,
        province: province,
        city: city,
        postal_code: postalCode,
        country: country,
        latitude: latitude,
        longitude: longitude,
      });

      if (response.success) {
        console.log("Customer details updated successfully.");
      } else {
        console.error("Failed to update customer details.");
      }
    } catch (error) {
      console.error("Error updating customer details:", error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degrees) => (degrees * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance.toFixed(1);
  };

  const fetchStoreData = async () => {
    try {
      if (latitude === null || longitude === null) {
        console.error("Latitude or Longitude is not set.");
        return;
      }

      const response = await viewStore.getStoreList({});
      const storeList = response.data
        .map((store) => {
          const storeLat = parseFloat(store.latitude);
          const storeLon = parseFloat(store.longitude);

          // Check if storeLat and storeLon are valid numbers
          if (isNaN(storeLat) || isNaN(storeLon)) {
            console.error(
              "Invalid store coordinates:",
              store.latitude,
              store.longitude
            );
            return null;
          }

          const distance = calculateDistance(
            parseFloat(latitude),
            parseFloat(longitude),
            storeLat,
            storeLon
          );

          return { ...store, distance };
        })
        .filter((store) => store !== null); // Filter out any null entries

      // Sort stores by distance
      storeList.sort((a, b) => a.distance - b.distance);

      setStoreData(storeList);
      setLoading(false);
      console.log(storeList);
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
    latitude,
    longitude,

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
    handleCountryChange,
    handleRegionChange,
    handleProvinceChange,
    handleCityChange,
    handleAddressSubmit,

    // Step 2
    selectedStore,
    email,
    phoneNumber,
    setSelectedStore,
    setEmail,
    setPhoneNumber,
    handleStoreSelection,

    //
    handleSubmitDetails,
    handleDetailsSubmit,
    fetchStoreData,
  };
};

export default useCheckStartingPoint;

// Process the form submission here
// alert(
//   `Address: ${addressLine1}, ${addressLine2}, ${city}, ${province}, ${postalCode}, ${country}\n` +
//     `Selected Store: ${selectedStore.store_name}\nEmail: ${email}\nPhone: ${phoneNumber}`
// );

// const fetchLocationFromOpenWeather = async () => {
//   const apiKey = "your_openweather_api_key"; // Replace with your OpenWeather API key
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`
//   );
//   const data = await response.json();
//   if (data && data.coord) {
//     return {
//       lat: data.coord.lat,
//       lng: data.coord.lon,
//     };
//   }
//   return null;
// };

// else {
//   // Address not found, use browser geolocation and OpenWeather API
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);
//         console.log(position);
//         console.log(`Browser Latitude: ${position.coords.latitude}`);
//         console.log(`Browser Longitude: ${position.coords.longitude}`);
//         setStep(2);
//       },
//       async (error) => {
//         console.error("Error getting location:", error);
//         toast.error(
//           "Unable to get your location via browser. Trying IP-based location..."
//         );

//         // Fallback to OpenWeather API if geolocation fails
//         const ipLocation = await fetchLocationFromOpenWeather();
//         if (ipLocation) {
//           setLatitude(ipLocation.lat);
//           setLongitude(ipLocation.lng);
//           console.log(`IP-based Latitude: ${ipLocation.lat}`);
//           console.log(`IP-based Longitude: ${ipLocation.lng}`);
//           setStep(2);
//         } else {
//           toast.error("Unable to get your location.");
//         }
//       }
//     );
//   } else {
//     toast.error("Geolocation is not supported by this browser.");
//   }
// }

// const fetchStoreData = async () => {
//   try {
//     if (latitude === null || longitude === null) {
//       console.error("Latitude or Longitude is not set.");
//       return;
//     }

//     const response = await viewStore.getStoreList({});
//     const storeList = response.data.map((store) => {
//       const distance = calculateDistance(
//         parseFloat(latitude),
//         parseFloat(longitude),
//         parseFloat(store.latitude), // assuming stores have latitude and longitude fields
//         parseFloat(store.longitude)
//       );
//       return { ...store, distance };
//     });

//     // Sort stores by distance
//     storeList.sort((a, b) => a.distance - b.distance);

//     setStoreData(storeList);
//     setLoading(false);
//     console.log(storeList);
//   } catch (error) {
//     console.error("Error fetching store data:", error);
//     setLoading(false);
//   }
// };
// const response = await viewStore.getStoreList({});
// setStoreData(response.data);
// setLoading(false);
