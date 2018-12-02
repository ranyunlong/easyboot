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
const src_1 = require("../../../../../src");
const UserServices_1 = require("../../home/services/UserServices");
let IndexController = class IndexController {
    constructor(userService) {
        this.userService = userService;
    }
    async index(params, body) {
        return;
    }
};
__decorate([
    src_1.GetMapping('users'),
    src_1.PostMapping('users'),
    __param(0, src_1.RequestParam(UserServices_1.UserService)), __param(1, src_1.RequestBody(UserServices_1.UserService)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "index", null);
IndexController = __decorate([
    src_1.Controller,
    src_1.RequestMapping('admin'),
    __metadata("design:paramtypes", [UserServices_1.UserService])
], IndexController);
exports.IndexController = IndexController;
//# sourceMappingURL=IndexController.js.map