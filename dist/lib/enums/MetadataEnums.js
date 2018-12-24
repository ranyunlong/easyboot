"use strict";
/**
 * @namepace MetadataEnums
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PREFIX = 'easyboot:';
var MetadataEnums;
(function (MetadataEnums) {
    let Base;
    (function (Base) {
        Base["PARAMTYPES"] = "design:paramtypes";
        Base["TYPE"] = "design:type";
        Base["RETURNTYPES"] = "design:returntype";
        Base["CONFIGURATION"] = "easyboot:configuration";
        Base["VALIDATORS"] = "easyboot:validators";
        Base["EASYBOOTMODULE"] = "easyboot:module";
    })(Base = MetadataEnums.Base || (MetadataEnums.Base = {}));
    let Controller;
    (function (Controller) {
        Controller["CONTROLLER"] = "easyboot:controller";
        Controller["IS_CONTROLLER"] = "easyboot:is:controller";
        Controller["RESPONSE"] = "easyboot:response";
        Controller["REQUEST"] = "easyboot:request";
        Controller["SESSION"] = "easyboot:session";
        Controller["REQUEST_MAPPING"] = "easyboot:request:mapping";
        Controller["REQUEST_PARAM"] = "easyboot:request:param";
        Controller["REQUEST_BODY"] = "easyboot:request:body";
        Controller["REQUEST_FILE"] = "easyboot:request:file";
        Controller["REQUEST_QUERY"] = "easyboot:request:query";
        Controller["EXCEPTION_CAPTURE"] = "easyboot:exception:capture";
        Controller["EXCEPTION"] = "easyboot:exception";
        Controller["STATUS_CODE"] = "easyboot:status:code";
        Controller["STATUS_MESSAGE"] = "easyboot:status:message";
        Controller["CONTENT_TYPE"] = "easyboot:content:type";
    })(Controller = MetadataEnums.Controller || (MetadataEnums.Controller = {}));
    let Module;
    (function (Module) {
        Module["IMPORTS"] = "easyboot:imports";
        Module["PROVIDERS"] = "easyboot:providers";
        Module["CONTROLLERS"] = "easyboot:controllers";
        Module["EXPORTS"] = "easyboot:exports";
    })(Module = MetadataEnums.Module || (MetadataEnums.Module = {}));
})(MetadataEnums = exports.MetadataEnums || (exports.MetadataEnums = {}));
