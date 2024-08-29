import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerService, checkUsername } from "../services/api/authClient";
import toast from 'react-hot-toast'; 

const useRegisterForm = (showCreateAccountPopup, setShowCreateAccountPopup) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(showCreateAccountPopup);

  // Hold Inputs
  const [data, setData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    isAgreement: "",
  });

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgreement, setIsAgreement] = useState("");

  useEffect(() => {
    setIsVisible(showCreateAccountPopup);
  }, [showCreateAccountPopup]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password length validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    // Password match validation
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      // Check if the username already exists
      const checkResponse = await checkUsername.getCheckUsername({
        username: userName,
      });

      if (
        checkResponse &&
        checkResponse.message &&
        checkResponse.message.includes("already exists")
      ) {
        toast.error("Username already exists ");
        return;
      }

      // Proceed with registration if the username is available
      const response = await registerService.register({
        c_firstname: firstName,
        c_middlename: middleName,
        c_lastname: lastName,
        c_username: userName,
        c_password: password,
        c_email: "",
        c_number: "",
        isAgreement: isAgreement,
      });

      if (response.success) {
        toast.success("Registration successful!");
        setShowCreateAccountPopup(false); 

        // Clear form inputs
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setIsAgreement("");
      } else {
        toast.error(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("There was an error registering:", error);
      toast.error("There was an error registering. Please try again.");
    }
  };

  return {
    passwordVisible,
    setPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    isVisible,
    setIsVisible,
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
    setData,
  };
};

export default useRegisterForm;
