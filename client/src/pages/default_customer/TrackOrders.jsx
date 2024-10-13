import React, { useState } from "react";
import { motion } from "framer-motion";
import norequest from "../../assets/images/nodata.jpg";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/style";
import { ChartPie, CheckCircle, LinkBreak } from "@phosphor-icons/react";
import { COLORS } from "../../constants/color";
import PopMessageStaff from "./components/PopMessageStaff";
import usePopup from "../../hooks/common/usePopup";
import PopAmountBreakDown from "./components/PopAmountBreakDown";
import PopPay from "./components/PopPay";

// Sample QR code image URL
const qrCodeImageUrl = "https://via.placeholder.com/150"; // Replace this URL with your actual QR code image URL

// Sample orders array
const orders = [
  {
    id: "#51847753CFE64E4EB3CD",
    status: "Pickup Scheduled",
    pickupTime: "2024-10-02 12:00 PM",
    deliveryStaff: "John Doe",
    storeStatus: "Awaiting Clothes",
    assessmentStatus: "Pending",
    initialPayment: "$10.00",
    assignedUnit: "Unit 5",
    progress: [
      {
        title: "Pending Pickup",
        description: "Pickup requested; staff on the way.",
        completed: true,
        falseDescription:
          "Pickup request received; waiting for staff assignment.",
      },
      {
        title: "Ongoing Pickup",
        description: "Pickup in progress.",
        completed: true,
        falseDescription: "Pickup has not yet started.",
      },
      {
        title: "Complete Pickup",
        description: "Pickup completed successfully.",
        completed: true,
        falseDescription: "Pickup has not been completed.",
      },
      {
        title: "At Store",
        description: "Dropped off at the laundry store.",
        completed: true,
        falseDescription: "The clothes have not yet arrived at the store.",
      },
      {
        title: "In Queue",
        description: "Waiting for processing.",
        completed: true,
        falseDescription: "Not yet in queue for processing.",
      },
      {
        title: "In Laundry",
        description: "Currently being washed/dried.",
        completed: true,
        falseDescription: "Laundry has not started processing yet.",
      },
      {
        title: "Laundry Completed",
        description: "Washing/drying finished.",
        completed: true,
        falseDescription: "Laundry processing has not been completed.",
      },
      {
        title: "Ready for Delivery",
        description: "Ready to be delivered.",
        completed: true,
        falseDescription: "Laundry is not yet ready for delivery.",
      },
      {
        title: "Out for Delivery",
        description: "On the way to you.",
        completed: true,
        falseDescription: "Laundry has not been dispatched yet.",
      },
      {
        title: "Complete Delivery",
        description: "Delivered and payment confirmed.",
        completed: true,
        falseDescription: "Delivery has not been completed.",
      },
    ],

    // progress: [
    //   {
    //     title: "Pending Pickup",
    //     description: "Waiting for pickup staff to be assigned.",
    //     completed: true,
    //   },
    //   {
    //     title: "Ongoing Pickup",
    //     description:
    //       "A pickup staff has been assigned but is not yet en route.",
    //     // description: "Pickup staff has been assigned and is on the way.",
    //     completed: false,
    //   },
    //   {
    //     title: "Complete Pickup",
    //     description: "Pickup has been successfully completed at 12:00 PM.",
    //     completed: true,
    //   },
    //   {
    //     title: "Picked Up",
    //     description: "Your laundry has been picked up.",
    //     completed: false,
    //   },
    //   {
    //     title: "In Progress",
    //     description: "Laundry is being processed.",
    //     completed: false,
    //   },
    //   {
    //     title: "Delivered",
    //     description: "Your laundry will be delivered soon.",
    //     completed: false,
    //   },
    //   {
    //     title: "Order Placed",
    //     description: "Your order has been placed.",
    //     completed: true,
    //   },
    //   {
    //     title: "Pickup Scheduled",
    //     description: "Pickup has been scheduled for 12:00 PM.",
    //     completed: true,
    //   },
    //   {
    //     title: "Picked Up",
    //     description: "Your laundry has been picked up.",
    //     completed: false,
    //   },
    //   {
    //     title: "In Progress",
    //     description: "Laundry is being processed.",
    //     completed: false,
    //   },
    //   {
    //     title: "Delivered",
    //     description: "Your laundry will be delivered soon.",
    //     completed: false,
    //   },
    // ],
  },
];

