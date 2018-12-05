import { baseValidator, baseTestValidator } from './baseValidator'

/**
 * IsAfter
 *
 * Example
 * ```
 * @IsAfter('invalid message')
 * @IsAfter('invalid message', '2018-10-11')
 * ```
 */
export function IsAfter(message: string, date?: string) {
    return baseValidator('isAfter', message, date)
}

/**
 * IsAfter
 *
 * Example
 * ```
 * @RequestBody('id', isAfter('invalid message'))
 * @RequestBody('id', isAfter('invalid message', '2018-10-11'))
 * @RequestParam(..., isAfter(...))
 * @RequestQuery(..., isAfter(...))
 * ```
 */
export function isAfter(message: string, date?: string) {
    return baseTestValidator('isAfter', message, date)
}

export function IsAlpha(message: string, locale?: ValidatorJS.AlphaLocale) {
    return baseValidator('isAlpha', message, locale)
}

export function isAlpha(message: string, date?: string) {
    return baseTestValidator('isAlpha', message, date)
}

export function IsAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale) {
    return baseValidator('isAlphanumeric', message, locale)
}

export function isAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale) {
    return baseTestValidator('isAlphanumeric', message, locale)
}

export function IsAscii(message: string) {
    return baseValidator('isAscii', message)
}

export function isAscii(message: string) {
    return baseTestValidator('isAscii', message)
}

export function IsBase64(message: string) {
    return baseValidator('isBase64', message)
}

export function isBase64(message: string) {
    return baseTestValidator('isBase64', message)
}

export function IsBefore(message: string, date?: string) {
    return baseValidator('isBefore', message, date)
}

export function isBefore(message: string, date?: string) {
    return baseTestValidator('isBefore', message, date)
}

export function IsBoolean(message: string) {
    return baseValidator('isBoolean', message)
}

export function isBoolean(message: string) {
    return baseTestValidator('isBoolean', message)
}

export function IsByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseValidator('isByteLength', message, options)
}

export function isByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseTestValidator('isByteLength', message, options)
}

export function IsCreditCard(message: string) {
    return baseValidator('isCreditCard', message)
}

export function isCreditCard(message: string) {
    return baseTestValidator('isCreditCard', message)
}

export function IsCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions) {
    return baseValidator('isCurrency', message, options)
}

export function isCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions) {
    return baseTestValidator('isCurrency', message, options)
}

export function isDataURI(message: string) {
    return baseValidator('isDataURI', message)
}

export function IsDataURI(message: string) {
    return baseTestValidator('isDataURI', message)
}

export function IsDecimal(message: string, options?: ValidatorJS.IsDecimalOptions) {
    return baseValidator('isDecimal', message, options)
}

export function isDecimal(message: string, options?: ValidatorJS.IsDecimalOptions) {
    return baseTestValidator('isDecimal', message, options)
}

export function IsDivisibleBy(message: string) {
    return baseValidator('isDivisibleBy', message)
}

export function isDivisibleBy(message: string) {
    return baseTestValidator('isDivisibleBy', message)
}

export function IsEmail(message: string, options?: ValidatorJS.IsEmailOptions) {
    return baseValidator('isEmail', message, options)
}

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