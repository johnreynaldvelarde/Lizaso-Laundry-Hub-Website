import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/api/authClient";
import { checkCustomerDetails } from "../services/api/checkApi";
import useAuth from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useLoginForm = (setLoginShowPopup, showLoginPopup) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(showLoginPopup);
  }, [showLoginPopup]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginUsername === "" || loginPassword === "") {
      setErrorMessage("Username and password are required.");
      return;
    }

    setLoading(true);

    try {
      const { success, userType, accessToken } = await loginService.login({
        username: loginUsername,
        password: loginPassword,
      });

      if (success) {
        if (accessToken) {
          setAccessToken(accessToken);
        }

        toast.success("Login successful!");

        setLoginUsername("");
        setLoginPassword("");

        setTimeout(async () => {
          if (userType === "Customer") {
            const customerDetails =
              await checkCustomerDetails.getCheckCustomerDetails(loginUsername);

            if (customerDetails.success !== false) {
              // Navigate based on customer details
              if (
                customerDetails.storeIdIsNull ||
                customerDetails.cNumberIsNull ||
                customerDetails.cEmailIsNull
              ) {
                navigate("/complete-details");
              } else {
                navigate("/customer-page");
              }
            } else {
              // Handle the case where checking customer details fails
              toast.error("Failed to check customer details.");
            }
          } else {
            // Redirect to main page for non-customer users
            navigate("/main");
          }
        }, 1000);

        // Use setTimeout to allow toast to show before navigation
        // setTimeout(() => {
        //   setLoginShowPopup(false);
        //   navigate(userType === "Customer" ? "/customer-page" : "/main");
        // }, 1000); // Adjust delay as needed
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  const handleForgotPassword = () => {
    console.log("Forgot Password");
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrorMessage("");
  };

  return {
    passwordVisible,
    setPasswordVisible,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    rememberMe,
    setRememberMe,
    errorMessage,
    loading, // Expose loading state
    handleLogin,
    handleForgotPassword,
    handleInputChange,
    isVisible,
  };
};

export default useLoginForm;
