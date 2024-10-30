import React, { useState, useEffect, useRef } from "react";
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
import useAuth from "../../../contexts/AuthContext";
import useMessages from "../../../hooks/common/useMessages";
import { decryptMessage, encryptMessage } from "../../../utils/messages";
import { createMessageSenderCustomer } from "../../../services/api/customerApi";

const Inbox = () => {
  const { userDetails } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedRecipientId, setSelectedRecipientId] = useState("");
  const messagesEndRef = useRef(null); // ref for scrolling

  const { inbox, loading, error, selectedConversation, selectConversation } =
    useMessages(userDetails.userId);

  // Filter conversations based on search term
  const filteredConversations = inbox.filter((conversation) =>
    conversation.user_one.full_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Automatically select the first conversation if none is selected
  useEffect(() => {
    if (!selectedConversation && inbox.length > 0) {
      selectConversation(inbox[0].conversation_id);
      setFullname(inbox[0].user_one.full_name);
    }
  }, [inbox, selectedConversation, selectConversation]);

  // Scroll to the bottom when messages change or a conversation is selected
  useEffect(() => {
    // Use a slight delay to ensure the container has rendered completely
    if (messagesEndRef.current) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "instant" });
      }, 0);
    }
  }, [selectedConversation, selectedConversation?.messages]);

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const encryptedMessage = await encryptMessage(newMessage);

        const messageData = {
          sender_id: userDetails.userId,
          recipient_id: selectedRecipientId,
          message: encryptedMessage,
        };

        console.log(messageData);

        // const response = await createMessageSenderCustomer.setCustomerMessage(
        //   messageData
        // );
        // if (response && response.success) {
        //   setNewMessage("");
        // } else {
        //   console.error("Message failed to send", response);
        // }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("Cannot send an empty message.");
    }
  };

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box sx={{ pt: "100px" }}>
      <Box sx={{ display: "flex", height: "calc(100vh - 120px)" }}>
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
              sx={{ margin: "16px", borderRadius: "8px", width: "90%" }}
            />
            <List>
              {filteredConversations.map((conversation) => {
                const isSelected =
                  selectedConversation?.conversation_id ===
                  conversation.conversation_id;

                const decryptedMessage = decryptMessage(
                  conversation.last_message.message
                );

                return (
                  <ListItem
                    component="button"
                    key={conversation.conversation_id}
                    onClick={() => {
                      selectConversation(conversation.conversation_id);
                      setFullname(conversation.user_one.full_name);
                      setSelectedRecipientId(conversation.user_one.id);
                    }}
                    sx={{
                      borderRadius: "10px",
                      padding: "10px 16px",
                      mb: "8px",
                      backgroundColor: isSelected
                        ? COLORS.secondaryLight
                        : "transparent",
                      "&:hover": { backgroundColor: "#E8F0FE" },
                    }}
                  >
                    <Avatar
                      src={conversation.user_one.avatar}
                      alt={conversation.user_one.full_name}
                      sx={{ marginRight: "10px" }}
                    />
                    <ListItemText
                      primary={conversation.user_one.full_name}
                      secondary={decryptedMessage}
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
            width: isSmallScreen ? "100%" : "70%",
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
          {selectedConversation && (
            <Box
              sx={{
                borderBottom: `1px solid ${COLORS.border2}`,
                paddingBottom: "8px",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ marginRight: "10px" }} />
              <Typography
                variant="h6"
                fontWeight="bold"
                color={COLORS.secondary}
              >
                {fullname}
              </Typography>
            </Box>
          )}

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
            {selectedConversation?.messages?.map((message, index) => {
              const isSentByUser = message.sender_id === userDetails.userId;
              const decryptedMessage = decryptMessage(message.message);

              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: isSentByUser ? "flex-end" : "flex-start",
                    mb: "8px",
                  }}
                >
                  <Box
                    sx={{
                      padding: "10px",
                      backgroundColor: isSentByUser
                        ? COLORS.secondary
                        : "#F0F0F0",
                      borderRadius: "18px",
                      maxWidth: "60%",
                      color: isSentByUser ? "#fff" : COLORS.primary,
                      textAlign: isSentByUser ? "right" : "left",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {decryptedMessage}
                  </Box>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Box>

          {/* Message input */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
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
      </Box>
    </Box>
  );
};

export default Inbox;
