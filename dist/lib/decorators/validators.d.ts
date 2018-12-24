/**
 * @module validators
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */
/// <reference types="validator" />
import { Validation } from '../validation';
import 'reflect-metadata';
export declare function createValidatorDecorator(validation: Validation<any>): PropertyDecorator;
/**
 * IsAfter decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a date that's after the specified date (defaults to now).
 *
 * Example
 * ```
 * @IsAfter('message')
 * @IsAfter('message', '2018-10-11')
 * ```
 */
export declare function IsAfter(target: Object, propertyKey: string): void;
export declare function IsAfter(message: string, date?: string): PropertyDecorator;
/**
 * IsAlpha decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains only letters (a-zA-Z).
 *
 * Example
 * ```
 * @IsAlpha('message')
 * @IsAlpha('message', 'en-US')
 * ```
 */
export declare function IsAlpha(target: Object, propertyKey: string): void;
export declare function IsAlpha(message: string, locale?: ValidatorJS.AlphaLocale): PropertyDecorator;
/**
 * IsAlphanumeric decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains only letters and numbers.
 *
 * Example
 * ```
 * @IsAlphanumeric('message')
 * @IsAlphanumeric('message', 'en-US')
 * ```
 */
export declare function IsAlphanumeric(target: Object, propertyKey: string): void;
export declare function IsAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale): PropertyDecorator;
/**
 * IsAscii decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains ASCII chars only.
 *
 * Example
 * ```
 * @IsAscii('message')
 * ```
 */
export declare function IsAscii(target: Object, propertyKey: string): void;
export declare function IsAscii(message: string): PropertyDecorator;
/**
 * IsBase64 decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if a string is base64 encoded.
 *
 * Example
 * ```
 * @IsBase64('message')
 * ```
 */
export declare function IsBase64(target: Object, propertyKey: string): void;
export declare function IsBase64(message: string): PropertyDecorator;
/**
 * IsBefore decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a date that's before the specified date.
 *
 * Example
 * ```
 * @IsBefore('message', '2018-02-01')
 * ```
 */
export declare function IsBefore(target: Object, propertyKey: string): void;
export declare function IsBefore(message: string, date?: string): PropertyDecorator;
/**
 * IsBoolean decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if a string is a boolean.
 *
 * Example
 * ```
 * @IsBoolean('message')
 * ```
 */
export declare function IsBoolean(target: Object, propertyKey: string): void;
export declare function IsBoolean(message: string): PropertyDecorator;
/**
 * IsByteLength decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string's length (in UTF-8 bytes) falls in a range.
 *
 * Example
 * ```
 * @IsByteLength('message')
 * @IsByteLength('message', {min:0, max: undefined})
 * ```
 */
export declare function IsByteLength(target: Object, propertyKey: string): void;
export declare function IsByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions): PropertyDecorator;
/**
 * IsCreditCard decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a credit card.
 *
 * Example
 * ```
 * @IsCreditCard('message')
 * ```
 */
export declare function IsCreditCard(target: Object, propertyKey: string): void;
export declare function IsCreditCard(message: string): PropertyDecorator;
/**
 * IsCurrency decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid currency amount.
 *
 * Example
 * ```
 * @IsCurrency('message')
 * @IsCurrency('message',{})
 * ```
 */
export declare function IsCurrency(target: Object, propertyKey: string): void;
export declare function IsCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions): PropertyDecorator;
/**
 * IsDataURI decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a data uri format.
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example
 * ```
 * @IsDataURI('message')
 * ```
 */
export declare function IsDataURI(target: Object, propertyKey: string): void;
export declare function IsDataURI(message: string): PropertyDecorator;
/**
 * IsMagnetURI decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a data uri format.
 *
 * https://en.wikipedia.org/wiki/Magnet_URI_scheme
 *
 * Example
 * ```
 * @IsMagnetURI('message')
 * ```
 */
export declare function IsMagnetURI(target: Object, propertyKey: string): void;
export declare function IsMagnetURI(message: string): PropertyDecorator;
/**
 * IsDecimal decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
 *
 * Example
 * ```
 * @IsDecimal('message')
 * @IsDecimal('message', 'en-US')
 * ```
 */
export declare function IsDecimal(target: Object, propertyKey: string): void;
export declare function IsDecimal(message: string, options?: ValidatorJS.IsDecimalOptions): PropertyDecorator;
/**
 * IsDivisibleBy decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a number that's divisible by another.
 *
 * Example
 * ```
 * @IsDivisibleBy('message')
 * ```
 */
