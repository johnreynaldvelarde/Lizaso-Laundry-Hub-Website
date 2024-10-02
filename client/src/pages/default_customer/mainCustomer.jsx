import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import C_Navbar from "../../components/common/C_Navbar";
import C_Footer from "../../components/common/C_Footer";
import LoadingBar from "../../components/LoadingBar";
import C_Sidebar from "../../components/common/C_Sidebar";

const LaundryServices = lazy(() =>
  import("../../pages").then((module) => ({ default: module.LaundryServices }))
);

const TrackOrders = lazy(() =>
  import("../../pages").then((module) => ({ default: module.TrackOrders }))
);

const PaymentHistory = lazy(() =>
  import("../../pages").then((module) => ({ default: module.PaymentHistory }))
);

const MainCustomer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <C_Navbar />
      <LoadingBar />
      <main className="flex-grow max-w-7xl mx-auto pt-20 px-6">
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="laundry-services" />} />
              <Route path="laundry-services" element={<LaundryServices />} />
              <Route path="track-orders" element={<TrackOrders />} />
              <Route path="payment-history" element={<PaymentHistory />} />

              <Route
                path="*"
                element={<Navigate to="laundry-services" replace />}
              />
            </Routes>
          </Suspense>
        </section>
      </main>
      <C_Footer />
    </div>
  );
};

export default MainCustomer;

{
  /* <div className="flex flex-grow max-w-7xl mx-auto pt-20 px-6">
        <C_Sidebar /> 
        <main className="flex-grow ml-4"> 
          <section>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<Navigate to="laundry-services" />} />
                <Route path="laundry-services" element={<LaundryServices />} />
                <Route path="track-orders" element={<TrackOrders />} />
                <Route path="payment-history" element={<PaymentHistory />} />
                <Route path="*" element={<Navigate to="laundry-services" replace />} />
              </Routes>
            </Suspense>
          </section>
        </main>
      </div> */
}
