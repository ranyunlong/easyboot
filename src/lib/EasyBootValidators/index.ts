import { baseValidator, baseTestValidator } from './baseValidator'

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
export function IsAfter(message: string, date?: string) {
    return baseValidator('isAfter', message, date)
}

/**
 * isAfter
 *
 * check if the string is a date that's after the specified date (defaults to now).
 *
 * Example:
 * ```
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
    return baseTestValidator('isAfter', message, date)
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

export function IsAlpha(message: string, locale?: ValidatorJS.AlphaLocale) {
    return baseValidator('isAlpha', message, locale)
}

/**
 * isAlpha
 *
 * check if the string contains only letters (a-zA-Z).
 *
 * Example
 * ```
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
    return baseTestValidator('isAlpha', message, locale)
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
export function IsAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale) {
    return baseValidator('isAlphanumeric', message, locale)
}

/**
 * isAlphanumeric
 *
 * check if the string contains only letters and numbers.
 *
 * Example
 * ```
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
    return baseTestValidator('isAlphanumeric', message, locale)
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
export function IsAscii(message: string) {
    return baseValidator('isAscii', message)
}

/**
 * isAscii
 *
 * check if the string contains ASCII chars only.
 *
 * Example
 * ```
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
    return baseTestValidator('isAscii', message)
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
export function IsBase64(message: string) {
    return baseValidator('isBase64', message)
}

/**
 * isBase64
 *
 * check if a string is base64 encoded.
 *
 * Example
 * ```
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
    return baseTestValidator('isBase64', message)
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
export function IsBefore(message: string, date?: string) {
    return baseValidator('isBefore', message, date)
}

/**
 * isBefore
 *
 * check if the string is a date that's before the specified date.
 *
 * Example
 * ```
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
    return baseTestValidator('isBefore', message, date)
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
export function IsBoolean(message: string) {
    return baseValidator('isBoolean', message)
}

/**
 * isBoolean
 *
 * check if a string is a boolean.
 *
 * Example
 * ```
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
    return baseTestValidator('isBoolean', message)
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
export function IsByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseValidator('isByteLength', message, options)
}

/**
 * isByteLength
 *
 * check if the string's length (in UTF-8 bytes) falls in a range.
 *
 * Example
 * ```
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
    return baseTestValidator('isByteLength', message, options)
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
export function IsCreditCard(message: string) {
    return baseValidator('isCreditCard', message)
}

/**
 * isCreditCard
 *
 * check if the string is a credit card.
 *
 * Example
 * ```
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
    return baseTestValidator('isCreditCard', message)
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
export function IsCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions) {
    return baseValidator('isCurrency', message, options)
}

/**
 * isCurrency
 *
 * check if the string is a valid currency amount.
 *
 * Example
 * ```
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
    return baseTestValidator('isCurrency', message, options)
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
export function IsDataURI(message: string) {
    return baseValidator('isDataURI', message)
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
    return baseTestValidator('isDataURI', message)
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
export function IsMagnetURI(message: string) {
    return baseValidator('isDecimal', message)
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
    return baseTestValidator('isDecimal', message)
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
export function IsDecimal(message: string, options?: ValidatorJS.IsDecimalOptions) {
    return baseValidator('isDecimal', message, options)
}

/**
 * isDecimal
 *
 * check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
 *
 * Example
 * ```
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
    return baseTestValidator('isDecimal', message, options)
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
export function IsDivisibleBy(message: string) {
    return baseValidator('isDivisibleBy', message)
}

/**
 * isDivisibleBy
 *
 * check if the string is a number that's divisible by another.
 *
 * Example
 * ```
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
    return baseTestValidator('isDivisibleBy', message)
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
 * ```
 */
export function IsEmail(message: string, options?: ValidatorJS.IsEmailOptions) {
    return baseValidator('isEmail', message, options)
}