export declare function IsDivisibleBy(target: Object, propertyKey: string): void;
export declare function IsDivisibleBy(message: string): PropertyDecorator;
/**
 * IsEmail decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an email.
 *
 * Example
 * ```
 * @IsEmail('message')
 * @IsEmail('message', {})
 * ```
 */
export declare function IsEmail(target: Object, propertyKey: string): void;
export declare function IsEmail(message: string, options?: ValidatorJS.IsEmailOptions): PropertyDecorator;
/**
 * IsEmpty decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string has a length of zero.
 *
 * Example
 * ```
 * @IsEmpty('message')
 * ```
 */
export declare function IsEmpty(target: Object, propertyKey: string): void;
export declare function IsEmpty(message: string): PropertyDecorator;
/**
 * IsFQDN decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a fully qualified domain name (e.g. domain.com).
 *
 * Example
 * ```
 * @IsFQDN('message')
 * @IsFQDN('message', {})
 * ```
 */
export declare function IsFQDN(target: Object, propertyKey: string): void;
export declare function IsFQDN(message: string, options?: ValidatorJS.IsEmailOptions): PropertyDecorator;
/**
 * IsFloat decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a float.
 *
 * Example
 * ```
 * @IsFloat('message')
 * @IsFloat('message', {})
 * ```
 */
export declare function IsFloat(target: Object, propertyKey: string): void;
export declare function IsFloat(message: string, options?: ValidatorJS.IsFloatOptions): PropertyDecorator;
/**
 * IsFullWidth decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains any full-width chars.
 *
 * Example
 * ```
 * @IsFullWidth('message')
 * ```
 */
export declare function IsFullWidth(target: Object, propertyKey: string): void;
export declare function IsFullWidth(message: string): PropertyDecorator;
/**
 * IsHalfWidth decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains any half-width chars.
 *
 * Example
 * ```
 * @IsHalfWidth('message')
 * ```
 */
export declare function IsHalfWidth(target: Object, propertyKey: string): void;
export declare function IsHalfWidth(message: string): PropertyDecorator;
/**
 * IsHash decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a hash of type algorithm.
 * Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128', 'tiger160', 'tiger192', 'crc32', 'crc32b']
 *
 * Example
 * ```
 * @IsHash('message')
 * @IsHash('message', "md5")
 * ```
 */
export declare function IsHash(target: Object, propertyKey: string): void;
export declare function IsHash(message: string, options?: ValidatorJS.HashAlgorithm): PropertyDecorator;
/**
 * IsHexColor decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a hexadecimal color.
 *
 * Example
 * ```
 * @IsHexColor('message')
 * ```
 */
export declare function IsHexColor(target: Object, propertyKey: string): void;
export declare function IsHexColor(message: string): PropertyDecorator;
/**
 * IsHexadecimal decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a hexadecimal number.
 *
 * Example
 * ```
 * @IsHexadecimal('message')
 * ```
 */
export declare function IsHexadecimal(target: Object, propertyKey: string): void;
export declare function IsHexadecimal(message: string): PropertyDecorator;
/**
 * IsIdentityCard decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid identity card code.
 *
 * Example
 * ```
 * @IsIdentityCard('message')
 * ```
 */
export declare function IsIdentityCard(target: Object, propertyKey: string): void;
export declare function IsIdentityCard(message: string): PropertyDecorator;
/**
 * IsIp decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an IP (version 4 or 6).
 *
 * Example
 * ```
 * @IsIp('message')
 * @IsIp('message', 4)
 * @IsIp('message', 6)
 * ```
 */
export declare function IsIp(target: Object, propertyKey: string): void;
export declare function IsIp(message: string, version?: '4' | '6' | 4 | 6): PropertyDecorator;
/**
 * IsIPRange decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an IP Range(version 4 only).
 *
 * Example
 * ```
 * @IsIPRange('message')
 * ```
 */
export declare function IsIPRange(target: Object, propertyKey: string): void;
export declare function IsIPRange(message: string): PropertyDecorator;
/**
 * IsISBN decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an ISBN (version 10 or 13).
 *
 * Example
 * ```
 * @IsISBN('message')
 * @IsISBN('message', 10)
 * @IsISBN('message', 13)
 * ```
 */
export declare function IsISBN(target: Object, propertyKey: string): void;
export declare function IsISBN(message: string, version?: '4' | '6' | 4 | 6): PropertyDecorator;
/**
 * IsISSN decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an ISSN.
 * https://en.wikipedia.org/wiki/International_Standard_Serial_Number
 *
 * Example
 * ```
 * @IsISSN('message')
 * @IsISSN('message', {})
 * ```
 */
