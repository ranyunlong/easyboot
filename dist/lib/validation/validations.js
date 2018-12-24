"use strict";
/**
 * @module validations
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const createValidation_1 = require("./createValidation");
const validators = require("validator");
const formidable_1 = require("@easyboot/formidable");
const FileValidation_1 = require("./FileValidation");
const validator = validators;
validator.isRequired = function isRequired(value) {
    return !validator.isEmpty(value);
};
validator.isFile = function isFile(value) {
    if (typeof value !== 'object' || Array.isArray(value))
        return false;
    return value.constructor === formidable_1.File;
};
/**
 * isAfter
 *
 * check if the string is a date that's after the specified date (defaults to now).
 *
 * Example:
 * ```
 * @RequestBody('id', isAfter)
 * @RequestBody('id', [isAfter])
 * @RequestBody('id', isAfter('message'))
 * @RequestBody('id', [isAfter('message')])
 * @RequestBody('id', isAfter('message', '2018-10-11'))
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isAfter(message, date) {
    return createValidation_1.createValidation(message, validator.isAfter, date);
}
exports.isAfter = isAfter;
/**
 * isAlpha
 *
 * check if the string contains only letters (a-zA-Z).
 *
 * Example
 * ```
 * @RequestBody('id', isAlpha)
 * @RequestBody('id', [isAlpha])
 * @RequestBody('id', isAlpha('message'))
 * @RequestBody('id', [isAlpha('message')])
 * @RequestBody('id', isAlpha('message', 'en-US'))
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isAlpha(message, locale) {
    return createValidation_1.createValidation(message, validator.isAfter, locale);
}
exports.isAlpha = isAlpha;
/**
 * isAlphanumeric
 *
 * check if the string contains only letters and numbers.
 *
 * Example
 * ```
 * @RequestBody('id', isAlphanumeric)
 * @RequestBody('id', [isAlphanumeric])
 * @RequestBody('id', isAlphanumeric('message'))
 * @RequestBody('id', [isAlphanumeric('message')])
 * @RequestBody('id', isAlphanumeric('message', 'en-US'))
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isAlphanumeric(message, locale) {
    return createValidation_1.createValidation(message, validator.isAlphanumeric, locale);
}
exports.isAlphanumeric = isAlphanumeric;
/**
 * isAscii
 *
 * check if the string contains ASCII chars only.
 *
 * Example
 * ```
 * @RequestBody('id', isAscii)
 * @RequestBody('id', [isAscii])
 * @RequestBody('id', isAscii('message'))
 * @RequestBody('id', [isAscii('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isAscii(message) {
    return createValidation_1.createValidation(message, validator.isAscii);
}
exports.isAscii = isAscii;
/**
 * isBase64
 *
 * check if a string is base64 encoded.
 *
 * Example
 * ```
 * @RequestBody('id', isBase64)
 * @RequestBody('id', [isBase64])
 * @RequestBody('id', [isBase64('message')])
 * @RequestBody('id', isBase64('message'))
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isBase64(message) {
    return createValidation_1.createValidation(message, validator.isBase64);
}
exports.isBase64 = isBase64;
/**
 * isBefore
 *
 * check if the string is a date that's before the specified date.
 *
 * Example
 * ```
 * @RequestBody('id', isBefore)
 * @RequestBody('id', [isBefore])
 * @RequestBody('id', isBefore('message', '2018-02-01'))
 * @RequestBody('id', [isBefore('message', '2018-02-01')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isBefore(message, date) {
    return createValidation_1.createValidation(message, validator.isBefore, date);
}
exports.isBefore = isBefore;
/**
 * isBoolean
 *
 * check if a string is a boolean.
 *
 * Example
 * ```
 * @RequestBody('id', isBoolean)
 * @RequestBody('id', [isBoolean])
 * @RequestBody('id', isBoolean('message'))
 * @RequestBody('id', [isBoolean('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isBoolean(message) {
    return createValidation_1.createValidation(message, validator.isBoolean);
}
exports.isBoolean = isBoolean;
/**
 * isByteLength
 *
 * check if the string's length (in UTF-8 bytes) falls in a range.
 *
 * Example
 * ```
 * @RequestBody('id', isByteLength)
 * @RequestBody('id', [isByteLength])
 * @RequestBody('id', isByteLength('message'))
 * @RequestBody('id', [isByteLength('message')])
 * @RequestBody('id', isByteLength('message', {min:0, max: undefined}))
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isByteLength(message, options) {
    return createValidation_1.createValidation(message, validator.isByteLength, options);
}
exports.isByteLength = isByteLength;
/**
 * isCreditCard
 *
 * check if the string is a credit card.
 *
 * Example
 * ```
 * @RequestBody('id', isCreditCard)
 * @RequestBody('id', [isCreditCard])
 * @RequestBody('id', isCreditCard('message'))
 * @RequestBody('id', [isCreditCard('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isCreditCard(message) {
    return createValidation_1.createValidation(message, validator.isCreditCard);
}
exports.isCreditCard = isCreditCard;
/**
 * isCurrency
 *
 * check if the string is a valid currency amount.
 *
 * Example
 * ```
 * @RequestBody('id', isCurrency)
 * @RequestBody('id', [isCurrency])
 * @RequestBody('id', isCurrency('message'))
 * @RequestBody('id', isCurrency('message', {}))
 * @RequestBody('id', [isCurrency('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isCurrency(message, options) {
    return createValidation_1.createValidation(message, validator.isCurrency, options);
}
exports.isCurrency = isCurrency;
/**
 * isDataURI
 *
 * check if the string is a data uri format.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example
 * ```
 * @RequestBody('id', isDataURI)
 * @RequestBody('id', [isDataURI])
 * @RequestBody('id', isDataURI('message'))
 * @RequestBody('id', [isDataURI('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isDataURI(message) {
    return createValidation_1.createValidation(message, validator.isDataURI);
}
exports.isDataURI = isDataURI;
/**
 * isMagnetURI
 *
 * check if the string is a data uri format.
 *
 * https://en.wikipedia.org/wiki/Magnet_URI_scheme
 *
 * Example
 * ```
 * @RequestBody('id', isMagnetURI)
 * @RequestBody('id', [isMagnetURI])
 * @RequestBody('id', isMagnetURI('message'))
 * @RequestBody('id', [isMagnetURI('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMagnetURI(message) {
    return createValidation_1.createValidation(message, validator.isMagnetURI);
}
exports.isMagnetURI = isMagnetURI;
/**
 * isDecimal
 *
 * check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
 *
 * Example
 * ```
 * @RequestBody('id', isDecimal)
 * @RequestBody('id', [isDecimal])
 * @RequestBody('id', isDecimal('message'))
 * @RequestBody('id', isDecimal('message', 'en-US'))
 * @RequestBody('id', [isDecimal('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isDecimal(message, options) {
    return createValidation_1.createValidation(message, validator.isDecimal, options);
}
exports.isDecimal = isDecimal;
/**
 * isDivisibleBy
 *
 * check if the string is a number that's divisible by another.
 *
 * Example
 * ```
 * @RequestBody('id', isDivisibleBy)
 * @RequestBody('id', [isDivisibleBy])
 * @RequestBody('id', isDivisibleBy('message'))
 * @RequestBody('id', [isDivisibleBy('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isDivisibleBy(message) {
    return createValidation_1.createValidation(message, validator.isDivisibleBy);
}
exports.isDivisibleBy = isDivisibleBy;
/**
 * isEmail
 *
 * check if the string is an email.
 *
 * Example
 * ```
 * @RequestBody('id', isEmail)
 * @RequestBody('id', [isEmail])
 * @RequestBody('id', isEmail('message'))
 * @RequestBody('id', isEmail('message', {}))
 * @RequestBody('id', [isEmail('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isEmail(message, options) {
    return createValidation_1.createValidation(message, validator.isEmail, options);
}
exports.isEmail = isEmail;
/**
 * isEmpty
 *
 * check if the string has a length of zero.
 *
 * Example
 * ```
 * @RequestBody('id', isEmpty)
 * @RequestBody('id', [isEmpty])
 * @RequestBody('id', isEmpty('message'))
 * @RequestBody('id', [isEmpty('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isEmpty(message) {
    return createValidation_1.createValidation(message, validator.isEmpty);
}
exports.isEmpty = isEmpty;
/**
 * isFQDN
 *
 * check if the string is a fully qualified domain name (e.g. domain.com).
 *
 * Example
 * ```
 * @RequestBody('id', isFQDN)
 * @RequestBody('id', [isFQDN])
 * @RequestBody('id', isFQDN('message'))
 * @RequestBody('id', isFQDN('message', {}))
 * @RequestBody('id', [isFQDN('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isFQDN(message, options) {
    return createValidation_1.createValidation(message, validator.isFQDN, options);
}
exports.isFQDN = isFQDN;
/**
 * isFloat
 *
 * check if the string is a float.
 *
 * Example
 * ```
 * @RequestBody('id', isFloat)
 * @RequestBody('id', [isFloat])
 * @RequestBody('id', isFloat('message'))
 * @RequestBody('id', isFloat('message', {}))
 * @RequestBody('id', [isFloat('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isFloat(message, options) {
    return createValidation_1.createValidation(message, validator.isFloat, options);
}
exports.isFloat = isFloat;
/**
 * isFullWidth
 *
 * check if the string contains any full-width chars.
 *
 * Example
 * ```
 * @RequestBody('id', isFullWidth)
 * @RequestBody('id', [isFullWidth])
 * @RequestBody('id', isFullWidth('message'))
 * @RequestBody('id', [isFullWidth('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isFullWidth(message) {
    return createValidation_1.createValidation(message, validator.isFullWidth);
}
exports.isFullWidth = isFullWidth;
/**
 * isHalfWidth
 *
 * check if the string contains any half-width chars.
 *
 * Example
 * ```
 * @RequestBody('id', isHalfWidth)
 * @RequestBody('id', [isHalfWidth])
 * @RequestBody('id', isHalfWidth('message'))
 * @RequestBody('id', [isHalfWidth('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isHalfWidth(message) {
    return createValidation_1.createValidation(message, validator.isHalfWidth);
}
exports.isHalfWidth = isHalfWidth;
/**
 * isHash
 *
 * check if the string is a hash of type algorithm.
 * Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']
 *
 * Example
 * ```
 * @RequestBody('id', isHash)
 * @RequestBody('id', [isHash])
 * @RequestBody('id', isHash('message'))
 * @RequestBody('id', isHash('message', "md5"))
 * @RequestBody('id', [isHash('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isHash(message, options) {
    return createValidation_1.createValidation(message, validator.isHash, options);
}
exports.isHash = isHash;
/**
 * isHexColor
 *
 * check if the string is a hexadecimal color.
 *
 * Example
 * ```
 * @RequestBody('id', isHexColor)
 * @RequestBody('id', [isHexColor])
 * @RequestBody('id', isHexColor('message'))
 * @RequestBody('id', [isHexColor('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isHexColor(message) {
    return createValidation_1.createValidation(message, validator.isHexColor);
}
exports.isHexColor = isHexColor;
/**
 * isHexadecimal
 *
 * check if the string is a hexadecimal number.
 *
 * Example
 * ```
 * @RequestBody('id', isHexadecimal)
 * @RequestBody('id', [isHexadecimal])
 * @RequestBody('id', isHexadecimal('message'))
 * @RequestBody('id', [isHexadecimal('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isHexadecimal(message) {
    return createValidation_1.createValidation(message, validator.isHexadecimal);
}
exports.isHexadecimal = isHexadecimal;
/**
 * isIdentityCard
 *
 * check if the string is a valid identity card code.
 *
 * Example
 * ```
 * @RequestBody('id', isIdentityCard)
 * @RequestBody('id', [isIdentityCard])
 * @RequestBody('id', isIdentityCard('message'))
 * @RequestBody('id', [isIdentityCard('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isIdentityCard(message) {
    return createValidation_1.createValidation(message, validator.isIdentityCard);
}
exports.isIdentityCard = isIdentityCard;
/**
 * isIP
 *
 * check if the string is an IP (version 4 or 6).
 *
 * Example
 * ```
 * @RequestBody('id', isIP)
 * @RequestBody('id', [isIP])
 * @RequestBody('id', isIP('message'))
 * @RequestBody('id', isIP('message', 4))
 * @RequestBody('id', isIP('message', 6))
 * @RequestBody('id', [isIP('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isIP(message, version) {
    return createValidation_1.createValidation(message, validator.isIP, version);
}
exports.isIP = isIP;
/**
 * isIPRange
 *
 * check if the string is an IP Range(version 4 only).
 *
 * Example
 * ```
 * @RequestBody('id', isIPRange)
 * @RequestBody('id', [isIPRange])
 * @RequestBody('id', isIPRange('message'))
 * @RequestBody('id', [isIPRange('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isIPRange(message) {
    return createValidation_1.createValidation(message, validator.isIPRange);
}
exports.isIPRange = isIPRange;
/**
 * isISBN
 *
 * check if the string is an ISBN (version 10 or 13).
 *
 * Example
 * ```
 * @RequestBody('id', isISBN)
 * @RequestBody('id', [isISBN])
 * @RequestBody('id', isISBN('message'))
 * @RequestBody('id', isISBN('message', 10))
 * @RequestBody('id', isISBN('message', 13))
 * @RequestBody('id', [isISBN('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISBN(message, version) {
    return createValidation_1.createValidation(message, validator.isISBN, version);
}
exports.isISBN = isISBN;
/**
 * isISSN
 *
 * check if the string is an ISSN.
 * https://en.wikipedia.org/wiki/International_Standard_Serial_Number
 *
 * Example
 * ```
 * @RequestBody('id', isISSN)
 * @RequestBody('id', [isISSN])
 * @RequestBody('id', isISSN('message'))
 * @RequestBody('id', isISSN('message', {}))
 * @RequestBody('id', [isISSN('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISSN(message, options) {
    return createValidation_1.createValidation(message, validator.isISSN, options);
}
exports.isISSN = isISSN;
/**
 * isISIN
 *
 * check if the string is an ISIN (stock/security identifier).
 * https://en.wikipedia.org/wiki/International_Securities_Identification_Number
 *
 * Example
 * ```
 * @RequestBody('id', isISIN)
 * @RequestBody('id', [isISIN])
 * @RequestBody('id', isISIN('message'))
 * @RequestBody('id', [isISIN('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISIN(message) {
    return createValidation_1.createValidation(message, validator.isISIN);
}
exports.isISIN = isISIN;
/**
 * isISO8601
 *
 * check if the string is a valid ISO 8601 date.
 * https://en.wikipedia.org/wiki/ISO_8601
 *
 * Example
 * ```
 * @RequestBody('id', isISO8601)
 * @RequestBody('id', [isISO8601])
 * @RequestBody('id', isISO8601('message'))
 * @RequestBody('id', [isISO8601('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISO8601(message) {
    return createValidation_1.createValidation(message, validator.isISO8601);
}
exports.isISO8601 = isISO8601;
/**
 * isRFC3339
 *
 * check if the string is a valid RFC 3339 date.
 * https://tools.ietf.org/html/rfc3339
 *
 * Example
 * ```
 * @RequestBody('id', isRFC3339)
 * @RequestBody('id', [isRFC3339])
 * @RequestBody('id', isRFC3339('message'))
 * @RequestBody('id', [isRFC3339('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isRFC3339(message) {
    return createValidation_1.createValidation(message, validator.isRFC3339);
}
exports.isRFC3339 = isRFC3339;
/**
 * isISO31661Alpha2
 *
 * check if the string is a valid ISO 3166-1 alpha-2 officially assigned country code.
 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 *
 * Example
 * ```
 * @RequestBody('id', isISO31661Alpha2)
 * @RequestBody('id', [isISO31661Alpha2])
 * @RequestBody('id', isISO31661Alpha2('message'))
 * @RequestBody('id', [isISO31661Alpha2('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISO31661Alpha2(message) {
    return createValidation_1.createValidation(message, validator.isISO31661Alpha2);
}
exports.isISO31661Alpha2 = isISO31661Alpha2;
/**
 * isISO31661Alpha3
 *
 * check if the string is a valid ISO 3166-1 alpha-3 officially assigned country code.
 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
 *
 * Example
 * ```
 * @RequestBody('id', isISO31661Alpha3)
 * @RequestBody('id', [isISO31661Alpha3])
 * @RequestBody('id', isISO31661Alpha3('message'))
 * @RequestBody('id', [isISO31661Alpha3('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISO31661Alpha3(message) {
    return createValidation_1.createValidation(message, validator.isISO31661Alpha3);
}
exports.isISO31661Alpha3 = isISO31661Alpha3;
/**
 * isISRC
 *
 * check if the string is a ISRC.
 * https://en.wikipedia.org/wiki/International_Standard_Recording_Code
 *
 * Example
 * ```
 * @RequestBody('id', isISRC)
 * @RequestBody('id', [isISRC])
 * @RequestBody('id', isISRC('message'))
 * @RequestBody('id', [isISRC('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isISRC(message) {
    return createValidation_1.createValidation(message, validator.isISRC);
}
exports.isISRC = isISRC;
/**
 * isIn
 *
 * check if the string is in a array of allowed values.
 *
 * Example
 * ```
 * @RequestBody('id', isIn)
 * @RequestBody('id', [isIn])
 * @RequestBody('id', isIn('message'))
 * @RequestBody('id', [isIn('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isIn(message, values) {
    return createValidation_1.createValidation(message, validator.isIn, values);
}
exports.isIn = isIn;
/**
 * isInt
 *
 * check if the string is an integer.
 *
 * Example
 * ```
 * @RequestBody('id', isInt)
 * @RequestBody('id', [isInt])
 * @RequestBody('id', isInt('message'))
 * @RequestBody('id', [isInt('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isInt(message, options) {
    return createValidation_1.createValidation(message, validator.isInt, options);
}
exports.isInt = isInt;
/**
 * isJSON
 *
 * check if the string is valid JSON (note: uses JSON.parse).
 *
 * Example
 * ```
 * @RequestBody('id', isJSON)
 * @RequestBody('id', [isJSON])
 * @RequestBody('id', isJSON('message'))
 * @RequestBody('id', [isJSON('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isJSON(message) {
    return createValidation_1.createValidation(message, validator.isJSON);
}
exports.isJSON = isJSON;
/**
 * isJWT
 *
 * check if the string is valid JWT token.
 *
 * Example
 * ```
 * @RequestBody('id', isJWT)
 * @RequestBody('id', [isJWT])
 * @RequestBody('id', isJWT('message'))
 * @RequestBody('id', [isJWT('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isJWT(message) {
    return createValidation_1.createValidation(message, validator.isJWT);
}
exports.isJWT = isJWT;
/**
 * isLatLong
 *
 * check if the string is a valid latitude-longitude coordinate in the format lat,long or lat, long.
 *
 * Example
 * ```
 * @RequestBody('id', isLatLong)
 * @RequestBody('id', [isLatLong])
 * @RequestBody('id', isLatLong('message'))
 * @RequestBody('id', [isLatLong('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isLatLong(message) {
    return createValidation_1.createValidation(message, validator.isLatLong);
}
exports.isLatLong = isLatLong;
/**
 * isLength
 *
 * check if the string's length falls in a range.
 *
 * Example
 * ```
 * @RequestBody('id', isLength)
 * @RequestBody('id', [isLength])
 * @RequestBody('id', isLength('message'))
 * @RequestBody('id', [isLength('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isLength(message, options) {
    return createValidation_1.createValidation(message, validator.isLength, options);
}
exports.isLength = isLength;
/**
 * isLowercase
 *
 * check if the string is lowercase.
 *
 * Example
 * ```
 * @RequestBody('id', isLowercase)
 * @RequestBody('id', [isLowercase])
 * @RequestBody('id', isLowercase('message'))
 * @RequestBody('id', [isLowercase('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isLowercase(message) {
    return createValidation_1.createValidation(message, validator.isLowercase);
}
exports.isLowercase = isLowercase;
/**
 * isMACAddress
 *
 * check if the string is a MAC address.
 *
 * Example
 * ```
 * @RequestBody('id', isMACAddress)
 * @RequestBody('id', [isMACAddress])
 * @RequestBody('id', isMACAddress('message'))
 * @RequestBody('id', [isMACAddress('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMACAddress(message) {
    return createValidation_1.createValidation(message, validator.isMACAddress);
}
exports.isMACAddress = isMACAddress;
/**
 * isMD5
 *
 * check if the string is a MD5 hash.
 *
 * Example
 * ```
 * @RequestBody('id', isMD5)
 * @RequestBody('id', [isMD5])
 * @RequestBody('id', isMD5('message'))
 * @RequestBody('id', [isMD5('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMD5(message) {
    return createValidation_1.createValidation(message, validator.isMD5);
}
exports.isMD5 = isMD5;
/**
 * isMimeType
 *
 * check if the string matches to a valid MIME type format
 * https://en.wikipedia.org/wiki/Media_type
 *
 * Example
 * ```
 * @RequestBody('id', isMimeType)
 * @RequestBody('id', [isMimeType])
 * @RequestBody('id', isMimeType('message'))
 * @RequestBody('id', [isMimeType('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMimeType(message) {
    return createValidation_1.createValidation(message, validator.isMimeType);
}
exports.isMimeType = isMimeType;
/**
 * isMobilePhone
 *
 * check if the string is a mobile phone number.
 *
 * Example
 * ```
 * @RequestBody('id', isMobilePhone)
 * @RequestBody('id', [isMobilePhone])
 * @RequestBody('id', isMobilePhone('message', 'zh-CN'))
 * @RequestBody('id', [isMobilePhone('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMobilePhone(message, locale) {
    return createValidation_1.createValidation(message, validator.isMobilePhone, locale);
}
exports.isMobilePhone = isMobilePhone;
/**
 * isMongoId
 *
 * check if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * http://docs.mongodb.org/manual/reference/object-id/
 *
 * Example
 * ```
 * @RequestBody('id', isMongoId)
 * @RequestBody('id', [isMongoId])
 * @RequestBody('id', isMongoId('message'))
 * @RequestBody('id', [isMongoId('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMongoId(message) {
    return createValidation_1.createValidation(message, validator.isMongoId);
}
exports.isMongoId = isMongoId;
/**
 * isMultibyte
 *
 * check if the string contains one or more multibyte chars.
 *
 * Example
 * ```
 * @RequestBody('id', isMultibyte)
 * @RequestBody('id', [isMultibyte])
 * @RequestBody('id', isMultibyte('message'))
 * @RequestBody('id', [isMultibyte('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isMultibyte(message) {
    return createValidation_1.createValidation(message, validator.isMultibyte);
}
exports.isMultibyte = isMultibyte;
/**
 * isNumeric
 *
 * check if the string contains only numbers.
 *
 * Example
 * ```
 * @RequestBody('id', isNumeric)
 * @RequestBody('id', [isNumeric])
 * @RequestBody('id', isNumeric('message', {}))
 * @RequestBody('id', [isNumeric('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isNumeric(message, options) {
    return createValidation_1.createValidation(message, validator.isNumeric, options);
}
exports.isNumeric = isNumeric;
/**
 * isPort
 *
 * check if the string is a valid port number.
 *
 * Example
 * ```
 * @RequestBody('id', isPort)
 * @RequestBody('id', [isPort])
 * @RequestBody('id', isPort('message'))
 * @RequestBody('id', [isPort('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isPort(message) {
    return createValidation_1.createValidation(message, validator.isPort);
}
exports.isPort = isPort;
/**
 * isPostalCode
 *
 * check if the string is a postal code.
 *
 * Example
 * ```
 * @RequestBody('id', isPostalCode)
 * @RequestBody('id', [isPostalCode])
 * @RequestBody('id', isPostalCode('message', 'CH'))
 * @RequestBody('id', [isPostalCode('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isPostalCode(message, locale) {
    return createValidation_1.createValidation(message, validator.isPostalCode, locale);
}
exports.isPostalCode = isPostalCode;
/**
 * isSurrogatePair
 *
 * check if the string contains any surrogate pairs chars.
 *
 * Example
 * ```
 * @RequestBody('id', isSurrogatePair)
 * @RequestBody('id', [isSurrogatePair])
 * @RequestBody('id', isSurrogatePair('message'))
 * @RequestBody('id', [isSurrogatePair('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isSurrogatePair(message) {
    return createValidation_1.createValidation(message, validator.isSurrogatePair);
}
exports.isSurrogatePair = isSurrogatePair;
/**
 * isURL
 *
 * check if the string is an URL.
 *
 * Example
 * ```
 * @RequestBody('id', isURL)
 * @RequestBody('id', [isURL])
 * @RequestBody('id', isURL('message'))
 * @RequestBody('id', isURL('message', {}))
 * @RequestBody('id', [isURL('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isURL(message, options) {
    return createValidation_1.createValidation(message, validator.isURL, options);
}
exports.isURL = isURL;
/**
 * isUUID
 *
 * check if the string is a UUID (version 3, 4 or 5).
 *
 * Example
 * ```
 * @RequestBody('id', isUUID)
 * @RequestBody('id', [isUUID])
 * @RequestBody('id', isUUID('message'))
 * @RequestBody('id', isUUID('message', 3))
 * @RequestBody('id', isUUID('message', 4))
 * @RequestBody('id', isUUID('message', 5))
 * @RequestBody('id', [isUUID('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isUUID(message, version) {
    return createValidation_1.createValidation(message, validator.isUUID, version);
}
exports.isUUID = isUUID;
/**
 * isSurrogatePair
 *
 * check if the string is uppercase.
 *
 * Example
 * ```
 * @RequestBody('id', isSurrogatePair)
 * @RequestBody('id', [isSurrogatePair])
 * @RequestBody('id', isSurrogatePair('message'))
 * @RequestBody('id', [isSurrogatePair('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isUppercase(message) {
    return createValidation_1.createValidation(message, validator.isUppercase);
}
exports.isUppercase = isUppercase;
/**
 * isVariableWidth
 *
 * check if the string contains a mixture of full and half-width chars.
 *
 * Example
 * ```
 * @RequestBody('id', isVariableWidth)
 * @RequestBody('id', [isVariableWidth])
 * @RequestBody('id', isVariableWidth('message'))
 * @RequestBody('id', [isVariableWidth('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isVariableWidth(message) {
    return createValidation_1.createValidation(message, validator.isVariableWidth);
}
exports.isVariableWidth = isVariableWidth;
/**
 * isWhitelisted
 *
 * checks characters if they appear in the whitelist.
 *
 * Example
 * ```
 * @RequestBody('id', isWhitelisted)
 * @RequestBody('id', [isWhitelisted])
 * @RequestBody('id', isWhitelisted('message'))
 * @RequestBody('id', [isWhitelisted('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isWhitelisted(message, chars) {
    return createValidation_1.createValidation(message, validator.isWhitelisted, chars);
}
exports.isWhitelisted = isWhitelisted;
/**
 * isRequired
 *
 * checks value is required.
 *
 * Example
 * ```
 * @RequestBody('id', isRequired)
 * @RequestBody('id', [isRequired])
 * @RequestBody('id', isRequired('message'))
 * @RequestBody('id', [isRequired('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
function isRequired(message) {
    return createValidation_1.createValidation(message, validator.isRequired);
}
exports.isRequired = isRequired;
/**
 * isRequired
 *
 * checks value is required.
 *
 * Example
 * ```
 * @RequestBody('id', isRequired)
 * @RequestBody('id', [isRequired])
 * @RequestBody('id', isRequired('message'))
 * @RequestBody('id', [isRequired('message')])
 * ```
 */
function isFile(message) {
    return new FileValidation_1.FileValidation(message, validator.isFile);
}
exports.isFile = isFile;
