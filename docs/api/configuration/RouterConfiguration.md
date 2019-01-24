# RouterConfiguration

路由的配置类, 路由配置的参数是基于此类实例化。

## sensitive: boolean

路由是否区分大小写，默认为 false

## strict: boolean

是否开启路由的严格解析模式，默认为 false

## end: boolean

路由是否从字符串的结尾，默认为 true

## start: boolean

路由是否从字符串起始字符开始匹配，默认为 true

## delimiter: string

路由的分隔符，默认为 `/`

## endsWith: string | string[]

也可以是“结束”字符的字符列表。