export declare function IsISSN(target: Object, propertyKey: string): void;
export declare function IsISSN(message: string, version?: '4' | '6' | 4 | 6): PropertyDecorator;
/**
 * IsISIN decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an ISIN (stock/security identifier).
 * https://en.wikipedia.org/wiki/International_Securities_Identification_Number
 *
 * Example
 * ```
 * @IsISIN('message')
 * ```
 */
export declare function IsISIN(target: Object, propertyKey: string): void;
export declare function IsISIN(message: string): PropertyDecorator;
/**
 * IsISO8601 decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid ISO 8601 date.
 * https://en.wikipedia.org/wiki/ISO_8601
 *
 * Example
 * ```
 * @IsISO8601('message')
 * ```
 */
export declare function IsISO8601(target: Object, propertyKey: string): void;
export declare function IsISO8601(message: string): PropertyDecorator;
/**
 * IsRFC3339 decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid RFC 3339 date.
 * https://tools.ietf.org/html/rfc3339
 *
 * Example
 * ```
 * @IsRFC3339('message')
 * ```
 */
export declare function IsRFC3339(target: Object, propertyKey: string): void;
export declare function IsRFC3339(message: string): PropertyDecorator;
/**
 * IsISO31661Alpha2 decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid ISO 3166-1 alpha-2 officially assigned country code.
 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 *
 * Example
 * ```
 * @IsISO31661Alpha2('message')
 * ```
 */
export declare function IsISO31661Alpha2(target: Object, propertyKey: string): void;
export declare function IsISO31661Alpha2(message: string): PropertyDecorator;
/**
 * IsISO31661Alpha3 decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid ISO 3166-1 alpha-3 officially assigned country code.
 * https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
 *
 * Example
 * ```
 * @IsISO31661Alpha3('message')
 * ```
 */
export declare function IsISO31661Alpha3(target: Object, propertyKey: string): void;
export declare function IsISO31661Alpha3(message: string): PropertyDecorator;
/**
 * IsISRC decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a ISRC.
 * https://en.wikipedia.org/wiki/International_Standard_Recording_Code
 *
 * Example
 * ```
 * @IsISRC('message')
 * ```
 */
export declare function IsISRC(target: Object, propertyKey: string): void;
export declare function IsISRC(message: string): PropertyDecorator;
/**
 * IsIn decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is in a array of allowed values.
 *
 * Example
 * ```
 * @IsIn('message')
 * ```
 */
export declare function IsIn(target: Object, propertyKey: string): void;
export declare function IsIn(message: string, values: any[]): PropertyDecorator;
/**
 * IsInt decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an integer.
 *
 * Example
 * ```
 * @IsInt('message')
 * ```
 */
export declare function IsInt(target: Object, propertyKey: string): void;
export declare function IsInt(message: string, options?: ValidatorJS.IsIntOptions): PropertyDecorator;
/**
 * IsJSON decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is valid JSON (note: uses JSON.parse).
 *
 * Example
 * ```
 * @IsJSON('message')
 * ```
 */
export declare function IsJSON(target: Object, propertyKey: string): void;
export declare function IsJSON(message: string): PropertyDecorator;
/**
 * IsJWT decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is valid JWT token.
 *
 * Example
 * ```
 * @IsJWT('message')
 * ```
 */
export declare function IsJWT(target: Object, propertyKey: string): void;
export declare function IsJWT(message: string): PropertyDecorator;
/**
 * IsLatLong decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid latitude-longitude coordinate in the.
 *
 * Example
 * ```
 * @IsLatLong('message')
 * ```
 */
export declare function IsLatLong(target: Object, propertyKey: string): void;
export declare function IsLatLong(message: string): PropertyDecorator;
/**
 * IsLength decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string's length falls in a range.
 *
 * Example
 * ```
 * @IsLength('message')
 * ```
 */
export declare function IsLength(target: Object, propertyKey: string): void;
export declare function IsLength(message: string, options?: ValidatorJS.IsByteLengthOptions): PropertyDecorator;
/**
 * IsLowercase decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is lowercase.
 *
 * Example
 * ```
 * @IsLowercase('message')
 * ```
 */
export declare function IsLowercase(target: Object, propertyKey: string): void;
export declare function IsLowercase(message: string): PropertyDecorator;
/**
 * IsMACAddress decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a MAC address.
 *
 * Example
 * ```
 * @IsMACAddress('message')
 * ```
 */
export declare function IsMACAddress(target: Object, propertyKey: string): void;
export declare function IsMACAddress(message: string): PropertyDecorator;
/**
 * IsMD5 decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a MD5 hash.
 *
 * Example
 * ```
 * @IsMD5('message')
 * ```
 */
export declare function IsMD5(target: Object, propertyKey: string): void;
export declare function IsMD5(message: string): PropertyDecorator;
/**
 * IsMimeType decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string matches to a valid MIME type format
 * https://en.wikipedia.org/wiki/Media_type
 *
 * Example
 * ```
 * @IsMimeType('message')
 * ```
 */
