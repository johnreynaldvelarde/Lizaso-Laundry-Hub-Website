import React, { useCallback, useState, useEffect } from "react";
import useFetchData from "./useFetchData";
import { getNotificationsList } from "../../services/api/customerApi";
import useSocket from "./useSocket";

const useNavbarData = ({ userDetails }) => {
  const { socket } = useSocket();
  const [loading, setLoading] = useState(true);
  const { data: notifications, fetchData: fetchNotifications } = useFetchData();
  const { data: message, fetchData: fetchMessage } = useFetchData();

  // Fetch notifications data
  const fetchNotificationsData = useCallback(async () => {
    setLoading(true);

    const id =
      userDetails.roleName === "Customer"
        ? userDetails.userId
        : userDetails.storeId;

    await fetchNotifications(getNotificationsList.getNotifications, id);

    setLoading(false);
  }, [
    fetchNotifications,
    userDetails.roleName,
    userDetails.userId,
    userDetails.storeId,
  ]);

  useEffect(() => {
    if (socket) {
      // Register the user with their userId
      socket.emit("register", userDetails.userId);

      // Listen for notifications
      socket.on("newNotification", (notification) => {
        console.log("Received newNotification:", notification);
        // Handle the notification (e.g., update state or UI)
      });

      return () => {
        socket.off("newNotification"); // Cleanup the listener on unmount
      };
    }
  }, [socket, userDetails.userId]);

  return { loading, fetchNotificationsData, notifications };
};

export default useNavbarData;

// import React, { useCallback, useState } from "react";
// import useFetchData from "./useFetchData";
// import { getNotificationsList } from "../../services/api/customerApi";

// const useNavbarData = ({ userDetails }) => {
//   const [loading, setLoading] = useState(true);

//   const { data: notifications, fetchData: fetchNotifications } = useFetchData();
//   const { data: message, fetchData: fetchMessage } = useFetchData();

//   const fetchNotificationsData = useCallback(async () => {
//     setLoading(true);

//     const id =
//       userDetails.roleName === "Customer"
//         ? userDetails.userId
//         : userDetails.storeId;

//     await fetchNotifications(getNotificationsList.getNotifications, id);

//     setLoading(false);
//   }, [
//     fetchNotifications,
//     userDetails.roleName,
//     userDetails.userId,
//     userDetails.storeId,
//   ]);

//   return { loading, fetchNotificationsData, notifications };
// };

// export default useNavbarData;
