// src/components/landing-page/Pricing.jsx
import React from "react";
import styles from "../../style"; // Assuming you have styles defined

const Pricing = () => {
  const pricingPlans = [
    {
      title: "Basic Plan",
      price: "$19.99",
      features: ["Washing", "Drying", "Folding", "Basic customer support"],
    },
    {
      title: "Standard Plan",
      price: "$29.99",
      features: [
        "Washing",
        "Drying",
        "Folding",
        "Priority customer support",
        "Discounts on bulk orders",
      ],
    },
    {
      title: "Premium Plan",
      price: "$49.99",
      features: [
        "Washing",
        "Drying",
        "Folding",
        "24/7 customer support",
        "Free pickup and delivery",
        "Special discounts",
      ],
    },
  ];

  return (
    <div className="bg-gray-20 py-20" id="pricing">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#5787C8]">
          Pricing Plans
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{plan.title}</h3>
              <p className="text-2xl font-bold text-[#5787C8] mb-4">
                {plan.price}
              </p>
              <ul className="list-disc list-inside mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-700">
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#5787C8] text-white font-semibold py-2 rounded-md hover:bg-[#4a6c9e]">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

// import React from "react";
// import styles from "../../style";

// const Pricing = () => {
//   return (
//     <div className="mt-52 min-h-[500px] bg-white mx-20 shadow-lg rounded-lg flex items-center justify-center">
//       {/* Add your pricing content here */}
//       <div className="p-10 flex flex-col items-center">
//         <h2 className="text-2xl font-bold mb-6 text-center">Pricing Plans</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Example Pricing Card */}
//           <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold">Basic Plan</h3>
//             <p className="mt-2 text-gray-600">$10/month</p>
//             <ul className="mt-4">
//               <li className="py-1">✔️ Feature 1</li>
//               <li className="py-1">✔️ Feature 2</li>
//               <li className="py-1">✔️ Feature 3</li>
//             </ul>
//             <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
//               Choose Plan
//             </button>
//           </div>

//           {/* Add more pricing cards as needed */}
//           <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold">Standard Plan</h3>
//             <p className="mt-2 text-gray-600">$20/month</p>
//             <ul className="mt-4">
//               <li className="py-1">✔️ Feature 1</li>
//               <li className="py-1">✔️ Feature 2</li>
//               <li className="py-1">✔️ Feature 3</li>
//               <li className="py-1">✔️ Feature 4</li>
//             </ul>
//             <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
//               Choose Plan
//             </button>
//           </div>

//           <div className="bg-[#f9f9f9] p-6 rounded-lg shadow-md">
//             <h3 className="text-xl font-semibold">Premium Plan</h3>
//             <p className="mt-2 text-gray-600">$30/month</p>
//             <ul className="mt-4">
//               <li className="py-1">✔️ Feature 1</li>
//               <li className="py-1">✔️ Feature 2</li>
//               <li className="py-1">✔️ Feature 3</li>
//               <li className="py-1">✔️ Feature 4</li>
//               <li className="py-1">✔️ Feature 5</li>
//             </ul>
//             <button className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg">
//               Choose Plan
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pricing;