const TrackOrders = () => {
  const navigate = useNavigate();
  const { isOpen, popupType, openPopup, closePopup } = usePopup();
  const [currentIndex, setCurrentIndex] = useState(0);

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
              initial={{ x: 100 }} // Initial position to the right
              animate={{ x: 0 }} // Animate to the original position
              exit={{ x: -100 }} // Exit to the left
              transition={{ duration: 0.5 }} // Duration of animation
            >
              {/* Order Info on the left */}
              <div className="flex-grow mb-20 md:mb-0">
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
                    {orders[currentIndex]?.id || "N/A"}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="mb-4 md:mb-0">
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Status:</strong>
                      <span
                        className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                          orders[currentIndex].status === "Pickup Scheduled"
                            ? "bg-yellow-200 text-yellow-800"
                            : orders[currentIndex].status === "Picked Up"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {orders[currentIndex].status}
                      </span>
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Pickup Time:</strong>{" "}
                      {orders[currentIndex].pickupTime}
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Delivery Time:</strong>{" "}
                      {orders[currentIndex].pickupTime}
                    </p>
                    <p className=" mb-2" style={{ color: styles.primary }}>
                      <strong>Pickup or Delivery Staff:</strong>{" "}
                      {orders[currentIndex].deliveryStaff}
                    </p>
                    <button
                      className="bg-[#5787C8] text-white px-4 py-2 rounded mt-2 hover:bg-[#3E5B8C]"
                      onClick={() => openPopup("messageStaff")}
                    >
                      Message the Delivery Staff
                    </button>
                  </div>
                  <div>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Store Status:</strong>{" "}
                      {orders[currentIndex].storeStatus}
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Assessment:</strong>{" "}
                      {orders[currentIndex].assessmentStatus}
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Initial Payment:</strong>{" "}
                      {orders[currentIndex].initialPayment}
                    </p>
                    <p className="mb-2" style={{ color: styles.primary }}>
                      <strong>Assigned Unit:</strong>{" "}
                      {orders[currentIndex].assignedUnit}
                    </p>
                  </div>
                </div>

                {/* QR Code Below Timeline */}
                <div className="flex flex-col items-center mt-10">
                  <img
                    src={qrCodeImageUrl} // Use qrCode if you have a dynamic QR code
                    alt="QR Code"
                    className="w-80 h-80"
                  />
                  <p
                    className="mt-4 text-center font-normal"
                    style={{ color: styles.primary }}
                  >
                    Wait for the staff to scan this QR code to update the
                    progress of your laundry order.
                  </p>

                  <div className=" mt-12 w-full flex flex-col md:flex-row justify-between items-center">
                    <p
                      className="text-2xl font-bold text-center md:text-left"
                      style={{ color: styles.text3 }}
                    >
                      Total Amount:
                      <span
                        className="ml-2"
                        style={{ color: styles.secondary }}
                      >
                        ₱{1000}
                      </span>
                    </p>
                    <div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
                      <button
                        className="ml-4 bg-[#5787C8] text-white px-6 py-2 rounded hover:bg-[#3E5B8C] w-full md:w-auto mb-2 md:mb-0"
                        onClick={() => openPopup("showPay")}
                      >
                        Pay Now
                      </button>
                      <button
                        className="ml-4 bg-gray-200 text-black px-4 py-2 rounded hover:bg-gray-300 flex items-center w-full md:w-auto"
                        onClick={() => openPopup("showBreakDown")}
                      >
                        <LinkBreak
                          size={24}
                          color={COLORS.primary}
                          className="mr-2"
                        />
                        <span style={{ color: styles.primary }}>Breakdown</span>
                      </button>
                    </div>
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
                          {step.completed && (
                            <CheckCircle
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
                            {step.title}
                          </p>
                          <p
                            className="text-gray-500"
                            style={{ color: styles.primary }}
                          >
                            {step.description}
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
        <PopMessageStaff open={isOpen} onClose={closePopup} />
      )}
      {isOpen && popupType === "showBreakDown" && (
        <PopAmountBreakDown open={isOpen} onClose={closePopup} />
      )}
      {isOpen && popupType === "showPay" && (
        <PopPay open={isOpen} onClose={closePopup} />
      )}
    </div>
  );
};

export default TrackOrders;

// import React, { useState } from "react";
// import { motion } from "framer-motion"; // Import Framer Motion for animation
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

// // Sample QR code image URL
// const qrCodeImageUrl = "https://via.placeholder.com/150"; // Replace this URL with your actual QR code image URL

