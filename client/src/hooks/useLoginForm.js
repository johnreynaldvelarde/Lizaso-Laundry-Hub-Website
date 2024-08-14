import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/api/loginService";

const useLoginForm = (setLoginShowPopup, showLoginPopup) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
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

    try {
      const { success, userType, message } = await loginService.login({
        username: loginUsername,
        password: loginPassword,
      });

      if (success) {
        alert("Login successful!");
        setLoginUsername("");
        setLoginPassword("");
        setLoginShowPopup(false);
        navigate(userType === "Customer" ? "/customer-page" : "/main");
      } else {
        setErrorMessage(message || "Invalid username or password.");
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
      alert("There was an error logging in. Please try again.");
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
    handleLogin,
    handleForgotPassword,
    handleInputChange,
    isVisible
  };
};

export default useLoginForm;
