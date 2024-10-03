import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import PopupServiceSelect from "./PopupServiceSelect";
import m_1 from "../../assets/images/1636.jpg";
import background_1 from "../../assets/images/background_2.jpg";
import styles from "../../styles/style";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getCustomerServiceAndPromotions } from "../../services/api/customerApi";
import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

const LaundryServices = () => {
  const { userDetails } = useAuth();
  const [services, setService] = useState([]);
  const { selectedService, setSelectedService } = useLaundryPlans();

  const fetchServiceTypeAndPromotions = async () => {
    if (!userDetails?.storeId) return;

    try {
      const response =
        await getCustomerServiceAndPromotions.getServiceWithPromotions(
          userDetails.storeId
        );
      if (response) {
        const service = response.data || [];
        setService(service);
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchServiceTypeAndPromotions();
  }, [userDetails?.storeId]);

  // Example of promotional services
  const specialPromos = [
    { id: 1, label: "Wash & Fold", price: 18, promo: "20% Off Today!" },
    { id: 2, label: "Dry Cleaning", price: 22, promo: "15% Off Today!" },
    { id: 3, label: "Express Service", price: 25, promo: "Free Delivery!" },
    { id: 4, label: "Stain Removal", price: 18, promo: "10% Off Today!" },
    { id: 5, label: "Ironing", price: 12, promo: "5% Off Today!" },
  ];

  const promoRef = useRef(null); // Reference to the promotions container

  // Function to scroll promotions to the left
  const scrollLeft = () => {
    promoRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  // Function to scroll promotions to the right
  const scrollRight = () => {
    promoRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleSelectService = (service) => {
    setSelectedService(service);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
  };

  return (
    <>
      <div
        className="bg-green-100"
        style={{
          backgroundImage: `url(${background_1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: styles.border,
        }}
      >
        {/* Upper Section */}
        <div className="container mx-auto flex flex-col lg:flex-row items-center min-h-[300px] py-10">
          {/* Left Side - Regular Services */}
          <div className="flex-1 min-w-[300px] lg:min-w-[700px] max-w-[800px]  mt-5 lg:mt-0">
            <h2 className="text-4xl font-bold text-[#5787C8] mb-4">
              Welcome to Lizaso Laundry Hub
            </h2>
            <p className="text-lg font-semibold text-[#595959] mb-6">
              Choose from our wide range of laundry services that cater to all
              your needs.
            </p>
            <button className="px-6 py-2 bg-[#5787C8] text-white rounded-md hover:bg-[#4A6D94] transition-colors duration-300 ease-in-out">
              Explore Services
            </button>
          </div>

          {/* Right Side - Special Promo Services */}
          <div className="flex-1 min-w-[300px] lg:min-w-[400px] max-w-[800px] flex flex-col justify-center mt-14 lg:mt-0">
            <h3 className="text-2xl font-bold text-[#5787C8] mb-4">
              Special Promotions
            </h3>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 z-10"
              >
                <FaChevronLeft className="text-[#5787C8]" />
              </button>

              {/* Promotions Container */}
              <div
                ref={promoRef}
                className="hori-scrollable flex overflow-x-auto scroll-smooth py-2 space-x-4"
              >
                {specialPromos.map((promo) => (
                  <div
                    key={promo.id}
                    className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-4 m-2 transform transition-transform duration-300 hover:scale-105"
                  >
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-md">
                      {promo.promo}
                    </span>
                    <FaCheckCircle className="text-3xl text-[#5787C8] mb-2" />
                    <h3 className="text-lg font-semibold">{promo.label}</h3>
                    <p className="text-gray-600">${promo.price}</p>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 z-10"
              >
                <FaChevronRight className="text-[#5787C8]" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Below Section */}
      <div
        className="py-20 min-h-[500px] flex flex-col items-center"
        id="features"
        style={{
          background: `linear-gradient(to right, rgba(68, 127, 140, 0.8), rgba(87, 135, 200, 0.8)), url()`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto flex flex-col items-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-16 text-center">
            Select a Laundry Service
          </h2>
          <div className="flex flex-wrap justify-center gap-6 w-full">
            {services.map((service) => (
              <div
                key={service.service_id}
                className="relative flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out w-full sm:w-64"
              >
                <div className="flex items-center justify-center mb-4 mt-6">
                  <FaCheckCircle className="text-3xl text-[#5787C8] mr-2" />
                  <span
                    className="text-lg font-semibold"
                    style={{ color: styles.text3 }}
                  >
                    {service.service_name}
                  </span>
                </div>
                <p
                  className="mt-2 text-center font-normal text-lg sm:text-xl"
                  style={{ color: styles.primary }}
                >
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(service.default_price)}
                </p>
                <button
                  onClick={() => handleSelectService(service)}
                  className="mt-4 px-4 py-2 bg-[#5787C8] text-white rounded-md hover:bg-[#4A6D94] transition-colors duration-300 ease-in-out"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          {selectedService && (
            <PopupServiceSelect
              service={selectedService}
              onClose={handleClosePopup}
            />
          )}
        </div>

        {/* <div className="container mx-auto flex flex-wrap justify-center">
          <h2 className="text-4xl font-bold text-white mb-16">
            Select a Laundry Service
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {services.map((service) => (
              <div
                key={service.service_id}
                className="relative flex flex-col items-center bg-white border border-gray-300 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out w-full sm:w-64"
              >
                <div className="flex items-center justify-center mb-4 mt-6">
                  <FaCheckCircle className="text-3xl text-[#5787C8] mr-2" />
                  <span
                    className="text-lg font-semibold"
                    style={{ color: styles.text3 }}
                  >
                    {service.service_name}
                  </span>
                </div>
                <p
                  className="mt-2  text-center font-normal text-xl"
                  style={{ color: styles.primary }}
                >
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(service.default_price)}
                </p>
                <button
                  onClick={() => handleSelectService(service)}
                  className="mt-4 px-4 py-2 bg-[#5787C8] text-white rounded-md hover:bg-[#4A6D94] transition-colors duration-300 ease-in-out"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          {selectedService && (
            <PopupServiceSelect
              service={selectedService}
              onClose={handleClosePopup}
            />
          )}
        </div> */}
      </div>
    </>
  );
};

export default LaundryServices;

{
  /* Promo Badge */
}
{
  /* {service.promo && (
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full z-10">
                    Special Promo
                  </span>
                )} */
}

{
  /* {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out w-full sm:w-64"
              >
                <span
                  className="text-lg font-semibold"
                  style={{ color: styles.text3 }}
                >
                  {service.label}
                </span>
                <p className="mt-2" style={{ color: styles.primary }}>
                  Details about {service.label} service.
                </p>
                <button
                  onClick={() => handleSelectService(service)}
                  className="mt-4 px-4 py-2 bg-[#5787C8] text-white rounded-md hover:opacity-90 transition-colors duration-300 ease-in-out"
                >
                  Select
                </button>
              </div>
            ))} */
}

// <div className="py-8 px-4 md:px-6 lg:px-8 mb-20">
//   <h2 className="text-2xl font-bold text-center mb-6">
//     Select a Laundry Service
//   </h2>
//   <div className="flex flex-wrap justify-center gap-6">
//     {services.map((service) => (
//       <div
//         key={service.id}
//         className="flex flex-col items-center bg-white border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out w-full sm:w-64"
//       >
//         <span className="text-lg font-medium">{service.label}</span>
//         <p className="mt-2 text-gray-600">
//           Details about {service.label} service.
//         </p>
//         <button
//           onClick={() => handleSelectService(service)}
//           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out"
//         >
//           Select
//         </button>
//       </div>
//     ))}
//   </div>
//   {selectedService && (
//     <PopupServiceSelect
//       service={selectedService}
//       onClose={handleClosePopup}
//     />
//   )}
// </div>
