import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import React from "react";
import Notifications from "../../../components/settings/Notifications";
import Password from "../../../components/settings/Password";
import Profile from "../../../components/settings/Profile";
import ServiceType from "../../../components/settings/ServiceType";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Paper
        sx={{
          boxShadow: "none !important",
          borderRadius: "12px",
          borderStyle: "solid",
          borderWidth: "1px",
          borderColor: "divider",
        }}
      >
        <Typography variant="h4" sx={{ marginLeft: "20px", marginTop: "20px" }}>
          Settings
        </Typography>

        <Box sx={{ width: "100%", mt: 3 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              mb: 2,
              position: "sticky",
              top: "64px",
              backgroundColor: "background.paper",
              zIndex: 1,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                },
                "& .Mui-selected": {
                  color: "#5787C8",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#5787C8",
                },
              }}
            >
              <Tab label="Profile" {...a11yProps(0)} />
              <Tab label="Password" {...a11yProps(1)} />
              <Tab label="Notifications" {...a11yProps(2)} />
              <Tab label="Dashboard" {...a11yProps(3)} />
              <Tab label="Service Types" {...a11yProps(4)} />
            </Tabs>
          </Box>

          {/* Main content that scrolls as a whole */}
          <TabPanel value={value} index={0}>
            <Profile />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Password />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Notifications />
          </TabPanel>
          <TabPanel value={value} index={3}>
            {/* Add Dashboard component or content here */}
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ServiceType />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;

// import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import React from "react";
// import Notifications from "../../../components/settings/Notifications";
// import Password from "../../../components/settings/Password";
// import Profile from "../../../components/settings/Profile";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box
//           sx={{ p: 3, height: "calc(100vh - 64px - 72px)", overflowY: "auto" }}
//         >
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const Settings = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Paper
//         sx={{
//           boxShadow: "none !important",
//           borderRadius: "12px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           p: "20px",
//         }}
//       >
//         <Typography variant="h4">Settings</Typography>

//         <Box sx={{ width: "100%", mt: 3 }}>
//           <Box
//             sx={{
//               borderBottom: 1,
//               borderColor: "divider",
//               mb: 2,
//               position: "sticky",
//               top: "64px", // Adjust for the navbar height
//               backgroundColor: "background.paper",
//               zIndex: 1,
//             }}
//           >
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="basic tabs example"
//               sx={{
//                 "& .MuiTab-root": {
//                   textTransform: "none",
//                 },
//                 "& .Mui-selected": {
//                   color: "#5787C8",
//                 },
//                 "& .MuiTabs-indicator": {
//                   backgroundColor: "#5787C8",
//                 },
//               }}
//             >
//               <Tab label="Profile" {...a11yProps(0)} />
//               <Tab label="Password" {...a11yProps(1)} />
//               <Tab label="Notifications" {...a11yProps(2)} />
//               <Tab label="Dashboard" {...a11yProps(3)} />
//             </Tabs>
//           </Box>
//           <TabPanel value={value} index={0}>
//             <Profile />
//           </TabPanel>
//           <TabPanel value={value} index={1}>
//             <Password />
//           </TabPanel>
//           <TabPanel value={value} index={2}>
//             <Notifications />
//           </TabPanel>
//           <TabPanel value={value} index={3}>
//             {/* Add Dashboard component or content here */}
//           </TabPanel>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Settings;

// import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import React from "react";
// import Notifications from "../../../components/settings/Notifications";
// import Password from "../../../components/settings/Password";
// import Profile from "../../../components/settings/Profile";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const Settings = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Paper
//         sx={{
//           boxShadow: "none !important",
//           borderRadius: "12px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           p: "20px",
//         }}
//       >
//         <Typography variant="h4">Settings</Typography>

//         <Box sx={{ width: "100%", mt: 3 }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="basic tabs example"
//               sx={{
//                 "& .MuiTab-root": {
//                   textTransform: "none",
//                 },
//                 "& .Mui-selected": {
//                   color: "#5787C8",
//                 },
//                 "& .MuiTabs-indicator": {
//                   backgroundColor: "#5787C8",
//                 },
//               }}
//             >
//               <Tab label="Profile" {...a11yProps(0)} />
//               <Tab label="Password" {...a11yProps(1)} />
//               <Tab label="Notifications" {...a11yProps(2)} />
//               <Tab label="Dashboard" {...a11yProps(3)} />
//             </Tabs>
//           </Box>
//           <TabPanel value={value} index={0}>
//             <Profile />
//           </TabPanel>
//           <TabPanel value={value} index={1}>
//             <Password />
//           </TabPanel>
//           <TabPanel value={value} index={2}>
//             <Notifications />
//           </TabPanel>
//           <TabPanel value={value} index={3}>
//             {/* Add Dashboard component or content here */}
//           </TabPanel>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Settings;

// import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
// import PropTypes from "prop-types";
// import { useState } from "react";
// import React from "react";
// import Notifications from "../../../components/settings/Notifications";
// import Password from "../../../components/settings/Password";
// import Profile from "../../../components/settings/Profile";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const Settings = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Paper
//         sx={{
//           boxShadow: "none !important",
//           borderRadius: "12px",
//           borderStyle: "solid",
//           borderWidth: "1px",
//           borderColor: "divider",
//           p: "20px",
//         }}
//       >
//         <Typography variant="h4">Settings</Typography>

//         <Box sx={{ width: "100%", mt: 3 }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               value={value}
//               onChange={handleChange}
//               aria-label="basic tabs example"
//             >
//               <Tab label="Profile" {...a11yProps(0)} />
//               <Tab label="Password" {...a11yProps(1)} />
//               <Tab label="Notifications" {...a11yProps(2)} />
//               <Tab label="Dashboard" {...a11yProps(3)} />
//             </Tabs>
//           </Box>
//           <TabPanel value={value} index={0}>
//             <Profile />
//           </TabPanel>
//           <TabPanel value={value} index={1}>
//             {/* <Password /> */}
//           </TabPanel>
//           <TabPanel value={value} index={2}>
//             {/* <Notifications /> */}
//           </TabPanel>
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default Settings;
