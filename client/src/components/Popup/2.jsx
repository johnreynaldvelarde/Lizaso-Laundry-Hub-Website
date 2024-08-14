import React from "react";
import X from "@mui/icons-material/Close";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useLoginForm from "../../hooks/useLoginForm";

const PopupLogin = ({ showLoginPopup, setLoginShowPopup }) => {
  const {
    passwordVisible,
    setPasswordVisible,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    rememberMe,
    setRememberMe,
    errorMessage,
    handleLogin,
    handleForgotPassword,
    isVisible,
  } = useLoginForm(setLoginShowPopup);

  return (
    <>
      {showLoginPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setLoginShowPopup(false)}
          ></div>
          {/* Login Popup */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg z-50 w-[80%] max-w-md">
            <button
              onClick={() => setLoginShowPopup(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              <X />
            </button>
            <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
            <p className="text-sm text-gray-600 mb-6">
              Welcome back, you've been missed
            </p>
            <form onSubmit={handleLogin}>
              {errorMessage && (
                <div className="mb-4 p-2 bg-red-100 text-red-700">
                  {errorMessage}
                </div>
              )}
              <input
                type="text"
                placeholder="Username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
              />
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
                >
                  {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </button>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <span>Remember me</span>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="mt-4 text-blue-500 hover:underline"
              >
                Forgot Password?
              </button>
              <div className="flex items-center justify-between mt-6">
                <button className="flex items-center space-x-2 border border-gray-300 rounded p-2 hover:bg-gray-100">
                  <GoogleIcon />
                  <span>Sign in with Google</span>
                </button>
                <button className="flex items-center space-x-2 border border-gray-300 rounded p-2 hover:bg-gray-100">
                  <FacebookIcon />
                  <span>Sign in with Facebook</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupLogin;
