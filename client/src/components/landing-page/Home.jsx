import React, { useState } from "react";
import { motion } from "framer-motion";
import m_1 from "../../assets/images/1636.jpg";
import styles from "../../style";

import background_1 from "../../assets/images/background_1.jpg";
import background_2 from "../../assets/images/background_2.jpg";
import background_3 from "../../assets/images/b_1.jpg";
import background_4 from "../../assets/images/b_2.jpg";

const images = [background_1, background_2, background_3, background_4];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="bg-green-100 py-10"
      style={{
        backgroundImage: `url(${m_1})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        backgroundColor: styles.divider,
      }}
    >
      <div className="container mx-auto flex flex-col lg:flex-row items-center min-h-[650px]">
        {/* Text content */}
        <div className="lg:w-1/2 px-4 lg:px-0 flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0">
          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide">
            <div>
              <span className="font-bold" style={{ color: styles.textColor2 }}>
                LAUNDRY
              </span>
            </div>
            <div>
              <span className="font-bold" style={{ color: styles.secondary }}>
                WASH & DRY & FOLD
              </span>
            </div>
          </h1>

          {/* Description */}
          <div className="mt-4 max-w-2xl">
            <p
              className="font-medium text-xl leading-relaxed"
              style={{ color: styles.textColor2 }}
            >
              We provide professional and reliable laundry services, including
              washing, drying, and folding, ensuring your clothes are fresh and
              pristine.
            </p>
          </div>

          {/* Button */}
          <div className="mt-10">
            <a
              href="#"
              className="inline-block text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 p-4 rounded-full shadow-md transition duration-300"
              style={{ background: styles.buttonColor1 }}
            >
              Get Service Now
            </a>
          </div>
        </div>

        {/* Image Container with Floating Box */}
        <div className="lg:w-1/2 px-4 lg:px-0 relative flex justify-center">
          <div className="relative bg-white shadow-lg p-4 rounded-md flex items-center justify-center md:h-[500px] md:w-[700px] lg:h-[500px] lg:w-[650px]">
            {/* Left Arrow */}
            <button
              className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
              onClick={handlePrevClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={images[currentImageIndex]}
              alt="Laundry Service"
              className="w-full h-full object-cover rounded-md"
            />

            {/* Right Arrow */}
            <button
              className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2"
              onClick={handleNextClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React from "react";
// import m_1 from "../../assets/images/1636.jpg";
// import styles from "../../style";

// import background_1 from "../../assets/images/background_1.jpg";
// import background_2 from "../../assets/images/background_2.jpg";
// import background_3 from "../../assets/images/b_1.jpg";
// import background_4 from "../../assets/images/b_2.jpg";
// const Home = () => {
//   return (
//     <div
//       className="bg-green-100 py-10"
//       style={{
//         backgroundImage: `url(${m_1})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundBlendMode: "overlay",
//         backgroundColor: styles.divider,
//       }}
//     >
//       <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center min-h-[600px]">
//         {/* Text content */}
//         <div className="lg:w-1/2 px-4 lg:px-0 flex flex-col items-center lg:items-start text-center lg:text-left">
//           {/* Title */}
//           <h1 className="text-4xl sm:text-6xl lg:text-7xl tracking-wide">
//             <div>
//               <span className="font-bold" style={{ color: styles.textColor2 }}>
//                 LAUNDRY
//               </span>
//             </div>
//             <div>
//               <span className="font-bold" style={{ color: styles.textColor1 }}>
//                 WASH & DRY & FOLD
//               </span>
//             </div>
//           </h1>

//           {/* Description */}
//           <div className="mt-4 max-w-2xl">
//             <p
//               className="font-light text-xl leading-relaxed"
//               style={{ color: styles.textColor2 }}
//             >
//               We provide professional and reliable laundry services, including
//               washing, drying, and folding ensuring your clothes are fresh and
//               pristine.
//             </p>
//           </div>

//           {/* Button */}
//           <div className="mt-10">
//             <a
//               href="#"
//               className="text-white p-3 px-16 rounded-3xl shadow-md"
//               style={{ background: styles.buttonColor1 }}
//             >
//               Get Service Now
//             </a>
//           </div>
//         </div>

//         {/* Image Container with Floating Box */}
//         <div className="lg:w-1/2 px-4 lg:px-0 relative ">
//           <div className="relative bg-white shadow-lg p-4 rounded-md flex items-center justify-center">
//             {/* Left Arrow */}
//             <button className="absolute left-[-30px] top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//             </button>

//             {/* Image */}
//             <img
//               src={background_1}
//               alt="Laundry Service"
//               className="w-full h-auto object-cover"
//             />

//             {/* Right Arrow */}
//             <button className="absolute right-[-30px] top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// // import React from "react";
// // import w_1 from "../../assets/images/w_1.jpg";
// // import m_1 from "../../assets/images/1636.jpg";

// // import styles from "../../style";
// // import Wave from "./Wave";

// // const Home = () => {
// //   return (
// //     <div
// //       className="bg-green-100 py-10"
// //       style={{
// //         backgroundImage: `url(${m_1})`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundBlendMode: "overlay",
// //         backgroundColor: styles.divider,
// //       }}
// //     >
// //       <div className="min-h-[600px] ">
// //         <div className="relative z-10 flex flex-col items-center text-center">
// //           <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
// //             <div>
// //               <span className="font-bold" style={{ color: styles.textColor2 }}>
// //                 LAUNDRY
// //               </span>
// //             </div>
// //             <div>
// //               <span className="font-bold" style={{ color: styles.textColor1 }}>
// //                 WASH & DRY & FOLD
// //               </span>
// //             </div>
// //           </h1>
// //           <div className="mt-4 max-w-2xl text-center">
// //             <p
// //               className="font-light text-xl leading-relaxed"
// //               style={{ color: styles.textColor2 }}
// //             >
// //               We provide professional and reliable laundry services, including
// //               washing, drying, and folding ensuring your clothes are fresh and
// //               pristine.
// //             </p>
// //           </div>
// //           <div className="mt-10">
// //             <a
// //               href="#"
// //               className="text-white p-3 px-16 rounded-3xl shadow-md"
// //               style={{ background: styles.buttonColor1 }}
// //             >
// //               Get Service Now
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// {
//   /* <div className="mt-20">
//             <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center">
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Save Time and Money
//                 </h3>
//                 <p className="text-gray-600">
//                   Experience efficient service and cost savings.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Pay Online in Seconds
//                 </h3>
//                 <p className="text-gray-600">
//                   Secure and fast payment options available.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Satisfaction Guarantee
//                 </h3>
//                 <p className="text-gray-600">
//                   We ensure you are fully satisfied with our service.
//                 </p>
//               </div>
//             </div>
//           </div> */
// }

// export default Home;

{
  /* <div className="absolute inset-0 z-10">
          <img
            src={m_1}
            alt="background-image"
            className="h-full w-full object-cover opacity-30 dark:opacity-50"
          />
        </div> */
}

// import React from "react";
// import w_1 from "../../assets/images/w_1.jpg";
// import m_1 from "../../assets/images/1636.jpg";

// import styles from "../../style";
// import Wave from "./Wave";

// const Home = () => {
//   return (
//     <div className="bg-slate-300 py-10">
//       <div className="flex flex-col items-center mt-6 lg:mt-20 ">
//         <div className="absolute inset-0 z-0">
//           <img
//             src={m_1}
//             alt="background-image"
//             className="h-full w-full object-cover opacity-30 dark:opacity-50"
//           />
//           {/* <Wave /> */}
//         </div>
//         <div className="relative z-10 flex flex-col items-center text-center">
//           <div className="">
//             <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
//               <div>
//                 <span
//                   className="font-bold"
//                   style={{ color: styles.textColor2 }}
//                 >
//                   LAUNDRY
//                 </span>
//               </div>
//               <div>
//                 <span
//                   className="font-bold"
//                   style={{ color: styles.textColor1 }}
//                 >
//                   WASH & DRY & FOLD
//                 </span>
//               </div>
//             </h1>
//             <div className="mt-4 max-w-2xl text-center">
//               <p
//                 className="font-light text-xl leading-relaxed"
//                 style={{ color: styles.textColor2 }}
//               >
//                 We provide professional and reliable laundry services, including
//                 washing, drying, and folding ensuring your clothes are fresh and
//                 pristine.
//               </p>
//             </div>
//             <div className="mt-10">
//               <a
//                 href="#"
//                 className="text-white p-3 px-16 rounded-3xl shadow-md"
//                 style={{ background: styles.buttonColor1 }}
//               >
//                 Get Service Now
//               </a>
//             </div>
//           </div>

//           <div className="mt-20">
//             <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center">
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Save Time and Money
//                 </h3>
//                 <p className="text-gray-600">
//                   Experience efficient service and cost savings.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Pay Online in Seconds
//                 </h3>
//                 <p className="text-gray-600">
//                   Secure and fast payment options available.
//                 </p>
//               </div>
//               <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
//                 <h3 className="text-xl font-semibold mb-2">
//                   Satisfaction Guarantee
//                 </h3>
//                 <p className="text-gray-600">
//                   We ensure you are fully satisfied with our service.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
