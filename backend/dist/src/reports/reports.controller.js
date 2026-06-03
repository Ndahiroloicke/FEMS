"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_js_1 = require("../common/decorators/roles.decorator.js");
const roles_guard_js_1 = require("../common/guards/roles.guard.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const export_query_dto_js_1 = require("./dto/export-query.dto.js");
const export_service_js_1 = require("./export.service.js");
const reports_service_js_1 = require("./reports.service.js");
let ReportsController = class ReportsController {
    constructor(reportsService, exportService) {
        this.reportsService = reportsService;
        this.exportService = exportService;
    }
    getSummary() {
        return this.reportsService.getSummary();
    }
    getStock(query) {
        return this.reportsService.getStock(query.period ?? 'monthly');
    }
    getInspectionStatus() {
        return this.reportsService.getInspectionStatusCounts();
    }
    getExpired(query) {
        return this.reportsService.getExpired(query.page, query.limit);
    }
    getMaintenanceHistory(query) {
        return this.reportsService.getMaintenanceHistory(query.extinguisherId, query.page, query.limit);
    }
    export(query, res) {
        return this.exportService.export(query.report, query.format, res);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Aggregate dashboard summary' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('stock'),
    (0, swagger_1.ApiOperation)({ summary: 'Time-bucketed stock counts' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_query_dto_js_1.StockQueryDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getStock", null);
__decorate([
    (0, common_1.Get)('inspection-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Inspection counts grouped by status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getInspectionStatus", null);
__decorate([
    (0, common_1.Get)('expired'),
    (0, swagger_1.ApiOperation)({ summary: 'List expired extinguishers (paginated)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_query_dto_js_1.MaintenanceHistoryQueryDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getExpired", null);
__decorate([
    (0, common_1.Get)('maintenance-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Maintenance history (paginated)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_query_dto_js_1.MaintenanceHistoryQueryDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getMaintenanceHistory", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, swagger_1.ApiOperation)({ summary: 'Export a report as CSV or PDF' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_query_dto_js_1.ExportQueryDto, Object]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "export", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN, prisma_enums_js_1.Role.INSPECTOR),
    __metadata("design:paramtypes", [reports_service_js_1.ReportsService,
        export_service_js_1.ExportService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map