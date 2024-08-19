import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {registerService } from '../services/api/authClient';

const useRegisterForm = ( showCreateAccountPopup, setShowCreateAccountPopup,) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(showCreateAccountPopup);

    // Hold Inputs
    const [data, setData] = useState({
      firstName: '',
      middleName: '',
      lastName: '',
      userName: '',
      password: '',
      confirmPassword: '',
      isAgreement: '',
    })

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
    
        // Password validation
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }

        try {
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
              alert("Registration successful!");
              setShowCreateAccountPopup(false); // Hide the registration form
            } else {
              alert(response.message || "Registration failed. Please try again.");
            }
      
          } catch (error) {
            console.error("There was an error registering:", error);
            alert("There was an error registering. Please try again.");
          }
    };
    


    return{
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