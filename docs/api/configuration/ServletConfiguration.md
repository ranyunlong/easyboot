# ServletConfiguration

Servlet类的配置类, Servlet类 的配置信息是使用此类实例化创建的对象。

### env: Env

项目的启动模式，默认 `development`。

### proxy: boolean

when true proxy header fields will be trusted, default `false`

### subdomainOffse: number

offset of .subdomains to ignore [2], default `2`

### host: string

配置服务器的主机地址,默认为 `http://localhost`

### port: number


配置服务器的端口,默认为 3000

### keys: string[] | [KeyGrip](https://github.com/jed/keygrip)

设置签名的 Cookie 密钥。这些被传递给 KeyGrip，但是你也可以传递你自己的 KeyGrip 实例。


### ssl: [ServletSSLConfiguration](https://nodejs.org/dist/latest-v10.x/docs/api/tls.html#tls_tls_createserver_options_secureconnectionlistener)

如果要开启 https 配置，请配置此选项。

```ts
{
    ssl: new ServletSSLConfiguration()
}
```

### silent: boolean

是否静默输出错误，当遇到错误时如果是http 响应，则静默输出错误，不在控制台显示此错误，默认false 不输出。设置为true时则会在控制台输出响应的错误。

### router: [RouterConfiguration](/api/configuration/RouterConfiguration.md)

路由的配置选项，要配置路由的解析规则，请实例化 `RouterConfiguration` 类。

例如：
```ts
{
    router: new RouterConfiguration()
}
```

### staticDir: string

配置静态文件存放目录，默认为项目根目录的`static`目录

### maxListeners: number

配置 Servlet 类的最大事件监听数量。