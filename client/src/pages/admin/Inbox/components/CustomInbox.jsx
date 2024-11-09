import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import { COLORS } from "../../../../constants/color";
import no_message from "../../../../assets/images/no_data_table.jpg";
import useFetchData from "../../../../hooks/common/useFetchData";
import { getInboxAdmin } from "../../../../services/api/getApi";

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
    message: "I'd like to inquire about my order.",
    timestamp: "4:30 PM",
    role: "Customer",
  },
  {
    id: 6,
    name: "No Conversation User",
    message: "", // No conversation yet, will show "Start a conversation"
    timestamp: "N/A",
    role: "User",
  },
  {
    id: 7,
    name: "No Conversation User",
    message: "", // No conversation yet, will show "Start a conversation"
    timestamp: "N/A",
    role: "Customer",
  },
];

const UserList = ({ title, users, onSelectMessage, selectedMessage }) => (
  <Box mt={1}>
    <Typography
      variant="h6"
      sx={{
        marginTop: "16px",
        fontWeight: "bold",
        color: COLORS.secondary,
      }}
    >
      {title}
    </Typography>
    <List>
      {users.length > 0 ? (
        users.map((message, index) => (
          <React.Fragment key={message.id}>
            <ListItem
              component="button"
              onClick={() => onSelectMessage(message)}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  selectedMessage?.id === message.id
                    ? COLORS.secondaryLight
                    : "transparent",
              }}
            >
              <Avatar
                sx={{ marginRight: 1 }}
                src={`https://randomuser.me/api/portraits/${
                  message.role === "Customer" ? "women" : "men"
                }/${message.id}.jpg`}
                alt={message.name}
              />
              <ListItemText
                primary={message.name}
                secondary={message.message || "Start a conversation"}
                sx={{ marginRight: "auto", paddingRight: 1 }}
              />
              <Typography
                variant="body2"
                textAlign={"right"}
                sx={{ color: COLORS.secondary, whiteSpace: "nowrap" }}
              >
                {message.timestamp}
              </Typography>
            </ListItem>
            {index < users.length - 1 && <Divider />}
          </React.Fragment>
        ))
      ) : (
        <EmptyState message={`No ${title}`} />
      )}
    </List>
  </Box>
);

const EmptyState = ({ message }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100px",
      textAlign: "center",
    }}
  >
    <img
      src={no_message}
      alt={message}
      style={{
        width: "100px",
        height: "auto",
      }}
    />
    <Typography variant="body2" sx={{ color: COLORS.primary }}>
      {message}
    </Typography>
  </Box>
);

