import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@mui/material";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";

const PopMessageStaff = ({ open, onClose }) => {
  // Sample conversation data
  const [messages, setMessages] = useState([
    { sender: "customer", text: "Hi, when will my laundry be delivered?" },
    { sender: "staff", text: "Your laundry will be delivered by 2 PM." },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "customer", text: newMessage },
      ]);
      setNewMessage(""); // Clear the input field
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
          height: "500px", // Set a fixed height for the dialog
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Chat with Delivery Staff"}
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
              className={`my-2 p-2 rounded-full ${
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
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            style={{ marginLeft: 8 }}
          >
            Send
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopMessageStaff;
