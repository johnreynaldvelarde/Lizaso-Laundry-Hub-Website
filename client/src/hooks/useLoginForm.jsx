import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/api/authClient";
import { checkCustomerDetails } from "../services/api/checkApi";
import useAuth from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useLoginForm = (setLoginShowPopup, showLoginPopup) => {
  const { userDetails, fetchUserDetails, setAccessToken } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("rose16");
  const [loginPassword, setLoginPassword] = useState("@Secret12345");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state
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
      const { success, userId, userType, roleName, permissions, accessToken } =
        await loginService.login({
          username: loginUsername,
          password: loginPassword,
        });

      if (success) {
        if (accessToken) {
          setAccessToken(accessToken);
          await fetchUserDetails(accessToken);
        }

        setLoginUsername("");
        setLoginPassword("");

        if (userType === "Customer") {
          const details = await checkCustomerDetails.getCheckCustomerDetails(
            userId
          );

          const { storeIdIsNull, addressIdIsNull, isVerified } = details.data;

          if (details.success !== false) {
            if (!isVerified) {
              navigate("/verified-account");
            } else if (storeIdIsNull || addressIdIsNull) {
              navigate("/complete-details");
            } else {
              navigate("/customer-page");
            }
          } else {
            toast.error("Failed to check customer details.");
          }
        } else {
          if (roleName === "Administrator") {
            navigate("/main");
          } else if (roleName === "Manager") {
            navigate("/main");
          } else if (roleName === "Store Staff") {
            navigate("/main");
          } else {
          }
        }
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forget-password");
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
    handleLogin,
    handleForgotPassword,
    handleInputChange,
    isVisible,
    loading,
  };
};

export default useLoginForm;