/**
 * isEmail
 *
 * check if the string is an email.
 *
 * Example
 * ```
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
    return baseTestValidator('isEmail', message, options)
}

export function IsEmpty(message: string) {
    return baseValidator('isEmpty', message)
}

export function isEmpty(message: string) {
    return baseTestValidator('isEmpty', message)
}

export function IsFQDN(message: string, options?: ValidatorJS.IsFQDNOptions) {
    return baseValidator('isFQDN', message, options)
}

export function isFQDN(message: string, options?: ValidatorJS.IsFQDNOptions) {
    return baseTestValidator('isFQDN', message, options)
}

export function IsFloat(message: string, options?: ValidatorJS.IsFloatOptions) {
    return baseValidator('isFloat', message, options)
}

export function isFloat(message: string, options?: ValidatorJS.IsFloatOptions) {
    return baseTestValidator('isFloat', message, options)
}

export function IsFullWidth(message: string) {
    return baseValidator('isFullWidth', message)
}

export function isFullWidth(message: string) {
    return baseTestValidator('isFullWidth', message)
}

export function IsHalfWidth(message: string) {
    return baseValidator('isHalfWidth', message)
}

export function isHalfWidth(message: string) {
    return baseTestValidator('isHalfWidth', message)
}

export function IsHash(message: string, options?: ValidatorJS.HashAlgorithm) {
    return baseValidator('isHash', message, options)
}

export function isHash(message: string, options?: ValidatorJS.HashAlgorithm) {
    return baseTestValidator('isHash', message, options)
}

export function IsHexColor(message: string) {
    return baseValidator('isHexColor', message)
}

export function isHexColor(message: string) {
    return baseTestValidator('isHexColor', message)
}

export function IsHexadecimal(message: string) {
    return baseValidator('isHexadecimal', message)
}

export function isHexadecimal(message: string) {
    return baseTestValidator('isHexadecimal', message)
}

export function IsIdentityCard(message: string) {
    return baseValidator('isIdentityCard' as any, message)
}

export function isIdentityCard(message: string) {
    return baseTestValidator('isIdentityCard' as any, message)
}

export function isIP(message: string, version?: '4' | '6' | 4 | 6) {
    return baseValidator('isIP', message, version)
}

export function IsIp(message: string, version?: '4' | '6' | 4 | 6) {
    return baseTestValidator('isIP', message, version)
}

export function IsIPRange(message: string) {
    return baseValidator('isIPRange' as any, message)
}

export function isIPRange(message: string) {
    return baseTestValidator('isIPRange' as any, message)
}

export function IsISBN(message: string, version?: '10' | '13' | 10 | 13) {
    return baseValidator('isISBN', message, version)
}

export function isISBN(message: string, version?: '10' | '13' | 10 | 13) {
    return baseTestValidator('isISBN', message, version)
}

export function IsISSN(message: string, options?: ValidatorJS.IsISSNOptions) {
    return baseValidator('isISSN', message, options)
}

export function isISSN(message: string, options?: ValidatorJS.IsISSNOptions) {
    return baseTestValidator('isISSN', message, options)
}

export function IsISIN(message: string) {
    return baseValidator('isISIN', message)
}

export function isISIN(message: string) {
    return baseTestValidator('isISIN', message)
}

export function IsISO8601(message: string) {
    return baseValidator('isISO8601', message)
}

export function isISO8601(message: string) {
    return baseTestValidator('isISO8601', message)
}

export function IsRFC3339(message: string) {
    return baseValidator('isRFC3339' as any, message)
}

export function isRFC3339(message: string) {
    return baseTestValidator('isRFC3339' as any, message)
}

export function IsISO31661Alpha2(message: string) {
    return baseValidator('isISO31661Alpha2', message)
}

export function isISO31661Alpha2(message: string) {
    return baseTestValidator('isISO31661Alpha2', message)
}

export function IsISO31661Alpha3(message: string) {
    return baseValidator('isISO31661Alpha3' as any, message)
}

export function isISO31661Alpha3(message: string) {
    return baseTestValidator('isISO31661Alpha3' as any, message)
}

export function IsIn(message: string, values: any[]) {
    return baseValidator('isIn', message, values)
}

export function isIn(message: string, values: any[]) {
    return baseTestValidator('isIn', message, values)
}

export function IsInt(message: string, options?: ValidatorJS.IsIntOptions) {
    return baseValidator('isInt', message, options)
}

export function isInt(message: string, options?: ValidatorJS.IsIntOptions) {
    return baseTestValidator('isInt', message, options)
}

export function IsISRC(message: string) {
    return baseValidator('isISRC', message)
}

export function isISRC(message: string) {
    return baseTestValidator('isISRC', message)
}

export function IsJSON(message: string) {
    return baseValidator('isJSON', message)
}

export function isJSON(message: string) {
    return baseTestValidator('isJSON', message)
}

export function IsJWT(message: string) {
    return baseValidator('isJWT' as any, message)
}

export function isJWT(message: string) {
    return baseTestValidator('isJWT' as any, message)
}

export function IsLatLong(message: string) {
    return baseValidator('isLatLong', message)
}

export function isLatLong(message: string) {
    return baseTestValidator('isLatLong', message)
}

export function IsLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseValidator('isLength', message, options)
}

export function isLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseTestValidator('isLength', message, options)
}

export function IsLowercase(message: string) {
    return baseValidator('isLowercase', message)
}

export function isLowercase(message: string) {
    return baseTestValidator('isLowercase', message)
}

export function IsMACAddress(message: string) {
    return baseValidator('isMACAddress', message)
}

export function isMACAddress(message: string) {
    return baseTestValidator('isMACAddress', message)
}

export function IsMD5(message: string) {
    return baseValidator('isMD5', message)
}

export function isMD5(message: string) {
    return baseTestValidator('isMD5', message)
}

export function IsMimeType(message: string) {
    return baseValidator('isMimeType', message)
}

export function isMimeType(message: string) {
    return baseTestValidator('isMimeType', message)
}

export function IsMobilePhone(message: string, options?: ValidatorJS.IsMobilePhoneOptions) {
    return baseValidator('isMobilePhone', message, options)
}

export function isMobilePhone(message: string, options?: ValidatorJS.IsMobilePhoneOptions) {
    return baseTestValidator('isMobilePhone', message, options)
}

export function IsMongoId(message: string) {
    return baseValidator('isMongoId', message)
}

export function isMongoId(message: string) {
    return baseTestValidator('isMongoId', message)
}

export function IsMultibyte(message: string) {
    return baseValidator('isMultibyte', message)
}

export function isMultibyte(message: string) {
    return baseTestValidator('isMultibyte', message)
}

export function IsNumeric(message: string, options?: ValidatorJS.IsNumericOptions) {
    return baseValidator('isNumeric', message, options)
}

export function isNumeric(message: string, options?: ValidatorJS.IsNumericOptions) {
    return baseTestValidator('isNumeric', message, options)
}

export function IsPort(message: string) {
    return baseValidator('isPort', message)
}

export function isPort(message: string) {
    return baseTestValidator('isPort', message)
}

export function IsPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale) {
    return baseValidator('isPostalCode', message, locale)
}

export function isPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale) {
    return baseTestValidator('isPostalCode', message, locale)
}

export function IsSurrogatePair(message: string) {
    return baseValidator('isSurrogatePair', message)
}

export function isSurrogatePair(message: string) {
    return baseTestValidator('isSurrogatePair', message)
}

export function IsURL(message: string, options?: ValidatorJS.IsURLOptions) {
    return baseValidator('isURL', message, options)
}

export function isURL(message: string, options?: ValidatorJS.IsURLOptions) {
    return baseTestValidator('isURL', message, options)
}

export function IsUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5 ) {
    return baseValidator('isUUID', message, version)
}

export function isUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5 ) {
    return baseTestValidator('isUUID', message, version)
}

export function IsUppercase(message: string) {
    return baseValidator('isUppercase', message)
}

export function isUppercase(message: string) {
    return baseTestValidator('isUppercase', message)
}

export function IsVariableWidth(message: string) {
    return baseValidator('isVariableWidth', message)
}

export function isVariableWidth(message: string) {
    return baseTestValidator('isVariableWidth', message)
}

export function IsWhitelisted(message: string, chars?: string | string[]) {
    return baseValidator('isWhitelisted', message, chars)
}

export function isWhitelisted(message: string, chars?: string | string[]) {
    return baseTestValidator('isWhitelisted', message, chars)
}

export function IsString(message: string) {
    return baseValidator('isString' as any, message)
}

export function isString(message: string) {
    return baseTestValidator('isString' as any, message)
}

export function IsRequired(message: string) {
    return baseValidator('isRequired' as any, message)
}

export function isRequired(message: string) {
    return baseTestValidator('isRequired' as any, message)
}

export function IsArray(message: string) {
    return baseValidator('isArray' as any, message)
}

export function isArray(message: string) {
    return baseTestValidator('isArray' as any, message)
}