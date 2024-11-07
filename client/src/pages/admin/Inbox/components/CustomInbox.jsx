import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography as MuiTypography,
} from "@mui/material";
import { COLORS } from "../../../../constants/color";
import no_message from "../../../../assets/images/no_data_table.jpg";

const sampleMessages = [
  {
    id: 1,
    name: "John Doe",
    message: "This is a sample message from John.",
    timestamp: "10:30 AM",
    role: "User",
  },
  {
    id: 2,
    name: "Jane Smith",
    message: "Hello! I need assistance with my order.",
    timestamp: "11:00 AM",
    role: "Customer",
  },
  {
    id: 3,
    name: "Michael Johnson",
    message: "Could you please update my address?",
    timestamp: "1:15 PM",
    role: "User",
  },
  {
    id: 4,
    name: "Emily Davis",
    message: "Is my delivery on the way?",
    timestamp: "3:00 PM",
    role: "Customer",
  },
  {
    id: 5,
    name: "Sarah Brown",
    message: "I'd like to inquire about is my delivery on the way?",
    timestamp: "4:30 PM",
    role: "Customer",
  },
];

const CustomInbox = () => {
  const [searchName, setSearchName] = useState("");

  // Filter messages based on search name
  const filteredMessages = sampleMessages.filter((message) =>
    message.name.toLowerCase().includes(searchName.toLowerCase())
  );

  // Separate users and customers
  const users = filteredMessages.filter((message) => message.role === "User");
  const customers = filteredMessages.filter(
    (message) => message.role === "Customer"
  );

  return (
    <Box
      sx={{
        width: "35%",
        overflowY: "auto",
        border: `1px solid ${COLORS.border}`,
        borderRadius: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: "16px",
          fontWeight: "bold",
          color: COLORS.secondary,
        }}
      >
        All Messages
      </Typography>
      <Divider />
      <TextField
        variant="outlined"
        placeholder="Search name..."
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        sx={{
          margin: "16px",
          borderRadius: "8px",
          width: "calc(100% - 32px)",
          boxSizing: "border-box",
        }}
      />

      <Box sx={{ padding: "20px" }}>
        {/* Display Users */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: COLORS.secondary,
          }}
        >
          Users in Store
        </Typography>
        <List>
          {users.length > 0 ? (
            users.map((message, index) => (
              <React.Fragment key={message.id}>
                <ListItem sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    sx={{ marginRight: 1 }}
                    src="https://randomuser.me/api/portraits/men/1.jpg"
                    alt={message.name}
                  />
                  <ListItemText
                    primary={message.name}
                    secondary={message.message}
                    sx={{ marginRight: "auto" }}
                  />
                  <MuiTypography
                    variant="body2"
                    textAlign={"right"}
                    sx={{ color: COLORS.secondary, whiteSpace: "nowrap" }}
                  >
                    {message.timestamp}
                  </MuiTypography>
                </ListItem>
                {index < users.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100px", // Adjust this value as needed
                textAlign: "center",
              }}
            >
              <img
                src={no_message}
                alt="No customers"
                style={{
                  width: "100px",
                  height: "auto",
                }}
              />
              <Typography variant="body2" sx={{ color: COLORS.primary }}>
                No Users in Store
              </Typography>
            </Box>
          )}
        </List>

        {/* Display Customers */}
        <Box mt={3}>
          <Typography
            variant="h6"
            sx={{
              marginTop: "16px",
              fontWeight: "bold",
              color: COLORS.secondary,
            }}
          >
            Customers
          </Typography>
          <List>
            {customers.length > 0 ? (
              customers.map((message, index) => (
                <React.Fragment key={message.id}>
                  <ListItem sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{ marginRight: 1 }}
                      src="https://randomuser.me/api/portraits/women/2.jpg"
                      alt={message.name}
                    />
                    <ListItemText
                      primary={message.name}
                      secondary={message.message}
                      sx={{ marginRight: "auto", paddingRight: 1 }}
                    />
                    <MuiTypography
                      variant="body2"
                      textAlign={"right"}
                      sx={{ color: COLORS.secondary, whiteSpace: "nowrap" }}
                    >
                      {message.timestamp}
                    </MuiTypography>
                  </ListItem>
                  {index < customers.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100px", // Adjust this value as needed
                  textAlign: "center",
                }}
              >
                <img
                  src={no_message}
                  alt="No customers"
                  style={{
                    width: "100px",
                    height: "auto",
                  }}
                />
                <Typography variant="body2" sx={{ color: COLORS.primary }}>
                  No Customers
                </Typography>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomInbox;
