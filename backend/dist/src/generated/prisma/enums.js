"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationChannel = exports.NotificationType = exports.MaintenanceCondition = exports.InspectionStatus = exports.ExtinguisherStatus = exports.ExtinguisherType = exports.Role = void 0;
exports.Role = {
    ADMIN: 'ADMIN',
    INSPECTOR: 'INSPECTOR',
    USER: 'USER'
};
exports.ExtinguisherType = {
    WATER: 'WATER',
    CO2: 'CO2',
    FOAM: 'FOAM',
    DRY_CHEMICAL: 'DRY_CHEMICAL'
};
exports.ExtinguisherStatus = {
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    NEEDS_MAINTENANCE: 'NEEDS_MAINTENANCE',
    OUT_OF_SERVICE: 'OUT_OF_SERVICE'
};
exports.InspectionStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    SCHEDULED: 'SCHEDULED',
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    OVERDUE: 'OVERDUE'
};
exports.MaintenanceCondition = {
    GOOD: 'GOOD',
    FAIR: 'FAIR',
    POOR: 'POOR',
    DAMAGED: 'DAMAGED',
    NEEDS_REPLACEMENT: 'NEEDS_REPLACEMENT'
};
exports.NotificationType = {
    INSPECTION_SCHEDULED: 'INSPECTION_SCHEDULED',
    INSPECTION_REMINDER: 'INSPECTION_REMINDER',
    EXPIRY_WARNING: 'EXPIRY_WARNING',
    MAINTENANCE_LOGGED: 'MAINTENANCE_LOGGED',
    ACCOUNT: 'ACCOUNT'
};
exports.NotificationChannel = {
    EMAIL: 'EMAIL',
    SYSTEM: 'SYSTEM'
};
//# sourceMappingURL=enums.js.map