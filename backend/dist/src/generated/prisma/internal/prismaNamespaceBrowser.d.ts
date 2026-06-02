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
    readonly Customer: "Customer";
    readonly FireExtinguisher: "FireExtinguisher";
    readonly Notification: "Notification";
    readonly Escalation: "Escalation";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const CustomerScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly nationalId: "nationalId";
    readonly email: "email";
    readonly phone: "phone";
    readonly address: "address";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum];
export declare const FireExtinguisherScalarFieldEnum: {
    readonly id: "id";
    readonly serialNumber: "serialNumber";
    readonly type: "type";
    readonly capacity: "capacity";
    readonly purchaseDate: "purchaseDate";
    readonly expiryDate: "expiryDate";
    readonly status: "status";
    readonly customerId: "customerId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FireExtinguisherScalarFieldEnum = (typeof FireExtinguisherScalarFieldEnum)[keyof typeof FireExtinguisherScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly channel: "channel";
    readonly message: "message";
    readonly sentAt: "sentAt";
    readonly customerId: "customerId";
    readonly extinguisherId: "extinguisherId";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const EscalationScalarFieldEnum: {
    readonly id: "id";
    readonly reason: "reason";
    readonly status: "status";
    readonly reportedAt: "reportedAt";
    readonly resolvedAt: "resolvedAt";
    readonly notes: "notes";
    readonly customerId: "customerId";
    readonly extinguisherId: "extinguisherId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EscalationScalarFieldEnum = (typeof EscalationScalarFieldEnum)[keyof typeof EscalationScalarFieldEnum];
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
