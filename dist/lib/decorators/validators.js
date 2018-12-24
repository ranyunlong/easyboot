"use strict";
/**
 * @module validators
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
const validation_1 = require("../validation");
require("reflect-metadata");
function createValidatorDecorator(validation) {
    return (target, propertyKey) => {
        const metadatas = Reflect.getMetadata(enums_1.MetadataEnums.Base.VALIDATORS, target.constructor) || [];
        Reflect.defineMetadata(enums_1.MetadataEnums.Base.VALIDATORS, [...metadatas, {
                validation,
                propertyKey
            }], target.constructor);
    };
}
exports.createValidatorDecorator = createValidatorDecorator;
function IsAfter(...args) {
    const [message, date] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isAfter(message, date));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isAfter(''))(target, propertyKey);
    }
}
exports.IsAfter = IsAfter;
function IsAlpha(...args) {
    const [message, locale] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isAlpha(message, locale));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isAlpha(''))(target, propertyKey);
    }
}
exports.IsAlpha = IsAlpha;
function IsAlphanumeric(...args) {
    const [message, locale] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isAlphanumeric(message, locale));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isAlphanumeric(''))(target, propertyKey);
    }
}
exports.IsAlphanumeric = IsAlphanumeric;
function IsAscii(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isAscii(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isAscii(''))(target, propertyKey);
    }
}
exports.IsAscii = IsAscii;
function IsBase64(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isBase64(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isBase64(''))(target, propertyKey);
    }
}
exports.IsBase64 = IsBase64;
function IsBefore(...args) {
    const [message, date] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isBefore(message, date));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isBefore(''))(target, propertyKey);
    }
}
exports.IsBefore = IsBefore;
function IsBoolean(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isBoolean(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isBoolean(''))(target, propertyKey);
    }
}
exports.IsBoolean = IsBoolean;
function IsByteLength(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isByteLength(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isByteLength(''))(target, propertyKey);
    }
}
exports.IsByteLength = IsByteLength;
function IsCreditCard(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isCreditCard(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isCreditCard(''))(target, propertyKey);
    }
}
exports.IsCreditCard = IsCreditCard;
function IsCurrency(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isCurrency(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isCurrency(''))(target, propertyKey);
    }
}
exports.IsCurrency = IsCurrency;
function IsDataURI(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isDataURI(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isDataURI(''))(target, propertyKey);
    }
}
exports.IsDataURI = IsDataURI;
function IsMagnetURI(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMagnetURI(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMagnetURI(''))(target, propertyKey);
    }
}
exports.IsMagnetURI = IsMagnetURI;
function IsDecimal(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isDecimal(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isDecimal(''))(target, propertyKey);
    }
}
exports.IsDecimal = IsDecimal;
function IsDivisibleBy(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isDivisibleBy(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isDivisibleBy(''))(target, propertyKey);
    }
}
exports.IsDivisibleBy = IsDivisibleBy;
function IsEmail(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isEmail(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isEmail(''))(target, propertyKey);
    }
}
exports.IsEmail = IsEmail;
function IsEmpty(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isEmpty(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isEmpty(''))(target, propertyKey);
    }
}
exports.IsEmpty = IsEmpty;
function IsFQDN(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isFQDN(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isFQDN(''))(target, propertyKey);
    }
}
exports.IsFQDN = IsFQDN;
function IsFloat(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isFloat(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isFloat(''))(target, propertyKey);
    }
}
exports.IsFloat = IsFloat;
function IsFullWidth(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isFullWidth(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isFullWidth(''))(target, propertyKey);
    }
}
exports.IsFullWidth = IsFullWidth;
function IsHalfWidth(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isHalfWidth(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isHalfWidth(''))(target, propertyKey);
    }
}
exports.IsHalfWidth = IsHalfWidth;
function IsHash(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isHash(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isHash(''))(target, propertyKey);
    }
}
exports.IsHash = IsHash;
function IsHexColor(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isHexColor(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isHexColor(''))(target, propertyKey);
    }
}
exports.IsHexColor = IsHexColor;
function IsHexadecimal(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isHexadecimal(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isHexadecimal(''))(target, propertyKey);
    }
}
exports.IsHexadecimal = IsHexadecimal;
function IsIdentityCard(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isIdentityCard(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isIdentityCard(''))(target, propertyKey);
    }
}
exports.IsIdentityCard = IsIdentityCard;
function IsIp(...args) {
    const [message, version] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isIP(message, version));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isIP(''))(target, propertyKey);
    }
}
exports.IsIp = IsIp;
function IsIPRange(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isIPRange(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isIPRange(''))(target, propertyKey);
    }
}
exports.IsIPRange = IsIPRange;
function IsISBN(...args) {
    const [message, version] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISBN(message, version));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISBN(''))(target, propertyKey);
    }
}
exports.IsISBN = IsISBN;
function IsISSN(...args) {
    const [message, version] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISSN(message, version));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISSN(''))(target, propertyKey);
    }
}
exports.IsISSN = IsISSN;
function IsISIN(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISIN(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISIN(''))(target, propertyKey);
    }
}
exports.IsISIN = IsISIN;
function IsISO8601(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISO8601(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISO8601(''))(target, propertyKey);
    }
}
exports.IsISO8601 = IsISO8601;
function IsRFC3339(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isRFC3339(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isRFC3339(''))(target, propertyKey);
    }
}
exports.IsRFC3339 = IsRFC3339;
function IsISO31661Alpha2(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISO31661Alpha2(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISO31661Alpha2(''))(target, propertyKey);
    }
}
exports.IsISO31661Alpha2 = IsISO31661Alpha2;
function IsISO31661Alpha3(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISO31661Alpha3(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISO31661Alpha3(''))(target, propertyKey);
    }
}
exports.IsISO31661Alpha3 = IsISO31661Alpha3;
function IsISRC(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isISRC(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isISRC(''))(target, propertyKey);
    }
}
exports.IsISRC = IsISRC;
function IsIn(...args) {
    const [message, values] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isIn(message, values));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isIn(''))(target, propertyKey);
    }
}
exports.IsIn = IsIn;
function IsInt(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isInt(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isInt(''))(target, propertyKey);
    }
}
exports.IsInt = IsInt;
function IsJSON(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isJSON(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isJSON(''))(target, propertyKey);
    }
}
exports.IsJSON = IsJSON;
function IsJWT(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isJWT(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isJWT(''))(target, propertyKey);
    }
}
exports.IsJWT = IsJWT;
function IsLatLong(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isLatLong(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isLatLong(''))(target, propertyKey);
    }
}
exports.IsLatLong = IsLatLong;
function IsLength(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isLength(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isLength(''))(target, propertyKey);
    }
}
exports.IsLength = IsLength;
function IsLowercase(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isLowercase(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isLowercase(''))(target, propertyKey);
    }
}
exports.IsLowercase = IsLowercase;
function IsMACAddress(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMACAddress(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMACAddress(''))(target, propertyKey);
    }
}
exports.IsMACAddress = IsMACAddress;
function IsMD5(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMD5(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMD5(''))(target, propertyKey);
    }
}
exports.IsMD5 = IsMD5;
function IsMimeType(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMimeType(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMimeType(''))(target, propertyKey);
    }
}
exports.IsMimeType = IsMimeType;
function IsMobilePhone(...args) {
    const [message, locale] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMobilePhone(message, locale));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMobilePhone(''))(target, propertyKey);
    }
}
exports.IsMobilePhone = IsMobilePhone;
function IsMongoId(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMongoId(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMongoId(''))(target, propertyKey);
    }
}
exports.IsMongoId = IsMongoId;
function IsMultibyte(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isMultibyte(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isMultibyte(''))(target, propertyKey);
    }
}
exports.IsMultibyte = IsMultibyte;
function IsNumeric(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isNumeric(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isNumeric(''))(target, propertyKey);
    }
}
exports.IsNumeric = IsNumeric;
function IsPort(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isPort(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isPort(''))(target, propertyKey);
    }
}
exports.IsPort = IsPort;
function IsPostalCode(...args) {
    const [message, locale] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isPostalCode(message, locale));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isPostalCode(''))(target, propertyKey);
    }
}
exports.IsPostalCode = IsPostalCode;
function IsSurrogatePair(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isSurrogatePair(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isSurrogatePair(''))(target, propertyKey);
    }
}
exports.IsSurrogatePair = IsSurrogatePair;
function IsURL(...args) {
    const [message, options] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isURL(message, options));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isURL(''))(target, propertyKey);
    }
}
exports.IsURL = IsURL;
function IsUUID(...args) {
    const [message, version] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isUUID(message, version));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isUUID(''))(target, propertyKey);
    }
}
exports.IsUUID = IsUUID;
function IsUppercase(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isUppercase(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isUppercase(''))(target, propertyKey);
    }
}
exports.IsUppercase = IsUppercase;
function IsVariableWidth(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isVariableWidth(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isVariableWidth(''))(target, propertyKey);
    }
}
exports.IsVariableWidth = IsVariableWidth;
function IsWhitelisted(...args) {
    const [message, chars] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isWhitelisted(message, chars));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isWhitelisted(''))(target, propertyKey);
    }
}
exports.IsWhitelisted = IsWhitelisted;
function IsRequired(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isRequired(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isRequired(''))(target, propertyKey);
    }
}
exports.IsRequired = IsRequired;
function IsFile(...args) {
    const [message] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(validation_1.isFile(message));
    }
    else {
        const [target, propertyKey] = args;
        return createValidatorDecorator(validation_1.isFile(''))(target, propertyKey);
    }
}
exports.IsFile = IsFile;
