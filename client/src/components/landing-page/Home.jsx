import React from "react";
import w_1 from "../../assets/images/w_1.jpg";
import m_1 from "../../assets/images/1636.jpg";

import styles from "../../style";
import Wave from "./Wave";

const Home = () => {
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
      <div className="flex flex-col items-center mt-6 lg:mt-20 ">
        <div className="relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
            <div>
              <span className="font-bold" style={{ color: styles.textColor2 }}>
                LAUNDRY
              </span>
            </div>
            <div>
              <span className="font-bold" style={{ color: styles.textColor1 }}>
                WASH & DRY & FOLD
              </span>
            </div>
          </h1>
          <div className="mt-4 max-w-2xl text-center">
            <p
              className="font-light text-xl leading-relaxed"
              style={{ color: styles.textColor2 }}
            >
              We provide professional and reliable laundry services, including
              washing, drying, and folding ensuring your clothes are fresh and
              pristine.
            </p>
          </div>
          <div className="mt-10">
            <a
              href="#"
              className="text-white p-3 px-16 rounded-3xl shadow-md"
              style={{ background: styles.buttonColor1 }}
            >
              Get Service Now
            </a>
          </div>

          <div className="mt-20">
            <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Save Time and Money
                </h3>
                <p className="text-gray-600">
                  Experience efficient service and cost savings.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Pay Online in Seconds
                </h3>
                <p className="text-gray-600">
                  Secure and fast payment options available.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
                <h3 className="text-xl font-semibold mb-2">
                  Satisfaction Guarantee
                </h3>
                <p className="text-gray-600">
                  We ensure you are fully satisfied with our service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

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
