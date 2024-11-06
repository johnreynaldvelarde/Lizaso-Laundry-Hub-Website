export const ActionTypes = {
  AUTHENTICATION: "Authentication",
  ACCOUNT_MANAGEMENT: "Account_management",
  PROFILE_MANAGEMENT: "Profile_management",
  MESSAGING: "Messaging",
  SERVICE_REQUEST: "Service_request",
  INVENTORY_MANAGEMENT: "Inventory_management",
  ORDER_MANAGEMENT: "Order_management",
  LAUNDRY_MANAGEMENT: "Laundry_management",
  FINANCIAL_TRANSACTION: "Financial_transaction",
  ADMINISTRATIVE: "Administrative",
  SYSTEM_EVENT: "System_event",
};

export const ActionDescriptions = {
  [ActionTypes.AUTHENTICATION]: {
    LOGIN: (username) => `${username} has successfully logged into the system.`,
    LOGOUT: (username) => `${username} has securely logged out of the system.`,
    FAILED_LOGIN_ATTEMPT: (username) => `Failed login attempt by ${username}.`,
  },
};
