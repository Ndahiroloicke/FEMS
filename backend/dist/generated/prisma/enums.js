"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalationStatus = exports.NotificationChannel = exports.NotificationType = exports.ExtinguisherStatus = void 0;
exports.ExtinguisherStatus = {
    ACTIVE: 'ACTIVE',
    DELIVERED: 'DELIVERED',
    RETURNED: 'RETURNED',
    EXPIRED: 'EXPIRED'
};
exports.NotificationType = {
    EXPIRY_WARNING: 'EXPIRY_WARNING',
    POLICE_ESCALATION: 'POLICE_ESCALATION'
};
exports.NotificationChannel = {
    EMAIL: 'EMAIL',
    SMS: 'SMS',
    SYSTEM: 'SYSTEM'
};
exports.EscalationStatus = {
    PENDING: 'PENDING',
    REPORTED: 'REPORTED',
    RESOLVED: 'RESOLVED'
};
//# sourceMappingURL=enums.js.map