// // Sample orders array
// const orders = [
//   {
//     id: "ORD12345",
//     status: "Pickup Scheduled",
//     pickupTime: "2024-10-02 12:00 PM",
//     deliveryStaff: "John Doe",
//     storeStatus: "Awaiting Clothes",
//     assessmentStatus: "Pending",
//     initialPayment: "$10.00",
//     assignedUnit: "Unit 5",
//     progress: [
//       {
//         title: "Order Placed",
//         description: "Your order has been placed.",
//         completed: true,
//       },
//       {
//         title: "Pickup Scheduled",
//         description: "Pickup has been scheduled for 12:00 PM.",
//         completed: true,
//       },
//       {
//         title: "Picked Up",
//         description: "Your laundry has been picked up.",
//         completed: false,
//       },
//       {
//         title: "In Progress",
//         description: "Laundry is being processed.",
//         completed: false,
//       },
//       {
//         title: "Delivered",
//         description: "Your laundry will be delivered soon.",
//         completed: false,
//       },
//     ],
//   },
//   {
//     id: "ORD12346",
//     status: "Picked Up",
//     pickupTime: "2024-10-01 10:00 AM",
//     deliveryStaff: "Jane Doe",
//     storeStatus: "In Progress",
//     assessmentStatus: "Completed",
//     initialPayment: "$15.00",
//     assignedUnit: "Unit 2",
//     progress: [
//       {
//         title: "Order Placed",
//         description: "Your order has been placed.",
//         completed: true,
//       },
//       {
//         title: "Pickup Scheduled",
//         description: "Pickup has been scheduled.",
//         completed: true,
//       },
//       {
//         title: "Picked Up",
//         description: "Your laundry has been picked up.",
//         completed: true,
//       },
//       {
//         title: "In Progress",
//         description: "Laundry is being processed.",
//         completed: true,
//       },
//       {
//         title: "Delivered",
//         description: "Your laundry will be delivered soon.",
//         completed: false,
//       },
//     ],
//   },
//   {
//     id: "ORD12347",
//     status: "Ongoing Pickup",
//     pickupTime: "2024-10-03 09:00 AM",
//     deliveryStaff: "Mike Smith",
//     storeStatus: "Scheduled for Pickup",
//     assessmentStatus: "Pending",
//     initialPayment: "$12.00",
//     assignedUnit: "Unit 3",
//     progress: [
//       {
//         title: "Order Placed",
//         description: "Your order has been placed.",
//         completed: true,
//       },
//       {
//         title: "Pickup Scheduled",
//         description: "Pickup has been scheduled.",
//         completed: false,
//       },
//       {
//         title: "Picked Up",
//         description: "Your laundry has been picked up.",
//         completed: false,
//       },
//       {
//         title: "In Progress",
//         description: "Laundry is being processed.",
//         completed: false,
//       },
//       {
//         title: "Delivered",
//         description: "Your laundry will be delivered soon.",
//         completed: false,
//       },
//     ],
//   },
// ];

// function TrackOrders() {
//   const { qrCode } = useLaundryPlans();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextOrder = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % orders.length);
//   };

//   const prevOrder = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? orders.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="flex flex-col flex-grow bg-gray-100 px-4 pt-2 pb-6 md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
//       <div className="max-w-7xl mx-auto w-full">
//         <h1 className="text-3xl font-semibold text-center mb-6 mt-5">
//           Track Your Laundry Orders
//         </h1>
//         <div className="relative flex items-center justify-center">
//           {" "}
//           {/* Center items */}
//           <button
//             onClick={prevOrder}
//             className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
//           >
//             &lt;
//           </button>
//           {/* Order Box */}
//           <motion.div
//             key={currentIndex}
//             className="bg-white p-6 sm:p-10 lg:p-10 rounded-lg shadow-md border border-gray-300 mb-6 flex flex-col md:flex-row"
//             initial={{ x: 100 }} // Initial position to the right
//             animate={{ x: 0 }} // Animate to the original position
//             exit={{ x: -100 }} // Exit to the left
//             transition={{ duration: 0.5 }} // Duration of animation
//           >
//             {/* Order Info on the left */}
//             <div className="flex-grow mb-20 md:mb-0">
//               <h2 className="text-xl font-bold mb-4">
//                 Order ID: {orders[currentIndex].id}
//               </h2>
//               <div className="flex flex-col md:flex-row justify-between mb-4">
//                 <div className="mb-4 md:mb-0">
//                   <p className="text-gray-600 mb-2">
//                     <strong>Status:</strong>
//                     <span
//                       className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                         orders[currentIndex].status === "Pickup Scheduled"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : orders[currentIndex].status === "Picked Up"
//                           ? "bg-blue-200 text-blue-800"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       {orders[currentIndex].status}
//                     </span>
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Pickup Time:</strong>{" "}
//                     {orders[currentIndex].pickupTime}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Delivery Staff:</strong>{" "}
//                     {orders[currentIndex].deliveryStaff}
//                   </p>
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
//                     onClick={() =>
//                       alert(`Messaging ${orders[currentIndex].deliveryStaff}`)
//                     }
//                   >
//                     Message the Delivery Staff
//                   </button>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Store Status:</strong>{" "}
//                     {orders[currentIndex].storeStatus}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Assessment:</strong>{" "}
//                     {orders[currentIndex].assessmentStatus}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Initial Payment:</strong>{" "}
//                     {orders[currentIndex].initialPayment}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Assigned Unit:</strong>{" "}
//                     {orders[currentIndex].assignedUnit}
//                   </p>
//                 </div>
//               </div>

