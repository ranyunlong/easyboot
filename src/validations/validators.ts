/**
 * @module validators
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import * as validatorJS from 'validator'
import { Validation } from './Validation'
import { File } from '@easyboot/formidable';
import { FileValidation } from './FileValidation';

interface ValidatorStatic extends  ValidatorJS.ValidatorStatic {
    isMagnetURI(value: string): boolean;
    isIdentityCard(value: string): boolean;
    isIPRange(value: string): boolean;
    isRFC3339(value: string): boolean;
    isISO31661Alpha3(value: string): boolean;
    isJWT(value: string): boolean;
    isRequired(value: string): boolean;
    isFileMaxSize(value: File, size: number): boolean;
    isFileType(value: File, filetype: string | string[]): boolean;
    isFile(value: File): boolean;
}

const validator = validatorJS as ValidatorStatic

export interface Validator {
    (...args: any[]): Validation;
}

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
export function isAfter(message: string, date?: string) {
    return new Validation('After', message, validator.isAfter, false, [date])
}

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
export function isAlpha(message: string, locale?: ValidatorJS.AlphaLocale) {
    return new Validation('Alpha', message, validator.isAlpha, false, [locale])
}

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
export function isAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale) {
    return new Validation('Alphanumeric', message, validator.isAlphanumeric, false, [locale])
}

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
export function isAscii(message: string) {
    return new Validation('Ascii', message, validator.isAscii, false)
}

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
export function isBase64(message: string) {
    return new Validation('Base64', message, validator.isBase64, false)
}

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
export function isBefore(message: string, date?: string) {
    return new Validation('Before', message, validator.isBefore, false, [date])
}

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
export function isBoolean(message: string) {
    return new Validation('Boolean', message, validator.isBoolean, false)
}

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
export function isByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return new Validation('ByteLength', message, validator.isByteLength, false, [options])
}

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
export function isCreditCard(message: string) {
    return new Validation('CreditCard', message, validator.isCreditCard, false)
}

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
export function isCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions) {
    return new Validation('Currency', message, validator.isCurrency, false, [options])
}

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
export function isDataURI(message: string) {
    return new Validation('DataURI', message, validator.isDataURI, false)
}

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
export function isMagnetURI(message: string) {
    return new Validation('MagnetURI', message, validator.isMagnetURI, false)
}

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
export function isDecimal(message: string, options?: ValidatorJS.IsDecimalOptions) {
    return new Validation('Decimal', message, validator.isDecimal, false, [options])
}

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
export function isDivisibleBy(message: string) {
    return new Validation('DivisibleBy', message, validator.isDivisibleBy, false)
}

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
export function isEmail(message: string, options?: ValidatorJS.IsEmailOptions) {
    return new Validation('Email', message, validator.isEmail, false, [options])
}

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
export function isEmpty(message: string) {
    return new Validation('Empty', message, validator.isEmpty, false)
}

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
export function isFQDN(message: string, options?: ValidatorJS.IsFQDNOptions) {
    return new Validation('FQDN', message, validator.isFQDN, false, [options])
}

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
export function isFloat(message: string, options?: ValidatorJS.IsFloatOptions) {
    return new Validation('Float', message, validator.isFloat, false, [options])
}

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
export function isFullWidth(message: string) {
    return new Validation('FullWidth', message, validator.isFullWidth, false)
}

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
export function isHalfWidth(message: string) {
    return new Validation('HalfWidth', message, validator.isHalfWidth, false)
}

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
export function isHash(message: string, options?: ValidatorJS.HashAlgorithm) {
    return new Validation('Hash', message, validator.isHash, false, [options])
}

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
export function isHexColor(message: string) {
    return new Validation('HexColor', message, validator.isHexColor, false)
}

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
export function isHexadecimal(message: string) {
    return new Validation('Hexadecimal', message, validator.isHexadecimal, false)
}

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
export function isIdentityCard(message: string) {
    return new Validation('IdentityCard', message, validator.isIdentityCard, false)
}

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
export function isIP(message: string, version?: '4' | '6' | 4 | 6) {
    return new Validation('IP', message, validator.isIP, false, [version])
}

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
export function isIPRange(message: string) {
    return new Validation('IP', message, validator.isIPRange, false)
}

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
export function isISBN(message: string, version?: '10' | '13' | 10 | 13) {
    return new Validation('ISBN', message, validator.isISBN, false, [version])
}

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
export function isISSN(message: string, options?: ValidatorJS.IsISSNOptions) {
    return new Validation('ISSN', message, validator.isISSN, false, [options])
}

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
export function isISIN(message: string) {
    return new Validation('ISIN', message, validator.isISIN, false)
}

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
export function isISO8601(message: string) {
    return new Validation('ISO8601', message, validator.isISO8601, false)
}

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
export function isRFC3339(message: string) {
    return new Validation('RFC3339', message, validator.isRFC3339, false)
}

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
export function isISO31661Alpha2(message: string) {
    return new Validation('ISO31661Alpha2', message, validator.isISO31661Alpha2, false)
}

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
export function isISO31661Alpha3(message: string) {
    return new Validation('ISO31661Alpha3', message, validator.isISO31661Alpha3, false)
}

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
export function isISRC(message: string) {
    return new Validation('ISRC', message, validator.isISRC, false)
}

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
export function isIn(message: string, values?: any[]) {
    return new Validation('In', message, validator.isIn, false, [values])
}

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
export function isInt(message: string, options?: ValidatorJS.IsIntOptions) {
    return new Validation('Int', message, validator.isInt, false, [options])
}

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
export function isJSON(message: string) {
    return new Validation('JSON', message, validator.isJSON, false)
}

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
export function isJWT(message: string) {
    return new Validation('JWT', message, validator.isJWT, false)
}

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
export function isLatLong(message: string) {
    return new Validation('LatLong', message, validator.isLatLong, false)
}

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
export function isLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return new Validation('Length', message, validator.isLength, false, [options])
}

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
export function isLowercase(message: string) {
    return new Validation('Lowercase', message, validator.isLowercase, false)
}

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
export function isMACAddress(message: string) {
    return new Validation('MACAddress', message, validator.isMACAddress, false)
}

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
export function isMD5(message: string) {
    return new Validation('MD5', message, validator.isMD5, false)
}

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
export function isMimeType(message: string) {
    return new Validation('MimeType', message, validator.isMimeType, false)
}

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
export function isMobilePhone(message: string, locale?: ValidatorJS.MobilePhoneLocale) {
    return new Validation('MobilePhone', message, validator.isMobilePhone, false, [locale])
}

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
export function isMongoId(message: string) {
    return new Validation('MongoId', message, validator.isMongoId, false)
}

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
export function isMultibyte(message: string) {
    return new Validation('Multibyte', message, validator.isMultibyte, false)
}

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
export function isNumeric(message: string, options?: ValidatorJS.IsNumericOptions) {
    return new Validation('Numeric', message, validator.isNumeric, false, [options])
}

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
export function isPort(message: string) {
    return new Validation('Port', message, validator.isPort, false)
}

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
export function isPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale) {
    return new Validation('PostalCode', message, validator.isPostalCode, false, [locale])
}

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
export function isSurrogatePair(message: string) {
    return new Validation('SurrogatePair', message, validator.isSurrogatePair, false)
}

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
export function isURL(message: string, options?: ValidatorJS.IsURLOptions) {
    return new Validation('URL', message, validator.isURL, false, [options])
}

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
export function isUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5 ) {
    return new Validation('UUID', message, validator.isUUID, false, [version])
}

/**
 * isUppercase
 *
 * check if the string is uppercase.
 *
 * Example
 * ```
 * @RequestBody('id', isUppercase)
 * @RequestBody('id', [isUppercase])
 * @RequestBody('id', isUppercase('message'))
 * @RequestBody('id', [isUppercase('message')])
 * ```
 * Also applies to the following decorators:
 * ```
 * @RequestBody()
 * @RequestParam()
 * @RequestQuery()
 * ```
 */
export function isUppercase(message: string) {
    return new Validation('Uppercase', message, validator.isUppercase, false)
}

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
export function isVariableWidth(message: string) {
    return new Validation('VariableWidth', message, validator.isVariableWidth, false)
}

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
export function isWhitelisted(message: string, chars?: string | string[]) {
    return new Validation('Whitelisted', message, validator.isWhitelisted, false, [chars])
}

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
export function isRequired(message: string) {
    return new Validation('Required', message, (value: string) => !validator.isEmpty(value), true)
}

export function isFile(message: string) {
    return new FileValidation('File', message, (file: File) => file instanceof File, false)
}