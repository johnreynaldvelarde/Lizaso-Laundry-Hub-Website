export const ActionTypes = {
  AUTHENTICATION: "Authentication",
  ACCOUNT_MANAGEMENT: "Account Management",
  PROFILE_MANAGEMENT: "Profile Management",
  MESSAGING: "Messaging",
  SERVICE_REQUEST: "Service Request",
  INVENTORY_MANAGEMENT: "Inventory Management",
  ORDER_MANAGEMENT: "Order Management",
  LAUNDRY_MANAGEMENT: "Laundry Management",
  FINANCIAL_TRANSACTION: "Financial Transaction",
  ADMINISTRATIVE: "Administrative",
  SYSTEM_EVENT: "System Event",
  DASHBOARD: "Dashboard",
  SCHEDULE_MANAGEMENT: "Schedule Management",
  STORE_MANAGEMENT: "Store Management",
  USER_MANAGEMENT: "User Management",
  CUSTOMER_MANAGEMENT: "Customer Management",
  REVIEW_MANAGEMENT: "Review Management",
  SERVICE_MANAGEMENT: "Service Management",
  TRANSACTION_HISTORY: "Transaction History",
  ACTIVITY_LOG: "Activity Log",
  SETTINGS: "Settings",
  CONFIGURATION: "Configuration",
  ARCHIVED: "Archived",
};

export const ActionDescriptions = {
  [ActionTypes.AUTHENTICATION]: {
    LOGIN: (username) => `${username} has successfully logged into the system.`,
    LOGOUT: (username) => `${username} has securely logged out of the system.`,
    FAILED_LOGIN_ATTEMPT: (username) => `Failed login attempt by ${username}.`,
  },
  [ActionTypes.DASHBOARD]: {
    VIEW: (username) => `${username} viewed the dashboard.`,
  },
  [ActionTypes.MONITORED_UNITS]: {
    CHECK_STATUS: (username) =>
      `${username} checked the status of monitored units.`,
    UPDATE_UNIT_STATUS: (username, unitId, status) =>
      `${username} updated the status of unit ${unitId} to ${status}.`,
  },
  [ActionTypes.SCHEDULE_MANAGEMENT]: {
    VIEW_SCHEDULE: (username) => `${username} viewed the schedules.`,
    ADD_SCHEDULE: (username) => `${username} added a new schedule.`,
    EDIT_SCHEDULE: (username) => `${username} edited an existing schedule.`,
    DELETE_SCHEDULE: (username) => `${username} deleted a schedule.`,
  },
  [ActionTypes.INVENTORY_MANAGEMENT]: {
    VIEW_INVENTORY: (username) => `${username} viewed the inventory list.`,
    ADD_ITEM: (username) => `${username} added a new inventory item.`,
    UPDATE_ITEM: (username) => `${username} updated an inventory item.`,
    DELETE_ITEM: (username) => `${username} deleted an inventory item.`,
  },
  [ActionTypes.STORE_MANAGEMENT]: {
    VIEW_STORES: (username) => `${username} viewed the list of stores.`,
    ADD_STORE: (username) => `${username} added a new store.`,
    UPDATE_STORE: (username) => `${username} updated store details.`,
    DELETE_STORE: (username) => `${username} archived a store.`,
  },
  [ActionTypes.USER_MANAGEMENT]: {
    VIEW_USERS: (username) => `${username} viewed user accounts.`,
    ADD_USER: (username, name) =>
      `${username} successfully created an account for the user ${name}.`,
    UPDATE_USER: (username, name) =>
      `${username} successfully updated the account information for ${name}.`,
    DELETE_USER: (username, name) =>
      `${username} deleted the user account of ${name}.`,
  },
  [ActionTypes.CUSTOMER_MANAGEMENT]: {
    VIEW_CUSTOMERS: (username) => `${username} viewed customer accounts.`,
    ADD_CUSTOMER: (username) => `${username} added a new customer.`,
    UPDATE_CUSTOMER: (username) => `${username} updated customer details.`,
  },
  [ActionTypes.MESSAGING]: {
    VIEW_INBOX: (username) => `${username} viewed their inbox.`,
    SEND_MESSAGE: (username) => `${username} sent a new message.`,
    RECEIVE_MESSAGE: (username) => `${username} received a new message.`,
  },
  [ActionTypes.REVIEW_MANAGEMENT]: {
    VIEW_REVIEWS: (username) => `${username} viewed customer reviews.`,
    DELETE_REVIEW: (username) => `${username} deleted a customer review.`,
  },
  [ActionTypes.SERVICE_MANAGEMENT]: {
    VIEW_SERVICES: (username) => `${username} viewed the list of services.`,
    ADD_SERVICE: (username) => `${username} added a new service.`,
    UPDATE_SERVICE: (username) => `${username} updated service details.`,
    DELETE_SERVICE: (username) => `${username} deleted a service.`,
  },
  [ActionTypes.TRANSACTION_HISTORY]: {
    VIEW_TRANSACTIONS: (username) => `${username} viewed transaction history.`,
  },
  [ActionTypes.ACTIVITY_LOG]: {
    VIEW_LOGS: (username) => `${username} viewed the activity logs.`,
  },
  [ActionTypes.SETTINGS]: {
    UPDATE_SETTINGS: (username) => `${username} updated system settings.`,
  },
  [ActionTypes.CONFIGURATION]: {
    VIEW_CONFIGURATION: (username) =>
      `${username} viewed the configuration settings.`,
    UPDATE_CONFIGURATION: (username) =>
      `${username} updated configuration settings.`,
  },
  [ActionTypes.ARCHIVED]: {
    VIEW_ARCHIVED: (username) => `${username} viewed archived items.`,
    RESTORE_ITEM: (username) => `${username} restored an archived item.`,
    DELETE_PERMANENTLY: (username) =>
      `${username} permanently deleted an archived item.`,
  },
};
