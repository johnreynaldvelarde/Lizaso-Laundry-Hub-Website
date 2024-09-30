import React from "react";
import styles from "../../style";

const Pricing = () => {
  return (
    <div className="mt-52 min-h-[500px] bg-white mx-20 shadow-lg rounded-lg flex items-center justify-center">
      {/* Add your pricing content here */}
      <div className="p-10 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-center">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Example Pricing Card */}
          <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Basic Plan</h3>
            <p className="mt-2 text-gray-600">$10/month</p>
            <ul className="mt-4">
              <li className="py-1">✔️ Feature 1</li>
              <li className="py-1">✔️ Feature 2</li>
              <li className="py-1">✔️ Feature 3</li>
            </ul>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
              Choose Plan
            </button>
          </div>

          {/* Add more pricing cards as needed */}
          <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Standard Plan</h3>
            <p className="mt-2 text-gray-600">$20/month</p>
            <ul className="mt-4">
              <li className="py-1">✔️ Feature 1</li>
              <li className="py-1">✔️ Feature 2</li>
              <li className="py-1">✔️ Feature 3</li>
              <li className="py-1">✔️ Feature 4</li>
            </ul>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
              Choose Plan
            </button>
          </div>

          <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Premium Plan</h3>
            <p className="mt-2 text-gray-600">$30/month</p>
            <ul className="mt-4">
              <li className="py-1">✔️ Feature 1</li>
              <li className="py-1">✔️ Feature 2</li>
              <li className="py-1">✔️ Feature 3</li>
              <li className="py-1">✔️ Feature 4</li>
              <li className="py-1">✔️ Feature 5</li>
            </ul>
            <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
              Choose Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