const CustomInbox = ({ onSelectMessage, selectedMessage, userId }) => {
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(true);

  const { data: inbox, fetchData: fetchInbox } = useFetchData();

  const fetchInboxData = useCallback(async () => {
    setLoading(true);
    await fetchInbox(getInboxAdmin.viewInboxAdmin, userId);
    setLoading(false);
  }, [fetchInbox]);

  useEffect(() => {
    fetchInboxData();
  }, [fetchInboxData]);

  useEffect(() => {
    if (sampleMessages.length > 0 && !selectedMessage) {
      onSelectMessage(sampleMessages[0]);
    }
  }, [selectedMessage, onSelectMessage]);

  const filteredMessages = sampleMessages.filter((message) =>
    message.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const users = filteredMessages.filter((message) => message.role === "User");
  const customers = filteredMessages.filter(
    (message) => message.role === "Customer"
  );

  const sortedUsers = [...users].sort((a, b) =>
    a.message && !b.message ? -1 : 1
  );
  const sortedCustomers = [...customers].sort((a, b) =>
    a.message && !b.message ? -1 : 1
  );

  return (
    <Box
      sx={{
        border: `1px solid ${COLORS.border}`,
        borderRadius: "10px",
        maxHeight: "700px",
        display: "flex",
        flexDirection: "column",
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

      <Box
        className="scrollables"
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "0 20px",
          maxHeight: "calc(700px - 128px)",
        }}
      >
        <UserList
          title="Users in Store"
          users={sortedUsers}
          onSelectMessage={onSelectMessage}
          selectedMessage={selectedMessage}
        />
        <UserList
          title="Customers"
          users={sortedCustomers}
          onSelectMessage={onSelectMessage}
          selectedMessage={selectedMessage}
        />
      </Box>
    </Box>
  );
};

export default CustomInbox;

{
  /* {selectedMessage && (
        <Box sx={{ padding: "16px" }}>
          <Typography variant="h6" color={COLORS.primary}>
            Message from {selectedMessage.name}
          </Typography>
          <Typography variant="body2">{selectedMessage.message}</Typography>
        </Box>
      )} */
}

// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Divider,
//   TextField,
//   List,
//   ListItem,
//   ListItemText,
//   Avatar,
//   Typography as MuiTypography,
// } from "@mui/material";
// import { COLORS } from "../../../../constants/color";
// import no_message from "../../../../assets/images/no_data_table.jpg";

// const CustomInbox = () => {
//   const [searchName, setSearchName] = useState("");

//   // Filter messages based on search name
//   const filteredMessages = sampleMessages.filter((message) =>
//     message.name.toLowerCase().includes(searchName.toLowerCase())
//   );

//   // Separate users and customers
//   const users = filteredMessages.filter((message) => message.role === "User");
//   const customers = filteredMessages.filter(
//     (message) => message.role === "Customer"
//   );

//   // Sort users: those with messages first, followed by those without messages
//   const sortedUsers = users.sort((a, b) => {
//     if (a.message && !b.message) {
//       return -1; // a has a message, b does not
//     }
//     if (!a.message && b.message) {
//       return 1; // b has a message, a does not
//     }
//     return 0; // if both have or don't have messages, keep the order as is
//   });

//   // Sort customers: those with messages first, followed by those without messages
//   const sortedCustomers = customers.sort((a, b) => {
//     if (a.message && !b.message) {
//       return -1; // a has a message, b does not
//     }
//     if (!a.message && b.message) {
//       return 1; // b has a message, a does not
//     }
//     return 0; // if both have or don't have messages, keep the order as is
//   });

//   return (
//     <Box
//       sx={{
//         width: "35%",
//         overflowY: "auto",
//         border: `1px solid ${COLORS.border}`,
//         borderRadius: "10px",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           padding: "16px",
//           fontWeight: "bold",
//           color: COLORS.secondary,
//         }}
//       >
//         All Messages
//       </Typography>
//       <Divider />
//       <TextField
//         variant="outlined"
//         placeholder="Search name..."
//         value={searchName}
//         onChange={(e) => setSearchName(e.target.value)}
//         sx={{
//           margin: "16px",
//           borderRadius: "8px",
//           width: "calc(100% - 32px)",
//           boxSizing: "border-box",
//         }}
//       />

//       <Box sx={{ padding: "20px" }}>
//         {/* Display Users */}
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: "bold",
//             color: COLORS.secondary,
//           }}
//         >
//           Users in Store
//         </Typography>
//         <List>
//           {sortedUsers.length > 0 ? (
//             sortedUsers.map((message, index) => (
//               <React.Fragment key={message.id}>
//                 <ListItem sx={{ display: "flex", alignItems: "center" }}>
//                   <Avatar
//                     sx={{ marginRight: 1 }}
//                     src="https://randomuser.me/api/portraits/men/1.jpg"
//                     alt={message.name}
//                   />
//                   <ListItemText
//                     primary={message.name}
//                     secondary={message.message || "Start a conversation"} // Display default message when no message exists
//                     sx={{ marginRight: "auto" }}
//                   />
//                   <MuiTypography
//                     variant="body2"
//                     textAlign={"right"}
//                     sx={{ color: COLORS.secondary, whiteSpace: "nowrap" }}
//                   >
//                     {message.timestamp}
//                   </MuiTypography>
//                 </ListItem>
//                 {index < sortedUsers.length - 1 && <Divider />}
//               </React.Fragment>
//             ))
//           ) : (
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 flexDirection: "column",
//                 height: "100px",
//                 textAlign: "center",
//               }}
//             >
//               <img
//                 src={no_message}
//                 alt="No users"
//                 style={{
//                   width: "100px",
//                   height: "auto",
//                 }}
//               />
//               <Typography variant="body2" sx={{ color: COLORS.primary }}>
//                 No Users in Store
//               </Typography>
//             </Box>
//           )}
//         </List>

//         {/* Display Customers */}
//         <Box mt={3}>
//           <Typography
//             variant="h6"
//             sx={{
//               marginTop: "16px",
//               fontWeight: "bold",
//               color: COLORS.secondary,
//             }}
//           >
//             Customers
//           </Typography>
//           <List>
//             {sortedCustomers.length > 0 ? (
//               sortedCustomers.map((message, index) => (
//                 <React.Fragment key={message.id}>
//                   <ListItem sx={{ display: "flex", alignItems: "center" }}>
//                     <Avatar
//                       sx={{ marginRight: 1 }}
//                       src="https://randomuser.me/api/portraits/women/2.jpg"
//                       alt={message.name}
//                     />
//                     <ListItemText
//                       primary={message.name}
//                       secondary={message.message || "Start a conversation"} // Display default message when no message exists
//                       sx={{ marginRight: "auto", paddingRight: 1 }}
//                     />
//                     <MuiTypography
//                       variant="body2"
//                       textAlign={"right"}
//                       sx={{ color: COLORS.secondary, whiteSpace: "nowrap" }}
//                     >
//                       {message.timestamp}
//                     </MuiTypography>
//                   </ListItem>
//                   {index < sortedCustomers.length - 1 && <Divider />}
//                 </React.Fragment>
//               ))
//             ) : (
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   flexDirection: "column",
//                   height: "100px", // Adjust this value as needed
//                   textAlign: "center",
//                 }}
//               >
//                 <img
//                   src={no_message}
//                   alt="No customers"
//                   style={{
//                     width: "100px",
//                     height: "auto",
//                   }}
//                 />
//                 <Typography variant="body2" sx={{ color: COLORS.primary }}>
//                   No Customers
//                 </Typography>
//               </Box>
//             )}
//           </List>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CustomInbox;
