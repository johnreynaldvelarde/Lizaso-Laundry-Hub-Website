import React, { useCallback, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Paper, Typography } from "@mui/material";
import { COLORS } from "../../../../constants/color";
import mark from "../../../../assets/images/mark_1.png";

const CustomLocationMapCustomerStores = () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(14.814821);
  const [longitude, setLongitude] = useState(120.91127);

  const defaultIcon = new L.Icon({
    iconUrl: mark,
    iconSize: [40, 40],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleMarkerDragEnd = (event) => {
    const marker = event.target;
    const newLatLng = marker.getLatLng();

    setLatitude(newLatLng.lat);
    setLongitude(newLatLng.lng);
  };

  return (
    <Paper
      sx={{
        p: 5,
        boxShadow: "none",
        border: 1,
        borderColor: COLORS.border,
        borderRadius: "14px",
      }}
    >
      <Typography fontWeight={600} color={COLORS.primary} fontSize={20}>
        Total Laundry Revenue Growth by Month
      </Typography>

      <Box mt={5}>
        <Box
          sx={{
            flex: "0 0 auto", // Allows the box to take only the necessary space
            height: "500px", // Set a specific height for the map
            width: "100%",
            padding: 1,
            borderWidth: 1,
            borderColor: COLORS.border,
          }}
        >
          <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[latitude, longitude]}
              icon={defaultIcon}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDragEnd,
              }}
            >
              <Popup>Drag me to change the location</Popup>
            </Marker>
          </MapContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default CustomLocationMapCustomerStores;
