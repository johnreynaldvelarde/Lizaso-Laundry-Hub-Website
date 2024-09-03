import React, { useState, Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import C_Navbar from "../../components/common/C_Navbar";
import C_Footer from "../../components/common/C_Footer";

const LaundryPlans = lazy(() =>
  import("../../pages").then((module) => ({ default: module.LaundryPlans }))
);

const TrackingOrder = lazy(() =>
  import("../../pages").then((module) => ({ default: module.TrackingOrder }))
);

const MainCustomer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <C_Navbar />
      <main className="flex-grow max-w-7xl mx-auto pt-20 px-6">
        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="laundry-plans" />} />
              <Route path="laundry-plans" element={<LaundryPlans />} />
              <Route path="tracking-order" element={<TrackingOrder />} />

              <Route
                path="*"
                element={<Navigate to="laundry-plans" replace />}
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
