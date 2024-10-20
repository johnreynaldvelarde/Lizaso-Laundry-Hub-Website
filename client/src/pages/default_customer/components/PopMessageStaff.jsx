import React, { useCallback, useEffect, useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../constants/color";
import {
  createMessageSenderCustomer,
  getCustomerMessageConvo,
} from "../../../services/api/customerApi";
import useFetchData from "../../../hooks/common/useFetchData";
import useAuth from "../../../contexts/AuthContext";

const PopMessageStaff = ({ open, onClose, senderId, receiverId }) => {
  const { userDetails } = useAuth();
  const [newMessage, setNewMessage] = useState("");
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if at the bottom

  const { data: messages, fetchData: fetchCustomerConvo } = useFetchData();

  const fetchCustomerConvoData = useCallback(() => {
    fetchCustomerConvo(
      getCustomerMessageConvo.getCustomerConvo,
      userDetails.userId
    );
  }, [fetchCustomerConvo, userDetails.userId]);

  useEffect(() => {
    fetchCustomerConvoData();
    const intervalId = setInterval(() => {
      fetchCustomerConvoData();
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [fetchCustomerConvoData]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // Check if user is at the bottom
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
  };

  useEffect(() => {
    const chatArea = document.getElementById("chatArea");
    if (open && chatArea) {
      // Check if chatArea exists
      if (isAtBottom) {
        chatArea.scrollTop = chatArea.scrollHeight; // Scroll to bottom
      }
    }
  }, [messages, open, isAtBottom]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageData = {
        sender_id: senderId,
        receiver_id: receiverId,
        message: newMessage,
      };

      try {
        const response = await createMessageSenderCustomer.setCustomerMessage(
          messageData
        );
        if (response && response.success) {
          setNewMessage("");
        } else {
          console.error("Message failed to send", response);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      console.log("Cannot send an empty message.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
          height: "600px",
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Chat with Pickup or Delivery Staff"}
        subtitle={"Send your inquiries or updates"}
        onClose={onClose}
      />

      <DialogContent
        style={{
          padding: "16px",
          height: "calc(100% - 64px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Chat Area with Background Color */}
        <div
          id="chatArea"
          className="flex flex-col flex-grow bg-gray-100 rounded p-2 max-h-[400px] md:max-h-[500px] overflow-y-auto"
          onScroll={handleScroll} // Add scroll event listener
          style={{
            position: "relative",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {messages.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 text-lg">
              <img
                src="path/to/your/sample-image.png"
                alt="Start a conversation"
                className="mb-2 w-24 h-24" // Adjust size as needed
              />
              <span>Start a conversation</span>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded ${
                  msg.sender_type === "Customer"
                    ? "bg-[#5787C8] text-white self-end"
                    : "bg-gray-300 text-[#393939] self-start"
                } max-w-[75%] md:max-w-[60%] break-words`}
              >
                <p className="text-sm md:text-base">{msg.message}</p>
              </div>
            ))
          )}
        </div>
        {/* <div
          id="chatArea"
          className="flex flex-col flex-grow bg-gray-100 rounded p-2 max-h-[400px] md:max-h-[500px]"
          style={{
            overflowY: "auto",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
          onScroll={handleScroll} // Add scroll event listener
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded ${
                msg.sender_type === "Customer"
                  ? "bg-[#5787C8] text-white self-end"
                  : "bg-gray-300 text-[#393939] self-start"
              } max-w-[75%] md:max-w-[60%] break-words`}
            >
              <p className="text-sm md:text-base">{msg.message}</p>
            </div>
          ))}
        </div> */}

        {/* Message Input */}
        <div className="flex mt-4">
          <TextField
            label="Type a message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button
            disableElevation
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{
              marginLeft: 1,
              textTransform: "none",
              backgroundColor: COLORS.secondary,
              "&:hover": {
                backgroundColor: COLORS.secondaryHover,
              },
            }}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopMessageStaff;
