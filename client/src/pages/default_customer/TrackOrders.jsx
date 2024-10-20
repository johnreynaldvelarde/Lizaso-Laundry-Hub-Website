import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import useAuth from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import norequest from "../../assets/images/nodata.jpg";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import {
  ChartPie,
  CheckCircle,
  LinkBreak,
  XCircle,
} from "@phosphor-icons/react";
import { COLORS } from "../../constants/color";
import PopMessageStaff from "./components/PopMessageStaff";
import usePopup from "../../hooks/common/usePopup";
import PopAmountBreakDown from "./components/PopAmountBreakDown";
import PopPay from "./components/PopReceipt";
import useFetchData from "../../hooks/common/useFetchData";
import { getCustomerTrackOrderAndProgress } from "../../services/api/customerApi";
import { QRCodeCanvas } from "qrcode.react";

const TrackOrders = () => {
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: orders, fetchData: fetchCustomerTrackOrder } = useFetchData();

  const fetchCustomerTrackOrderData = useCallback(() => {
    fetchCustomerTrackOrder(
      getCustomerTrackOrderAndProgress.getCustomerTrackOrder,
      userDetails.userId
    );
  }, [fetchCustomerTrackOrder, userDetails?.userId]);

  useEffect(() => {
    fetchCustomerTrackOrderData();
    const intervalId = setInterval(() => {
      fetchCustomerTrackOrderData();
    }, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchCustomerTrackOrderData]);

  const nextOrder = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % orders.length);
  };

  const prevOrder = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? orders.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col flex-grow bg-gray-100 px-4 pt-2 pb-6 md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
      <div className="max-w-7xl mx-auto w-full">
        <h1
          className="text-3xl font-bold text-center mb-5 mt-8"
          style={{ color: styles.text3 }}
        >
          Track Your Laundry Orders
        </h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div
              className="bg-white rounded-lg shadow-sm p-4 max-w-md w-full relative"
              style={{ borderColor: styles.border, borderWidth: 1 }}
            >
              <img
                src={norequest}
                alt="No service request yet."
                className="w-full h-auto " // Make the image responsive
              />
            </div>
            <p
              className="text-lg font-semibold mb-4 mt-5"
              style={{ color: styles.primary }}
            >
              You have not made any service requests yet
            </p>
            <button
              className="bg-[#5787C8] text-white px-4 py-2 rounded mt-2 hover:bg-[#3D6F9B]"
              onClick={() => navigate("/customer-page/laundry-services")}
            >
              Go to Laundry Services
            </button>
          </div>
        ) : (
          <div className="relative flex items-center justify-center">
            {orders.length > 1 && (
              <button
                onClick={prevOrder}
                className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
              >
                &lt;
              </button>
            )}
            {/* Order Box */}
            <motion.div
              key={currentIndex}
              className="bg-white p-6 sm:p-10 lg:p-10 rounded-lg shadow-md border border-gray-300 mb-6 flex flex-col md:flex-row"
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              exit={{ x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {/* Order Info on the left */}
              <div className="flex-grow mb-20 md:mb-0 flex flex-col justify-between">
                <div className="mb-10">
                  <h2
                    className="text-base font-normal"
                    style={{ color: styles.primary }}
                  >
                    Tracking Number:
                  </h2>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: styles.text3 }}
                  >
                    {orders[currentIndex]?.service_request.tracking_code ||
                      "N/A"}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <span className="font-bold">Status:</span>
                      <span
                        className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          orders[currentIndex].service_request
                            .request_status === "Pending Pickup"
                            ? "bg-[#ff7f50] text-white"
                            : orders[currentIndex].service_request
                                .request_status === "Ongoing Pickup"
                            ? "bg-[#28a745] text-white"
                            : orders[currentIndex].service_request
                                .request_status === "Completed Pickup"
                            ? "bg-[#5787C8] text-white"
                            : orders[currentIndex].service_request
                                .request_status === "In Laundry"
                            ? "bg-[#17a2b8] text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {orders[currentIndex].service_request.request_status}
                      </span>
                    </p>
                    <p className="mb-2 flex" style={{ color: styles.primary }}>
                      <span className="font-bold">Pickup Time:</span>
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        {orders[currentIndex].service_request.pickup_date}
                      </span>
                    </p>
                    <p className="mb-2 flex" style={{ color: styles.primary }}>
                      <span className="font-bold">Delivery Time:</span>
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        {orders[currentIndex].service_request.delivery_date}
                      </span>
                    </p>
                    <p className="mb-2 flex" style={{ color: styles.primary }}>
                      <span className="font-bold">
                        Pickup or Delivery Staff:
                      </span>
                      <span
                        className="ml-2 font-normal"
                        style={{ color: styles.secondary }}
                      >
                        {orders[currentIndex].service_request.user_name}
                      </span>
                    </p>
                    <button
                      className={`bg-[#5787C8] text-white px-4 py-2 rounded mt-2 ${
                        orders[currentIndex].service_request.user_id
                          ? "hover:bg-[#3E5B8C]"
                          : "opacity-50 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        openPopup(
                          "messageStaff",
                          orders[currentIndex].service_request.user_id
                        );
                      }}
                      disabled={!orders[currentIndex].service_request.user_id} // Disable if user_id is false
                    >
                      Message the Delivery Staff
                    </button>
                  </div>
                  <div>
                    <p className="mb-2 flex" style={{ color: styles.primary }}>
                      <span className="font-bold">Selected Service:</span>
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        {orders[currentIndex].service_request.service_name}
                      </span>
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <span className="font-bold">Base Price:</span>
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        {
                          orders[currentIndex].service_request
                            .service_default_price
                        }
                      </span>
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <span className="font-bold">Assigned Unit:</span>
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        {orders[currentIndex].service_request.unit_name}
                      </span>
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <span className="font-bold">Transaction:</span>
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        {orders[currentIndex].assessmentStatus}
                      </span>
                    </p>
                  </div>
                </div>

                {/* QR Code Below Timeline */}
                <div className="flex flex-col items-center mt-10">
                  <QRCodeCanvas
                    value={orders[currentIndex].service_request.qr_code}
                    alt="QR Code"
                    size={300}
                  />
                  <p
                    className="mt-4 text-center font-normal"
                    style={{ color: styles.primary }}
                  >
                    Wait for the staff to scan this QR code to update the
                    progress of your laundry order.
                  </p>
                </div>
                {/* Always positioned at the bottom */}
                <div className="mt-12 w-full flex flex-col md:flex-row justify-between items-center">
                  <p
                    className="text-2xl font-bold text-center md:text-left"
                    style={{ color: COLORS.text }}
                  >
                    Total Amount:
                    {orders[currentIndex].service_request.assignment_id ===
                    "Waiting for total amount..." ? (
                      <span
                        style={{
                          color: COLORS.primary,
                          fontWeight: 400,
                          marginLeft: 10,
                          fontSize: 20,
                        }}
                      >
                        {orders[currentIndex].service_request.assignment_id}
                      </span>
                    ) : (
                      <span style={{ color: COLORS.secondary, marginLeft: 10 }}>
                        ₱{orders[currentIndex].total_amount}
                      </span>
                    )}
                  </p>
                  <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                    <button
                      className="ml-4 bg-[#5787C8] text-white px-6 py-2 rounded hover:bg-[#3E5B8C] w-full md:w-auto mb-2 md:mb-0"
                      onClick={() => openPopup("showReceipt")}
                    >
                      View Receipt
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Timeline on the right */}
              <div className="md:w-auto flex-shrink-0 md:pl-20 ">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: styles.secondary }}
                >
                  Service Request Progress
                </h3>
                <div className="relative pt-2">
                  <div className="border-l-2 border-[#5787C8] pl-4 space-y-4">
                    {orders[currentIndex].progress.map((step, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            step.completed ? "bg-[#5787C8]" : "bg-gray-300"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle
                              size={20}
                              color={COLORS.white}
                              weight="duotone"
                            />
                          ) : (
                            <XCircle
                              size={20}
                              color={COLORS.white}
                              weight="duotone"
                            />
                          )}
                        </div>
                        <div>
                          <p
                            className="font-bold"
                            style={{ color: styles.text3 }}
                          >
                            {step.stage}
                          </p>
                          <p
                            className="font-normal"
                            style={{ color: styles.text3 }}
                          >
                            {step.status_date && (
                              <span className="text-[#5787C8] text-xs">
                                {format(
                                  new Date(step.status_date),
                                  "MMMM d, yyyy, h:mm a"
                                )}
                              </span>
                            )}
                          </p>
                          <p
                            className="text-[#595959] text-sm font-normal"
                            style={{ color: styles.primary }}
                          >
                            {step.completed
                              ? step.description
                              : step.false_description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
            {orders.length > 1 && (
              <button
                onClick={nextOrder}
                className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>
      {/* Popup */}
      {isOpen && popupType === "messageStaff" && (
        <PopMessageStaff
          open={isOpen}
          onClose={closePopup}
          senderId={userDetails.userId}
          receiverId={popupData}
        />
      )}
      {isOpen && popupType === "showReceipt" && (
        <PopPay open={isOpen} onClose={closePopup} />
      )}
    </div>
  );
};

export default TrackOrders;
