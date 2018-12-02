import { baseValidator } from './baseValidator'

export function IsAfter(message: string, date?: string) {
    return baseValidator('isAfter', message, date)
}

export function IsAlpha(message: string, locale?: ValidatorJS.AlphaLocale) {
    return baseValidator('isAlpha', message, locale)
}

export function IsAlphanumeric(message: string, locale?: ValidatorJS.AlphanumericLocale) {
    return baseValidator('isAlphanumeric', message, locale)
}

export function IsAscii(message: string) {
    return baseValidator('isAscii', message)
}

export function IsBase64(message: string) {
    return baseValidator('isBase64', message)
}

export function IsBefore(message: string, date?: string) {
    return baseValidator('isBefore', message, date)
}

export function IsBoolean(message: string) {
    return baseValidator('isBoolean', message)
}

export function IsByteLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseValidator('isByteLength', message, options)
}

export function IsCreditCard(message: string) {
    return baseValidator('isCreditCard', message)
}

export function IsCurrency(message: string, options?: ValidatorJS.IsCurrencyOptions) {
    return baseValidator('isCurrency', message, options)
}

export function IsDataURI(message: string) {
    return baseValidator('isDataURI', message)
}

export function IsDecimal(message: string, options?: ValidatorJS.IsDecimalOptions) {
    return baseValidator('isDecimal', message, options)
}

export function IsDivisibleBy(message: string) {
    return baseValidator('isDivisibleBy', message)
}

export function IsEmail(message: string, options?: ValidatorJS.IsEmailOptions) {
    return baseValidator('isEmail', message, options)
}

export function IsEmpty(message: string) {
    return baseValidator('isEmpty', message)
}

export function IsFQDN(message: string, options?: ValidatorJS.IsFQDNOptions) {
    return baseValidator('isFQDN', message, options)
}

export function IsFloat(message: string, options?: ValidatorJS.IsFloatOptions) {
    return baseValidator('isFloat', message, options)
}

export function IsFullWidth(message: string) {
    return baseValidator('isFullWidth', message)
}

export function IsHalfWidth(message: string) {
    return baseValidator('isHalfWidth', message)
}

export function IsHash(message: string, options?: ValidatorJS.HashAlgorithm) {
    return baseValidator('isHash', message, options)
}

export function IsHexColor(message: string) {
    return baseValidator('isHexColor', message)
}

export function IsHexadecimal(message: string) {
    return baseValidator('isHexadecimal', message)
}

export function IsIdentityCard(message: string) {
    return baseValidator('isIdentityCard' as any, message)
}

export function IsIp(message: string, version?: '4' | '6' | 4 | 6) {
    return baseValidator('isIP', message, version)
}

export function IsIPRange(message: string) {
    return baseValidator('isIPRange' as any, message)
}

export function IsISBN(message: string, version?: '10' | '13' | 10 | 13) {
    return baseValidator('isISBN', message, version)
}

export function IsISSN(message: string, options?: ValidatorJS.IsISSNOptions) {
    return baseValidator('isISSN', message, options)
}

export function IsISIN(message: string) {
    return baseValidator('isISBN', message)
}

export function IsISO8601(message: string) {
    return baseValidator('isISO8601', message)
}

export function IsRFC3339(message: string) {
    return baseValidator('isRFC3339' as any, message)
}

export function IsISO31661Alpha2(message: string) {
    return baseValidator('isISO31661Alpha2', message)
}

export function IsISO31661Alpha3(message: string) {
    return baseValidator('isISO31661Alpha3' as any, message)
}

export function isIn(message: string, values: any[]) {
    return baseValidator('isISRC', message, values)
}

export function IsInt(message: string, options?: ValidatorJS.IsIntOptions) {
    return baseValidator('isInt', message, options)
}

export function IsISRC(message: string) {
    return baseValidator('isISRC', message)
}

export function IsJSON(message: string) {
    return baseValidator('isJSON', message)
}

export function IsJWT(message: string) {
    return baseValidator('isJWT' as any, message)
}

export function IsLatLong(message: string) {
    return baseValidator('isLatLong', message)
}

export function IsLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseValidator('isLatLong', message, options)
}

export function IsLowercase(message: string) {
    return baseValidator('isLowercase', message)
}

export function IsMACAddress(message: string) {
    return baseValidator('isMACAddress', message)
}

export function IsMD5(message: string) {
    return baseValidator('isMD5', message)
}

export function IsMimeType(message: string) {
    return baseValidator('isMimeType', message)
}

export function isMobilePhone(message: string, options?: ValidatorJS.IsMobilePhoneOptions) {
    return baseValidator('isMobilePhone', message, options)
}

export function IsMongoId(message: string) {
    return baseValidator('isMongoId', message)
}

export function IsMultibyte(message: string) {
    return baseValidator('isMultibyte', message)
}

export function IsNumeric(message: string, options?: ValidatorJS.IsNumericOptions) {
    return baseValidator('isNumeric', message, options)
}

export function IsPort(message: string) {
    return baseValidator('isPort', message)
}

export function IsPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale) {
    return baseValidator('isPostalCode', message, locale)
}

export function IsSurrogatePair(message: string) {
    return baseValidator('isSurrogatePair', message)
}

export function IsURL(message: string, options?: ValidatorJS.IsURLOptions) {
    return baseValidator('isURL', message, options)
}

export function IsUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5 ) {
    return baseValidator('isUUID', message, version)
}

export function IsUppercase(message: string) {
    return baseValidator('isUppercase', message)
}

export function IsVariableWidth(message: string) {
    return baseValidator('isVariableWidth', message)
}

export function IsWhitelisted(message: string, chars?: string | string[]) {
    return baseValidator('isWhitelisted', message, chars)
}

export function IsString(message: string) {
    return baseValidator('isString' as any, message)
}

export function IsRequired(message: string) {
    return baseValidator('isRequired' as any, message)
}

export function IsArray(message: string) {
    return baseValidator('isArray' as any, message)
}