// src/components/landing-page/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-20" id="contact">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6 text-[#5787C8]">
          Contact Us
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          We would love to hear from you! Please fill out the form below, and we
          will get back to you as soon as possible.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Your Email"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full p-3 border border-gray-300 rounded-md"
                rows="5"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#5787C8] text-white font-semibold py-3 rounded-md hover:bg-[#4a6c9e]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
