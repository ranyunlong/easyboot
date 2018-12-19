/**
 * @module validators
 * @author ranyunlong<549510622@qq.com>
 * @copyright Ranyunlong
 * @license MIT
 */

import { MetadataEnums } from '../enums';
import { Validation, isAfter, isAlpha, isAlphanumeric, isAscii, isBase64, isBefore, isBoolean, isByteLength, isCreditCard, isCurrency, isDataURI, isMagnetURI, isDecimal, isDivisibleBy, isEmail, isEmpty, isFQDN, isFloat, isFullWidth, isHalfWidth, isHash, isHexColor, isHexadecimal, isIdentityCard, isIP, isIPRange, isISBN, isISSN, isISIN, isISO8601, isRFC3339, isISO31661Alpha2, isISO31661Alpha3, isISRC, isIn, isInt, isJSON, isJWT, isLatLong, isLength, isLowercase, isMACAddress, isMD5, isMimeType, isMongoId, isMultibyte, isPort, isSurrogatePair, isUppercase, isVariableWidth, isRequired, isWhitelisted, isUUID, isURL, isPostalCode, isNumeric, isMobilePhone } from '../validation';

export function createValidatorDecorator(validation: Validation<any>): PropertyDecorator {
    return (target: Object, propertyKey: string): void => {
        const metadatas = Reflect.getMetadata(MetadataEnums.Base.VALIDATORS, target.constructor) || []
        Reflect.defineMetadata(MetadataEnums.Base.VALIDATORS, [...metadatas, {
            validation,
            propertyKey
        }], target.constructor)
    }
}

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

export function IsAfter(target: Object, propertyKey: string): void;
export function IsAfter(message: string, date?: string): PropertyDecorator;
export function IsAfter(...args: any[]): any {
    const [ message, date ] = args
    if (typeof message === 'string') {
        return createValidatorDecorator(isAfter(message, date))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isAfter(''))(target, propertyKey)
    }
}

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
export function IsAlpha(target: Object, propertyKey: string): void;
export function IsAlpha(message: string, locale?: ValidatorJS.AlphaLocale): PropertyDecorator;
export function IsAlpha(...args: any[]): any {
    const [ message, locale ] = args
    if (typeof message === 'string') {
        return createValidatorDecorator(isAlpha(message, locale))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isAlpha(''))(target, propertyKey)
    }
}

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
export function IsAlphanumeric(target: Object, propertyKey: string): void;
export function IsAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale): PropertyDecorator;
export function IsAlphanumeric(...args: any[]): any {
    const [ message, locale ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isAlphanumeric(message, locale))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isAlphanumeric(''))(target, propertyKey)
    }
}

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

