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
exports.ExtinguishersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_js_1 = require("../common/decorators/current-user.decorator.js");
const roles_decorator_js_1 = require("../common/decorators/roles.decorator.js");
const roles_guard_js_1 = require("../common/guards/roles.guard.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const assign_extinguisher_dto_js_1 = require("./dto/assign-extinguisher.dto.js");
const create_extinguisher_dto_js_1 = require("./dto/create-extinguisher.dto.js");
const query_extinguisher_dto_js_1 = require("./dto/query-extinguisher.dto.js");
const update_extinguisher_dto_js_1 = require("./dto/update-extinguisher.dto.js");
const extinguishers_service_js_1 = require("./extinguishers.service.js");
let ExtinguishersController = class ExtinguishersController {
    constructor(extinguishersService) {
        this.extinguishersService = extinguishersService;
    }
    create(dto) {
        return this.extinguishersService.create(dto);
    }
    findAll(query, user) {
        return this.extinguishersService.findAll(query, user);
    }
    findOne(id, user) {
        return this.extinguishersService.findOne(id, user);
    }
    assign(id, dto) {
        return this.extinguishersService.assign(id, dto);
    }
    update(id, dto) {
        return this.extinguishersService.update(id, dto);
    }
    remove(id) {
        return this.extinguishersService.remove(id);
    }
};
exports.ExtinguishersController = ExtinguishersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN, prisma_enums_js_1.Role.INSPECTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new fire extinguisher' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_extinguisher_dto_js_1.CreateExtinguisherDto]),
    __metadata("design:returntype", void 0)
], ExtinguishersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List fire extinguishers (paginated); USER role only sees their own' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_extinguisher_dto_js_1.QueryExtinguisherDto, Object]),
    __metadata("design:returntype", void 0)
], ExtinguishersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get extinguisher details' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ExtinguishersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Assign/unassign an extinguisher owner (ADMIN only)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_extinguisher_dto_js_1.AssignExtinguisherDto]),
    __metadata("design:returntype", void 0)
], ExtinguishersController.prototype, "assign", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN, prisma_enums_js_1.Role.INSPECTOR),
    (0, swagger_1.ApiOperation)({ summary: 'Update an extinguisher' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_extinguisher_dto_js_1.UpdateExtinguisherDto]),
    __metadata("design:returntype", void 0)
], ExtinguishersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an extinguisher (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ExtinguishersController.prototype, "remove", null);
exports.ExtinguishersController = ExtinguishersController = __decorate([
    (0, swagger_1.ApiTags)('Extinguishers'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('extinguishers'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [extinguishers_service_js_1.ExtinguishersService])
], ExtinguishersController);
//# sourceMappingURL=extinguishers.controller.js.map