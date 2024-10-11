import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import { COLORS } from "../../../constants/color";

const Inbox = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input
  const conversations = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "How are you?",
      messages: ["Hello!", "How are you?", "I'm doing great!"],
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "Can we talk later?",
      messages: ["Hey!", "Can we talk later?"],
    },
    {
      id: 3,
      name: "Michael Johnson",
      avatar: "https://via.placeholder.com/150",
      lastMessage: "See you soon!",
      messages: ["See you soon!", "Bye!"],
    },
  ];

  // State to manage the selected conversation
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle sending messages
  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, `You: ${newMessage}`],
      };
      setSelectedConversation(updatedConversation);
      setNewMessage(""); // Clear the input
    }
  };

  // Use media query to determine if the screen size is small
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ pt: "100px" }}>
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 120px)",
        }}
      >
        {/* Left side - Inbox list, hidden on small screens */}
        {!isSmallScreen && (
          <Box
            sx={{
              width: "30%",
              overflowY: "auto",
              border: `1px solid ${COLORS.border2}`,
              borderRadius: "10px",
              padding: "10px",
              backgroundColor: COLORS.white,
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
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
              Inbox
            </Typography>

            <Divider />

            <TextField
              variant="outlined"
              placeholder="Search name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                margin: "16px",
                borderRadius: "8px",
                width: "90%",
              }}
            />
            <List>
              {conversations.map((conversation) => {
                const isSelected = selectedConversation.id === conversation.id; // Check if this conversation is selected

                return (
                  <ListItem
                    component="button"
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)} // Update selected conversation
                    sx={{
                      borderRadius: "10px", // Rounded corners for list item
                      padding: "10px 16px",
                      mb: "8px", // Space between items
                      backgroundColor: isSelected
                        ? COLORS.secondaryLight
                        : "transparent", // Change background based on selection
                      "&:hover": {
                        backgroundColor: "#E8F0FE", // Hover effect
                      },
                    }}
                  >
                    <Avatar
                      src={conversation.avatar}
                      alt={conversation.name}
                      sx={{ marginRight: "10px" }}
                    />
                    <ListItemText
                      primary={conversation.name}
                      secondary={conversation.lastMessage}
                      primaryTypographyProps={{ fontWeight: "500" }}
                      secondaryTypographyProps={{ color: "gray" }}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Box>
        )}

        {/* Right side - Conversation */}
        <Box
          sx={{
            width: isSmallScreen ? "100%" : "70%", // Full width on small screens
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: `1px solid ${COLORS.border2}`,
            borderRadius: "10px",
            padding: "16px",
            marginLeft: isSmallScreen ? "0" : "10px",
            backgroundColor: COLORS.white,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Chat header */}
          <Box
            sx={{
              borderBottom: `1px solid ${COLORS.border2}`, // Border for separation
              paddingBottom: "8px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              src={selectedConversation.avatar}
              alt={selectedConversation.name}
              sx={{ marginRight: "10px" }}
            />
            <Typography variant="h6" fontWeight="bold" color={COLORS.secondary}>
              {selectedConversation.name}
            </Typography>
          </Box>

          {/* Chat messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Scrollable if content overflows
              paddingBottom: "16px",
              borderRadius: "8px", // Rounded for message box
              padding: "10px", // Padding inside chat box
              display: "flex",
              flexDirection: "column", // Change to default column direction
              marginBottom: 1,
              // Additional styles
              overflow: "hidden", // Prevent horizontal scrolling
            }}
          >
            {/* Display chat messages */}
            {selectedConversation.messages.map((message, index) => {
              const isSentByUser = message.startsWith("You:"); // Identify user-sent messages

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: isSentByUser ? "flex-end" : "flex-start", // Align right for sent, left for received
                    mb: "8px",
                  }}
                >
                  <Box
                    sx={{
                      padding: "10px",
                      backgroundColor: isSentByUser
                        ? COLORS.secondary
                        : "#F0F0F0", // Blue for sent, light gray for received
                      borderRadius: "18px", // Rounded corners
                      maxWidth: "60%", // Limit message width
                      color: isSentByUser ? "#fff" : COLORS.primary, // White text for sent messages
                      textAlign: isSentByUser ? "right" : "left", // Align text accordingly
                      overflow: "hidden", // Prevent horizontal overflow
                      overflowWrap: "break-word", // Break long words to prevent overflow
                      wordWrap: "break-word", // Support for older browsers
                      whiteSpace: "normal", // Allow text to wrap
                    }}
                  >
                    {message.replace("You: ", "")}{" "}
                    {/* Remove the "You:" label from the message */}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Input box for typing messages */}
          <Box
            sx={{
              display: "flex",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "8px",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)} // Update input value
              sx={{ marginRight: "10px", borderRadius: "8px" }}
            />
            <Button
              onClick={handleSendMessage}
              sx={{
                borderRadius: "8px",
                backgroundColor: COLORS.secondary,
                color: COLORS.white,
                "&:hover": {
                  backgroundColor: COLORS.secondaryHover,
                },
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;
