import React from "react";

function PaymentHistory() {
  // Sample payment history data
  const paymentHistory = [
    {
      id: "ORD12345",
      date: "2024-09-20",
      services: "Wash & Dry",
      paymentMethod: "Credit Card",
      amount: "$15.00",
    },
    {
      id: "ORD12346",
      date: "2024-09-25",
      services: "Dry Cleaning",
      paymentMethod: "PayPal",
      amount: "$25.00",
    },
    {
      id: "ORD12347",
      date: "2024-09-30",
      services: "Wash, Dry & Fold",
      paymentMethod: "Cash",
      amount: "$20.00",
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <div className="text-3xl font-semibold text-center mb-6">
        Payment History
      </div>

      {/* Payment History Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Services</th>
              <th className="px-6 py-3 text-left">Payment Method</th>
              <th className="px-6 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="px-6 py-4">{payment.date}</td>
                <td className="px-6 py-4">{payment.id}</td>
                <td className="px-6 py-4">{payment.services}</td>
                <td className="px-6 py-4">{payment.paymentMethod}</td>
                <td className="px-6 py-4 text-right">{payment.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed View */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Order Details</h3>
        <p className="text-gray-600 mb-2">
          <strong>Order ID:</strong> {paymentHistory[0].id}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Date:</strong> {paymentHistory[0].date}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Services:</strong> {paymentHistory[0].services}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Payment Method:</strong> {paymentHistory[0].paymentMethod}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Amount:</strong> {paymentHistory[0].amount}
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          View Receipt
        </button>
      </div>
    </div>
  );
}

export default PaymentHistory;
