import React, { useEffect, useState } from "react";
import styles from "../../style";
import X from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useRegisterForm from "../../hooks/useRegisterForm";

const PopupCreateAccount = ({
  showCreateAccountPopup,
  setShowCreateAccountPopup,
}) => {
  const {
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    isVisible,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    userName,
    setUserName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isAgreement,
    setIsAgreement,
    handleRegister,
  } = useRegisterForm(showCreateAccountPopup, setShowCreateAccountPopup);

  return (
    <>
      {showCreateAccountPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setShowCreateAccountPopup(false)}
          ></div>
          <div
            className={`relative bg-white p-8 rounded-lg shadow-lg z-50 transition-transform duration-300 ${
              isVisible ? "scale-100" : "scale-90 opacity-0"
            }  `}
          >
            {/* Header Section */}
            <button
              onClick={() => setShowCreateAccountPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>
            <h1 className="text-2xl font-semibold mb-4">Create an Account</h1>
            <p className="text-sm text-gray-600 mb-6">
              Please fill in the details below to create a new account.
            </p>
            <div className="py-1 p-2">
              <form onSubmit={handleRegister}>
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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                    style={{ outlineColor: styles.inputBorderColor1 }}
                  />
                </div>

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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      id="agreement"
                      type="checkbox"
                      checked={isAgreement}
                      onChange={(e) => setIsAgreement(e.target.checked)}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                      required
                    />
                  </div>
                  <label
                    htmlFor="agreement"
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
      )}
    </>
  );
};

export default PopupCreateAccount;
