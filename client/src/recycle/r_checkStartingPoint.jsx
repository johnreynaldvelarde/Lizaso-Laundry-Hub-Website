// // // // import React, { useState, useEffect } from "react";

// // // // const CheckStartingPoint = () => {
// // // //   const allStores = [
// // // //     { id: 1, name: "Store A", distance: "2 km" },
// // // //     { id: 2, name: "Store B", distance: "3.5 km" },
// // // //     { id: 3, name: "Store C", distance: "5 km" },
// // // //     { id: 4, name: "Store D", distance: "1 km" },
// // // //     { id: 5, name: "Store E", distance: "2.5 km" },
// // // //   ];

// // // //   // Function to parse distance string to number
// // // //   const parseDistance = (distance) => {
// // // //     return parseFloat(distance.replace(" km", ""));
// // // //   };

// // // //   // Sort and limit stores
// // // //   const sortedStores = allStores
// // // //     .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
// // // //     .slice(0, 20);

// // // //   const [location, setLocation] = useState("");
// // // //   const [selectedStore, setSelectedStore] = useState(null);
// // // //   const [email, setEmail] = useState("");
// // // //   const [phoneNumber, setPhoneNumber] = useState("");
// // // //   const [step, setStep] = useState(1);

// // // //   const getUserLocation = () => {
// // // //     if (navigator.geolocation) {
// // // //       navigator.geolocation.getCurrentPosition(
// // // //         (position) => {
// // // //           const { latitude, longitude } = position.coords;
// // // //           const locationText = `Lat: ${latitude}, Long: ${longitude}`;
// // // //           setLocation(locationText);
// // // //         },
// // // //         (error) => {
// // // //           console.error("Error getting user location:", error);
// // // //           setLocation("Unable to retrieve location");
// // // //           console.log("Location set in state: Unable to retrieve location");
// // // //         }
// // // //       );
// // // //     } else {
// // // //       alert("Geolocation is not supported by your browser.");
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     getUserLocation(); // Automatically get the user's location on component mount
// // // //   }, []);

// // // //   const handleLocationSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     if (!location) {
// // // //       alert("Please enter your location.");
// // // //       return;
// // // //     }
// // // //     // Proceed to the next step
// // // //     setStep(2);
// // // //   };

// // // //   const handleStoreSelection = (store) => {
// // // //     setSelectedStore(store);
// // // //   };

// // // //   const handleDetailsSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     if (!email || !phoneNumber) {
// // // //       alert("Please complete your details.");
// // // //       return;
// // // //     }
// // // //     // Process the form submission here
// // // //     alert(
// // // //       `Location: ${location}\nSelected Store: ${selectedStore.name}\nEmail: ${email}\nPhone: ${phoneNumber}`
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// // // //         {step === 1 && (
// // // //           <form onSubmit={handleLocationSubmit}>
// // // //             <h1 className="text-xl font-semibold text-gray-800 mb-4">
// // // //               Enter Your Location
// // // //             </h1>
// // // //             <div className="mb-4">
// // // //               <label className="block text-gray-700 mb-2" htmlFor="location">
// // // //                 Location
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 id="location"
// // // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                 value={location}
// // // //                 onChange={(e) => setLocation(e.target.value)}
// // // //                 required
// // // //                 readOnly // Make it read-only since we're auto-filling the location
// // // //               />
// // // //             </div>
// // // //             <button
// // // //               type="submit"
// // // //               className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
// // // //             >
// // // //               Next
// // // //             </button>
// // // //           </form>
// // // //         )}

