import React, { useEffect, useState } from "react";
import useLaundryPlans from "../../hooks/customers/useLaundryPlans";
import PopupQRCode from "./PoupQRCode";

function TrackOrders() {
  const { qrCode } = useLaundryPlans();
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  useEffect(() => {
    if (qrCode) {
      console.log("QR Code updated:", qrCode);
      setShowPopup(true); // Show the popup when QR code is updated
    } else {
      console.log("QR Code is null or empty.");
    }
  }, [qrCode]);

  const handleShowPopup = () => {
    if (qrCode) {
      setShowPopup(true);
    } else {
      console.log("No QR code available to show.");
    }
  };

  // useEffect(() => {
  //   // Log the QR code whenever it changes
  //   console.log("QR Code updated:", qrCode);
  // }, [qrCode]);

  // const handleShowPopup = () => {
  //   if (qrCode) {
  //     setShowPopup(true);
  //   } else {
  //     console.log("No QR code available to show.");
  //   }
  // };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-3xl font-semibold text-center mb-6">
        Track Your Laundry Order
      </div>
      <button onClick={handleShowPopup} className="btn-primary">
        Show QR Code
      </button>
      {showPopup && <PopupQRCode qrCode={qrCode} />}

      {/* {qrCode && (
        <>
          <button
            onClick={handleShowPopup}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Show QR Code
          </button>
          {showPopup && <PopupQRCode qrCode={qrCode} />}
        </>
      )} */}
    </div>
  );
}

export default TrackOrders;

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

{
  /* Order Info */
}
{
  /* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
      </div> */
}

{
  /* Progress Timeline */
}
{
  /* <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Order Progress</h3>
        <div className="relative pt-2">
          <div className="border-l-2 border-blue-500 pl-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-semibold">Pickup Scheduled</p>
                <p className="text-gray-500">
                  Waiting for pickup by {order.deliveryStaff}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`h-6 w-6 rounded-full ${
                  order.status === "Picked Up" ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="font-semibold">Clothes Picked Up</p>
                <p className="text-gray-500">On the way to store</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`h-6 w-6 rounded-full ${
                  order.assessmentStatus === "Completed"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="font-semibold">Store Assessment</p>
                <p className="text-gray-500">Assessment in progress</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`h-6 w-6 rounded-full ${
                  order.initialPayment ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="font-semibold">Initial Payment</p>
                <p className="text-gray-500">
                  Initial payment: {order.initialPayment}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div
                className={`h-6 w-6 rounded-full ${
                  order.assignedUnit ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div>
                <p className="font-semibold">Laundry Unit Assignment</p>
                <p className="text-gray-500">
                  Assigned to unit: {order.assignedUnit}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