//               {/* QR Code Below Timeline */}
//               <div className="flex flex-col items-center mt-10">
//                 <img
//                   src={qrCodeImageUrl} // Use qrCode if you have a dynamic QR code
//                   alt="QR Code"
//                   className="w-80 h-80"
//                 />
//                 <p className="text-gray-600 mt-4 text-center">
//                   Wait for the staff to scan this QR code to update the progress
//                   of your laundry order.
//                 </p>
//               </div>
//             </div>

//             {/* Progress Timeline on the right */}
//             <div className="md:w-auto flex-shrink-0 md:pl-20 ">
//               <h3 className="text-xl font-bold mb-4">
//                 Service Request Progress
//               </h3>
//               <div className="relative pt-2">
//                 <div className="border-l-2 border-blue-500 pl-4 space-y-4">
//                   {orders[currentIndex].progress.map((step, index) => (
//                     <div key={index} className="flex items-center space-x-4">
//                       <div
//                         className={`h-6 w-6 rounded-full ${
//                           step.completed ? "bg-blue-500" : "bg-gray-300"
//                         }`}
//                       ></div>
//                       <div>
//                         <p className="font-semibold">{step.title}</p>
//                         <p className="text-gray-500">{step.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//           <button
//             onClick={nextOrder}
//             className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
//           >
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TrackOrders;

// import React, { useState } from "react";
// import { motion } from "framer-motion"; // Import Framer Motion for animation
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

// // Sample QR code image URL
// const qrCodeImageUrl = "https://via.placeholder.com/150"; // Replace this URL with your actual QR code image URL

// // Sample orders array
// const orders = [
//   {
//     id: "ORD12345",
//     status: "Pickup Scheduled",
//     pickupTime: "2024-10-02 12:00 PM",
//     deliveryStaff: "John Doe",
//     storeStatus: "Awaiting Clothes",
//     assessmentStatus: "Pending",
//     initialPayment: "$10.00",
//     assignedUnit: "Unit 5",
//     progress: [
//       {
//         title: "Order Placed",
//         description: "Your order has been placed.",
//         completed: true,
//       },
//       {
//         title: "Pickup Scheduled",
//         description: "Pickup has been scheduled for 12:00 PM.",
//         completed: true,
//       },
//       {
//         title: "Picked Up",
//         description: "Your laundry has been picked up.",
//         completed: false,
//       },
//       {
//         title: "In Progress",
//         description: "Laundry is being processed.",
//         completed: false,
//       },
//       {
//         title: "Delivered",
//         description: "Your laundry will be delivered soon.",
//         completed: false,
//       },
//     ],
//   },
//   {
//     id: "ORD12346",
//     status: "Picked Up",
//     pickupTime: "2024-10-01 10:00 AM",
//     deliveryStaff: "Jane Doe",
//     storeStatus: "In Progress",
//     assessmentStatus: "Completed",
//     initialPayment: "$15.00",
//     assignedUnit: "Unit 2",
//     progress: [
//       {
//         title: "Order Placed",
//         description: "Your order has been placed.",
//         completed: true,
//       },
//       {
//         title: "Pickup Scheduled",
//         description: "Pickup has been scheduled.",
//         completed: true,
//       },
//       {
//         title: "Picked Up",
//         description: "Your laundry has been picked up.",
//         completed: true,
//       },
//       {
//         title: "In Progress",
//         description: "Laundry is being processed.",
//         completed: true,
//       },
//       {
//         title: "Delivered",
//         description: "Your laundry will be delivered soon.",
//         completed: false,
//       },
//     ],
//   },
//   {
//     id: "ORD12347",
//     status: "Ongoing Pickup",
//     pickupTime: "2024-10-03 09:00 AM",
//     deliveryStaff: "Mike Smith",
//     storeStatus: "Scheduled for Pickup",
//     assessmentStatus: "Pending",
//     initialPayment: "$12.00",
//     assignedUnit: "Unit 3",
//     progress: [
//       {
//         title: "Order Placed",
//         description: "Your order has been placed.",
//         completed: true,
//       },
//       {
//         title: "Pickup Scheduled",
//         description: "Pickup has been scheduled.",
//         completed: false,
//       },
//       {
//         title: "Picked Up",
//         description: "Your laundry has been picked up.",
//         completed: false,
//       },
//       {
//         title: "In Progress",
//         description: "Laundry is being processed.",
//         completed: false,
//       },
//       {
//         title: "Delivered",
//         description: "Your laundry will be delivered soon.",
//         completed: false,
//       },
//     ],
//   },
// ];