// // // //         {step === 2 && (
// // // //           <>
// // // //             <h1 className="text-xl font-semibold text-gray-800 mb-4">
// // // //               Select a Store
// // // //             </h1>
// // // //             <div className="overflow-y-auto max-h-96 scrollable p-1">
// // // //               <ul className="mb-6">
// // // //                 {sortedStores.map((store) => (
// // // //                   <li
// // // //                     key={store.id}
// // // //                     className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
// // // //                       selectedStore?.id === store.id
// // // //                         ? "bg-blue-200"
// // // //                         : "bg-gray-200"
// // // //                     }`}
// // // //                     onClick={() => handleStoreSelection(store)}
// // // //                   >
// // // //                     <div className="flex justify-between">
// // // //                       <span>{store.name}</span>
// // // //                       <span>{store.distance}</span>
// // // //                     </div>
// // // //                   </li>
// // // //                 ))}
// // // //               </ul>
// // // //             </div>

// // // //             {selectedStore && (
// // // //               <form onSubmit={handleDetailsSubmit}>
// // // //                 <div className="mb-4 mt-3">
// // // //                   <label className="block text-gray-700 mb-2" htmlFor="email">
// // // //                     Email Address
// // // //                   </label>
// // // //                   <input
// // // //                     type="email"
// // // //                     id="email"
// // // //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                     value={email}
// // // //                     onChange={(e) => setEmail(e.target.value)}
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //                 <div className="mb-4">
// // // //                   <label
// // // //                     className="block text-gray-700 mb-2"
// // // //                     htmlFor="phoneNumber"
// // // //                   >
// // // //                     Phone Number
// // // //                   </label>
// // // //                   <input
// // // //                     type="tel"
// // // //                     id="phoneNumber"
// // // //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //                     value={phoneNumber}
// // // //                     onChange={(e) => setPhoneNumber(e.target.value)}
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //                 <button
// // // //                   type="submit"
// // // //                   className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
// // // //                 >
// // // //                   Complete Details
// // // //                 </button>
// // // //               </form>
// // // //             )}
// // // //           </>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default CheckStartingPoint;
// // // import React, { useState, useEffect } from "react";

// // // const CheckStartingPoint = () => {
// // //   const allStores = [
// // //     { id: 1, name: "Store A", distance: "2 km" },
// // //     { id: 2, name: "Store B", distance: "3.5 km" },
// // //     { id: 3, name: "Store C", distance: "5 km" },
// // //     { id: 4, name: "Store D", distance: "1 km" },
// // //     { id: 5, name: "Store E", distance: "2.5 km" },
// // //   ];

// // //   // Function to parse distance string to number
// // //   const parseDistance = (distance) => parseFloat(distance.replace(" km", ""));

// // //   // Sort and limit stores
// // //   const sortedStores = allStores
// // //     .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
// // //     .slice(0, 20);

// // //   const [addressLine1, setAddressLine1] = useState("");
// // //   const [addressLine2, setAddressLine2] = useState("");
// // //   const [city, setCity] = useState("");
// // //   const [state, setState] = useState("");
// // //   const [postalCode, setPostalCode] = useState("");
// // //   const [country, setCountry] = useState("");
// // //   const [latitude, setLatitude] = useState("");
// // //   const [longitude, setLongitude] = useState("");
// // //   const [selectedStore, setSelectedStore] = useState(null);
// // //   const [email, setEmail] = useState("");
// // //   const [phoneNumber, setPhoneNumber] = useState("");
// // //   const [step, setStep] = useState(1);

// // //   const getUserLocation = () => {
// // //     if (navigator.geolocation) {
// // //       navigator.geolocation.getCurrentPosition(
// // //         (position) => {
// // //           const { latitude, longitude } = position.coords;
// // //           setLatitude(latitude);
// // //           setLongitude(longitude);
// // //         },
// // //         (error) => {
// // //           console.error("Error getting user location:", error);
// // //           setLatitude("");
// // //           setLongitude("");
// // //           setAddressLine1("Unable to retrieve location");
// // //           setAddressLine2("");
// // //         }
// // //       );
// // //     } else {
// // //       alert("Geolocation is not supported by your browser.");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     getUserLocation(); // Automatically get the user's location on component mount
// // //   }, []);

// // //   const handleAddressSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!addressLine1 || !latitude || !longitude) {
// // //       alert("Please complete your address and retrieve location.");
// // //       return;
// // //     }
// // //     // Proceed to the next step
// // //     setStep(2);
// // //   };

