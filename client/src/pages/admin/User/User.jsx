import React from "react";

const stores = [
  {
    id: 1,
    name: "Lizaso Main Store",
    users: [
      { id: 1, name: "John Doe", role: "Manager" },
      { id: 2, name: "Jane Smith", role: "Staff" },
    ],
  },
  {
    id: 2,
    name: "Lizaso Branch Store",
    users: [
      { id: 3, name: "Emily Johnson", role: "Staff" },
      { id: 4, name: "Michael Brown", role: "Delivery" },
    ],
  },
];

const User = () => {
  return (
    <div className="pt-20 pb-5 p-4">
      {/* First Row */}
      <div className="bg-blue-300 h-40 mb-4">
        <p className="text-center text-white font-bold">First Row</p>
      </div>

      {/* Second Row with Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-300 h-40">
          <p className="text-center text-white font-bold">Column 1</p>
        </div>
        <div className="bg-red-300 h-40">
          <p className="text-center text-white font-bold">Column 2</p>
        </div>
      </div>
    </div>
  );
};

export default User;
{
  /* {stores.map((store) => (
        <div key={store.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{store.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {store.users.map((user) => (
              <div
                key={user.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            ))}
          </div>
        </div>
      ))} */
}
