"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtinguishersModule = void 0;
const common_1 = require("@nestjs/common");
const extinguishers_controller_js_1 = require("./extinguishers.controller.js");
const extinguishers_service_js_1 = require("./extinguishers.service.js");
let ExtinguishersModule = class ExtinguishersModule {
};
exports.ExtinguishersModule = ExtinguishersModule;
exports.ExtinguishersModule = ExtinguishersModule = __decorate([
    (0, common_1.Module)({
        controllers: [extinguishers_controller_js_1.ExtinguishersController],
        providers: [extinguishers_service_js_1.ExtinguishersService],
        exports: [extinguishers_service_js_1.ExtinguishersService],
    })
], ExtinguishersModule);
//# sourceMappingURL=extinguishers.module.js.map