// // //   const handleStoreSelection = (store) => {
// // //     setSelectedStore(store);
// // //   };

// // //   const handleDetailsSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (!email || !phoneNumber || !selectedStore) {
// // //       alert("Please complete all details.");
// // //       return;
// // //     }
// // //     // Process the form submission here
// // //     alert(
// // //       `Address: ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}\n` +
// // //         `Selected Store: ${selectedStore.name}\nEmail: ${email}\nPhone: ${phoneNumber}`
// // //     );
// // //   };

// // //   return (
// // //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// // //         {step === 1 && (
// // //           <form onSubmit={handleAddressSubmit}>
// // //             <h1 className="text-xl font-semibold text-gray-800 mb-4">
// // //               Enter Your Address and Location
// // //             </h1>
// // //             <div className="mb-4">
// // //               <label
// // //                 className="block text-gray-700 mb-2"
// // //                 htmlFor="addressLine1"
// // //               >
// // //                 Address Line 1
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="addressLine1"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={addressLine1}
// // //                 onChange={(e) => setAddressLine1(e.target.value)}
// // //                 required
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label
// // //                 className="block text-gray-700 mb-2"
// // //                 htmlFor="addressLine2"
// // //               >
// // //                 Address Line 2
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="addressLine2"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={addressLine2}
// // //                 onChange={(e) => setAddressLine2(e.target.value)}
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 mb-2" htmlFor="city">
// // //                 City
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="city"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={city}
// // //                 onChange={(e) => setCity(e.target.value)}
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 mb-2" htmlFor="state">
// // //                 State
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="state"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={state}
// // //                 onChange={(e) => setState(e.target.value)}
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 mb-2" htmlFor="postalCode">
// // //                 Postal Code
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="postalCode"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={postalCode}
// // //                 onChange={(e) => setPostalCode(e.target.value)}
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 mb-2" htmlFor="country">
// // //                 Country
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="country"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={country}
// // //                 onChange={(e) => setCountry(e.target.value)}
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 mb-2" htmlFor="latitude">
// // //                 Latitude
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="latitude"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={latitude}
// // //                 readOnly
// // //               />
// // //             </div>
// // //             <div className="mb-4">
// // //               <label className="block text-gray-700 mb-2" htmlFor="longitude">
// // //                 Longitude
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 id="longitude"
// // //                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                 value={longitude}
// // //                 readOnly
// // //               />
// // //             </div>
// // //             <button
// // //               type="submit"
// // //               className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
// // //             >
// // //               Continue
// // //             </button>
// // //           </form>
// // //         )}

// // //         {step === 2 && (
// // //           <>
// // //             <h1 className="text-xl font-semibold text-gray-800 mb-4">
// // //               Select a Store
// // //             </h1>
// // //             <div className="overflow-y-auto max-h-96 scrollable p-1">
// // //               <ul className="mb-6">
// // //                 {sortedStores.map((store) => (
// // //                   <li
// // //                     key={store.id}
// // //                     className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
// // //                       selectedStore?.id === store.id
// // //                         ? "bg-blue-200"
// // //                         : "bg-gray-200"
// // //                     }`}
// // //                     onClick={() => handleStoreSelection(store)}
// // //                   >
// // //                     <div className="flex justify-between">
// // //                       <span>{store.name}</span>
// // //                       <span>{store.distance}</span>
// // //                     </div>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>

// // //             {selectedStore && (
// // //               <form onSubmit={handleDetailsSubmit}>
// // //                 <div className="mb-4 mt-3">
// // //                   <label className="block text-gray-700 mb-2" htmlFor="email">
// // //                     Email Address
// // //                   </label>
// // //                   <input
// // //                     type="email"
// // //                     id="email"
// // //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div className="mb-4">
// // //                   <label
// // //                     className="block text-gray-700 mb-2"
// // //                     htmlFor="phoneNumber"
// // //                   >
// // //                     Phone Number
// // //                   </label>
// // //                   <input
// // //                     type="tel"
// // //                     id="phoneNumber"
// // //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //                     value={phoneNumber}
// // //                     onChange={(e) => setPhoneNumber(e.target.value)}
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <button
// // //                   type="submit"
// // //                   className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
// // //                 >
// // //                   Complete Details
// // //                 </button>
// // //               </form>
// // //             )}
// // //           </>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CheckStartingPoint;
// // import React, { useState, useEffect } from "react";

