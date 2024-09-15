import React, { useState } from "react";
import { Divider, Typography, Button, Grid, Box, Paper } from "@mui/material";
import { PlusCircle } from "@phosphor-icons/react";
import PopupServiceType from "./PopupServiceType";

// Sample service types data with IDs
const initialServiceTypes = [
  { id: 1, name: "Wash", price: "55.00" },
  { id: 2, name: "Wash/Dry", price: "55.00" },
  { id: 3, name: "Wash/Dry/Fold", price: "30.00" },
];

const ServiceType = () => {
  const [serviceTypes, setServiceTypes] = useState(initialServiceTypes);
  const [openPopup, setOpenPopup] = useState(false);

  const handleAddService = () => {
    setOpenPopup(true); // Open the popup when button is clicked
  };

  const handleClosePopup = () => {
    setOpenPopup(false); // Close the popup
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "1200px", margin: "auto" }}>
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        Service Types
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8, pb: 2 }}>
        Configure your laundry service types and default prices.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Service List */}
      <Grid container spacing={3}>
        {serviceTypes.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper
              sx={{
                boxShadow: "none",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider", // Use divider color for the border
                p: 2,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.3rem" },
                  wordBreak: "break-word",
                }}
              >
                {service.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  wordBreak: "break-word",
                }}
              >
                Price: ₱{service.price}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Button variant="outlined" size="small">
                Edit
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add New Service Button */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          startIcon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 600,
            textTransform: "none",
            paddingLeft: "23px",
            paddingRight: "23px",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#3b5c9f",
            },
          }}
          onClick={handleAddService}
        >
          Add new service
        </Button>
      </Box>
      <PopupServiceType open={openPopup} onClose={handleClosePopup} />
    </Box>
  );
};

export default ServiceType;

// import React, { useState } from "react";
// import {
//   Divider,
//   Typography,
//   Button,
//   Grid,
//   Box,
//   Card,
//   CardContent,
//   CardActions,
// } from "@mui/material";

// // Sample service types data with IDs
// const initialServiceTypes = [
//   { id: 1, name: "Wash", price: "10.00" },
//   { id: 2, name: "Wash/Dry", price: "15.00" },
//   { id: 3, name: "Wash/Dry/Fold", price: "20.00" },
//   { id: 4, name: "Dry Clean", price: "25.00" },
//   { id: 5, name: "Iron", price: "5.00" },
//   { id: 6, name: "Steam Press", price: "12.00" },
//   { id: 7, name: "Curtain Wash", price: "30.00" },
//   { id: 8, name: "Carpet Clean", price: "50.00" },
//   { id: 9, name: "Shoe Cleaning", price: "20.00" },
//   { id: 10, name: "Delicate Wash", price: "18.00" },
// ];

// const ServiceType = () => {
//   const [serviceTypes, setServiceTypes] = useState(initialServiceTypes);

//   const handleAddService = () => {
//     // Add new service with a unique ID (incrementing the current max ID by 1)
//     const newService = {
//       id: serviceTypes.length + 1,
//       name: "New Service",
//       price: "0.00",
//     };
//     setServiceTypes([...serviceTypes, newService]);
//   };

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "1200px", margin: "auto" }}>
//       {/* Header */}
//       <Typography variant="h5" gutterBottom>
//         Service Types
//       </Typography>
//       <Typography variant="body2" sx={{ opacity: 0.8, pb: 2 }}>
//         Configure your laundry service types and default prices.
//       </Typography>
//       <Divider sx={{ mb: 3 }} />

//       {/* Service List */}
//       <Grid container spacing={3}>
//         {serviceTypes.map((service) => (
//           <Grid item xs={12} sm={6} md={4} key={service.id}>
//             <Card sx={{ height: "100%" }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {service.name}
//                 </Typography>
//                 <Typography variant="body1">Price: ${service.price}</Typography>
//               </CardContent>
//               <CardActions>
//                 <Button variant="outlined" size="small">
//                   Edit
//                 </Button>
//               </CardActions>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Add New Service Button */}
//       <Box sx={{ mt: 4, textAlign: "center" }}>
//         <Button variant="contained" color="primary" onClick={handleAddService}>
//           Add New Service
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ServiceType;

// import React, { useState } from "react";
// import useAuth from "../../contexts/AuthContext";
// import {
//   Divider,
//   TextField,
//   Typography,
//   Button,
//   Grid,
//   Box,
// } from "@mui/material";

// const ServiceType = () => {
//   return (
//     <Box>
//       <Typography variant="subtitle1">Notifications</Typography>
//       <Typography variant="subtitle2" sx={{ opacity: 0.8, pb: 2 }}>
//         All Notification settings here
//       </Typography>
//       <Divider />
//     </Box>
//   );
// };

// export default ServiceType;
