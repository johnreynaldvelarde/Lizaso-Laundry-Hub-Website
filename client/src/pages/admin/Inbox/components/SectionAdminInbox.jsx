import React, { useCallback, useEffect, useState } from "react";
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
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import usePopup from "../../../../hooks/common/usePopup";
import { COLORS } from "../../../../constants/color";
import CustomInbox from "./CustomInbox";

const SectionAdminInbox = ({ storeId }) => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [searchName, setSearchName] = useState("");
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
  const [loading, setLoading] = useState(true);

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
      <Box>
        <CustomInbox />
      </Box>

      {/* Popup */}
      {isOpen && popupType === "addCustomer" && (
        <PopAddNewCustomer
          open={isOpen}
          onClose={closePopup}
          refreshData={handleRefreshData}
        />
      )}
    </>
  );
};

export default SectionAdminInbox;

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