// function TrackOrders() {
//   const { qrCode } = useLaundryPlans();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Function to go to the next order
//   const nextOrder = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % orders.length);
//   };

//   // Function to go to the previous order
//   const prevOrder = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? orders.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <div className="flex flex-col flex-grow bg-gray-100 px-4 pt-2 pb-6 md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
//       <div className="max-w-7xl mx-auto w-full">
//         <h1 className="text-3xl font-semibold text-center mb-6 mt-5">
//           Track Your Laundry Orders
//         </h1>
//         <div className="relative flex items-center">
//           {/* Left Arrow */}
//           <button
//             onClick={prevOrder}
//             className="absolute left-0 z-10 p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
//           >
//             &lt; {/* You can replace this with an icon */}
//           </button>

//           {/* Order Box */}
//           <motion.div
//             key={currentIndex}
//             className="bg-white p-6 sm:p-10 lg:p-10 rounded-lg shadow-md border border-gray-300 mb-6 flex flex-col md:flex-row"
//             initial={{ x: 100 }} // Initial position to the right
//             animate={{ x: 0 }} // Animate to the original position
//             exit={{ x: -100 }} // Exit to the left
//             transition={{ duration: 0.5 }} // Duration of animation
//           >
//             {/* Order Info on the left */}
//             <div className="flex-grow mb-20 md:mb-0">
//               <h2 className="text-xl font-bold mb-4">
//                 Order ID: {orders[currentIndex].id}
//               </h2>
//               <div className="flex flex-col md:flex-row justify-between mb-4">
//                 <div className="mb-4 md:mb-0">
//                   <p className="text-gray-600 mb-2">
//                     <strong>Status:</strong>
//                     <span
//                       className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                         orders[currentIndex].status === "Pickup Scheduled"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : orders[currentIndex].status === "Picked Up"
//                           ? "bg-blue-200 text-blue-800"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       {orders[currentIndex].status}
//                     </span>
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Pickup Time:</strong>{" "}
//                     {orders[currentIndex].pickupTime}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Delivery Staff:</strong>{" "}
//                     {orders[currentIndex].deliveryStaff}
//                   </p>
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
//                     onClick={() =>
//                       alert(`Messaging ${orders[currentIndex].deliveryStaff}`)
//                     }
//                   >
//                     Message the Delivery Staff
//                   </button>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Store Status:</strong>{" "}
//                     {orders[currentIndex].storeStatus}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Assessment:</strong>{" "}
//                     {orders[currentIndex].assessmentStatus}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Initial Payment:</strong>{" "}
//                     {orders[currentIndex].initialPayment}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Assigned Unit:</strong>{" "}
//                     {orders[currentIndex].assignedUnit}
//                   </p>
//                 </div>
//               </div>

//               {/* QR Code Below Timeline */}
//               <div className="flex flex-col items-center mt-10">
//                 <img
//                   src={qrCodeImageUrl} // Use qrCode if you have a dynamic QR code
//                   alt="QR Code"
//                   className="w-80 h-80"
//                 />
//                 <p className="text-gray-600 mt-4 text-center">
//                   Wait for the staff to scan this QR code to update the progress
//                   of your laundry order.
//                 </p>
//               </div>
//             </div>

//             {/* Progress Timeline on the right */}
//             <div className="md:w-auto flex-shrink-0 md:pl-20 ">
//               <h3 className="text-xl font-bold mb-4">
//                 Service Request Progress
//               </h3>
//               <div className="relative pt-2">
//                 <div className="border-l-2 border-blue-500 pl-4 space-y-4">
//                   {orders[currentIndex].progress.map((step, index) => (
//                     <div key={index} className="flex items-center space-x-4">
//                       <div
//                         className={`h-6 w-6 rounded-full ${
//                           step.completed ? "bg-blue-500" : "bg-gray-300"
//                         }`}
//                       ></div>
//                       <div>
//                         <p className="font-semibold">{step.title}</p>
//                         <p className="text-gray-500">{step.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Arrow */}
//           <button
//             onClick={nextOrder}
//             className="absolute right-0 z-10 p-2 bg-gray-200 rounded-full focus:outline-none hover:bg-gray-300"
//           >
//             &gt; {/* You can replace this with an icon */}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TrackOrders;