// // const CheckStartingPoint = () => {
// //   const allStores = [
// //     { id: 1, name: "Store A", distance: "2 km" },
// //     { id: 2, name: "Store B", distance: "3.5 km" },
// //     { id: 3, name: "Store C", distance: "5 km" },
// //     { id: 4, name: "Store D", distance: "1 km" },
// //     { id: 5, name: "Store E", distance: "2.5 km" },
// //   ];

// //   // Function to parse distance string to number
// //   const parseDistance = (distance) => parseFloat(distance.replace(" km", ""));

// //   // Sort and limit stores
// //   const sortedStores = allStores
// //     .sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
// //     .slice(0, 20);

// //   const [addressLine1, setAddressLine1] = useState("");
// //   const [addressLine2, setAddressLine2] = useState("");
// //   const [city, setCity] = useState("");
// //   const [state, setState] = useState("");
// //   const [postalCode, setPostalCode] = useState("");
// //   const [country, setCountry] = useState("");
// //   const [latitude, setLatitude] = useState("");
// //   const [longitude, setLongitude] = useState("");
// //   const [selectedStore, setSelectedStore] = useState(null);
// //   const [email, setEmail] = useState("");
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [step, setStep] = useState(1);

// //   const getUserLocation = () => {
// //     if (navigator.geolocation) {
// //       navigator.geolocation.getCurrentPosition(
// //         (position) => {
// //           const { latitude, longitude } = position.coords;
// //           setLatitude(latitude);
// //           setLongitude(longitude);
// //         },
// //         (error) => {
// //           console.error("Error getting user location:", error);
// //           setLatitude("");
// //           setLongitude("");
// //           setAddressLine1("Unable to retrieve location");
// //           setAddressLine2("");
// //         }
// //       );
// //     } else {
// //       alert("Geolocation is not supported by your browser.");
// //     }
// //   };

// //   useEffect(() => {
// //     getUserLocation(); // Automatically get the user's location on component mount
// //   }, []);

// //   const handleAddressSubmit = (e) => {
// //     e.preventDefault();
// //     if (!addressLine1 || !latitude || !longitude) {
// //       alert("Please complete your address and retrieve location.");
// //       return;
// //     }
// //     // Proceed to the next step
// //     setStep(2);
// //   };

// //   const handleStoreSelection = (store) => {
// //     setSelectedStore(store);
// //   };

// //   const handleDetailsSubmit = (e) => {
// //     e.preventDefault();
// //     if (!email || !phoneNumber || !selectedStore) {
// //       alert("Please complete all details.");
// //       return;
// //     }
// //     // Process the form submission here
// //     alert(
// //       `Address: ${addressLine1}, ${addressLine2}, ${city}, ${state}, ${postalCode}, ${country}\n` +
// //         `Selected Store: ${selectedStore.name}\nEmail: ${email}\nPhone: ${phoneNumber}`
// //     );
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
// //         {step === 1 && (
// //           <form onSubmit={handleAddressSubmit}>
// //             <h1 className="text-xl font-semibold text-gray-800 mb-4">
// //               Enter Your Address and Location
// //             </h1>

