import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../../contexts/AuthContext";
import {
  Divider,
  Typography,
  Button,
  Grid,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import { PlusCircle, MinusSquare } from "@phosphor-icons/react";
import PopupServiceType from "./PopupServiceType";
import { getServiceTypeAndStore } from "../../../../services/api/getApi";
import ConfirmationDialog from "../../../../components/common/ConfirmationDialog";
import { updateDeleteServiceType } from "../../../../services/api/putApi";

const ServiceType = () => {
  const { userDetails } = useAuth();
  const [storeData, setStoreData] = useState([]);
  const [allServiceTypes, setAllServiceTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [editServiceData, setEditServiceData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchServiceType = async () => {
    if (!userDetails?.storeId) return;

    try {
      const response = await getServiceTypeAndStore.getServiceType(
        userDetails.storeId
      );
      if (response) {
        const stores = response.stores || [];
        const serviceTypes = response.serviceTypes || [];

        setStoreData(stores);
        setAllServiceTypes(serviceTypes);

        if (stores.length > 0) {
          setSelectedStoreId(stores[0].id);
          setServiceTypes(
            serviceTypes.filter((service) => service.store_id === stores[0].id)
          );
        } else {
          setServiceTypes(serviceTypes);
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchServiceType();
  }, [userDetails?.storeId]);

  const refreshData = () => {
    fetchServiceType();
  };

  const handleStoreSelect = (storeId) => {
    setSelectedStoreId(storeId);
    setServiceTypes(
      allServiceTypes.filter((service) => service.store_id === storeId)
    );
  };

  const handleAddService = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleEditService = (service) => {
    setEditServiceData(service);
    setOpenEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    setEditServiceData(null);
  };

  const handleDialogDelete = (id) => {
    setSelectedServiceId(id);
    setDialogOpen(true);
  };

  const handleDeleteService = async (id) => {
    if (id) {
      try {
        const response = await updateDeleteServiceType.putDeleteServiceType(id);
        if (response.success) {
          toast.success(response.message);
          refreshData();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error(`Error: ${error.message || "Something went wrong"}`);
      }
    } else {
      toast.error("Error Action!!!");
    }
  };

  return (
    <Box
      sx={{
        p: {
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
        },
      }}
    >
      {/* Header */}
      <Typography variant="h5" gutterBottom>
        Service Types
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8, pb: 2 }}>
        Configure your laundry service types and default prices.
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Conditionally show the list of stores if storeData is available */}
      {storeData.length > 0 && (
        <Box
          className="hori-scrollable"
          sx={{ overflowX: "auto", mb: 4, mt: 2, paddingBottom: 1 }}
        >
          <Box sx={{ display: "inline-flex", gap: 2 }}>
            {storeData.map((store) => (
              <Paper
                key={store.id}
                onClick={() => handleStoreSelect(store.id)}
                sx={{
                  p: 2,
                  minWidth: "120px",
                  cursor: "pointer",
                  borderRadius: "8px",
                  border: `1px solid`,
                  borderColor:
                    selectedStoreId === store.id
                      ? "#5787C8"
                      : (theme) => theme.palette.divider,
                  backgroundColor:
                    selectedStoreId === store.id ? "#ECF1F8" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  whiteSpace: "normal",
                  overflow: "hidden",
                  boxShadow: "none",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: selectedStoreId === store.id ? "#5787C8" : "inherit",
                  }}
                >
                  {store.store_name}
                </Typography>
              </Paper>
            ))}
          </Box>
        </Box>
      )}

      {/* Service List */}
      <Grid container spacing={3}>
        {serviceTypes.map((service) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
            <Paper
              sx={{
                boxShadow: "none",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
                p: { xs: 1.5, sm: 2, md: 3 }, // Adjust padding for different screen sizes
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontSize: {
                    xs: "1.2rem",
                    sm: "1.15rem",
                    md: "1.4rem",
                    lg: "1.3rem",
                  }, // Responsive font size
                  wordBreak: "break-word",
                }}
              >
                {service.service_name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  wordBreak: "break-word",
                }}
              >
                Price: ₱{service.default_price}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  onClick={() => handleEditService(service)}
                  variant="outlined"
                  size="small"
                >
                  Edit
                </Button>
                <IconButton onClick={() => handleDialogDelete(service.id)}>
                  <MinusSquare size={20} color="#DB524B" weight="duotone" />
                </IconButton>
              </Box>
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
      <PopupServiceType
        open={openPopup}
        onClose={handleClosePopup}
        storeId={selectedStoreId}
        onSuccess={refreshData}
      />
      {editServiceData && (
        <PopupServiceType
          open={openEditPopup}
          onClose={handleCloseEditPopup}
          storeId={selectedStoreId}
          serviceData={editServiceData}
          onSuccess={refreshData}
        />
      )}

      <ConfirmationDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onConfirm={handleDeleteService}
        itemId={selectedServiceId}
      />
    </Box>
  );
};

export default ServiceType;

{
  /* <Grid container spacing={3}>
        {serviceTypes.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.id}>
            <Paper
              sx={{
                boxShadow: "none",
                borderRadius: "12px",
                border: "1px solid",
                borderColor: "divider",
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
                {service.service_name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  wordBreak: "break-word",
                }}
              >
                Price: ₱{service.default_price}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="outlined" size="small">
                  Edit
                </Button>
                <IconButton
                // onClick={}
                >
                  <MinusSquare size={20} color="#DB524B" weight="duotone" />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid> */
}
