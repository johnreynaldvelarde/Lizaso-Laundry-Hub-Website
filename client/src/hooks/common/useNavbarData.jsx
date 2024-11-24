import React, { useCallback, useState, useEffect } from "react";
import useFetchData from "./useFetchData";
import { getNotificationsList } from "../../services/api/customerApi";
import useSocket from "./useSocket";
import { getListAdminUserNotifications } from "../../services/api/getApi";

const useNavbarData = ({ userDetails }) => {
  const { socket } = useSocket();
  const [loading, setLoading] = useState(true);
  const { data: notifications, fetchData: fetchNotifications } = useFetchData();

  const fetchNotificationsData = useCallback(async () => {
    if (!userDetails || !userDetails.roleName) {
      console.warn("userDetails not populated yet.");
      return;
    }

    setLoading(true);

    const isCustomer = userDetails.roleName === "Customer";
    const id = isCustomer ? userDetails.userId : userDetails.storeId;
    const fetchFn = isCustomer
      ? getNotificationsList.getNotifications
      : getListAdminUserNotifications.getAdminUserNotifications;

    await fetchNotifications(fetchFn, id);

    setLoading(false);
  }, [
    fetchNotifications,
    userDetails.roleName,
    userDetails.userId,
    userDetails.storeId,
  ]);

  useEffect(() => {
    if (socket) {
      socket.emit("register", userDetails.userId);

      // socket.on("registerSuccess", (data) => {
      //   console.log("Server response:", data.message);
      // });

      socket.on("serviceRequestByCustomer", (data) => {
        // console.log("Service Request Success: ", data);
        fetchNotificationsData();
      });

      return () => {
        socket.off("serviceRequestByCustomer");
        // socket.off("registerSuccess");
      };
    }
  }, [socket, userDetails.userId]);

  return { loading, fetchNotificationsData, notifications };
};

export default useNavbarData;
