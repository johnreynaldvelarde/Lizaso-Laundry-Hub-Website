import React, { useState } from "react";
import { Box } from "@mui/material";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import usePopup from "../../../../hooks/common/usePopup";
import { COLORS } from "../../../../constants/color";
import CustomInbox from "./CustomInbox";
import CustomMessage from "./CustomMessage";

const SectionAdminInbox = ({ storeId }) => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to handle message selection
  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  return (
    <>
      {/* Header */}
      <Box
        className="flex items-center justify-between mb-8"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        <CustomHeaderTitle
          title={"Inbox"}
          subtitle={"Explore Messages & Customer Interactions"}
        />
      </Box>
      {/* Content */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ width: "35%" }}>
          <CustomInbox
            onSelectMessage={handleSelectMessage}
            selectedMessage={selectedMessage}
          />
        </Box>
        <Box
          sx={{
            width: "65%",
            borderLeft: `1px solid ${COLORS.border}`,
            paddingLeft: 2,
          }}
        >
          {/* Pass selected message to CustomMessage */}
          <CustomMessage selectedMessage={selectedMessage} />
        </Box>
      </Box>
    </>
  );
};

export default SectionAdminInbox;

{
  /* Popup */
}
{
  /* {isOpen && popupType === "addCustomer" && (
        <PopAddNewCustomer
          open={isOpen}
          onClose={closePopup}
          refreshData={handleRefreshData}
        />
      )} */
}

{
  /* {filteredConversations.map((conversation) => {
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
                })} */
}
