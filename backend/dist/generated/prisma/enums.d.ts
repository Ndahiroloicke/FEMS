export declare const ExtinguisherStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly DELIVERED: "DELIVERED";
    readonly RETURNED: "RETURNED";
    readonly EXPIRED: "EXPIRED";
};
export type ExtinguisherStatus = (typeof ExtinguisherStatus)[keyof typeof ExtinguisherStatus];
export declare const NotificationType: {
    readonly EXPIRY_WARNING: "EXPIRY_WARNING";
    readonly POLICE_ESCALATION: "POLICE_ESCALATION";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannel: {
    readonly EMAIL: "EMAIL";
    readonly SMS: "SMS";
    readonly SYSTEM: "SYSTEM";
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
export declare const EscalationStatus: {
    readonly PENDING: "PENDING";
    readonly REPORTED: "REPORTED";
    readonly RESOLVED: "RESOLVED";
};
export type EscalationStatus = (typeof EscalationStatus)[keyof typeof EscalationStatus];
