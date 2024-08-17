import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {loginService} from "../services/api/authClient";

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
        const { success, token, userType } = await loginService.login({
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
    isVisible
  };
};

export default useLoginForm;

 // if (rememberMe) {
            //     // localStorage.setItem('token', token); // Store in localStorage for persistent sessions
            // } else {
            //     // sessionStorage.setItem('token', token); // Store in sessionStorage for non-persistent sessions
            // }
