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
exports.ExportQueryDto = exports.MaintenanceHistoryQueryDto = exports.StockQueryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_js_1 = require("../../common/dto/pagination.dto.js");
class StockQueryDto {
    constructor() {
        this.period = 'monthly';
    }
}
exports.StockQueryDto = StockQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['daily', 'monthly', 'yearly'],
        default: 'monthly',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['daily', 'monthly', 'yearly']),
    __metadata("design:type", String)
], StockQueryDto.prototype, "period", void 0);
class MaintenanceHistoryQueryDto extends pagination_dto_js_1.PaginationDto {
}
exports.MaintenanceHistoryQueryDto = MaintenanceHistoryQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MaintenanceHistoryQueryDto.prototype, "extinguisherId", void 0);
class ExportQueryDto {
}
exports.ExportQueryDto = ExportQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['extinguishers', 'inspections', 'maintenance', 'expired'],
    }),
    (0, class_validator_1.IsIn)(['extinguishers', 'inspections', 'maintenance', 'expired']),
    __metadata("design:type", String)
], ExportQueryDto.prototype, "report", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['csv', 'pdf'] }),
    (0, class_validator_1.IsIn)(['csv', 'pdf']),
    __metadata("design:type", String)
], ExportQueryDto.prototype, "format", void 0);
//# sourceMappingURL=export-query.dto.js.map