export declare function IsMimeType(target: Object, propertyKey: string): void;
export declare function IsMimeType(message: string): PropertyDecorator;
/**
 * IsMobilePhone decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a mobile phone number.
 *
 * Example
 * ```
 * @IsMobilePhone('message', 'zh-CN')
 * ```
 */
export declare function IsMobilePhone(message: string, locale?: ValidatorJS.MobilePhoneLocale): PropertyDecorator;
export declare function IsMobilePhone(target: Object, propertyKey: string): void;
/**
 * IsMongoId decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid hex-encoded representation of a MongoDB ObjectId.
 * http://docs.mongodb.org/manual/reference/object-id/
 *
 * Example
 * ```
 * @IsMongoId('message')
 * ```
 */
export declare function IsMongoId(target: Object, propertyKey: string): void;
export declare function IsMongoId(message: string): PropertyDecorator;
/**
 * IsMultibyte decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains one or more multibyte chars.
 *
 * Example
 * ```
 * @IsMultibyte('message')
 * ```
 */
export declare function IsMultibyte(target: Object, propertyKey: string): void;
export declare function IsMultibyte(message: string): PropertyDecorator;
/**
 * IsNumeric decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains only numbers.
 *
 * Example
 * ```
 * @IsNumeric('message', {})
 * ```
 */
export declare function IsNumeric(target: Object, propertyKey: string): void;
export declare function IsNumeric(message: string, options?: ValidatorJS.IsNumericOptions): PropertyDecorator;
/**
 * IsPort decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a valid port number.
 *
 * Example
 * ```
 * @IsPort('message')
 * ```
 */
export declare function IsPort(target: Object, propertyKey: string): void;
export declare function IsPort(message: string): PropertyDecorator;
/**
 * IsPostalCode decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a postal code.
 *
 * Example
 * ```
 * @IsPostalCode('message')
 * @IsPostalCode('message', 'CA')
 * ```
 */
export declare function IsPostalCode(target: Object, propertyKey: string): void;
export declare function IsPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale): PropertyDecorator;
/**
 * IsSurrogatePair decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains any surrogate pairs chars.
 *
 * Example
 * ```
 * @IsSurrogatePair('message')
 * ```
 */
export declare function IsSurrogatePair(target: Object, propertyKey: string): void;
export declare function IsSurrogatePair(message: string): PropertyDecorator;
/**
 * IsURL decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is an URL.
 *
 * Example
 * ```
 * @IsURL('message')
 * @IsURL('message', {})
 * ```
 */
export declare function IsURL(target: Object, propertyKey: string): void;
export declare function IsURL(message: string, options?: ValidatorJS.IsURLOptions): PropertyDecorator;
/**
 * IsUUID decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is a UUID (version 3, 4 or 5).
 *
 * Example
 * ```
 * @IsUUID('message')
 * @IsUUID('message', 3)
 * @IsUUID('message', 4)
 * @IsUUID('message', 5)
 * ```
 */
export declare function IsUUID(target: Object, propertyKey: string): void;
export declare function IsUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5): PropertyDecorator;
/**
 * IsUppercase decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string is uppercase.
 *
 * Example
 * ```
 * @IsUppercase('message')
 * ```
 */
export declare function IsUppercase(target: Object, propertyKey: string): void;
export declare function IsUppercase(message: string): PropertyDecorator;
/**
 * IsVariableWidth decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * check if the string contains a mixture of full and half-width chars.
 *
 * Example
 * ```
 * @IsVariableWidth('message')
 * ```
 */
export declare function IsVariableWidth(target: Object, propertyKey: string): void;
export declare function IsVariableWidth(message: string): PropertyDecorator;
/**
 * IsWhitelisted decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * checks characters if they appear in the whitelist.
 *
 * Example
 * ```
 * @IsWhitelisted('message')
 * ```
 */
export declare function IsWhitelisted(target: Object, propertyKey: string): void;
export declare function IsWhitelisted(message: string, chars?: string | string[]): PropertyDecorator;
/**
 * IsRequired decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * checks value is required.
 *
 * Example
 * ```
 * @IsRequired('message')
 * ```
 */
export declare function IsRequired(target: Object, propertyKey: string): void;
export declare function IsRequired(message: string): PropertyDecorator;
/**
 * IsRequired decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * checks value is required.
 *
 * Example
 * ```
 * @IsFile('message')
 * ```
 */
export declare function IsFile(target: Object, propertyKey: string): void;
export declare function IsFile(message: string): PropertyDecorator;
