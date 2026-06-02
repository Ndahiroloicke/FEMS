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
exports.EscalationsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("../generated/prisma/client");
const update_escalation_dto_js_1 = require("./dto/update-escalation.dto.js");
const escalations_service_js_1 = require("./escalations.service.js");
let EscalationsController = class EscalationsController {
    constructor(escalationsService) {
        this.escalationsService = escalationsService;
    }
    findAll(status) {
        return this.escalationsService.findAll(status);
    }
    findOne(id) {
        return this.escalationsService.findOne(id);
    }
    update(id, dto) {
        return this.escalationsService.update(id, dto);
    }
    markReported(id, notes) {
        return this.escalationsService.markReportedToPolice(id, notes);
    }
};
exports.EscalationsController = EscalationsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List police escalation cases' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: client_1.EscalationStatus }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EscalationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get escalation details' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EscalationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update escalation status or notes' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_escalation_dto_js_1.UpdateEscalationDto]),
    __metadata("design:returntype", void 0)
], EscalationsController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/report-to-police'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark escalation as reported to police' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EscalationsController.prototype, "markReported", null);
exports.EscalationsController = EscalationsController = __decorate([
    (0, swagger_1.ApiTags)('Escalations'),
    (0, common_1.Controller)('escalations'),
    __metadata("design:paramtypes", [escalations_service_js_1.EscalationsService])
], EscalationsController);
//# sourceMappingURL=escalations.controller.js.map