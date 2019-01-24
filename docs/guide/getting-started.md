# 快速上手

## 安装

首先，使用Easyboot CLI构建基础项目：

npm：

```shell
npm i -g @easyboot/cli
```

yarn：
```shell
yarn global add @easyboot/cli
```

## 创建项目
```shell
easyboot init project-name
```

然后在cli交互中输入相关的项目信息


## 启动项目

接下来,进入到项目目录，启动项目
```shell
cd project-name
```

npm:
```shell
npm start
npm run dev
```

yarn:
```shell
yarn start
yarn run dev
```

## 项目的目录结构

目录结构：
```
├─src                           开发目录
|   ├─application               应用目录
|   |   ├─configs               项目的配置文件目录
|   |   |   └─AppConfig.ts      应用配置类    
|   |   ├─modules               项目的模块目录
|   |   |   └─app               app模块
|   |   |       ├─services      服务类目录
|   |   |       ├─entitys       实体类目录
|   |   |       └─controllers   控制器类目录
|   |   └─index.ts              App启动文件
|   └─index.ts                  启动入口文件
├─static                        静态资源目录
|   └─index.html                html
├─package.json                  包管理
└─README.md                     自述文件
```

## 体验

### 1. 修改配置
在项目的src/application/configs/AppConfig.ts中,修改http服务的端口信息，以及静态文件的目录配置。服务器的配置参数是实例化至[ServletConfiguration](/api/configuration/ServletConfiguration.md)类
```ts
import { ServletConfiguration } from '@easyboot/core';
import { resolve } from 'path'

export class AppConfig extends ServletConfiguration {
    // 添加端口
    public port: number = 5000
    // 添加静态文件输出目录
    public staticDir: string = resolve('static')
}
```

### 2. 添加控制器
在项目的src/application/modules/app/controllers目录里添加一个控制器类TestController.ts
代码如下：

```ts
import { RequestMapping, GetMapping } from '@easyboot/core';

@RequestMapping('/')
export class IndexController {
    @GetMapping
    public async index() {
        return 'test/index';
    }

    @GetMapping
    public async test() {
        return 'test/test'
    }
}
```
接下来在浏览器中输入：

http://localhost:5000/index

> 浏览器就会输出 'test/index'

http://localhost:5000/test

> 浏览器就会输出 'test/test'

@RequestMapping装饰器是用于给当前控制器添加基础路由路径的，@GetMapping装饰器是给控制器的处理方法添加请求类型, 为get类型 当使用get请求时，就会进入到该路由对应的响应函数

@GetMapping装饰器 默认可以不用设置参数路由的路径为该控制器处理函数的函数名称。当然也可以设置参数，用于定义路由。

```ts
import { RequestMapping, GetMapping } from '@easyboot/core';

@RequestMapping('/')
export class IndexController {
    @GetMapping('demo1')
    public async index() {
        return 'demo1';
    }

    @GetMapping('demo2')
    public async test() {
        return 'demo2'
    }
}
```

接下来在浏览器中输入：

http://localhost:5000/demo1

> 浏览器就会输出 'demo1'

http://localhost:5000/demo2

> 浏览器就会输出 'demo2'


@RequestMapping装饰器的参数决定该控制器的路由主路径

例如:

```ts
import { RequestMapping, GetMapping } from '@easyboot/core';

@RequestMapping('/admin')
export class IndexController {
    @GetMapping('demo1')
    public async index() {
        return 'demo1';
    }

    @GetMapping('demo2')
    public async test() {
        return 'demo2'
    }
}
```

访问路径就变为：

http://localhost:5000/admin/demo1

http://localhost:5000/admin/demo2
