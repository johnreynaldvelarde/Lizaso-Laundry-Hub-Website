import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../constants/color";
import { createMessageSenderCustomer } from "../../../services/api/customerApi";

const PopMessageStaff = ({ open, onClose, senderId, receiverId }) => {
  // Sample conversation data
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

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
          height: "600px", // Set a fixed height for the dialog
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
        <div className="flex flex-col flex-grow overflow-y-auto bg-gray-100 rounded p-2 max-h-[400px] md:max-h-[500px]">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 p-2 rounded ${
                msg.sender === "customer"
                  ? "bg-[#5787C8] text-white self-end"
                  : "bg-gray-300 text-[#393939] self-start"
              } max-w-[75%] md:max-w-[60%] break-words`}
            >
              <p className="text-sm md:text-base">{msg.text}</p>
            </div>
          ))}
        </div>

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
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: COLORS.secondary,
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: COLORS.secondary,
              },
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
