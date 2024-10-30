import { COLORS } from "../../../../constants/color";

export const getStatusColor = (status) => {
  switch (status) {
    case "Pending Pickup":
      return COLORS.accent;
    case "Ready for Delivery":
      return COLORS.success;
    case "Ongoing Pickup":
      return COLORS.success;
    case "Out for Delivery":
      return COLORS.success;
    case "Canceled":
      return COLORS.error;
    default:
      return COLORS.secondary; // default color if none match
  }
};
