import React, { useEffect, useState } from "react";
import styles from "../../style";

import w_1 from "../../assets/images/w_1.jpg";
import X from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PopupCreateAccount = ({
  showCreateAccountPopup,
  setShowCreateAccountPopup,
}) => {
  // State for managing password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [isVisible, setIsVisible] = useState(showCreateAccountPopup);

  useEffect(() => {
    setIsVisible(showCreateAccountPopup);
  }, [showCreateAccountPopup]);

  return (
    <>
      {showCreateAccountPopup && (
        <div>
          {/*h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm*/}
          <div
            className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md duration-200 w-[600px]">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-4">
                <div className="py-2">
                  <h1
                    className="text-2xl font font-semibold"
                    style={{ color: styles.textColor2 }}
                  >
                    Create an account
                  </h1>
                </div>
                <X
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowCreateAccountPopup(false)}
                />
              </div>
              <div className="py-1 p-2">
                <form>
                  {/* Fullname */}
                  <div className="mb-6 flex gap-4">
                    <div className="w-full">
                      <label
                        htmlFor="first-name"
                        className="block mb-2 text-base font-medium text-gray-900 ms-1"
                        style={{ color: styles.textColor2 }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        placeholder="John"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        style={{ outlineColor: styles.inputBorderColor1 }}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="middle-name"
                        className="block mb-2 text-base font-medium text-gray-900 ms-1"
                        style={{ color: styles.textColor2 }}
                      >
                        Middle Name
                      </label>
                      <input
                        type="text"
                        id="middle-name"
                        placeholder="Doe"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        style={{ outlineColor: styles.inputBorderColor1 }}
                      />
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="last-name"
                        className="block mb-2 text-base font-medium text-gray-900 ms-1"
                        style={{ color: styles.textColor2 }}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        placeholder="Smith"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        style={{ outlineColor: styles.inputBorderColor1 }}
                      />
                    </div>
                  </div>

                  {/*Username*/}
                  <div className="mb-6">
                    <label
                      htmlFor="usename"
                      className="block mb-2 text-base font-medium text-gray-900 ms-1 "
                      style={{ color: styles.textColor2 }}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="@johnSmith16"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      style={{ outlineColor: styles.inputBorderColor1 }}
                    />
                  </div>

                  {/* Phone Number */}
                  {/* <div className="mb-6">
                    <label
                      htmlFor="phone-input"
                      className="block mb-2 text-base font-medium text-gray-900 ms-1"
                      style={{ color: styles.textColor2 }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phone-input"
                      placeholder="+63 912 345 6789"
                      pattern="\+63 \d{3} \d{3} \d{4}"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                      style={{ outlineColor: styles.inputBorderColor1 }}
                    />
                    <p
                      id="helper-text-explanation"
                      className="mt-2 text-sm text-gray-500 ms-1"
                    >
                      Enter a phone number in the format +63 912 345 6789.
                    </p>
                  </div> */}

                  {/* Password */}
                  <div className="mb-6">
                    <label
                      htmlFor="password-input"
                      className="block mb-2 text-base font-medium text-gray-900 ms-1"
                      style={{ color: styles.textColor2 }}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password-input"
                        placeholder="Enter your password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        style={{ outlineColor: styles.inputBorderColor1 }}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                        onClick={() => setPasswordVisible(!passwordVisible)}
                      >
                        {passwordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="mb-6">
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-base font-medium text-gray-900 ms-1"
                      style={{ color: styles.textColor2 }}
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        id="confirm-password"
                        placeholder="Re-enter your password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                        style={{ outlineColor: styles.inputBorderColor1 }}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                        onClick={() =>
                          setConfirmPasswordVisible(!confirmPasswordVisible)
                        }
                      >
                        {confirmPasswordVisible ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terms and Condition */}
                  <div className="flex items-start mb-6 ms-1">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        required
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900"
                    >
                      I agree with the{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>

                  {/* Create button section */}
                  <div className="mb-3">
                    <button
                      className="w-full text-white p-2 rounded-md font-semibold"
                      style={{ background: styles.buttonColor1 }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupCreateAccount;
