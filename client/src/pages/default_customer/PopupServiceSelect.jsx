import React from "react";
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
  if (!service) return null;

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(); // Call the submit function passed as a prop
    }
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog
      open={Boolean(service)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "lg",
          p: 2,
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
        }}
      >
        Service Details
        <Button onClick={onClose} sx={{ color: "text.primary" }}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <img
                src={service.image} // Assuming `service.image` contains the URL to the image
                alt={service.label}
                className="object-cover w-full h-full"
              />
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
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
            />
            <TextField
              label="Additional Notes"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className="text-white bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          className="text-blue-500 hover:bg-blue-100"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupServiceSelect;
