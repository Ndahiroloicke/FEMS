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
exports.QueryExtinguisherDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const prisma_enums_js_1 = require("../../common/prisma-enums.js");
const pagination_dto_js_1 = require("../../common/dto/pagination.dto.js");
class QueryExtinguisherDto extends pagination_dto_js_1.PaginationDto {
}
exports.QueryExtinguisherDto = QueryExtinguisherDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: prisma_enums_js_1.ExtinguisherStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_enums_js_1.ExtinguisherStatus),
    __metadata("design:type", String)
], QueryExtinguisherDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: prisma_enums_js_1.ExtinguisherType }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(prisma_enums_js_1.ExtinguisherType),
    __metadata("design:type", String)
], QueryExtinguisherDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ description: 'Search by serial number or location' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QueryExtinguisherDto.prototype, "search", void 0);
//# sourceMappingURL=query-extinguisher.dto.js.map