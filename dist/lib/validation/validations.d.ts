/**
 * @module validations
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="validator" />
import { File } from '@easyboot/formidable';
import { FileValidation } from './FileValidation';
export interface FileOptions {
    maxSize?: number;
    minSize?: number;
    fileType?: string | string[];
}
export interface ValidatorStatic extends ValidatorJS.ValidatorStatic {
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
export declare function isAfter(message: string, date?: string): import("./Validation").Validation<(str: string, date?: string) => boolean>;
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
export declare function isAlpha(message: string, locale?: ValidatorJS.AlphaLocale): import("./Validation").Validation<(str: string, locale?: ValidatorJS.AlphaLocale) => boolean>;
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
export declare function isAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale): import("./Validation").Validation<(str: string, locale?: ValidatorJS.AlphaLocale) => boolean>;
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
export declare function isAscii(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isBase64(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isBefore(message: string, date?: string): import("./Validation").Validation<(str: string, date?: string) => boolean>;
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
export declare function isBoolean(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions): import("./Validation").Validation<{
    (str: string, options: ValidatorJS.IsByteLengthOptions): boolean;
    (str: string, min: number, max?: number): boolean;
}>;
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
export declare function isCreditCard(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsCurrencyOptions) => boolean>;
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
export declare function isDataURI(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isMagnetURI(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isDecimal(message: string, options?: ValidatorJS.IsDecimalOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsDecimalOptions) => boolean>;
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
export declare function isDivisibleBy(message: string): import("./Validation").Validation<(str: string, number: number) => boolean>;
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
export declare function isEmail(message: string, options?: ValidatorJS.IsEmailOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsEmailOptions) => boolean>;
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
export declare function isEmpty(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isFQDN(message: string, options?: ValidatorJS.IsFQDNOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsFQDNOptions) => boolean>;
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
export declare function isFloat(message: string, options?: ValidatorJS.IsFloatOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsFloatOptions) => boolean>;
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
export declare function isFullWidth(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isHalfWidth(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isHash(message: string, options?: ValidatorJS.HashAlgorithm): import("./Validation").Validation<(str: string, algorithm: ValidatorJS.HashAlgorithm) => boolean>;
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
export declare function isHexColor(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isHexadecimal(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isIdentityCard(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isIP(message: string, version?: '4' | '6' | 4 | 6): import("./Validation").Validation<(str: string, version?: number) => boolean>;
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
export declare function isIPRange(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isISBN(message: string, version?: '10' | '13' | 10 | 13): import("./Validation").Validation<(str: string, version?: number) => boolean>;
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
export declare function isISSN(message: string, options?: ValidatorJS.IsISSNOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsISSNOptions) => boolean>;
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
export declare function isISIN(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isISO8601(message: string): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsISO8601Options) => boolean>;
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
export declare function isRFC3339(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isISO31661Alpha2(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isISO31661Alpha3(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isISRC(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isIn(message: string, values?: any[]): import("./Validation").Validation<(str: string, values: any[]) => boolean>;
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
export declare function isInt(message: string, options?: ValidatorJS.IsIntOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsIntOptions) => boolean>;
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
export declare function isJSON(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isJWT(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isLatLong(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isLength(message: string, options?: ValidatorJS.IsByteLengthOptions): import("./Validation").Validation<{
    (str: string, options: ValidatorJS.IsLengthOptions): boolean;
    (str: string, min: number, max?: number): boolean;
}>;
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
export declare function isLowercase(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isMACAddress(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isMD5(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isMimeType(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isMobilePhone(message: string, locale?: ValidatorJS.MobilePhoneLocale): import("./Validation").Validation<(str: string, locale: ValidatorJS.MobilePhoneLocale, options?: ValidatorJS.IsMobilePhoneOptions) => boolean>;
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
export declare function isMongoId(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isMultibyte(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isNumeric(message: string, options?: ValidatorJS.IsNumericOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsNumericOptions) => boolean>;
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
export declare function isPort(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale): import("./Validation").Validation<(str: string, locale: ValidatorJS.PostalCodeLocale) => boolean>;
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
export declare function isSurrogatePair(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isURL(message: string, options?: ValidatorJS.IsURLOptions): import("./Validation").Validation<(str: string, options?: ValidatorJS.IsURLOptions) => boolean>;
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
export declare function isUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5): import("./Validation").Validation<(str: string, version?: "all" | 5 | 4 | 3 | "3" | "4" | "5") => boolean>;
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
export declare function isUppercase(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isVariableWidth(message: string): import("./Validation").Validation<(str: string) => boolean>;
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
export declare function isWhitelisted(message: string, chars?: string | string[]): import("./Validation").Validation<(str: string, chars: string | string[]) => boolean>;
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
export declare function isRequired(message: string): import("./Validation").Validation<(value: string) => boolean>;
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
export declare function isFile(message: string): FileValidation<(value: File) => boolean>;
