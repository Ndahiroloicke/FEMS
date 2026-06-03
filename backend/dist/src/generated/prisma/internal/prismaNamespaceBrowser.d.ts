import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly FireExtinguisher: "FireExtinguisher";
    readonly Inspection: "Inspection";
    readonly MaintenanceLog: "MaintenanceLog";
    readonly Notification: "Notification";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly isActive: "isActive";
    readonly resetToken: "resetToken";
    readonly resetTokenExpiresAt: "resetTokenExpiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const FireExtinguisherScalarFieldEnum: {
    readonly id: "id";
    readonly serialNumber: "serialNumber";
    readonly location: "location";
    readonly type: "type";
    readonly size: "size";
    readonly installationDate: "installationDate";
    readonly expiryDate: "expiryDate";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FireExtinguisherScalarFieldEnum = (typeof FireExtinguisherScalarFieldEnum)[keyof typeof FireExtinguisherScalarFieldEnum];
export declare const InspectionScalarFieldEnum: {
    readonly id: "id";
    readonly extinguisherId: "extinguisherId";
    readonly scheduledById: "scheduledById";
    readonly inspectorId: "inspectorId";
    readonly scheduledAt: "scheduledAt";
    readonly status: "status";
    readonly result: "result";
    readonly notes: "notes";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InspectionScalarFieldEnum = (typeof InspectionScalarFieldEnum)[keyof typeof InspectionScalarFieldEnum];
export declare const MaintenanceLogScalarFieldEnum: {
    readonly id: "id";
    readonly extinguisherId: "extinguisherId";
    readonly inspectorId: "inspectorId";
    readonly inspectionId: "inspectionId";
    readonly actionsTaken: "actionsTaken";
    readonly conditionNoted: "conditionNoted";
    readonly actionDate: "actionDate";
    readonly createdAt: "createdAt";
};
export type MaintenanceLogScalarFieldEnum = (typeof MaintenanceLogScalarFieldEnum)[keyof typeof MaintenanceLogScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly extinguisherId: "extinguisherId";
    readonly type: "type";
    readonly channel: "channel";
    readonly message: "message";
    readonly isRead: "isRead";
    readonly sentAt: "sentAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