// //             {/* Address Inputs */}
// //             <div className="space-y-4 mb-6">
// //               <div>
// //                 <label
// //                   className="block text-gray-700 mb-2"
// //                   htmlFor="addressLine1"
// //                 >
// //                   Address Line 1
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="addressLine1"
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={addressLine1}
// //                   onChange={(e) => setAddressLine1(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <label
// //                   className="block text-gray-700 mb-2"
// //                   htmlFor="addressLine2"
// //                 >
// //                   Address Line 2
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="addressLine2"
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={addressLine2}
// //                   onChange={(e) => setAddressLine2(e.target.value)}
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 mb-2" htmlFor="country">
// //                   Country
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="country"
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={country}
// //                   onChange={(e) => setCountry(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               {/* Conditionally Render City, State, Postal Code */}
// //               {country && (
// //                 <>
// //                   <div>
// //                     <label className="block text-gray-700 mb-2" htmlFor="city">
// //                       City
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="city"
// //                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       value={city}
// //                       onChange={(e) => setCity(e.target.value)}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-gray-700 mb-2" htmlFor="state">
// //                       State
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="state"
// //                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       value={state}
// //                       onChange={(e) => setState(e.target.value)}
// //                     />
// //                   </div>
// //                   <div>
// //                     <label
// //                       className="block text-gray-700 mb-2"
// //                       htmlFor="postalCode"
// //                     >
// //                       Postal Code
// //                     </label>
// //                     <input
// //                       type="text"
// //                       id="postalCode"
// //                       className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                       value={postalCode}
// //                       onChange={(e) => setPostalCode(e.target.value)}
// //                     />
// //                   </div>
// //                 </>
// //               )}
// //               <div>
// //                 <label className="block text-gray-700 mb-2" htmlFor="latitude">
// //                   Latitude
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="latitude"
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={latitude}
// //                   readOnly
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-gray-700 mb-2" htmlFor="longitude">
// //                   Longitude
// //                 </label>
// //                 <input
// //                   type="text"
// //                   id="longitude"
// //                   className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                   value={longitude}
// //                   readOnly
// //                 />
// //               </div>
// //             </div>

// //             <button
// //               type="submit"
// //               className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
// //             >
// //               Continue
// //             </button>
// //           </form>
// //         )}

// //         {step === 2 && (
// //           <>
// //             <h1 className="text-xl font-semibold text-gray-800 mb-4">
// //               Select a Store
// //             </h1>
// //             <div className="overflow-y-auto max-h-96 p-1">
// //               <ul className="mb-6">
// //                 {sortedStores.map((store) => (
// //                   <li
// //                     key={store.id}
// //                     className={`p-4 mb-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
// //                       selectedStore?.id === store.id
// //                         ? "bg-blue-200"
// //                         : "bg-gray-200"
// //                     }`}
// //                     onClick={() => handleStoreSelection(store)}
// //                   >
// //                     <div className="flex justify-between">
// //                       <span>{store.name}</span>
// //                       <span>{store.distance}</span>
// //                     </div>
// //                   </li>
// //                 ))}
// //               </ul>
// //             </div>

// //             {selectedStore && (
// //               <form onSubmit={handleDetailsSubmit}>
// //                 <div className="mb-4 mt-3">
// //                   <label className="block text-gray-700 mb-2" htmlFor="email">
// //                     Email Address
// //                   </label>
// //                   <input
// //                     type="email"
// //                     id="email"
// //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </div>
// //                 <div className="mb-4">
// //                   <label
// //                     className="block text-gray-700 mb-2"
// //                     htmlFor="phoneNumber"
// //                   >
// //                     Phone Number
// //                   </label>
// //                   <input
// //                     type="tel"
// //                     id="phoneNumber"
// //                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //                     value={phoneNumber}
// //                     onChange={(e) => setPhoneNumber(e.target.value)}
// //                     required
// //                   />
// //                 </div>

// //                 <button
// //                   type="submit"
// //                   className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
// //                 >
// //                   Submit
// //                 </button>
// //               </form>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CheckStartingPoint;
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
//   "Chiang Mai": ["Chiang Mai City"],
//   Phuket: ["Phuket City"],
//   "Kuala Lumpur": ["Kuala Lumpur City"],
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
//                 <label
//                   className="block text-gray-700 mb-2"
//                   htmlFor="phoneNumber"
//                 >
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
