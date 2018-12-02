"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function Controller(target) {
    const options = target.prototype;
    options.$metadata = Reflect.getMetadata('design:paramtypes', target);
    console.log(target.prototype.$propertys);
}
exports.Controller = Controller;
//# sourceMappingURL=Controller.js.map