export function IsAscii(target: Object, propertyKey: string): void;
export function IsAscii(message: string): PropertyDecorator;
export function IsAscii(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isAscii(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isAscii(''))(target, propertyKey)
    }
}

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
export function IsBase64(target: Object, propertyKey: string): void;
export function IsBase64(message: string): PropertyDecorator;
export function IsBase64(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isBase64(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isBase64(''))(target, propertyKey)
    }
}

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
export function IsBefore(target: Object, propertyKey: string): void;
export function IsBefore(message: string, date?: string): PropertyDecorator;
export function IsBefore(...args: any[]): any {
    const [ message, date ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isBefore(message, date))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isBefore(''))(target, propertyKey)
    }
}

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
export function IsBoolean(target: Object, propertyKey: string): void;
export function IsBoolean(message: string): PropertyDecorator;
export function IsBoolean(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isBoolean(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isBoolean(''))(target, propertyKey)
    }
}

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
export function IsByteLength(target: Object, propertyKey: string): void;
export function IsByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions): PropertyDecorator;
export function IsByteLength(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isByteLength(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isByteLength(''))(target, propertyKey)
    }
}

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
export function IsCreditCard(target: Object, propertyKey: string): void;
export function IsCreditCard(message: string): PropertyDecorator;
export function IsCreditCard(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isCreditCard(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isCreditCard(''))(target, propertyKey)
    }
}

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
export function IsCurrency(target: Object, propertyKey: string): void;
export function IsCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions): PropertyDecorator;
export function IsCurrency(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isCurrency(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isCurrency(''))(target, propertyKey)
    }
}

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
export function IsDataURI(target: Object, propertyKey: string): void;
export function IsDataURI(message: string): PropertyDecorator;
export function IsDataURI(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isDataURI(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isDataURI(''))(target, propertyKey)
    }
}
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
export function IsMagnetURI(target: Object, propertyKey: string): void;
export function IsMagnetURI(message: string): PropertyDecorator;
export function IsMagnetURI(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMagnetURI(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMagnetURI(''))(target, propertyKey)
    }
}
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
export function IsDecimal(target: Object, propertyKey: string): void;
export function IsDecimal(message: string, options?: ValidatorJS.IsDecimalOptions): PropertyDecorator;
export function IsDecimal(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isDecimal(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isDecimal(''))(target, propertyKey)
    }
}

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
export function IsDivisibleBy(target: Object, propertyKey: string): void;
export function IsDivisibleBy(message: string): PropertyDecorator;
export function IsDivisibleBy(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isDivisibleBy(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isDivisibleBy(''))(target, propertyKey)
    }
}

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
export function IsEmail(target: Object, propertyKey: string): void;
export function IsEmail(message: string, options?: ValidatorJS.IsEmailOptions): PropertyDecorator;
export function IsEmail(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isEmail(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isEmail(''))(target, propertyKey)
    }
}

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
export function IsEmpty(target: Object, propertyKey: string): void;
export function IsEmpty(message: string): PropertyDecorator;
export function IsEmpty(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isEmpty(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isEmpty(''))(target, propertyKey)
    }
}

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
export function IsFQDN(target: Object, propertyKey: string): void;
export function IsFQDN(message: string, options?: ValidatorJS.IsEmailOptions): PropertyDecorator;
export function IsFQDN(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isFQDN(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isFQDN(''))(target, propertyKey)
    }
}

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
export function IsFloat(target: Object, propertyKey: string): void;
export function IsFloat(message: string, options?: ValidatorJS.IsFloatOptions): PropertyDecorator;
export function IsFloat(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isFloat(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isFloat(''))(target, propertyKey)
    }
}

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
export function IsFullWidth(target: Object, propertyKey: string): void;
export function IsFullWidth(message: string): PropertyDecorator;
export function IsFullWidth(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isFullWidth(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isFullWidth(''))(target, propertyKey)
    }
}

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
export function IsHalfWidth(target: Object, propertyKey: string): void;
export function IsHalfWidth(message: string): PropertyDecorator;
export function IsHalfWidth(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isHalfWidth(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isHalfWidth(''))(target, propertyKey)
    }
}

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
export function IsHash(target: Object, propertyKey: string): void;
export function IsHash(message: string, options?: ValidatorJS.HashAlgorithm): PropertyDecorator;
export function IsHash(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isHash(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isHash(''))(target, propertyKey)
    }
}

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
export function IsHexColor(target: Object, propertyKey: string): void;
export function IsHexColor(message: string): PropertyDecorator;
export function IsHexColor(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isHexColor(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isHexColor(''))(target, propertyKey)
    }
}

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
export function IsHexadecimal(target: Object, propertyKey: string): void;
export function IsHexadecimal(message: string): PropertyDecorator;
export function IsHexadecimal(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isHexadecimal(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isHexadecimal(''))(target, propertyKey)
    }
}

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
export function IsIdentityCard(target: Object, propertyKey: string): void;
export function IsIdentityCard(message: string): PropertyDecorator;
export function IsIdentityCard(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isIdentityCard(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isIdentityCard(''))(target, propertyKey)
    }
}

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
export function IsIp(target: Object, propertyKey: string): void;
export function IsIp(message: string, version?: '4' | '6' | 4 | 6): PropertyDecorator;
export function IsIp(...args: any[]): any {
    const [ message, version ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isIP(message, version))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isIP(''))(target, propertyKey)
    }
}

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
export function IsIPRange(target: Object, propertyKey: string): void;
export function IsIPRange(message: string): PropertyDecorator;
export function IsIPRange(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isIPRange(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isIPRange(''))(target, propertyKey)
    }
}

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
export function IsISBN(target: Object, propertyKey: string): void;
export function IsISBN(message: string, version?: '4' | '6' | 4 | 6): PropertyDecorator;
export function IsISBN(...args: any[]): any {
    const [ message, version ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISBN(message, version))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISBN(''))(target, propertyKey)
    }
}

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
export function IsISSN(target: Object, propertyKey: string): void;
export function IsISSN(message: string, version?: '4' | '6' | 4 | 6): PropertyDecorator;
export function IsISSN(...args: any[]): any {
    const [ message, version ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISSN(message, version))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISSN(''))(target, propertyKey)
    }
}

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
export function IsISIN(target: Object, propertyKey: string): void;
export function IsISIN(message: string): PropertyDecorator;
export function IsISIN(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISIN(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISIN(''))(target, propertyKey)
    }
}

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
export function IsISO8601(target: Object, propertyKey: string): void;
export function IsISO8601(message: string): PropertyDecorator;
export function IsISO8601(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISO8601(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISO8601(''))(target, propertyKey)
    }
}

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
export function IsRFC3339(target: Object, propertyKey: string): void;
export function IsRFC3339(message: string): PropertyDecorator;
export function IsRFC3339(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isRFC3339(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isRFC3339(''))(target, propertyKey)
    }
}

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
export function IsISO31661Alpha2(target: Object, propertyKey: string): void;
export function IsISO31661Alpha2(message: string): PropertyDecorator;
export function IsISO31661Alpha2(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISO31661Alpha2(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISO31661Alpha2(''))(target, propertyKey)
    }
}

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
export function IsISO31661Alpha3(target: Object, propertyKey: string): void;
export function IsISO31661Alpha3(message: string): PropertyDecorator;
export function IsISO31661Alpha3(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISO31661Alpha3(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISO31661Alpha3(''))(target, propertyKey)
    }
}

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
export function IsISRC(target: Object, propertyKey: string): void;
export function IsISRC(message: string): PropertyDecorator;
export function IsISRC(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isISRC(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isISRC(''))(target, propertyKey)
    }
}

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
export function IsIn(target: Object, propertyKey: string): void;
export function IsIn(message: string, values: any[]): PropertyDecorator;
export function IsIn(...args: any[]): any {
    const [ message, values ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isIn(message, values))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isIn(''))(target, propertyKey)
    }
}

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
export function IsInt(target: Object, propertyKey: string): void;
export function IsInt(message: string, options?: ValidatorJS.IsIntOptions): PropertyDecorator;
export function IsInt(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isInt(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isInt(''))(target, propertyKey)
    }
}

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
export function IsJSON(target: Object, propertyKey: string): void;
export function IsJSON(message: string): PropertyDecorator;
export function IsJSON(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isJSON(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isJSON(''))(target, propertyKey)
    }
}

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
export function IsJWT(target: Object, propertyKey: string): void;
export function IsJWT(message: string): PropertyDecorator;
export function IsJWT(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isJWT(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isJWT(''))(target, propertyKey)
    }
}

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
export function IsLatLong(target: Object, propertyKey: string): void;
export function IsLatLong(message: string): PropertyDecorator;
export function IsLatLong(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isLatLong(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isLatLong(''))(target, propertyKey)
    }
}

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
export function IsLength(target: Object, propertyKey: string): void;
export function IsLength(message: string, options?: ValidatorJS.IsByteLengthOptions): PropertyDecorator;
export function IsLength(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isLength(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isLength(''))(target, propertyKey)
    }
}

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
export function IsLowercase(target: Object, propertyKey: string): void;
export function IsLowercase(message: string): PropertyDecorator;
export function IsLowercase(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isLowercase(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isLowercase(''))(target, propertyKey)
    }
}

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
export function IsMACAddress(target: Object, propertyKey: string): void;
export function IsMACAddress(message: string): PropertyDecorator;
export function IsMACAddress(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMACAddress(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMACAddress(''))(target, propertyKey)
    }
}

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
export function IsMD5(target: Object, propertyKey: string): void;
export function IsMD5(message: string): PropertyDecorator;
export function IsMD5(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMD5(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMD5(''))(target, propertyKey)
    }
}

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
export function IsMimeType(target: Object, propertyKey: string): void;
export function IsMimeType(message: string): PropertyDecorator;
export function IsMimeType(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMimeType(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMimeType(''))(target, propertyKey)
    }
}

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
export function IsMobilePhone(message: string, locale?: ValidatorJS.MobilePhoneLocale): PropertyDecorator;
export function IsMobilePhone(target: Object, propertyKey: string): void;
export function IsMobilePhone(...args: any[]): any {
    const [ message, locale ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMobilePhone(message, locale))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMobilePhone(''))(target, propertyKey)
    }
}

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
export function IsMongoId(target: Object, propertyKey: string): void;
export function IsMongoId(message: string): PropertyDecorator;
export function IsMongoId(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMongoId(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMongoId(''))(target, propertyKey)
    }
}

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
export function IsMultibyte(target: Object, propertyKey: string): void;
export function IsMultibyte(message: string): PropertyDecorator;
export function IsMultibyte(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isMultibyte(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isMultibyte(''))(target, propertyKey)
    }
}

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
export function IsNumeric(target: Object, propertyKey: string): void;
export function IsNumeric(message: string, options?: ValidatorJS.IsNumericOptions): PropertyDecorator;
export function IsNumeric(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isNumeric(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isNumeric(''))(target, propertyKey)
    }
}

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
export function IsPort(target: Object, propertyKey: string): void;
export function IsPort(message: string): PropertyDecorator;
export function IsPort(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isPort(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isPort(''))(target, propertyKey)
    }
}

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
export function IsPostalCode(target: Object, propertyKey: string): void;
export function IsPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale): PropertyDecorator;
export function IsPostalCode(...args: any[]): any {
    const [ message, locale ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isPostalCode(message, locale))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isPostalCode(''))(target, propertyKey)
    }
}

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
export function IsSurrogatePair(target: Object, propertyKey: string): void;
export function IsSurrogatePair(message: string): PropertyDecorator;
export function IsSurrogatePair(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isSurrogatePair(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isSurrogatePair(''))(target, propertyKey)
    }
}

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
export function IsURL(target: Object, propertyKey: string): void;
export function IsURL(message: string, options?: ValidatorJS.IsURLOptions): PropertyDecorator;
export function IsURL(...args: any[]): any {
    const [ message, options ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isURL(message, options))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isURL(''))(target, propertyKey)
    }
}

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
export function IsUUID(target: Object, propertyKey: string): void;
export function IsUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5 ): PropertyDecorator;
export function IsUUID(...args: any[]): any {
    const [ message, version ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isUUID(message, version))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isUUID(''))(target, propertyKey)
    }
}

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
export function IsUppercase(target: Object, propertyKey: string): void;
export function IsUppercase(message: string): PropertyDecorator;
export function IsUppercase(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isUppercase(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isUppercase(''))(target, propertyKey)
    }
}

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
export function IsVariableWidth(target: Object, propertyKey: string): void;
export function IsVariableWidth(message: string): PropertyDecorator;
export function IsVariableWidth(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isVariableWidth(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isVariableWidth(''))(target, propertyKey)
    }
}

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
export function IsWhitelisted(target: Object, propertyKey: string): void;
export function IsWhitelisted(message: string, chars?: string | string[]): PropertyDecorator;
export function IsWhitelisted(...args: any[]): any {
    const [ message, chars ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isWhitelisted(message, chars))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isWhitelisted(''))(target, propertyKey)
    }
}

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
export function IsRequired(target: Object, propertyKey: string): void;
export function IsRequired(message: string): PropertyDecorator;
export function IsRequired(...args: any[]): any {
    const [ message ] = args;
    if (typeof message === 'string') {
        return createValidatorDecorator(isRequired(message))
    } else {
        const [ target, propertyKey ] = args
        return createValidatorDecorator(isRequired(''))(target, propertyKey)
    }
}

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
// export function IsFile(target: Object, propertyKey: string): void;
// export function IsFile(message: string): PropertyDecorator;
// export function IsFile(...args: any[]): any {
//     const [ message ] = args;
//     if (typeof message === 'string') {
//         return createValidatorDecorator(isRequired(message))
//     } else {
//         const [ target, propertyKey ] = args
//         return createValidatorDecorator(isRequired(''))(target, propertyKey)
//     }
// }