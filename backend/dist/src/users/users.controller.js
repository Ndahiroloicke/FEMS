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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_js_1 = require("../common/decorators/current-user.decorator.js");
const roles_decorator_js_1 = require("../common/decorators/roles.decorator.js");
const roles_guard_js_1 = require("../common/guards/roles.guard.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const change_password_dto_js_1 = require("./dto/change-password.dto.js");
const list_users_dto_js_1 = require("./dto/list-users.dto.js");
const update_profile_dto_js_1 = require("./dto/update-profile.dto.js");
const update_role_dto_js_1 = require("./dto/update-role.dto.js");
const update_status_dto_js_1 = require("./dto/update-status.dto.js");
const users_service_js_1 = require("./users.service.js");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    getMe(userId) {
        return this.usersService.getById(userId);
    }
    updateMe(userId, dto) {
        return this.usersService.updateProfile(userId, dto);
    }
    changePassword(userId, dto) {
        return this.usersService.changePassword(userId, dto);
    }
    findAll(query) {
        return this.usersService.findAll(query);
    }
    updateRole(id, dto) {
        return this.usersService.updateRole(id, dto.role);
    }
    updateStatus(id, dto) {
        return this.usersService.updateStatus(id, dto.isActive);
    }
    remove(id, currentUserId) {
        return this.usersService.remove(id, currentUserId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the current user profile' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMe", null);
__decorate([
    (0, common_1.Patch)('me'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the current user profile' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_profile_dto_js_1.UpdateProfileDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateMe", null);
__decorate([
    (0, common_1.Patch)('me/password'),
    (0, swagger_1.ApiOperation)({ summary: 'Change the current user password' }),
    __param(0, (0, current_user_decorator_js_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, change_password_dto_js_1.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'List users (admin, paginated)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_users_dto_js_1.ListUsersDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id/role'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user role (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_role_dto_js_1.UpdateRoleDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateRole", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Activate or deactivate a user (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_status_dto_js_1.UpdateStatusDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(prisma_enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user (admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_js_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(roles_guard_js_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_js_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map