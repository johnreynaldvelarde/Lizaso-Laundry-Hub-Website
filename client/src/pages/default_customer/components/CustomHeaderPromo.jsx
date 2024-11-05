import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { COLORS } from "../../../constants/color";

const CustomHeaderPromo = ({ servicesPromo }) => {
  const promoRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const scrollLeft = () => {
    if (promoRef.current) {
      promoRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (promoRef.current) {
      promoRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (promoRef.current) {
        const { scrollWidth, clientWidth } = promoRef.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };

    checkOverflow(); // Check on mount
    window.addEventListener("resize", checkOverflow); // Check on resize

    return () => {
      window.removeEventListener("resize", checkOverflow); // Clean up
    };
  }, [servicesPromo]);

  return (
    <div className="flex-1 min-w-[300px] lg:min-w-[400px] max-w-[800px] flex flex-col justify-center mt-14 lg:mt-0">
      <h3 className="text-2xl font-bold text-[#5787C8] mb-4">Services Promo</h3>
      <div className="relative">
        {/* Left Arrow - Only show if overflowing */}
        {isOverflowing && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 z-10"
          >
            <FaChevronLeft className="text-[#5787C8]" />
          </button>
        )}

        {/* Promotions Container */}
        <div
          ref={promoRef}
          className="hori-scrollable flex overflow-x-auto scroll-smooth py-2 space-x-4"
        >
          {servicesPromo.map((promo) => (
            <div
              key={promo.service_id} // Using service_id as the key
              className="relative bg-white border border-gray-300 rounded-lg shadow-lg p-4 m-2 transform transition-transform duration-300 hover:scale-105"
            >
              <span
                className="absolute top-0 right-0 text-white text-xs font-normal px-4 py-1 rounded-bl-2xl"
                style={{ backgroundColor: COLORS.error }}
              >
                {promo.valid_days}
              </span>

              <div className="mt-9">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: COLORS.text }}
                >
                  {promo.service_name}
                </h3>
              </div>

              <div className="flex justify-between items-center gap-2">
                <p className="text-gray-600 line-through">
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(promo.default_price)}
                </p>
                <span className="text-gray-600">➔</span>
                <p className=" text-red-500 font-semibold">
                  {new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  }).format(promo.discount_price)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow - Only show if overflowing */}
        {isOverflowing && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-200 z-10"
          >
            <FaChevronRight className="text-[#5787C8]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomHeaderPromo;
