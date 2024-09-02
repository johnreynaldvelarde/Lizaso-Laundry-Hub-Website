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
    setPostalCode,
    setAddressLine1,
    setAddressLine2,
    handleCountryChange,
    handleRegionChange,
    handleProvinceChange,
    handleCityChange,
    handleAddressSubmit,

    // Step 2
    selectedStore,
    email,
    phoneNumber,
    setEmail,
    setPhoneNumber,
    handleStoreSelection,

    // Fetch
    fetchStoreData,
    handleFinalSubmit,
  } = useCheckStartingPoint();

  useEffect(() => {
    if (!hasFetchedRef.current) {
      if (latitude !== null && longitude !== null) {
        fetchStoreData();
      }
    }
  }, [latitude, longitude]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl my-8">
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
                {storeData.map((store) => (
                  <li
                    key={store.id}
                    className={`flex justify-between items-center p-4 mb-3 rounded-lg cursor-pointer transition-colors duration-300 ease-in-out ${
                      selectedStore?.id === store.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                    onClick={() => handleStoreSelection(store)}
                  >
                    <div>
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
                    </div>
                    {store.distance && (
                      <p
                        className={`text-base font-semibold transition-colors duration-300 ease-in-out ${
                          selectedStore?.id === store.id
                            ? "text-white"
                            : store.distance >= 5
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {store.distance} km
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <form onSubmit={handleFinalSubmit}>
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
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-5"
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