// import React from "react";
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

// // Sample QR code image URL
// const qrCodeImageUrl = "https://via.placeholder.com/150"; // Replace this URL with your actual QR code image URL

// // Sample orders array
// const orders = [
//   {
//     id: "ORD12345",
//     status: "Pickup Scheduled",
//     pickupTime: "2024-10-02 12:00 PM",
//     deliveryStaff: "John Doe",
//     storeStatus: "Awaiting Clothes",
//     assessmentStatus: "Pending",
//     initialPayment: "$10.00",
//     assignedUnit: "Unit 5",
//   },
//   {
//     id: "ORD12346",
//     status: "Picked Up",
//     pickupTime: "2024-10-01 10:00 AM",
//     deliveryStaff: "Jane Doe",
//     storeStatus: "In Progress",
//     assessmentStatus: "Completed",
//     initialPayment: "$15.00",
//     assignedUnit: "Unit 2",
//   },
//   {
//     id: "ORD12347",
//     status: "Ongoing Pickup",
//     pickupTime: "2024-10-03 09:00 AM",
//     deliveryStaff: "Mike Smith",
//     storeStatus: "Scheduled for Pickup",
//     assessmentStatus: "Pending",
//     initialPayment: "$12.00",
//     assignedUnit: "Unit 3",
//   },
// ];

// function TrackOrders() {
//   const { qrCode } = useLaundryPlans();

//   return (
//     <div className="flex flex-col flex-grow bg-gray-100 px-4 pt-2 pb-6 md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
//       <div className="max-w-7xl mx-auto w-full">
//         <h1 className="text-3xl font-semibold text-center mb-6 mt-5">
//           Track Your Laundry Orders
//         </h1>
//         {/* Iterate over orders */}
//         {orders.map((order) => (
//           <div
//             key={order.id}
//             className="bg-white p-6 sm:p-10 lg:p-10 rounded-lg shadow-md border border-gray-300 mb-6 flex flex-col md:flex-row"
//           >
//             {/* Order Info on the left */}
//             <div className="flex-grow mb-20 md:mb-0">
//               <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
//               <div className="flex flex-col md:flex-row justify-between mb-4">
//                 <div className="mb-4 md:mb-0">
//                   <p className="text-gray-600 mb-2">
//                     <strong>Status:</strong>
//                     <span
//                       className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                         order.status === "Pickup Scheduled"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : order.status === "Picked Up"
//                           ? "bg-blue-200 text-blue-800"
//                           : "bg-gray-200 text-gray-800"
//                       }`}
//                     >
//                       {order.status}
//                     </span>
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Pickup Time:</strong> {order.pickupTime}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Delivery Staff:</strong> {order.deliveryStaff}
//                   </p>
//                   <button
//                     className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
//                     onClick={() => alert(`Messaging ${order.deliveryStaff}`)}
//                   >
//                     Message the Delivery Staff
//                   </button>
//                 </div>
//                 <div>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Store Status:</strong> {order.storeStatus}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Assessment:</strong> {order.assessmentStatus}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Initial Payment:</strong> {order.initialPayment}
//                   </p>
//                   <p className="text-gray-600 mb-2">
//                     <strong>Assigned Unit:</strong> {order.assignedUnit}
//                   </p>
//                 </div>
//               </div>

//               {/* QR Code Below Timeline */}
//               <div className="flex flex-col items-center mt-10">
//                 <img
//                   src={qrCodeImageUrl} // Use qrCode if you have a dynamic QR code
//                   alt="QR Code"
//                   className="w-80 h-80"
//                 />
//                 <p className="text-gray-600 mt-4 text-center">
//                   Wait for the staff to scan this QR code to update the progress
//                   of your laundry order.
//                 </p>
//               </div>
//             </div>

