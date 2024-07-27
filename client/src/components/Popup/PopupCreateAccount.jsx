import React from "react";
import styles from "../../style";

import X from "@mui/icons-material/Close";

const PopupCreateAccount = ({
  showCreateAccountPopup,
  setShowCreateAccountPopup,
}) => {
  return (
    <>
      {showCreateAccountPopup && (
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
                    Create account
                  </h1>
                </div>
                <div>
                  <X
                    className="text-2xl cursor-pointer"
                    onClick={() => setShowCreateAccountPopup(false)}
                  />
                </div>
              </div>
              {/* Register form section*/}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4"
                />
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
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="w-full rounded-md border border-gray-300 dark:border-gray-500 px-2 py-1 mb-4"
                />

                {/* Login button section*/}
                <div>
                  <button
                    className="w-full text-white p-2 rounded-md font-semibold"
                    style={{ background: styles.buttonColor1 }}
                    //onClick={() => setShowPopup(false)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupCreateAccount;
