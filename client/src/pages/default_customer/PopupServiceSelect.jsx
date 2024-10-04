import React from "react";
import useLaundryPlans from "../../hooks/customers/useLaundryPlans";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/style";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const PopupServiceSelect = ({ service, onClose }) => {
  const navigate = useNavigate();
  const {
    qrCode,
    name,
    note,
    setNote,
    handleInputChange,
    handleSubmit,
    loading,
    errors,
  } = useLaundryPlans(onClose);

  const handleNavigateToTrackOrder = () => {
    navigate("/customer-page/track-orders");
  };

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
          onChange={handleInputChange("name")}
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{ mb: 2 }}
        />
        <div>
          <label className="block text-[#212121] text-sm font-semibold mb-1">
            Additional Notes{" "}
            <span className="text-[#595959] font-normal">(Optional)</span>
          </label>
          <TextField
            label=""
            variant="outlined"
            fullWidth
            multiline
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            margin="dense"
          />
        </div>
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
          onClick={(e) => handleSubmit(service.service_id, e)}
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
            "Submit"
          )}
        </Button>
      </DialogActions>

      {/* Show QR Code if available */}
      {qrCode && (
        <Dialog
          open={Boolean(qrCode)}
          fullWidth
          onClose={onClose}
          PaperProps={{
            style: {
              borderRadius: 16,
              boxShadow: "none", // Removes the background shadow
            },
          }}
          maxWidth="xs"
        >
          <DialogTitle
            style={{ marginTop: "16px" }}
            className="flex justify-center"
          >
            <span className="font-semibold text-center text-xl">
              {/* Changed to h2 to match the structure */}
              Customer Request QR Code
            </span>
          </DialogTitle>
          <DialogContent className="flex flex-col items-center p-4">
            <p className="mb-2 text-center text-sm">
              {/* Used p for the paragraph */}
              Here is the QR code for the customer’s service request. Please
              scan this code to process the delivery request effectively.
            </p>
            <QRCodeCanvas value={qrCode} alt="QR Code" size={300} />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              disableElevation
              onClick={handleNavigateToTrackOrder}
              sx={{
                marginRight: 1,
                backgroundColor: "#5787C8",
                borderRadius: "5px",
                fontWeight: 500,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#3A5A85",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
};

export default PopupServiceSelect;

{
  /* Show QR Code if available */
}
{
  /* {qrCode && (
          <Dialog
            open={Boolean(qrCode)}
            fullWidth
            PaperProps={{
              style: {
                borderRadius: 16,
              },
            }}
          >
            <DialogContent className="flex flex-col items-center ">
              <Typography variant="body2" className="mb-2">
                Your QR Code:
              </Typography>
              <img
                src={qrCode}
                alt="QR Code"
                style={{ width: "100%", height: "auto" }}
              />
            </DialogContent>
            <DialogActions>
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
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )} */
}

{
  /* <QRCodeCanvas value={qrCode} size={150} />{" "} */
}
{
  /* Adjust size as needed */
}

// useEffect(() => {
//   if (service && service.label) {
//     setServiceType(service.label);
//   }
// }, [service, setServiceType]);

// if (!service) return null;

{
  /* <div
          style={{
            border: `2px solid ${styles.border1}`,
            borderRadius: "5px",
            padding: "8px",
            marginBottom: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="flex items-center my-2 ">
            <span className="text-base font-semibold flex items -center">
              {service.service_name}
              <span className="ml-4 flex items-center">
                <span className="text-sm px-3 py-1 rounded-md border-2 border-[#5787C8]  text-[#5787C8] bg-[##3D6F9B] bg-opacity-10 font-normal mr-2">
                  PHP {service.default_price}
                </span>
                <span className="text-sm px-3 py-1 rounded-full border-2 border-[#eb3941] bg-[#f15e64] bg-opacity-10 text-[#eb3941] font-normal">
                  A
                </span>
              </span>
            </span>
          </div>
        </div> */
}

{
  /* <div className="flex items-center my-2 ">
            <span className="text-base font-semibold flex items -center">
              {service.service_name}
              <span className="ml-4 flex items-center">
                <span className="text-sm px-3 py-1 rounded-md border-2 border-[#5787C8]  text-[#5787C8] bg-[##3D6F9B] bg-opacity-10 font-normal mr-2">
                  PHP {service.default_price}
                </span>
                <span className="text-sm px-3 py-1 rounded-full border-2 border-[#eb3941] bg-[#f15e64] bg-opacity-10 text-[#eb3941] font-normal">
                  A
                </span>
              </span>
            </span>
          </div> */
}

{
  /* <Grid container spacing={4}>
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
        </Grid> */
}

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
