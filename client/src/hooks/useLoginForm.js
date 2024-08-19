import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../services/api/authClient";
// import { useAuth } from "../contexts/AuthContext"; // Assuming you have this context
import useAuth from "./useAuth";

const useLoginForm = (setLoginShowPopup, showLoginPopup) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { setAccessToken } = useAuth(); // Use the context to set the token
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pahtname || "/";

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
      const { success, userType, accessToken } = await loginService.login({
        username: loginUsername,
        password: loginPassword,
      });

      if (success) {
        if (accessToken) {
          // Store the access token in context or local storage
          setAccessToken(accessToken);
        }
        alert("Login successful!");
        setLoginUsername("");
        setLoginPassword("");
        setLoginShowPopup(false);

        console.log("Here the access token: " + accessToken);
        navigate(from, { replace: true });

        // navigate(userType === "Customer" ? "/customer-page" : "/main");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage(error.message); // Display the error message from loginService
      // console.error("There was an error logging in:", error);
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
    isVisible,
  };
};

export default useLoginForm;
