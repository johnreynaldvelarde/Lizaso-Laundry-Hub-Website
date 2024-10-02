import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const PopupServiceSelect = ({ service, onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const {
    name,
    note,
    setName,
    setNote,
    serviceType,
    setServiceType,
    handleSubmit,
  } = useLaundryPlans();

  useEffect(() => {
    if (service && service.label) {
      setServiceType(service.label);
    }
  }, [service, setServiceType]);

  if (!service) return null;

  return (
    <Dialog
      open={Boolean(service)}
      onClose={onClose}
      maxWidth="xs"
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
            <span className="text-lg font-semibold">Service Details</span>
          </div>
          <IconButton
            onClick={onClose}
            className="text-[#5787C8] hover:text-[#5787C8]"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="textSecondary" className="mt-1">
          Complete the service request below.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Service Name"
          type="text"
          fullWidth
          variant="outlined"
          value={service.service_name}
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2 }}
        />

        <TextField
          autoFocus
          margin="dense"
          label="Your Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Additional Notes"
          variant="outlined"
          fullWidth
          multiline
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          margin="dense"
        />
        {/* <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Typography variant="h6" component="div" className="mb-4">
              {service.label}
            </Typography>
            <Typography variant="body1" color="textSecondary" className="mb-6">
              Price: ${service.price}{" "}
            </Typography>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Additional Notes"
              variant="outlined"
              fullWidth
              multiline
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              margin="normal"
            />
          </Grid>
        </Grid> */}
      </DialogContent>

      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          variant="outlined"
          onClick={onClose}
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
          variant="contained"
          disableElevation
          // onClick={handleSave}
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
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupServiceSelect;

{
  /* <Dialog
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
            </Typography>
            <TextField
              label="Your Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Additional Notes"
              variant="outlined"
              fullWidth
              multiline
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
      </DialogActions> */
}

{
  /* <DialogActions>
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
      </DialogActions> */
}
