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
  const { name, note, setName, serviceType, setServiceType, handleSubmit } =
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
            <Typography variant="body1" color="textSecondary" className="mb-6">
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
              label="Additional Notes"
              variant="outlined"
              fullWidth
              multiline
              value={note}
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
