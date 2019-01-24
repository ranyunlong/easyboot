# 模块

当项目的业务逻辑需要分离时，模块就有很大的作用，Easyboot 的模块系统类似于angular，但是没有设计的很复杂。
一般模块是添加在项目的src/application/modules的目录中，目录结构也可以自由创建。

## 创建模块

在项目目录的src/application/modules中创建以下目录结构

```
src  
 └─application 
    └─modules
        └─test                              test模块
            ├─services                      服务class目录
            |   └─UserService.ts            服务class
            ├─entitys                       实体class目录
            ├─controllers                   控制器class目录
            |   └─IndexController.ts        控制器class
            └─index.ts                      模块class
```

在src/application/modules/test/index.ts，添加模块类

```ts
import { Module } from '@easyboot/core';
import { IndexController } from './controllers/IndexController';

@Module({
    controllers: [
        IndexController
    ],
    providers: [
        UserService
    ]
})
export class TestModule {}
```

使用@Module装饰器 创建一个模块class，并添加了IndexController控制器。

## @Module 装饰器

1. controllers 选项用于添加控制器
2. providers  选项用于提供服务


服务用来提供给 controllers 中的控制器提供服务注入。

> 注意：使用@Service(true)装饰的服务是全局服务，在任意一个模块中都可以使用该服务。

## 使用模块提供的服务
在IndexController可以注入providers中注册的服务 UserService

**UserService.ts的代码:**
```ts
@Service
export class UserService {
    public run() {
        return 100
    }
}
```
**IndexController.ts的代码：**
```ts
import { RequestMapping, GetMapping } from '@easyboot/core';
import { UserService } from '../services/UserService';

@RequestMapping('/')
export class IndexController {
    constructor(public userService: UserService) {}

    @GetMapping
    public async index() {
        return this.userService.run();
    }
}
```
