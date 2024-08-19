import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../services/api/authClient";
import useAuth  from "../contexts/AuthContext";
// import useAuth from "../hooks/useAuth";

const useLoginForm = (setLoginShowPopup, showLoginPopup) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { setAccessToken } = useAuth();
  
  // Destructure `setAuth` from `useAuth`
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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
          console.log(accessToken);
          console.log(userType);
          setAccessToken(accessToken);

          // Correctly use `setAuth` to set userType and accessToken
          // setAuth({ userType, accessToken });
        }

        alert("Login successful!");

        setLoginUsername("");
        setLoginPassword("");
        setLoginShowPopup(false);

        // navigate(from, { replace: true });

        navigate(userType === "Customer" ? "/customer-page" : "/main");
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    } catch (error) {
      setErrorMessage(error.message); // Display the error message from loginService
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


// const useLoginForm = (setLoginShowPopup, showLoginPopup) => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loginUsername, setLoginUsername] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [isVisible, setIsVisible] = useState(false);
//   // const { setAccessToken } = useAuth(); // Use the context to set the token



//   const { setAuth, persist, setPersist  } = useAuth();


//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pahtname || "/";

//   useEffect(() => {
//     setIsVisible(showLoginPopup);
//   }, [showLoginPopup]);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (loginUsername === "" || loginPassword === "") {
//       setErrorMessage("Username and password are required.");
//       return;
//     }

//     try {
//       const { success, userType, accessToken } = await loginService.login({
//         username: loginUsername,
//         password: loginPassword,
//       });

//       if (success) {
//         if (accessToken) {
//           console.log(accessToken);
//           console.log(userType);
//           // setAccessToken(accessToken);

//           setAuth({userType, accessToken});
//         }
        
//         alert("Login successful!");

//         setLoginUsername("");
//         setLoginPassword("");
//         setLoginShowPopup(false);

//         navigate(from, { replace: true });

//         // navigate(userType === "Customer" ? "/customer-page" : "/main");
//       } else {
//         setErrorMessage("Unexpected error occurred.");
//       }
//     } catch (error) {
//       setErrorMessage(error.message); // Display the error message from loginService
//       // console.error("There was an error logging in:", error);
//     }
//   };

//   const handleForgotPassword = () => {
//     console.log("Forgot Password");
//   };

//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value);
//     setErrorMessage("");
//   };

//   return {
//     passwordVisible,
//     setPasswordVisible,
//     loginUsername,
//     setLoginUsername,
//     loginPassword,
//     setLoginPassword,
//     rememberMe,
//     setRememberMe,
//     errorMessage,
//     handleLogin,
//     handleForgotPassword,
//     handleInputChange,
//     isVisible,
//   };
// };

// export default useLoginForm;


// // import { useAuth } from "../contexts/AuthContext"; // Assuming you have this context