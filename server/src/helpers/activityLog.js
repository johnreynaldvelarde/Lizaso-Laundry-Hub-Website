export const ActionTypes = {
    AUTHENTICATION: 'authentication',
    ACCOUNT_MANAGEMENT: 'account_management',
    PROFILE_MANAGEMENT: 'profile_management',
    MESSAGING: 'messaging',
    SERVICE_REQUEST: 'service_request',
    INVENTORY_MANAGEMENT: 'inventory_management',
    ORDER_MANAGEMENT: 'order_management',
    LAUNDRY_MANAGEMENT: 'laundry_management',
    FINANCIAL_TRANSACTION: 'financial_transaction',
    ADMINISTRATIVE: 'administrative',
    SYSTEM_EVENT: 'system_event'
};

export const ActionDescriptions = {
    [ActionTypes.AUTHENTICATION]: {
        LOGIN: (username) => `${username} logged in.`,
        LOGOUT: (username) => `${username} logged out.`,
        FAILED_LOGIN_ATTEMPT: (username) => `Failed login attempt by ${username}.`
    },
}