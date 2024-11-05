import React, { useCallback, useEffect, useRef, useState } from "react";
import useAuth from "../../contexts/AuthContext";
import PopupServiceSelect from "./PopupServiceSelect";
import background_1 from "../../assets/images/background_2.jpg";
import styles from "../../styles/style";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  getCustomerServiceAndPromotions,
  getServicePromoHeader,
} from "../../services/api/customerApi";
import useLaundryPlans from "../../hooks/customers/useLaundryPlans";
import useFetchData from "../../hooks/common/useFetchData";
import { COLORS } from "../../constants/color";
import CustomHeaderPromo from "./components/CustomHeaderPromo";

const LaundryServices = () => {
  const { userDetails } = useAuth();
  const { selectedService, setSelectedService } = useLaundryPlans();
  const [loading, setLoading] = useState(true);

  const { data: services, fetchData: fetchServiceTypeAndPromotions } =
    useFetchData();

  const { data: servicesPromo, fetchData: fetchAvailablePromo } =
    useFetchData();

  const fetchServiceAndPromotionsData = useCallback(() => {
    if (userDetails.storeId) {
      fetchServiceTypeAndPromotions(
        getCustomerServiceAndPromotions.getServiceWithPromotions,
        userDetails.storeId
      );
    }
  }, [fetchServiceTypeAndPromotions, userDetails.storeId]);

  const fetchServicePromoAvailablePromoData = useCallback(() => {
    setLoading(true);
    fetchAvailablePromo(
      getServicePromoHeader.getPromoHeader,
      userDetails.storeId
    );
    setLoading(false);
  }, [fetchAvailablePromo, userDetails.storeId]);

  useEffect(() => {
    fetchServiceAndPromotionsData();
    fetchServicePromoAvailablePromoData();
  }, [fetchServiceAndPromotionsData, fetchServicePromoAvailablePromoData]);

  const promoRef = useRef(null);

  const scrollLeft = () => {
    promoRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

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
            <CustomHeaderPromo servicesPromo={servicesPromo} />
          </div>
        </div>
      </div>

      {/* Below Section */}
      <div
        className="py-20 min-h-[500px] flex flex-col items-center"
        id="features"
        style={{
          background: `linear-gradient(to right, rgba(68, 127, 140, 0.8), rgba(87, 135, 200, 0.8)), url(${background_1})`,
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
                <div className="flex items-center justify-center mb-2 mt-6">
                  <span
                    className="text-xl font-semibold"
                    style={{ color: COLORS.text }}
                  >
                    {service.service_name}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span
                    className="text-lg font-semibold"
                    style={{ color: COLORS.text }}
                  >
                    {service.description}
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
                  Choose This Service
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
      </div>
    </>
  );
};

export default LaundryServices;
