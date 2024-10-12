import React from "react";
import useLaundryPlans from "../../hooks/customers/useLaundryPlans";

const order = {
  id: "ORD12345",
  status: "Pickup Scheduled",
  pickupTime: "2024-10-02 12:00 PM",
  deliveryStaff: "John Doe",
  storeStatus: "Awaiting Clothes",
  assessmentStatus: "Pending",
  initialPayment: "$10.00",
  assignedUnit: "Unit 5",
};

function TrackOrders() {
  const { qrCode } = useLaundryPlans();

  return (
    <div className=" flex flex-col  flex-grow  bg-white px-4  pt-2 pb-6  md:px-5 lg:px-10 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-20 4xl:pb-9">
      <div>
        <h1 className="text-3xl font-semibold text-start mb-6 mt-5">
          Track Your Laundry Order
        </h1>

        {/* Order Info */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Pickup Time:</strong> {order.pickupTime}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Delivery Staff:</strong> {order.deliveryStaff}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Store Status:</strong> {order.storeStatus}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Assessment:</strong> {order.assessmentStatus}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Initial Payment:</strong> {order.initialPayment}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Assigned Unit:</strong> {order.assignedUnit}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Order Progress</h3>
          <div className="relative pt-2">
            <div className="border-l-2 border-blue-500 pl-4 space-y-4">
              {[
                {
                  title: "Pickup Scheduled",
                  description: `Waiting for pickup by ${order.deliveryStaff}`,
                  completed: true,
                },
                {
                  title: "Clothes Picked Up",
                  description: "On the way to store",
                  completed: order.status === "Picked Up",
                },
                {
                  title: "Store Assessment",
                  description: "Assessment in progress",
                  completed: order.assessmentStatus === "Completed",
                },
                {
                  title: "Initial Payment",
                  description: `Initial payment: ${order.initialPayment}`,
                  completed: !!order.initialPayment,
                },
                {
                  title: "Laundry Unit Assignment",
                  description: `Assigned to unit: ${order.assignedUnit}`,
                  completed: !!order.assignedUnit,
                },
              ].map((step, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`h-6 w-6 rounded-full ${
                      step.completed ? "bg-blue-500" : "bg-gray-300"
                    }`}
                  ></div>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrders;

// import React, { useEffect, useState } from "react";
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";
// import PopupQRCode from "./PoupQRCode";

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
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="text-3xl font-semibold text-center mb-6">
//         Track Your Laundry Order
//       </div>
//       {/* Order Info */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-bold mb-4">Order ID: {order.id}</h2>
//         <div className="flex flex-col md:flex-row justify-between">
//           <div>
//             <p className="text-gray-600 mb-2">
//               <strong>Status:</strong> {order.status}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <strong>Pickup Time:</strong> {order.pickupTime}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <strong>Delivery Staff:</strong> {order.deliveryStaff}
//             </p>
//           </div>
//           <div>
//             <p className="text-gray-600 mb-2">
//               <strong>Store Status:</strong> {order.storeStatus}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <strong>Assessment:</strong> {order.assessmentStatus}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <strong>Initial Payment:</strong> {order.initialPayment}
//             </p>
//             <p className="text-gray-600 mb-2">
//               <strong>Assigned Unit:</strong> {order.assignedUnit}
//             </p>
//           </div>
//         </div>
//       </div>
//       ;{/* Progress Timeline  */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-bold mb-4">Order Progress</h3>
//         <div className="relative pt-2">
//           <div className="border-l-2 border-blue-500 pl-4 space-y-4">
//             <div className="flex items-center space-x-4">
//               <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
//               <div>
//                 <p className="font-semibold">Pickup Scheduled</p>
//                 <p className="text-gray-500">
//                   Waiting for pickup by {order.deliveryStaff}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div
//                 className={`h-6 w-6 rounded-full ${
//                   order.status === "Picked Up" ? "bg-blue-500" : "bg-gray-300"
//                 }`}
//               ></div>
//               <div>
//                 <p className="font-semibold">Clothes Picked Up</p>
//                 <p className="text-gray-500">On the way to store</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div
//                 className={`h-6 w-6 rounded-full ${
//                   order.assessmentStatus === "Completed"
//                     ? "bg-blue-500"
//                     : "bg-gray-300"
//                 }`}
//               ></div>
//               <div>
//                 <p className="font-semibold">Store Assessment</p>
//                 <p className="text-gray-500">Assessment in progress</p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div
//                 className={`h-6 w-6 rounded-full ${
//                   order.initialPayment ? "bg-blue-500" : "bg-gray-300"
//                 }`}
//               ></div>
//               <div>
//                 <p className="font-semibold">Initial Payment</p>
//                 <p className="text-gray-500">
//                   Initial payment: {order.initialPayment}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div
//                 className={`h-6 w-6 rounded-full ${
//                   order.assignedUnit ? "bg-blue-500" : "bg-gray-300"
//                 }`}
//               ></div>
//               <div>
//                 <p className="font-semibold">Laundry Unit Assignment</p>
//                 <p className="text-gray-500">
//                   Assigned to unit: {order.assignedUnit}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       ;
//     </div>
//   );
// }

// export default TrackOrders;
