import { baseValidator } from './baseValidator'

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
    return baseValidator('isMagnetURI' as any, message)
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
export function IsEmail(message: string, options?: ValidatorJS.IsEmailOptions) {
    return baseValidator('isEmail', message, options)
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
export function IsEmpty(message: string) {
    return baseValidator('isEmpty', message)
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
export function IsFQDN(message: string, options?: ValidatorJS.IsFQDNOptions) {
    return baseValidator('isFQDN', message, options)
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
export function IsFloat(message: string, options?: ValidatorJS.IsFloatOptions) {
    return baseValidator('isFloat', message, options)
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
export function IsFullWidth(message: string) {
    return baseValidator('isFullWidth', message)
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
export function IsHalfWidth(message: string) {
    return baseValidator('isHalfWidth', message)
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
export function IsHash(message: string, options?: ValidatorJS.HashAlgorithm) {
    return baseValidator('isHash', message, options)
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
export function IsHexColor(message: string) {
    return baseValidator('isHexColor', message)
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
export function IsHexadecimal(message: string) {
    return baseValidator('isHexadecimal', message)
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
export function IsIdentityCard(message: string) {
    return baseValidator('isIdentityCard' as any, message)
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
export function IsIp(message: string, version?: '4' | '6' | 4 | 6) {
    return baseValidator('isIP', message, version)
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
export function IsIPRange(message: string) {
    return baseValidator('isIPRange' as any, message)
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
export function IsISBN(message: string, version?: '10' | '13' | 10 | 13) {
    return baseValidator('isISBN', message, version)
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
export function IsISSN(message: string, options?: ValidatorJS.IsISSNOptions) {
    return baseValidator('isISSN', message, options)
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
export function IsISIN(message: string) {
    return baseValidator('isISIN', message)
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
export function IsISO8601(message: string) {
    return baseValidator('isISO8601', message)
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
export function IsRFC3339(message: string) {
    return baseValidator('isRFC3339' as any, message)
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
export function IsISO31661Alpha2(message: string) {
    return baseValidator('isISO31661Alpha2', message)
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
export function IsISO31661Alpha3(message: string) {
    return baseValidator('isISO31661Alpha3' as any, message)
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
export function IsISRC(message: string) {
    return baseValidator('isISRC', message)
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
export function IsIn(message: string, values: any[]) {
    return baseValidator('isIn', message, values)
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
export function IsInt(message: string, options?: ValidatorJS.IsIntOptions) {
    return baseValidator('isInt', message, options)
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
export function IsJSON(message: string) {
    return baseValidator('isJSON', message)
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
export function IsJWT(message: string) {
    return baseValidator('isJWT' as any, message)
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
export function IsLatLong(message: string) {
    return baseValidator('isLatLong', message)
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
export function IsLength(message: string, options?: ValidatorJS.IsByteLengthOptions) {
    return baseValidator('isLength', message, options)
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
export function IsLowercase(message: string) {
    return baseValidator('isLowercase', message)
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
export function IsMACAddress(message: string) {
    return baseValidator('isMACAddress', message)
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
export function IsMD5(message: string) {
    return baseValidator('isMD5', message)
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
export function IsMimeType(message: string) {
    return baseValidator('isMimeType', message)
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
export function IsMobilePhone(message: string, options?: ValidatorJS.MobilePhoneLocale) {
    return baseValidator('isMobilePhone', message, options)
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
export function IsMongoId(message: string) {
    return baseValidator('isMongoId', message)
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
export function IsMultibyte(message: string) {
    return baseValidator('isMultibyte', message)
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
export function IsNumeric(message: string, options?: ValidatorJS.IsNumericOptions) {
    return baseValidator('isNumeric', message, options)
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
export function IsPort(message: string) {
    return baseValidator('isPort', message)
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
export function IsPostalCode(message: string, locale?: ValidatorJS.PostalCodeLocale) {
    return baseValidator('isPostalCode', message, locale)
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
export function IsSurrogatePair(message: string) {
    return baseValidator('isSurrogatePair', message)
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
export function IsURL(message: string, options?: ValidatorJS.IsURLOptions) {
    return baseValidator('isURL', message, options)
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
export function IsUUID(message: string, version?: '3' | '4' | '5' | 3 | 4 | 5 ) {
    return baseValidator('isUUID', message, version)
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
export function IsUppercase(message: string) {
    return baseValidator('isUppercase', message)
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
export function IsVariableWidth(message: string) {
    return baseValidator('isVariableWidth', message)
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
export function IsWhitelisted(message: string, chars?: string | string[]) {
    return baseValidator('isWhitelisted', message, chars)
}

/**
 * IsString decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * checks value is String.
 *
 * Example
 * ```
 * @IsString('message')
 * ```
 */
export function IsString(message: string) {
    return baseValidator('isString' as any, message)
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
export function IsRequired(message: string) {
    return baseValidator('isRequired' as any, message)
}

/**
 * IsArray decorator
 *
 * The decorator apply to EasyBootEntity class propertys, Used to validate data types.
 * checks value is array.
 *
 * Example
 * ```
 * @IsArray('message')
 * ```
 */
export function IsArray(message: string) {
    return baseValidator('isArray' as any, message)
}
