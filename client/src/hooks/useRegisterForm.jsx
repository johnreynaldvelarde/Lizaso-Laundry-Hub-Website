import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { checkCustomerDetails } from "../services/api/checkApi";
import {
  registerService,
  checkUsername,
  loginService,
} from "../services/api/authClient";
import toast from "react-hot-toast";

const useRegisterForm = (showCreateAccountPopup, setShowCreateAccountPopup) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(showCreateAccountPopup);
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();

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

      // const data = {
      //   firstname: firstName,
      //   middlename: middleName,
      //   lastname: lastName,
      //   username: userName,
      //   password: password,
      //   email: "",
      //   mobile_number: "",
      //   isAgreement: isAgreement,
      // };

      // const response = await registerService.register(data);

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

        // Automatically login the user after successful registration
        const loginResponse = await loginService.login({
          username: userName,
          password: password,
        });

        setAccessToken(loginResponse.accessToken);

        const userType = loginResponse.userType;

        setTimeout(async () => {
          if (userType === "Customer") {
            const customerDetails =
              await checkCustomerDetails.getCheckCustomerDetails(userName);

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

        // if (loginResponse.success) {
        //   setAccessToken(loginResponse.accessToken); // Store the access token
        //   toast.success("Login successful!");

        //   // Navigate the user to the appropriate page
        //   if (loginResponse.userType === "Customer") {
        //     navigate("/customer-page");
        //   } else {
        //     navigate("/main");
        //   }
        // } else {
        //   toast.error("Auto-login failed. Please login manually.");
        // }

        // Clear form inputs
        setFirstName("");
        setMiddleName("");
        setLastName("");
        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setIsAgreement("");
      } else {
        toast.error(
          response.message || "Registration failed. Please try again."
        );
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
