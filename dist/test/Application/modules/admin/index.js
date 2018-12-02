"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
const IndexController_1 = require("./controllers/IndexController");
const UserService_1 = require("./services/UserService");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    src_1.Module({
        controllers: [IndexController_1.IndexController],
        providers: [UserService_1.UserService]
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=index.js.map