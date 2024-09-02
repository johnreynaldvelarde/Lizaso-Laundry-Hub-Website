import React from "react";
import C_Navbar from "../../components/common/C_Navbar";
import C_Footer from "../../components/common/C_Footer";
import SelectionService from "./SelectionService";

const MainCustomer = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <C_Navbar />
      <main className="flex-grow max-w-7xl mx-auto pt-20 px-6">
        <section>
          {/* <h1 className="text-2xl font-bold mb-4">
            Welcome to Lizaso Laundry Hub
          </h1>
          <p className="text-lg mb-4">
            We're here to help you with all your laundry needs. Explore our
            services and get in touch with us if you have any questions.
          </p> */}
          <SelectionService />
        </section>
      </main>
      <C_Footer />
    </div>
  );
};

export default MainCustomer;
