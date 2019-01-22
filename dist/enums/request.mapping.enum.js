"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestEnum;
(function (RequestEnum) {
    let Names;
    (function (Names) {
        Names["GET"] = "GetMapping";
        Names["PUT"] = "PutMapping";
        Names["POST"] = "PostMapping";
        Names["HEAD"] = "HeadMapping";
        Names["PATCH"] = "PatchMapping";
        Names["DELETE"] = "DeleteMapping";
        Names["COPY"] = "CopyMapping";
        Names["OPTIONS"] = "OptionsMapping";
        Names["LINK"] = "LinkMapping";
        Names["UNLINK"] = "UnlinkMapping";
        Names["PURGE"] = "PurgeMapping";
        Names["LOCK"] = "LockMapping";
        Names["UNLOCK"] = "UnlockMapping";
        Names["PROPFIND"] = "PropfindMapping";
        Names["VIEW"] = "ViewMapping";
        Names["ALL"] = "RequestMapping";
    })(Names = RequestEnum.Names || (RequestEnum.Names = {}));
    let Methods;
    (function (Methods) {
        Methods["GET"] = "GET";
        Methods["PUT"] = "PUT";
        Methods["POST"] = "POST";
        Methods["HEAD"] = "HEAD";
        Methods["PATCH"] = "PATCH";
        Methods["DELETE"] = "DELETE";
        Methods["COPY"] = "COPY";
        Methods["OPTIONS"] = "OPTIONS";
        Methods["LINK"] = "LINK";
        Methods["UNLINK"] = "UNLINK";
        Methods["PURGE"] = "PURGE";
        Methods["LOCK"] = "LOCK";
        Methods["UNLOCK"] = "UNLOCK";
        Methods["PROPFIND"] = "PROPFIND";
        Methods["VIEW"] = "VIEW";
        Methods["ALL"] = "ALL";
    })(Methods = RequestEnum.Methods || (RequestEnum.Methods = {}));
})(RequestEnum = exports.RequestEnum || (exports.RequestEnum = {}));
//# sourceMappingURL=request.mapping.enum.js.map