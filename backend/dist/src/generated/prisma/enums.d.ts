export declare const Role: {
    readonly ADMIN: "ADMIN";
    readonly INSPECTOR: "INSPECTOR";
    readonly USER: "USER";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const ExtinguisherType: {
    readonly WATER: "WATER";
    readonly CO2: "CO2";
    readonly FOAM: "FOAM";
    readonly DRY_CHEMICAL: "DRY_CHEMICAL";
};
export type ExtinguisherType = (typeof ExtinguisherType)[keyof typeof ExtinguisherType];
export declare const ExtinguisherStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly EXPIRED: "EXPIRED";
    readonly NEEDS_MAINTENANCE: "NEEDS_MAINTENANCE";
    readonly OUT_OF_SERVICE: "OUT_OF_SERVICE";
};
export type ExtinguisherStatus = (typeof ExtinguisherStatus)[keyof typeof ExtinguisherStatus];
export declare const InspectionStatus: {
    readonly SCHEDULED: "SCHEDULED";
    readonly IN_PROGRESS: "IN_PROGRESS";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly OVERDUE: "OVERDUE";
};
export type InspectionStatus = (typeof InspectionStatus)[keyof typeof InspectionStatus];
export declare const MaintenanceCondition: {
    readonly GOOD: "GOOD";
    readonly FAIR: "FAIR";
    readonly POOR: "POOR";
    readonly DAMAGED: "DAMAGED";
    readonly NEEDS_REPLACEMENT: "NEEDS_REPLACEMENT";
};
export type MaintenanceCondition = (typeof MaintenanceCondition)[keyof typeof MaintenanceCondition];
export declare const NotificationType: {
    readonly INSPECTION_SCHEDULED: "INSPECTION_SCHEDULED";
    readonly INSPECTION_REMINDER: "INSPECTION_REMINDER";
    readonly EXPIRY_WARNING: "EXPIRY_WARNING";
    readonly MAINTENANCE_LOGGED: "MAINTENANCE_LOGGED";
    readonly ACCOUNT: "ACCOUNT";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const NotificationChannel: {
    readonly EMAIL: "EMAIL";
    readonly SYSTEM: "SYSTEM";
};
export type NotificationChannel = (typeof NotificationChannel)[keyof typeof NotificationChannel];
