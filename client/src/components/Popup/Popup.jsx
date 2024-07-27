import React from "react";
import styles from "../../style";

import X from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const Popup = ({ showPopup, setShowPopup }) => {
  return (
    <>
      {showPopup && (
        <div>
          <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[300px]">
              {/* Header Section*/}
              <div className="flex items-center justify-between">
                <div>
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: styles.textColor2 }}
                  >
                    Login
                  </h1>
                </div>
                <div>
                  <X
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowPopup(false)}
                  />
                </div>
              </div>
              {/* Login form section*/}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4"
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4"
                />

                {/* Login button section*/}
                <div>
                  <button
                    className="w-full text-white p-2 rounded-md font-semibold"
                    style={{ background: styles.buttonColor1 }}
                    //onClick={() => setShowPopup(false)}
                  >
                    Login
                  </button>
                </div>

                {/* Login Social*/}
                <div className="mt-4">
                  <p
                    className="text-center"
                    style={{ color: styles.textColor2 }}
                  >
                    or login with
                  </p>
                  <div className="flex justify-center gap-2 mt-2">
                    <GoogleIcon className="text-3xl hover:text-red-500 duration-200 cursor-pointer" />
                    <FacebookIcon className="text-3xl hover:text-blue-500 duration-200 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
