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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMaintenanceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_enums_js_1 = require("../../common/prisma-enums.js");
class CreateMaintenanceDto {
}
exports.CreateMaintenanceDto = CreateMaintenanceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-extinguisher' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "extinguisherId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Recharged cylinder and replaced safety pin' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Actions taken is required' }),
    (0, class_validator_1.MinLength)(10, { message: 'Actions taken must be at least 10 characters' }),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "actionsTaken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-06-03T10:00:00.000Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "actionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: prisma_enums_js_1.MaintenanceCondition,
        example: prisma_enums_js_1.MaintenanceCondition.GOOD,
    }),
    (0, class_validator_1.IsEnum)(prisma_enums_js_1.MaintenanceCondition),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "conditionNoted", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'uuid-of-inspection' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateMaintenanceDto.prototype, "inspectionId", void 0);
//# sourceMappingURL=create-maintenance.dto.js.map