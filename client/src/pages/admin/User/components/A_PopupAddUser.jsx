import React, { useState } from "react";
import useAuth from "../../../../contexts/AuthContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { COLORS } from "../../../../constants/color";
import { createAdminBasedNewUser } from "../../../../services/api/postApi";

const A_PopupAddUser = ({ open, onClose, storeData, roleData }) => {
  const { userDetails } = useAuth();
  const [username, setUsername] = useState("");
  const [defaultPassword, setDefaultPassword] = useState("lizaso12345");
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [number, setNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateFields = () => {
    const newErrors = {};

    const fields = {
      username: "Username is required",
      defaultPassword: "Password is required",
      firstname: "Firstname is required",
      lastname: "Lastname is required",
      number: "Mobile number is required",
      selectedRole: "Role is required",
      selectedStatus: "Status is required",
      selectedStore: "Store is required",
    };

    for (const field in fields) {
      let value;

      // Use if-else to determine which value to check
      if (field === "selectedStatus") {
        value = selectedStatus;
      } else if (field === "selectedRole") {
        value = selectedRole;
      } else if (field === "username") {
        value = username;
      } else if (field === "defaultPassword") {
        value = defaultPassword;
      } else if (field === "firstname") {
        value = firstname;
      } else if (field === "lastname") {
        value = lastname;
      } else if (field === "number") {
        value = number;
      } else if (field === "selectedStore") {
        value = selectedStore;
      }

      if (value === undefined || value === null || value === "") {
        newErrors[field] = fields[field];
      }
    }

    return newErrors;
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;

    const fieldToStateMap = {
      username: setUsername,
      defaultPassword: setDefaultPassword,
      firstname: setFirstname,
      lastname: setLastname,
      middlename: setMiddlename,
      number: setNumber,
      selectedRole: setSelectedRole,
      selectedStatus: setSelectedStatus,
      selectedStore: setSelectedStore,
    };

    const setFieldValue = fieldToStateMap[field];
    if (setFieldValue) {
      setFieldValue(value);
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  const handleCreateUser = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      const userData = {
        store_id: selectedStore,
        role_permissions_id: selectedRole,
        username: username,
        password: defaultPassword,
        mobile_number: number,
        first_name: firstname,
        middle_name: middlename,
        last_name: lastname,
        isStatus: selectedStatus,
      };

      try {
        const response = await createAdminBasedNewUser.setAdminBasedNewUser(
          userData
        );

        if (response.success) {
          toast.success(response.message);
          onClose();
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            username: response.message,
          }));
        }
      } catch (error) {
        toast.error(
          `Error posting new user: ${error.message || "Something went wrong"}`
        );
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setUsername("");
    setFirstname("");
    setLastname("");
    setNumber("");
    setSelectedRole("");
    setSelectedStatus("");
    setSelectedStore("");

    setErrors({});

    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      <DialogTitle className="flex flex-col">
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">Add a new user</span>
          </div>
          <IconButton
            onClick={handleDialogClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className="mt-1">
          Provide the details for the new user below.
        </Typography>
      </DialogTitle>
      <DialogContent>
        {/* Username */}
        <TextField
          margin="dense"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={handleInputChange("username")}
          error={Boolean(errors.username)}
          helperText={errors.username}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        />

        {/* Default Password */}
        <TextField
          margin="dense"
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle between text and password type
          fullWidth
          variant="outlined"
          value={defaultPassword}
          onChange={handleInputChange("defaultPassword")}
          error={Boolean(errors.defaultPassword)}
          helperText={errors.defaultPassword}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* First name, Last name, Middle name */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 1.5 }}>
          <TextField
            margin="dense"
            label="First name"
            type="text"
            fullWidth
            variant="outlined"
            value={firstname}
            onChange={handleInputChange("firstname")}
            error={Boolean(errors.firstname)}
            helperText={errors.firstname}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.secondary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.secondary,
              },
            }}
          />
          <TextField
            margin="dense"
            label="Last name"
            type="text"
            fullWidth
            variant="outlined"
            value={lastname}
            onChange={handleInputChange("lastname")}
            error={Boolean(errors.lastname)}
            helperText={errors.lastname}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.secondary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.secondary,
              },
            }}
          />
          <TextField
            margin="dense"
            label="Middle Initial"
            type="text"
            variant="outlined"
            value={middlename}
            onChange={handleInputChange("middlename")}
            sx={{
              width: "400px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.secondary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.secondary,
              },
            }}
          />
        </Box>
        {/* Mobile Number */}
        <TextField
          margin="dense"
          label="Mobile Number"
          type="tel"
          fullWidth
          variant="outlined"
          value={number}
          error={Boolean(errors.number)}
          helperText={errors.number}
          onChange={(e) => {
            const { value } = e.target;
            handleInputChange("number")({
              target: { value: value.replace(/[^0-9]/g, "") },
            });
          }}
          inputProps={{
            inputMode: "numeric",
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        />
        {/* Select a role */}
        <TextField
          select
          margin="dense"
          label="Role"
          fullWidth
          variant="outlined"
          value={selectedRole}
          onChange={handleInputChange("selectedRole")}
          error={Boolean(errors.selectedRole)}
          helperText={errors.selectedRole}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: COLORS.secondary,
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: COLORS.secondary,
            },
          }}
        >
          <MenuItem value="" disabled>
            Select a role
          </MenuItem>
          {roleData.map((role) => (
            <MenuItem key={role.id} value={role.id}>
              {role.role_name}
            </MenuItem>
          ))}
        </TextField>

        {/* Status and Permission */}
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          {/* Select a status */}
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            value={selectedStatus}
            onChange={handleInputChange("selectedStatus")}
            error={Boolean(errors.selectedStatus)}
            helperText={errors.selectedStatus}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.secondary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.secondary,
              },
            }}
          >
            <MenuItem value="" disabled>
              Select a status
            </MenuItem>
            <MenuItem value={0}>Activate</MenuItem>
            <MenuItem value={1}>Deactivate</MenuItem>
            <MenuItem value={2}>Pending</MenuItem>
          </TextField>
          {/* Select a store*/}
          <TextField
            select
            margin="dense"
            label="Store"
            fullWidth
            variant="outlined"
            value={selectedStore}
            onChange={handleInputChange("selectedStore")}
            error={Boolean(errors.selectedStore)}
            helperText={errors.selectedStore}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.secondary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.secondary,
              },
            }}
          >
            {/* Add your role options here */}
            <MenuItem value="" disabled>
              Select a store
            </MenuItem>
            {storeData.map((store) => (
              <MenuItem key={store.id} value={store.id}>
                {store.store_name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      {/* Footer */}
      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          variant="outlined"
          onClick={handleDialogClose}
          sx={{
            marginRight: 1,
            borderColor: "#595959",
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            color: "#595959",
            "&:hover": {
              borderColor: "#595959",
              backgroundColor: "rgba(144, 144, 144, 0.1)",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateUser}
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 500,
            minWidth: "90px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#3A5A85",
            },
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            "Create User"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default A_PopupAddUser;
// import React, { useState } from "react";
// import useAuth from "../../../../contexts/AuthContext";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   IconButton,
//   Box,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import toast from "react-hot-toast";
// import { COLORS } from "../../../../constants/color";

// const A_PopupAddUser = ({ open, onClose, storeData, roleData }) => {
//   const { userDetails } = useAuth();
//   const [username, setUsername] = useState("");
//   const [defaultPassword, setDefaultPassword] = useState("");
//   const [firstname, setFirstname] = useState("");
//   const [middlename, setMiddlename] = useState("");
//   const [lastname, setLastname] = useState("");
//   const [number, setNumber] = useState("");
//   const [selectedRole, setSelectedRole] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedStore, setSelectedStore] = useState("");

//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validateFields = () => {
//     const newErrors = {};
//     const fields = {
//       username: "Username is required",
//       defaultPassword: "Password is required",
//       firstname: "Firstname is required",
//       lastname: "Lastname is required",
//       number: "Mobile number is required",
//       selectedRole: "Role is required",
//       selectedStatus: "Status is required",
//       selectedStore: "Store is required",
//     };

//     for (const [field, errorMessage] of Object.entries(fields)) {
//       if (
//         (field === "selectedStatus" &&
//           (selectedStatus === undefined || selectedStatus === "")) ||
//         (!["selectedStatus", "selectedRole"].includes(field) && !eval(field))
//       ) {
//         newErrors[field] = errorMessage;
//       }
//     }

//     return newErrors;
//   };

//   const handleInputChange = (field) => (e) => {
//     const value = e.target.value;

//     const fieldToStateMap = {
//       username: setUsername,
//       defaultPassword: setDefaultPassword,
//       firstname: setFirstname,
//       lastname: setLastname,
//       middlename: setMiddlename,
//       number: setNumber,
//       selectedRole: setSelectedRole,
//       selectedStatus: setSelectedStatus,
//       selectedStore: setSelectedStore,
//     };

//     const setFieldValue = fieldToStateMap[field];
//     if (setFieldValue) {
//       setFieldValue(value);
//     }

//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field]: "",
//     }));
//   };

//   const handleCreateUser = async () => {
//     const newErrors = validateFields();
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       // setLoading(true);

//       console.log(selectedStatus);

//       setTimeout(async () => {}, 500);
//     }
//   };

//   const handleDialogClose = () => {
//     setUsername("");
//     setFirstname("");
//     setLastname("");
//     setNumber("");
//     setSelectedRole("");
//     setSelectedStatus("");
//     setSelectedStore("");

//     setErrors({});

//     onClose();
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleDialogClose}
//       maxWidth="sm"
//       fullWidth
//       PaperProps={{
//         style: {
//           borderRadius: 16,
//         },
//       }}
//     >
//       <DialogTitle className="flex flex-col">
//         <div className="flex justify-between items-center mt-2">
//           <div className="flex items-center space-x-2">
//             <span className="text-lg font-semibold">Add a new user</span>
//           </div>
//           <IconButton
//             onClick={handleDialogClose}
//             className="text-[#5787C8] hover:text-[#5787C8]"
//           >
//             <CloseIcon />
//           </IconButton>
//         </div>
//         <Typography variant="body2" color="textSecondary" className="mt-1">
//           Provide the details for the new user below.
//         </Typography>
//       </DialogTitle>
//       <DialogContent>
//         {/* Username */}
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1" htmlFor="username">
//             Username
//           </label>
//           <input
//             id="username"
//             type="text"
//             className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//               COLORS.secondary
//             } ${errors.username ? "border-red-500" : "border-gray-300"}`}
//             value={username}
//             onChange={handleInputChange("username")}
//             placeholder="Enter username"
//           />
//           {errors.username && (
//             <span className="text-red-500 text-sm">{errors.username}</span>
//           )}
//         </div>

//         {/* Default Password */}
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1" htmlFor="password">
//             Password
//           </label>
//           <input
//             id="password"
//             type="password"
//             className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//               COLORS.secondary
//             } ${errors.defaultPassword ? "border-red-500" : "border-gray-300"}`}
//             value={defaultPassword}
//             onChange={handleInputChange("defaultPassword")}
//             placeholder="Enter password"
//           />
//           {errors.defaultPassword && (
//             <span className="text-red-500 text-sm">
//               {errors.defaultPassword}
//             </span>
//           )}
//         </div>

//         {/* First name, Last name, Middle name */}
//         <Box sx={{ display: "flex", flexDirection: "row", gap: 1, mb: 1.5 }}>
//           <div className="mb-2 flex-1">
//             <label
//               className="block text-sm font-medium mb-1"
//               htmlFor="firstname"
//             >
//               First name
//             </label>
//             <input
//               id="firstname"
//               type="text"
//               className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//                 COLORS.secondary
//               } ${errors.firstname ? "border-red-500" : "border-gray-300"}`}
//               value={firstname}
//               onChange={handleInputChange("firstname")}
//               placeholder="Enter first name"
//             />
//             {errors.firstname && (
//               <span className="text-red-500 text-sm">{errors.firstname}</span>
//             )}
//           </div>
//           <div className="mb-2 flex-1">
//             <label
//               className="block text-sm font-medium mb-1"
//               htmlFor="lastname"
//             >
//               Last name
//             </label>
//             <input
//               id="lastname"
//               type="text"
//               className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//                 COLORS.secondary
//               } ${errors.lastname ? "border-red-500" : "border-gray-300"}`}
//               value={lastname}
//               onChange={handleInputChange("lastname")}
//               placeholder="Enter last name"
//             />
//             {errors.lastname && (
//               <span className="text-red-500 text-sm">{errors.lastname}</span>
//             )}
//           </div>
//           <div className="mb-2 flex-1">
//             <label
//               className="block text-sm font-medium mb-1"
//               htmlFor="middlename"
//             >
//               Middle Initial
//             </label>
//             <input
//               id="middlename"
//               type="text"
//               className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${COLORS.secondary}`}
//               value={middlename}
//               onChange={handleInputChange("middlename")}
//               placeholder="Enter middle initial"
//             />
//           </div>
//         </Box>

//         {/* Mobile Number */}
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1" htmlFor="number">
//             Mobile Number
//           </label>
//           <input
//             id="number"
//             type="tel"
//             className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//               COLORS.secondary
//             } ${errors.number ? "border-red-500" : "border-gray-300"}`}
//             value={number}
//             onChange={(e) => {
//               const { value } = e.target;
//               handleInputChange("number")({
//                 target: { value: value.replace(/[^0-9]/g, "") },
//               });
//             }}
//             inputProps={{
//               inputMode: "numeric",
//             }}
//             placeholder="Enter mobile number"
//           />
//           {errors.number && (
//             <span className="text-red-500 text-sm">{errors.number}</span>
//           )}
//         </div>

//         {/* Select a role */}
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1" htmlFor="role">
//             Role
//           </label>
//           <select
//             id="role"
//             className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//               COLORS.secondary
//             } ${errors.selectedRole ? "border-red-500" : "border-gray-300"}`}
//             value={selectedRole}
//             onChange={handleInputChange("selectedRole")}
//           >
//             <option value="">Select role</option>
//             {roleData.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.role}
//               </option>
//             ))}
//           </select>
//           {errors.selectedRole && (
//             <span className="text-red-500 text-sm">{errors.selectedRole}</span>
//           )}
//         </div>

//         {/* Select a store */}
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1" htmlFor="store">
//             Store
//           </label>
//           <select
//             id="store"
//             className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//               COLORS.secondary
//             } ${errors.selectedStore ? "border-red-500" : "border-gray-300"}`}
//             value={selectedStore}
//             onChange={handleInputChange("selectedStore")}
//           >
//             <option value="">Select store</option>
//             {storeData.map((store) => (
//               <option key={store.id} value={store.store_id}>
//                 {store.store_name}
//               </option>
//             ))}
//           </select>
//           {errors.selectedStore && (
//             <span className="text-red-500 text-sm">{errors.selectedStore}</span>
//           )}
//         </div>

//         {/* Select a status */}
//         <div className="mb-2">
//           <label className="block text-sm font-medium mb-1" htmlFor="status">
//             Status
//           </label>
//           <select
//             id="status"
//             className={`block w-full border rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring focus:ring-${
//               COLORS.secondary
//             } ${errors.selectedStatus ? "border-red-500" : "border-gray-300"}`}
//             value={selectedStatus}
//             onChange={handleInputChange("selectedStatus")}
//           >
//             <option value="">Select status</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//           {errors.selectedStatus && (
//             <span className="text-red-500 text-sm">
//               {errors.selectedStatus}
//             </span>
//           )}
//         </div>
//       </DialogContent>
//       <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
//         <Button
//           variant="outlined"
//           onClick={onClose}
//           sx={{
//             marginRight: 1,
//             borderColor: "#595959",
//             borderRadius: "5px",
//             fontWeight: 500,
//             textTransform: "none",
//             color: "#595959",
//             "&:hover": {
//               borderColor: "#595959",
//               backgroundColor: "rgba(144, 144, 144, 0.1)",
//             },
//           }}
//         >
//           Cancel
//         </Button>
//         <Button
//           onClick={handleCreateUser}
//           variant="contained"
//           disableElevation
//           sx={{
//             backgroundColor: "#5787C8",
//             borderRadius: "5px",
//             fontWeight: 500,
//             minWidth: "90px",
//             textTransform: "none",
//             "&:hover": {
//               backgroundColor: "#3A5A85",
//             },
//           }}
//           disabled={loading}
//         >
//           {loading ? (
//             <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
//           ) : (
//             "Create User"
//           )}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default A_PopupAddUser;
