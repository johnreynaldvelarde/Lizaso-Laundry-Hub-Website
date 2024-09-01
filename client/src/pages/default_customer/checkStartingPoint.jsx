import React, { useState, useEffect } from "react";
import {
  countries,
  regions,
  provinces,
  cities,
} from "../../data/countrySelection";
import useCheckStartingPoint from "../../hooks/customers/useCheckStartingPoint";

const CheckStartingPoint = () => {
  const {
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
    setPostalCode,
    setAddressLine1,
    setAddressLine2,
    setCountry,
    setRegion,
    setProvince,
    setCity,

    // Step 2
    selectedStore,
    email,
    phoneNumber,
    setSelectedStore,
    setEmail,
    setPhoneNumber,

    // Fetch
    fetchStoreData,
  } = useCheckStartingPoint();

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchStoreData();
      hasFetchedRef.current = true;
    }
  }, [fetchStoreData]);

  const allStores = [
    { id: 1, name: "Store A", distance: "2 km" },
    { id: 2, name: "Store B", distance: "3.5 km" },
    { id: 3, name: "Store C", distance: "5 km" },
    { id: 4, name: "Store D", distance: "1 km" },
    { id: 5, name: "Store E", distance: "2.5 km" },
  ];

  // const parseDistance = (distance) => {
  //   if (typeof distance === "string") {
  //     return parseFloat(distance.replace(" km", ""));
  //   }
  //   console.warn("Expected a string for distance, got:", distance);
  //   return NaN;
  // };

  // const parseDistance = (distance) => parseFloat(distance.replace(" km", ""));

  const sortedStores = storeData;
  // .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
  // .slice(0, 20);

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

  // Submit Section
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (
      !addressLine1 ||
      !country ||
      !region ||
      !province ||
      !city ||
      !postalCode
    ) {
      alert("Please complete all address fields.");
      return;
    }
    // Proceed to the next step
    setStep(2);
  };

  const handleStoreSelection = (store) => {
    setSelectedStore(store);
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!email || !phoneNumber || !selectedStore) {
      alert("Please complete all details.");
      return;
    }
    // Process the form submission here
    alert(
      `Address: ${addressLine1}, ${addressLine2}, ${city}, ${province}, ${postalCode}, ${country}\n` +
        `Selected Store: ${selectedStore.store_name}\nEmail: ${email}\nPhone: ${phoneNumber}`
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleAddressSubmit}>
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Enter Your Address and Location
            </h1>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="addressLine1"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 mb-2"
                htmlFor="addressLine2"
              >
                Address Line 2
              </label>
              <input
                type="text"
                id="addressLine2"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="country">
                Country
              </label>
              <select
                id="country"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={country}
                onChange={handleCountryChange}
                required
              >
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {country && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="region">
                    Region
                  </label>
                  <select
                    id="region"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={region}
                    onChange={handleRegionChange}
                    disabled={!country}
                    required
                  >
                    <option value="">Select Region</option>
                    {regions[country]?.map((regionOption) => (
                      <option key={regionOption} value={regionOption}>
                        {regionOption}
                      </option>
                    ))}
                  </select>
                </div>
                {region && (
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 mb-2"
                      htmlFor="province"
                    >
                      Province
                    </label>
                    <select
                      id="province"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={province}
                      onChange={handleProvinceChange}
                      disabled={!region}
                      required
                    >
                      <option value="">Select Province</option>
                      {provinces[region]?.map((provinceOption) => (
                        <option key={provinceOption} value={provinceOption}>
                          {provinceOption}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {province && (
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="city">
                      City
                    </label>
                    <select
                      id="city"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={city}
                      onChange={handleCityChange}
                      disabled={!province}
                      required
                    >
                      <option value="">Select City</option>
                      {cities[province]?.map((cityOption) => (
                        <option key={cityOption} value={cityOption}>
                          {cityOption}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="postalCode">
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Continue
            </button>
          </form>
        )}
        {step === 2 && (
          <>
            <h1 className="text-xl font-semibold text-gray-800 mb-4">
              Select a Store
            </h1>
            <div className="overflow-y-auto max-h-96 scrollable p-1">
              <ul className="mb-6">
                {sortedStores.map((store) => (
                  <li
                    key={store.id}
                    className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
                      selectedStore?.id === store.id
                        ? "bg-blue-200"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleStoreSelection(store)}
                  >
                    <h2 className="text-lg font-semibold">
                      {store.store_name}
                    </h2>
                    <p className="text-sm">
                      {store.province &&
                        store.city &&
                        `${store.province}, ${store.city}`}
                      {store.province && !store.city && store.province}
                      {!store.province && store.city && store.city}
                    </p>
                    <p className="text-xs mt-1">{store.address_line1}</p>
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleDetailsSubmit}>
              <div className="mb-4 mt-5">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckStartingPoint;

{
  /* <div className="overflow-y-auto max-h-96 scrollable p-1">
              <ul className="mb-6">
                {sortedStores.map((store) => (
                  <li
                    key={store.id}
                    className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
                      selectedStore?.id === store.id
                        ? "bg-blue-200"
                        : "bg-gray-200"
                    }`}
                    onClick={() => handleStoreSelection(store)}
                  >
                    <h2 className="text-lg font-semibold">{store.name}</h2>
                    <p>{store.distance} away</p>
                  </li>
                ))}
              </ul>
            </div> */
}

// import React, { useState, useEffect } from "react";

// const countries = [
//   { code: "PH", name: "Philippines" },
//   { code: "TH", name: "Thailand" },
//   { code: "MY", name: "Malaysia" },
//   { code: "ID", name: "Indonesia" },
//   // Add more countries as needed
// ];

// const states = {
//   PH: ["Metro Manila", "Cebu", "Davao", "Iloilo"],
//   TH: ["Bangkok", "Chiang Mai", "Phuket"],
//   MY: ["Kuala Lumpur", "Penang", "Johor"],
//   ID: ["Jakarta", "Bali", "Surabaya"],
//   // Add more states as needed
// };

// const cities = {
//   "Metro Manila": ["Manila", "Quezon City", "Makati"],
//   Cebu: ["Cebu City", "Mandaue", "Lapu-Lapu"],
//   Davao: ["Davao City", "Panabo", "Tagum"],
//   Iloilo: ["Iloilo City", "Passi", "Leganes"],
//   Bangkok: ["Bangkok City"],
//   Chiang Mai: ["Chiang Mai City"],
//   Phuket: ["Phuket City"],
//   Kuala Lumpur: ["Kuala Lumpur City"],
//   Penang: ["George Town"],
//   Johor: ["Johor Bahru"],
//   Jakarta: ["Jakarta City"],
//   Bali: ["Denpasar"],
//   Surabaya: ["Surabaya City"],
//   // Add more cities as needed
// };

// const CheckStartingPoint = () => {
//   const allStores = [
//     { id: 1, name: "Store A", distance: "2 km" },
//     { id: 2, name: "Store B", distance: "3.5 km" },
//     { id: 3, name: "Store C", distance: "5 km" },
//     { id: 4, name: "Store D", distance: "1 km" },
//     { id: 5, name: "Store E", distance: "2.5 km" },
//   ];

//   // Function to parse distance string to number
//   const parseDistance = (distance) => parseFloat(distance.replace(" km", ""));

//   // Sort and limit stores
//   const sortedStores = allStores
//     .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
//     .slice(0, 20);

//   const [addressLine1, setAddressLine1] = useState("");
//   const [addressLine2, setAddressLine2] = useState("");
//   const [country, setCountry] = useState("PH");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [postalCode, setPostalCode] = useState("");
//   const [selectedStore, setSelectedStore] = useState(null);
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [step, setStep] = useState(1);

//   const handleCountryChange = (e) => {
//     const selectedCountry = e.target.value;
//     setCountry(selectedCountry);
//     setState("");
//     setCity("");
//   };

//   const handleStateChange = (e) => {
//     setState(e.target.value);
//     setCity("");
//   };

//   const handleCityChange = (e) => {
//     setCity(e.target.value);
//   };

//   const handleAddressSubmit = (e) => {
//     e.preventDefault();
//     if (!addressLine1 || !country || !state || !city || !postalCode) {
//       alert("Please complete all address fields.");
//       return;
//     }
//     // Proceed to the next step
//     setStep(2);
//   };

//   const handleStoreSelection = (store) => {
//     setSelectedStore(store);
//   };

//   const handleDetailsSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !phoneNumber || !selectedStore) {
//       alert("Please complete all details.");
//       return;
//     }
//     // Process the form submission here
//     alert(
//       `Address: ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}\n` +
//         `Selected Store: ${selectedStore.name}\nEmail: ${email}\nPhone: ${phoneNumber}`
//     );
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         {step === 1 && (
//           <form onSubmit={handleAddressSubmit}>
//             <h1 className="text-xl font-semibold text-gray-800 mb-4">
//               Enter Your Address and Location
//             </h1>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="addressLine1"
//               >
//                 Address Line 1
//               </label>
//               <input
//                 type="text"
//                 id="addressLine1"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={addressLine1}
//                 onChange={(e) => setAddressLine1(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 mb-2"
//                 htmlFor="addressLine2"
//               >
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 id="addressLine2"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={addressLine2}
//                 onChange={(e) => setAddressLine2(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2" htmlFor="country">
//                 Country
//               </label>
//               <select
//                 id="country"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={country}
//                 onChange={handleCountryChange}
//                 required
//               >
//                 {countries.map((country) => (
//                   <option key={country.code} value={country.code}>
//                     {country.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {country && (
//               <>
//                 <div className="mb-4">
//                   <label className="block text-gray-700 mb-2" htmlFor="state">
//                     State
//                   </label>
//                   <select
//                     id="state"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     value={state}
//                     onChange={handleStateChange}
//                     disabled={!country}
//                     required
//                   >
//                     <option value="">Select State</option>
//                     {states[country]?.map((stateOption) => (
//                       <option key={stateOption} value={stateOption}>
//                         {stateOption}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 {state && (
//                   <div className="mb-4">
//                     <label className="block text-gray-700 mb-2" htmlFor="city">
//                       City
//                     </label>
//                     <select
//                       id="city"
//                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       value={city}
//                       onChange={handleCityChange}
//                       disabled={!state}
//                       required
//                     >
//                       <option value="">Select City</option>
//                       {cities[state]?.map((cityOption) => (
//                         <option key={cityOption} value={cityOption}>
//                           {cityOption}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 )}
//               </>
//             )}
//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2" htmlFor="postalCode">
//                 Postal Code
//               </label>
//               <input
//                 type="text"
//                 id="postalCode"
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={postalCode}
//                 onChange={(e) => setPostalCode(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//             >
//               Continue
//             </button>
//           </form>
//         )}

//         {step === 2 && (
//           <>
//             <h1 className="text-xl font-semibold text-gray-800 mb-4">
//               Select a Store
//             </h1>
//             <div className="overflow-y-auto max-h-96 scrollable p-1">
//               <ul className="mb-6">
//                 {sortedStores.map((store) => (
//                   <li
//                     key={store.id}
//                     className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
//                       selectedStore?.id === store.id
//                         ? "bg-blue-200"
//                         : "bg-gray-200"
//                     }`}
//                     onClick={() => handleStoreSelection(store)}
//                   >
//                     <h2 className="text-lg font-semibold">{store.name}</h2>
//                     <p>{store.distance} away</p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <form onSubmit={handleDetailsSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2" htmlFor="email">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
//                   Phone Number
//                 </label>
//                 <input
//                   type="text"
//                   id="phoneNumber"
//                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//               >
//                 Submit
//               </button>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CheckStartingPoint;
