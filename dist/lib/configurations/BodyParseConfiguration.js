"use strict";
/**
 * @class BodyParseConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const FormMidableConfiguration_1 = require("./FormMidableConfiguration");
class BodyParseConfiguration {
    constructor() {
        /**
         * The byte (if integer) limit of the JSON body, default 1mb
         */
        this.jsonLimit = '1mb';
        /**
         * The byte (if integer) limit of the form body, default 56kb
         */
        this.formLimit = '56kb';
        /**
         * The byte (if integer) limit of the text body, default 56kb
         */
        this.textLimit = '56kb';
        /**
         * Sets encoding for incoming form fields, default utf-8
         */
        this.encoding = 'utf-8';
        /**
         * Parse multipart bodies, default false
         */
        this.multipart = false;
        /**
         * Parse urlencoded bodies, default true
         */
        this.urlencoded = true;
        /**
         * Parse text bodies, default true
         */
        this.text = true;
        /**
         * Parse json bodies, default true
         */
        this.json = true;
        /**
         * Toggles co-body strict mode; if set to true - only parses arrays or objects, default true
         */
        this.jsonStrict = true;
        /**
         * Options to pass to the formidable multipart parser
         */
        this.formidable = new FormMidableConfiguration_1.FormMidableConfiguration();
        /**
         * If enabled, don't parse GET, HEAD, DELETE requests, default true
         */
        this.strict = true;
        /**
         * Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
         */
        this.uploadDir = os_1.tmpdir();
    }
}
exports.BodyParseConfiguration = BodyParseConfiguration;