//             {/* Progress Timeline on the right */}
//             <div className="md:w-auto flex-shrink-0 md:pl-20 ">
//               <h3 className="text-xl font-bold mb-4">
//                 Service Request Progress
//               </h3>
//               <div className="relative pt-2">
//                 <div className="border-l-2 border-blue-500 pl-4 space-y-4">
//                   {[
//                     {
//                       title: "Pending Pickup",
//                       description: `Waiting for assigning a pickup staff`,
//                       completed: true,
//                     },
//                     {
//                       title: "Ongoing Pickup",
//                       description: `Waiting for pickup by ${order.deliveryStaff}`,
//                       completed: false,
//                     },
//                     {
//                       title: "Pickup Scheduled",
//                       description: `Waiting for pickup by ${order.deliveryStaff}`,
//                       completed: false,
//                     },
//                     {
//                       title: "Clothes Picked Up",
//                       description: "On the way to store",
//                       completed: order.status === "Picked Up",
//                     },
//                     {
//                       title: "Store Assessment",
//                       description: "Assessment in progress",
//                       completed: order.assessmentStatus === "Completed",
//                     },
//                     {
//                       title: "Initial Payment",
//                       description: `Initial payment: ${order.initialPayment}`,
//                       completed: !!order.initialPayment,
//                     },
//                     {
//                       title: "Laundry Unit Assignment",
//                       description: `Assigned to unit: ${order.assignedUnit}`,
//                       completed: !!order.assignedUnit,
//                     },
//                   ].map((step, index) => (
//                     <div key={index} className="flex items-center space-x-4">
//                       <div
//                         className={`h-6 w-6 rounded-full ${
//                           step.completed ? "bg-blue-500" : "bg-gray-300"
//                         }`}
//                       ></div>
//                       <div>
//                         <p className="font-semibold">{step.title}</p>
//                         <p className="text-gray-500">{step.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default TrackOrders;

// import React from "react";
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

// // Sample QR code image URL
// const qrCodeImageUrl = "https://via.placeholder.com/150"; // Replace this URL with your actual QR code image URL

// const order = {
//   id: "ORD12345",
//   status: "Pickup Scheduled",
//   pickupTime: "2024-10-02 12:00 PM",
//   deliveryStaff: "John Doe",
//   storeStatus: "Awaiting Clothes",
//   assessmentStatus: "Pending",
//   initialPayment: "$10.00",
//   assignedUnit: "Unit 5",
// };

// function TrackOrders() {
//   const { qrCode } = useLaundryPlans();

//   return (
//     <div className="flex flex-col flex-grow bg-gray-100 px-4 pt-2 pb-6 md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
//       <div className="max-w-7xl mx-auto w-full">
//         <h1 className="text-3xl font-semibold text-center mb-6 mt-5">
//           Track Your Laundry Order
//         </h1>
//         {/* Combined Order Info and Progress Timeline */}
//         <div className="bg-white p-6 sm:p-10 lg:p-10 rounded-lg shadow-md border border-gray-300 flex flex-col md:flex-row">
//           {/* Order Info on the left */}
//           <div className="flex-grow mb-20 md:mb-0">
//             <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
//             <div className="flex flex-col md:flex-row justify-between mb-4">
//               <div className="mb-4 md:mb-0">
//                 <p className="text-gray-600 mb-2">
//                   <strong>Status:</strong>
//                   <span
//                     className={`ml-2 inline-block px-3 py-1 rounded-full text-sm font-semibold ${
//                       order.status === "Pickup Scheduled"
//                         ? "bg-yellow-200 text-yellow-800"
//                         : order.status === "Picked Up"
//                         ? "bg-blue-200 text-blue-800"
//                         : "bg-gray-200 text-gray-800"
//                     }`}
//                   >
//                     {order.status}
//                   </span>
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   <strong>Pickup Time:</strong> {order.pickupTime}
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   <strong>Delivery Staff:</strong> {order.deliveryStaff}
//                 </p>
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
//                   onClick={() => alert(`Messaging ${order.deliveryStaff}`)}
//                 >
//                   Message the Delivery Staff
//                 </button>
//               </div>
//               <div>
//                 <p className="text-gray-600 mb-2">
//                   <strong>Store Status:</strong> {order.storeStatus}
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   <strong>Assessment:</strong> {order.assessmentStatus}
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   <strong>Initial Payment:</strong> {order.initialPayment}
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   <strong>Assigned Unit:</strong> {order.assignedUnit}
//                 </p>
//               </div>
//             </div>

//             {/* QR Code Below Timeline */}
//             <div className="flex flex-col items-center mt-10">
//               <img
//                 src={qrCodeImageUrl} // Use qrCode if you have a dynamic QR code
//                 alt="QR Code"
//                 className="w-80 h-80"
//               />
//               <p className="text-gray-600 mt-4 text-center">
//                 Wait for the staff to scan this QR code to update the progress
//                 of your laundry order.
//               </p>
//             </div>
//           </div>

