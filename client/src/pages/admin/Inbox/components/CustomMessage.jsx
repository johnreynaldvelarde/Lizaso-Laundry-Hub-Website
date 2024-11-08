import React from "react";
import { Box, Typography, TextField, Button, Avatar } from "@mui/material";
import { COLORS } from "../../../../constants/color";

const CustomMessage = ({ selectedMessage }) => {
  if (!selectedMessage) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: COLORS.secondary,
        }}
      >
        <Typography>No message selected</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "10px",
        padding: "16px",
        height: "100%", // Ensures it takes full height
        maxHeight: "700px", // Optional: limit the max height
      }}
    >
      {/* Chat header */}
      <Box
        sx={{
          borderBottom: `1px solid ${COLORS.border2}`,
          paddingBottom: "8px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ marginRight: "10px" }}
          src={`https://randomuser.me/api/portraits/${
            selectedMessage?.role === "Customer" ? "women" : "men"
          }/${selectedMessage?.id}.jpg`}
          alt={selectedMessage?.name}
        />
        <Typography variant="h6" fontWeight="bold" color={COLORS.secondary}>
          {selectedMessage?.name || "Unknown Sender"}
        </Typography>
      </Box>

      {/* Chat messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          paddingBottom: "16px",
          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: "8px",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              backgroundColor: COLORS.border2,
              borderRadius: "18px",
              maxWidth: "60%",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {selectedMessage?.message || "No message content"}
          </Box>
        </Box>
      </Box>
      {/* <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          paddingBottom: "16px",
          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: "8px",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              backgroundColor: COLORS.border2,
              borderRadius: "18px",
              maxWidth: "60%",
              overflowWrap: "break-word",
              whiteSpace: "normal",
            }}
          >
            {message?.message || "No message content"}
          </Box>
        </Box>
      </Box> */}

      {/* Message input */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type a message..."
        />
        <Button
          variant="contained"
          sx={{
            marginLeft: "8px",
            color: COLORS.white,
            background: COLORS.secondary,
            textTransform: "none",
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default CustomMessage;
