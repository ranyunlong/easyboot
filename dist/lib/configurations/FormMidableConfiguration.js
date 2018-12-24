"use strict";
/**
 * @class FormMidableConfiguration
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
class FormMidableConfiguration {
    constructor() {
        /**
         * Sets encoding for incoming form fields, default utf-8.
         */
        this.encoding = 'utf-8';
        /**
         * Sets the directory for placing file uploads in. You can move them later on using fs.rename(). The default is os.tmpdir().
         */
        this.uploadDir = os_1.tmpdir();
        /**
         * If you want the files written to form.uploadDir to include the extensions of the original files, set this property to true.
         */
        this.keepExtensions = false;
        /**
         * Either 'multipart' or 'urlencoded' depending on the incoming request.
         */
        this.type = 'multipart';
        /**
         * Limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
         */
        this.maxFields = 1000;
        /**
         * Limits the size of uploaded file. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
         */
        this.maxFileSize = 2 * 1024 * 1024;
        /**
         * Limits the amount of memory all fields together (except files) can allocate in bytes. If this value is exceeded, an 'error' event is emitted. The default size is 2MB.
         */
        this.maxFieldsSize = 2 * 1024 * 1024;
        /**
         * If you want checksums calculated for incoming files, set this to either 'sha1' or 'md5'.
         */
        this.hash = false;
        /**
         * If this option is enabled, when you call form.parse, the files argument will contain arrays of files for inputs which submit multiple files using the HTML5 multiple attribute.
         */
        this.multiples = true;
    }
}
exports.FormMidableConfiguration = FormMidableConfiguration;