//           {/* Progress Timeline on the right */}
//           <div className="md:w-auto flex-shrink-0 md:pl-20 ">
//             <h3 className="text-xl font-bold mb-4">Service Request Progress</h3>
//             <div className="relative pt-2">
//               <div className="border-l-2 border-blue-500 pl-4 space-y-4">
//                 {[
//                   {
//                     title: "Pending Pickup",
//                     description: `Waiting for assigning a pickup staff`,
//                     completed: true,
//                   },
//                   {
//                     title: "Ongoing Pickup",
//                     description: `Waiting for pickup by ${order.deliveryStaff}`,
//                     completed: false,
//                   },
//                   {
//                     title: "Pickup Scheduled",
//                     description: `Waiting for pickup by ${order.deliveryStaff}`,
//                     completed: false,
//                   },
//                   {
//                     title: "Clothes Picked Up",
//                     description: "On the way to store",
//                     completed: order.status === "Picked Up",
//                   },
//                   {
//                     title: "Store Assessment",
//                     description: "Assessment in progress",
//                     completed: order.assessmentStatus === "Completed",
//                   },
//                   {
//                     title: "Initial Payment",
//                     description: `Initial payment: ${order.initialPayment}`,
//                     completed: !!order.initialPayment,
//                   },
//                   {
//                     title: "Laundry Unit Assignment",
//                     description: `Assigned to unit: ${order.assignedUnit}`,
//                     completed: !!order.assignedUnit,
//                   },
//                 ].map((step, index) => (
//                   <div key={index} className="flex items-center space-x-4">
//                     <div
//                       className={`h-6 w-6 rounded-full ${
//                         step.completed ? "bg-blue-500" : "bg-gray-300"
//                       }`}
//                     ></div>
//                     <div>
//                       <p className="font-semibold">{step.title}</p>
//                       <p className="text-gray-500">{step.description}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TrackOrders;

// import React from "react";
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

// const order = {
//   id: "ORD12345",
//   status: "Pickup Scheduled",
//   pickupTime: "2024-10-02 12:00 PM",
//   deliveryStaff: "John Doe",
//   storeStatus: "Awaiting Clothes",
//   assessmentStatus: "Pending",
//   initialPayment: "$10.00",
//   assignedUnit: "Unit 5",
// };

// function TrackOrders() {
//   const { qrCode } = useLaundryPlans();

//   return (
//     <div className=" flex flex-col  flex-grow  bg-white px-4  pt-2 pb-6  md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
//       <div>
//         <h1 className="text-3xl font-semibold text-start mb-6 mt-5">
//           Track Your Laundry Order
//         </h1>

//         {/* Order Info */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
//           <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
//           <div className="flex flex-col md:flex-row justify-between">
//             <div>
//               <p className="text-gray-600 mb-2">
//                 <strong>Status:</strong> {order.status}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Pickup Time:</strong> {order.pickupTime}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Delivery Staff:</strong> {order.deliveryStaff}
//               </p>
//             </div>
//             <div>
//               <p className="text-gray-600 mb-2">
//                 <strong>Store Status:</strong> {order.storeStatus}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Assessment:</strong> {order.assessmentStatus}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Initial Payment:</strong> {order.initialPayment}
//               </p>
//               <p className="text-gray-600 mb-2">
//                 <strong>Assigned Unit:</strong> {order.assignedUnit}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Progress Timeline */}
//         <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-bold mb-4">Order Progress</h3>
//           <div className="relative pt-2">
//             <div className="border-l-2 border-blue-500 pl-4 space-y-4">
//               {[
//                 {
//                   title: "Pickup Scheduled",
//                   description: `Waiting for pickup by ${order.deliveryStaff}`,
//                   completed: true,
//                 },
//                 {
//                   title: "Clothes Picked Up",
//                   description: "On the way to store",
//                   completed: order.status === "Picked Up",
//                 },
//                 {
//                   title: "Store Assessment",
//                   description: "Assessment in progress",
//                   completed: order.assessmentStatus === "Completed",
//                 },
//                 {
//                   title: "Initial Payment",
//                   description: `Initial payment: ${order.initialPayment}`,
//                   completed: !!order.initialPayment,
//                 },
//                 {
//                   title: "Laundry Unit Assignment",
//                   description: `Assigned to unit: ${order.assignedUnit}`,
//                   completed: !!order.assignedUnit,
//                 },
//               ].map((step, index) => (
//                 <div key={index} className="flex items-center space-x-4">
//                   <div
//                     className={`h-6 w-6 rounded-full ${
//                       step.completed ? "bg-blue-500" : "bg-gray-300"
//                     }`}
//                   ></div>
//                   <div>
//                     <p className="font-semibold">{step.title}</p>
//                     <p className="text-gray-500">{step.description}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TrackOrders;
