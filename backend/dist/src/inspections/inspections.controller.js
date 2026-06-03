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
exports.InspectionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_js_1 = require("../common/decorators/current-user.decorator.js");
const roles_decorator_js_1 = require("../common/decorators/roles.decorator.js");
const roles_guard_js_1 = require("../common/guards/roles.guard.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const create_inspection_dto_js_1 = require("./dto/create-inspection.dto.js");
const query_inspection_dto_js_1 = require("./dto/query-inspection.dto.js");
const update_inspection_dto_js_1 = require("./dto/update-inspection.dto.js");
const inspections_service_js_1 = require("./inspections.service.js");
let InspectionsController = class InspectionsController {
    constructor(inspectionsService) {
        this.inspectionsService = inspectionsService;
    }
    create(dto, user) {
        return this.inspectionsService.create(dto, user);
    }
    findAll(query, user) {
        return this.inspectionsService.findAll(query, user);
    }
    findOne(id) {
        return this.inspectionsService.findOne(id);
    }
    approve(id, dto) {
        return this.inspectionsService.approve(id, dto);
    }
    update(id, dto) {
        return this.inspectionsService.update(id, dto);
    }
    remove(id) {
        return this.inspectionsService.remove(id);
    }
};
exports.InspectionsController = InspectionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Create inspection. ADMIN/INSPECTOR → SCHEDULED. USER → PENDING request.',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inspection_dto_js_1.CreateInspectionDto, Object]),
    __metadata("design:returntype", void 0)
], InspectionsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List inspections (paginated); USER sees only their requests' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_inspection_dto_js_1.QueryInspectionDto, Object]),
    __metadata("design:returntype", void 0)
], InspectionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get inspection details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InspectionsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN, prisma_enums_js_1.Role.INSPECTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a PENDING inspection request (ADMIN/INSPECTOR)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_inspection_dto_js_1.UpdateInspectionDto]),
    __metadata("design:returntype", void 0)
], InspectionsController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN, prisma_enums_js_1.Role.INSPECTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Update an inspection (ADMIN/INSPECTOR)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_inspection_dto_js_1.UpdateInspectionDto]),
    __metadata("design:returntype", void 0)
], InspectionsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an inspection (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InspectionsController.prototype, "remove", null);
exports.InspectionsController = InspectionsController = __decorate([
    (0, swagger_1.ApiTags)('Inspections'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('inspections'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [inspections_service_js_1.InspectionsService])
], InspectionsController);
//# sourceMappingURL=inspections.controller.js.map