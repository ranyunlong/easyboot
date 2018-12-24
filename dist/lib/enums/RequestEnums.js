"use strict";
/**
 * @namepace RequestEnums
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
var RequestEnums;
(function (RequestEnums) {
    let MAPPING;
    (function (MAPPING) {
        MAPPING["GET"] = "GetMapping";
        MAPPING["PUT"] = "PutMapping";
        MAPPING["POST"] = "PostMapping";
        MAPPING["HEAD"] = "HeadMapping";
        MAPPING["PATCH"] = "PatchMapping";
        MAPPING["DELETE"] = "DeleteMapping";
        MAPPING["COPY"] = "CopyMapping";
        MAPPING["OPTIONS"] = "OptionsMapping";
        MAPPING["LINK"] = "LinkMapping";
        MAPPING["UNLINK"] = "UnlinkMapping";
        MAPPING["PURGE"] = "PurgeMapping";
        MAPPING["LOCK"] = "LockMapping";
        MAPPING["UNLOCK"] = "UnlockMapping";
        MAPPING["PROPFIND"] = "PropfindMapping";
        MAPPING["VIEW"] = "ViewMapping";
        MAPPING["ALL"] = "RequestMapping";
    })(MAPPING = RequestEnums.MAPPING || (RequestEnums.MAPPING = {}));
    let METHOD;
    (function (METHOD) {
        METHOD["GET"] = "GET";
        METHOD["PUT"] = "PUT";
        METHOD["POST"] = "POST";
        METHOD["HEAD"] = "HEAD";
        METHOD["PATCH"] = "PATCH";
        METHOD["DELETE"] = "DELETE";
        METHOD["COPY"] = "COPY";
        METHOD["OPTIONS"] = "OPTIONS";
        METHOD["LINK"] = "LINK";
        METHOD["UNLINK"] = "UNLINK";
        METHOD["PURGE"] = "PURGE";
        METHOD["LOCK"] = "LOCK";
        METHOD["UNLOCK"] = "UNLOCK";
        METHOD["PROPFIND"] = "PROPFIND";
        METHOD["VIEW"] = "VIEW";
        METHOD["ALL"] = "ALL";
    })(METHOD = RequestEnums.METHOD || (RequestEnums.METHOD = {}));
})(RequestEnums = exports.RequestEnums || (exports.RequestEnums = {}));
