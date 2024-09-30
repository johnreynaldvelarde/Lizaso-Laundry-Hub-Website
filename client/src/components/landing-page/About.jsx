// src/components/landing-page/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 py-20" id="about">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#5787C8]">
          About Us
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          At Lizaso Laundry Hub, we are committed to providing exceptional
          laundry services that make your life easier and more convenient. Our
          team is dedicated to ensuring your clothes are cleaned and cared for
          with the utmost attention to detail.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-[#5787C8] mb-2">
              Quality Service
            </h3>
            <p className="text-gray-600">
              We use high-quality detergents and equipment to ensure your
              laundry is spotless and fresh.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-[#5787C8] mb-2">
              Eco-Friendly
            </h3>
            <p className="text-gray-600">
              Our processes are designed to be environmentally friendly,
              reducing waste and conserving water.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold text-[#5787C8] mb-2">
              Customer Satisfaction
            </h3>
            <p className="text-gray-600">
              Your satisfaction is our top priority, and we strive to exceed
              your expectations with every service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
