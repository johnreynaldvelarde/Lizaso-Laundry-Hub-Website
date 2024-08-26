import React from "react";
import C_Navbar from "../../components/common/C_Navbar";

const MainCustomer = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <C_Navbar />
      <div className="p-4">
        <header className="bg-blue-600 text-white p-4 mb-4 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold">Customer Dashboard</h1>
        </header>
        <main className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, [Customer Name]
          </h2>
          <p className="text-gray-700">
            Here you can manage your orders and view your account details.
          </p>
        </main>
      </div>
    </div>
  );
};

export default MainCustomer;
