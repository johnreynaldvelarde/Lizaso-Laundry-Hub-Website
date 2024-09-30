import React from "react";
import styles from "../../style"; // Assuming you have some global styles

const featuresData = [
  {
    title: "Easy Booking",
    description: "Book your laundry service in just a few clicks.",
    icon: "📅", // You can replace this with an actual icon or image
  },
  {
    title: "Track Your Orders",
    description: "Stay updated with real-time tracking of your laundry.",
    icon: "📦",
  },
  {
    title: "Quality Cleaning",
    description: "We ensure your clothes are cleaned with the best methods.",
    icon: "🧼",
  },
  {
    title: "Pickup & Delivery",
    description:
      "Enjoy hassle-free pickup and delivery right at your doorstep.",
    icon: "🚚", // Delivery truck icon
  },
];

const Features = () => {
  return (
    <div
      className="py-20 bg-gradient-to-r from-[#447F8C] to-[#5787C8]  min-h-[500px] flex items-center"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">
          Our Features
        </h2>{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center transition-transform transform hover:scale-105 h-full"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

// import React from "react";
// import styles from "../../style";

// const Features = () => {
//   return (
//     <div className="relative mt-52  min-h-[800px]">
//       <div className="text-center">
//         <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
//           Pricing
//         </span>
//         <h2
//           className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide"
//           style={{ color: styles.textColor2 }}
//         >
//           Easily choose
//           <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text ">
//             {" "}
//             affordable price
//           </span>
//         </h2>
//       </div>
//     </div>
//   );
// };

// export default Features;
