// src/components/landing-page/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#5787C8] text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Lizaso Laundry Hub</h3>
            <p className="mt-2 text-sm">
              Your trusted laundry service provider.
            </p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a
              href="#"
              className="hover:underline hover:text-gray-200 transition duration-300"
            >
              About Us
            </a>
            <a
              href="#features"
              className="hover:underline hover:text-gray-200 transition duration-300"
            >
              Services
            </a>
            <a
              href="#"
              className="hover:underline hover:text-gray-200 transition duration-300"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:underline hover:text-gray-200 transition duration-300"
            >
              Privacy Policy
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Lizaso Laundry Hub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
