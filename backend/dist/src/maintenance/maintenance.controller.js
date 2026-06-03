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
exports.MaintenanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_js_1 = require("../common/decorators/current-user.decorator.js");
const roles_decorator_js_1 = require("../common/decorators/roles.decorator.js");
const roles_guard_js_1 = require("../common/guards/roles.guard.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const create_maintenance_dto_js_1 = require("./dto/create-maintenance.dto.js");
const query_maintenance_dto_js_1 = require("./dto/query-maintenance.dto.js");
const maintenance_service_js_1 = require("./maintenance.service.js");
let MaintenanceController = class MaintenanceController {
    constructor(maintenanceService) {
        this.maintenanceService = maintenanceService;
    }
    create(dto, userId) {
        return this.maintenanceService.create(dto, userId);
    }
    findAll(query) {
        return this.maintenanceService.findAll(query);
    }
    findOne(id) {
        return this.maintenanceService.findOne(id);
    }
};
exports.MaintenanceController = MaintenanceController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN, prisma_enums_js_1.Role.INSPECTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Log a maintenance action' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_maintenance_dto_js_1.CreateMaintenanceDto, String]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List maintenance logs (paginated)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_maintenance_dto_js_1.QueryMaintenanceDto]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a maintenance log' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MaintenanceController.prototype, "findOne", null);
exports.MaintenanceController = MaintenanceController = __decorate([
    (0, swagger_1.ApiTags)('Maintenance'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('maintenance'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [maintenance_service_js_1.MaintenanceService])
], MaintenanceController);
//# sourceMappingURL=maintenance.controller.js.map