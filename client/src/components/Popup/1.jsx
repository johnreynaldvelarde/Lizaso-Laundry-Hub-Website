// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "../../style";
// import { useNavigate } from "react-router-dom";
// import X from "@mui/icons-material/Close";
// import GoogleIcon from "@mui/icons-material/Google";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// const PopupLogin = ({ showLoginPopup, setLoginShowPopup }) => {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [isVisible, setIsVisible] = useState(showLoginPopup);
//   const [loginUsername, setLoginUsername] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(""); // State for error message
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     if (loginUsername === "" || loginPassword === "") {
//       setErrorMessage("Username and password are required.");
//       return;
//     }
//     // if (loginUsername === "" || loginPassword === "") {
//     //   setErrorMessage("Username and password are required.");
//     // } else if (loginUsername !== "admin") {
//     //   setErrorMessage("Account does not exist.");
//     // } else {
//     //   setErrorMessage("");
//     //   navigate("/main");
//     // }

//     try {
//       const data = {
//         username: loginUsername,
//         password: loginPassword,
//       };

//       const response = await axios.post(
//         "http://localhost:3002/User_Account",
//         data
//       );

//       if (response.data.success) {
//         // Assuming your API returns a success field
//         console.log(response.data);
//         alert("Login successful!");

//         // Clear form fields
//         setLoginUsername("");
//         setLoginPassword("");

//         // Hide any popups or modals
//         setShowCreateAccountPopup(false);

//         // Navigate to the main page
//         navigate("/main");
//       } else {
//         // Handle cases where login fails (e.g., incorrect credentials)
//         setErrorMessage("Invalid username or password.");
//       }

//       // console.log(response.data);
//       // alert("Login account successfully!");

//       // setLoginUsername("");
//       // setLoginPassword("");

//       // setShowCreateAccountPopup(false);
//     } catch (error) {
//       console.error("There was an error login the account:", error);
//       alert("There was an error login the account. Please try again.");
//     }
//   };

//   const handleForgotPassword = () => {
//     // Add your forgot password logic here
//     console.log("Forgot Password");
//   };

//   useEffect(() => {
//     setIsVisible(showLoginPopup);
//   }, [showLoginPopup]);

//   // Function to clear error message on input change
//   const handleInputChange = (setter) => (e) => {
//     setter(e.target.value);
//     setErrorMessage(""); // Clear error message on input change
//   };

//   return (
//     <>
//       {showLoginPopup && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           {/* Backdrop */}
//           <div
//             className={`fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity duration-300 ${
//               isVisible ? "opacity-100" : "opacity-0"
//             }`}
//             onClick={() => setLoginShowPopup(false)}
//           ></div>

//           {/* Login Popup */}
//           <div
//             className={`relative bg-white p-8 rounded-lg shadow-lg z-50 transition-transform duration-300 ${
//               isVisible ? "scale-100" : "scale-90 opacity-0"
//             } w-[80%] max-w-md`}
//           >
//             <button
//               onClick={() => setLoginShowPopup(false)}
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
//             >
//               <X />
//             </button>
//             <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
//             <p className="text-sm text-gray-600 mb-6">
//               Welcome back, you've been missed
//             </p>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleLogin();
//               }}
//             >
//               {errorMessage && (
//                 <div className="mb-4 p-2 bg-red-100 text-red-600 border border-red-400 rounded font-light">
//                   {errorMessage}
//                 </div>
//               )}
//               <div className="mb-4">
//                 <label
//                   htmlFor="username"
//                   className="block text-sm font-medium mb-2 ms-1"
//                   style={{ color: styles.textColor2 }}
//                 >
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   value={loginUsername}
//                   onChange={handleInputChange(setLoginUsername)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm custom-focus-ring"
//                   required
//                 />
//               </div>
//               <div className="mb-4 relative">
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium mb-2 ms-1"
//                   style={{ color: styles.textColor2 }}
//                 >
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={passwordVisible ? "text" : "password"}
//                     id="password"
//                     value={loginPassword}
//                     onChange={handleInputChange(setLoginPassword)}
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none sm:text-sm pr-10 custom-focus-ring"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setPasswordVisible(!passwordVisible)}
//                     className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
//                   >
//                     {passwordVisible ? (
//                       <VisibilityOffIcon />
//                     ) : (
//                       <VisibilityIcon />
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <div className="flex items-center mb-4">
//                 <input
//                   type="checkbox"
//                   id="rememberMe"
//                   checked={rememberMe}
//                   onChange={() => setRememberMe(!rememberMe)}
//                   className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="rememberMe"
//                   className="ml-2 block text-sm text-gray-900"
//                 >
//                   Remember me for 30 days
//                 </label>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 text-white font-semibold rounded-lg flex items-center justify-center mb-4"
//                 style={{ background: styles.buttonColor1 }}
//               >
//                 Sign in
//               </button>
//             </form>
//             <div className="text-center mb-4">
//               <button
//                 onClick={handleForgotPassword}
//                 className="text-sm text-blue-500 hover:underline"
//               >
//                 Forgot Password?
//               </button>
//             </div>
//             <button
//               onClick={handleLogin}
//               className="w-full mb-4 py-2 px-4 bg-blue-500 text-white rounded-lg flex items-center justify-center"
//             >
//               <GoogleIcon className="mr-2" /> Sign in with Google
//             </button>
//             <button
//               onClick={handleLogin}
//               className="w-full py-2 px-4 bg-blue-700 text-white rounded-lg flex items-center justify-center"
//             >
//               <FacebookIcon className="mr-2" /> Sign in with Facebook
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default PopupLogin;
