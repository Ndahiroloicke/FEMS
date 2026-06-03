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
exports.CreateExtinguisherDto = exports.EXTINGUISHER_SIZES = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_enums_js_1 = require("../../common/prisma-enums.js");
exports.EXTINGUISHER_SIZES = ['2.5lbs', '5lbs', '9lbs', '12lbs'];
class CreateExtinguisherDto {
}
exports.CreateExtinguisherDto = CreateExtinguisherDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'FE-2024-001234' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "serialNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Building A — Floor 2 Corridor' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: prisma_enums_js_1.ExtinguisherType, example: prisma_enums_js_1.ExtinguisherType.CO2 }),
    (0, class_validator_1.IsEnum)(prisma_enums_js_1.ExtinguisherType),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: exports.EXTINGUISHER_SIZES, example: '5lbs' }),
    (0, class_validator_1.IsIn)(exports.EXTINGUISHER_SIZES),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "installationDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-01-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: prisma_enums_js_1.ExtinguisherStatus,
        default: prisma_enums_js_1.ExtinguisherStatus.ACTIVE,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_enums_js_1.ExtinguisherStatus),
    __metadata("design:type", String)
], CreateExtinguisherDto.prototype, "status", void 0);
//# sourceMappingURL=create-extinguisher.dto.js.map