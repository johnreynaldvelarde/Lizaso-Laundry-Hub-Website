// import React from "react";
// import useLaundryPlans from "../../hooks/customers/useLaundryPlans";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   TextField,
//   Typography,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const PopupServiceSelect = ({ service, onClose, onSubmit }) => {
//   const { name, setName, serviceType, setServiceType, handleSubmit } =
//     useLaundryPlans();

//   if (!service) return null;

//   return (
//     <Dialog
//       open={Boolean(service)}
//       onClose={onClose}
//       maxWidth="md"
//       fullWidth
//       PaperProps={{
//         sx: {
//           borderRadius: "lg",
//           p: 2,
//           boxShadow: "md",
//         },
//       }}
//     >
//       <DialogTitle
//         sx={{
//           fontWeight: "bold",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         Service Details
//         <Button onClick={onClose} sx={{ color: "text.primary" }}>
//           <CloseIcon />
//         </Button>
//       </DialogTitle>
//       <DialogContent>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
//               <img
//                 src={service.image} // Assuming `service.image` contains the URL to the image
//                 alt={service.label}
//                 className="object-cover w-full h-full"
//               />
//             </div>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" component="div" className="mb-4">
//               {service.label}
//             </Typography>
//             <Typography variant="body1" color="textSecondary" className="mb-4">
//               Price: ${service.price}{" "}
//               {/* Assuming `service.price` contains the price */}
//             </Typography>
//             <TextField
//               label="Your Name"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
//             <TextField
//               label="Additional Notes"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={4}
//               margin="normal"
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={handleSubmit}
//           variant="contained"
//           color="primary"
//           className="text-white bg-blue-500 hover:bg-blue-600"
//         >
//           Submit
//         </Button>
//         <Button
//           onClick={onClose}
//           variant="outlined"
//           color="secondary"
//           className="text-blue-500 hover:bg-blue-100"
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PopupServiceSelect;
import React from "react";
import useLaundryPlans from "../../hooks/customers/useLaundryPlans";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopupServiceSelect = ({ service, onClose, onSubmit }) => {
  const { name, setName, serviceType, setServiceType, handleSubmit } =
    useLaundryPlans();

  React.useEffect(() => {
    if (service && service.label) {
      setServiceType(service.label);
    }
  }, [service, setServiceType]);

  if (!service) return null;

  return (
    <Dialog
      open={Boolean(service)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "lg",
          p: 1,
          boxShadow: "md",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
      >
        Service Details
        <Button onClick={onClose} sx={{ color: "text.primary" }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" component="div" className="mb-4">
              {service.label}
            </Typography>
            <Typography variant="body1" color="textSecondary" className="mb-4">
              Price: ${service.price}{" "}
              {/* Assuming `service.price` contains the price */}
            </Typography>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              // onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <TextField
              label="Additional Notes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            /> */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            marginRight: 2,
            marginBottom: 2,
            textTransform: "none",
            backgroundColor: "#4690FF",
            "&:hover": {
              backgroundColor: "#357ABD",
            },
          }}
        >
          Request a service
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupServiceSelect;
