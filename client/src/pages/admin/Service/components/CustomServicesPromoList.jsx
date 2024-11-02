import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { COLORS } from "../../../../constants/color";
import usePopup from "../../../../hooks/common/usePopup";
import PopEditPromo from "./PopEditPromo";

const CustomServicesPromoList = ({
  servicesPromoData,
  onEdit,
  onDeactivate,
}) => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: "20px",
        }}
      >
        {servicesPromoData.map((service) => (
          <Box
            key={service.promo_id}
            sx={{
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              padding: "30px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: COLORS.white,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                marginBottom: "8px",
                color: COLORS.primary,
              }}
            >
              {service.service_name}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "16px",
                color: COLORS.subtitle,
              }}
            >
              {service.description || "No description available."}
            </Typography>

            {/* Display valid days */}
            <Typography
              variant="body2"
              sx={{
                marginBottom: "8px",
                color: COLORS.subtitle,
              }}
            >
              <span
                className="mr-1 font-semibold"
                style={{ color: COLORS.secondary }}
              >
                Valid Days:
              </span>
              {service.valid_days || "N/A"}
            </Typography>

            {/* Display start date and end date */}
            <Typography
              variant="body2"
              sx={{
                marginBottom: "8px",
                color: COLORS.subtitle,
              }}
            >
              <span
                className="mr-1 font-semibold"
                style={{ color: COLORS.primary }}
              >
                Start Date:
              </span>
              {service.start_date
                ? new Date(service.start_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginBottom: "16px",
                color: COLORS.subtitle,
              }}
            >
              <span
                className="mr-1 font-semibold"
                style={{ color: COLORS.primary }}
              >
                End Date:
              </span>
              {service.end_date
                ? new Date(service.end_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => openPopup("editPromo", service.promo_id)}
                sx={{
                  textTransform: "none",
                  color: COLORS.primary,
                  borderColor: COLORS.border,
                  width: "100%", // Set button width to fill available space
                  "&:hover": {
                    borderColor: COLORS.secondary,
                    color: COLORS.secondary,
                    backgroundColor: COLORS.secondaryLight,
                  },
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                onClick={() => onDeactivate(service.promo_id)}
                sx={{
                  textTransform: "none",
                  color: COLORS.primary,
                  borderColor: COLORS.border,
                  width: "100%",
                  "&:hover": {
                    borderColor: COLORS.error,
                    color: COLORS.error,
                    backgroundColor: COLORS.pale_error,
                  },
                }}
              >
                Deactivate
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Popup */}
      {isOpen && popupType === "editPromo" && (
        <PopEditPromo
          open={isOpen}
          onClose={closePopup}
          //   refreshData={handleRefreshData}
        />
      )}
    </>
  );
};

export default CustomServicesPromoList;
