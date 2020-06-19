# 在TypeScrit下构建 Node 服务项目步骤

* 1、新建项目根目录，进入后并用 npm init 创建 package.json 文件;

* 2、新建tsconfig.json;
配置信息如下：
``` json
{
    "compilerOptions": {
        "target": "es2016",                     // 编译js目标版本
        "module": "commonjs",                   // 编译后的模块类型【node.js => commonjs】
        "outDir": "./dist",                     // 指定编译后的js文件存放目录

        "sourceMap": true,          
        "noImplicitAny": true,                  // 隐私类型
        "strictNullChecks": true,               // 开启代码严格检查

        "allowJs": true,                        // 开启可以引入非ts模块
        "resolveJsonModule": true,              // 开启加载json模块
        "esModuleInterop": true,                // 处理非ts模块化引入问题
        "allowSyntheticDefaultImports": true,   // 处理非ts模块化导出问题

        "experimentalDecorators": true,         // 开启装饰器特性
        "emitDecoratorMetadata": true,          // 开启装饰器源数据
    },

    "include": [
        "./src/**/*"                            // ts源文件存放目录(在src目录下的所有ts文件)
    ]
}
```

* 3、新建src目录，并在该目录下创建config目录，再创建index.ts文件用于存储公用配置信息（由于默认在ts环境中没有继承Node环境的相关类型声明和API 所以要调用Node.js环境下的process对象需要安装@types/node模块）：
```js
    npm i -D @types/node
```

* 4、在src目录下创建app.ts 用于项目入口文件

* 5、安装Koa框架： 
```js
    npm i koa 
```

* 6、安装@types/koa模块 由于在ts环境中没有Koa框架的相关类型声明，的以用@types/koa来处理这个在app.ts中不引入koa模块是报错问题
```js
    npm i -D @types/koa
```

* 7、安装ts-node-dev模块 由于启动Node服务不识别.ts文件（打包为.js后就识别了），所以用ts-node-dev来启动ts文件（app.ts）的Node服务，它还有热更新功能哦！！
```js
    npm i -D ts-node-dev 
```

* 8、安装typescript模块 由于要ts-node-dev模块依赖typescript模块来编译运行，所有用要安装typescript;
```js
    npm i -D typescript
```


* 9 由于npm run ts-node-dev app.ts 命令太长，所以在package.json中的scripts项下添加 
- "start": "ts-node-dev ./src/app.ts"

* 10 最后用 npm run start 就以启动ts的Node服务啦！！








# 配置路由 使用 koa-ts-controllers 模块来管理路由、中间件等（注：路由功能还是用koa-router来做的），还有就是koa-ts-controllers模块 它是ts写的很方面

* 1、安装 koa-ts-controllers模块
```js
    npm i koa-ts-controllers
```

* 2、安装 koa-rotuer模块(用于配置路由规则等)
```js
    npm i koa-router
```

* 2、安装 @types/koa-router模块 由于在ts中要识别koa-router，所以用@types/koa-router来做类型声明
```
    npm i -D @types/koa-router
```

* 3、安装 class-validator模块 用于数据类型验证用的修饰符等
```js
    npm i class-validator
```

* 4、在src目录下创建controllers目录，用于存放控制器和方法、Api接口

要获取 post方式传过来的参数，还需要如 koa-bodyparser 等可以接收post参数的模块
```js
    npm i -D koa-bodyparser

    npm i -D @types/koa-bodyparser //类型声明

    //然后在 koa-bodyparser 在app.ts文件中引入，并注册到app.use()中，如：App.use(KoaBodyParser());
```

* 5、编写API接口，controllers目录新建相应的.ts接口文件

```js
    import { Controller, Get, Params, Query, Body, Post, Header } from "koa-ts-controllers";

    // '/user'就是控制器，@Controller是类装饰器
    @Controller('/user')    
    export class UserController {

        // '/login'就是方法(Api接口) 方法装饰器 注: 这是名字就是方法(Api接口的名字哦), 而下面的方法名可以任意写(不能与其他字名重得就OK) 所以一般装饰器名和方法都名一样 
        @Get('/login')  
        public async Login(@Query('name') name: any) {
            return 'OK 登录Api 访问成功！';
        };

        // 注：post方式要 专门post获取如 koa-bodyparser 才行哦
        @Post('/regist')
        public async regist(@Header() head: any, @Body({ required: true }) body: any) {
            
            console.log('\n头信息', head);
            console.log('\n主体信息', body);
            // 数据应从数据库取，这里只是为是演示用的
            return {
                code: 100,
                data: {},
            };
        };
    }
```

* 6、在app.ts中配置、注册路由
```js

    import Koa, { Context } from 'koa';
    import KoaRouter from "koa-router";
    import KoaBodyParser from "koa-bodyparser";
    import { bootstrapControllers } from "koa-ts-controllers";

    (async () => {
        const App = new Koa();
        const Router = new KoaRouter();

        // 路由、控制器、API管理（注：这里需要异步处理 await）
        await bootstrapControllers(App, {
            router: Router,                                         // 绑定路由模块 
            basePath: '/api',                                       // 访问规则 localhost:8080/api/v2/控制器/接口
            versions: {                                             // 版本号 
                1: '此版本已弃用，不久将被删除！请尽快迁移到v2版本', // 可以同时开多个版本，这个是虽然能用，但是有警告信息
                2: true,                                            // 正常访问
                dangote: true                                       // 非常适合定制，业务客户端特定的端点版本
            },
            controllers: [                                          // 指定控制器类、接口存放目录，
                __dirname + '/controllers/**/*.ts'                  // 可直接添加到此数组中，也可以添加全局字符串（匹配controllers目录下的所以文件分析类指定到路由对象中）
            ],
            errorHandler: async (err: any, ctx: Context) => {       // 统一错误处理程序(可选)
                let status = 500;
                let body: any = {
                    statusCode: status,
                    error: 'Internal Server Error',
                    message: '后台数据库 或 控制器、Api接口发生错误！',
                    errorDetails: '内部服务器错误！'
                };
                if (err && err.output) {                            // 如果控制器类、接口中有错抛出时的返回处理
                    let {statusCode, payload} = err.output;
                    status = statusCode;                            // HTTP状态代码(通常4 xx或5 xx)
                    body = payload;
                    if (err.data) {          
                        body.errorDetails = err.data;               // 如果有错误详情时一并返回
                    }
                };
                ctx.status = status;
                ctx.body = body;
            }
        });

        // 注册获取post参数模块
        App.use(KoaBodyParser());

        // 注册路由
        App.use(Router.routes());

        // 监听服务
        App.listen(Config.server.prot, Config.server.host, () => {
            console.log('服务启动成功：监听' + Config.server.host + ':' + Config.server.prot);
        });

    })();
```









# 配置数据库操作模块 sequelize(对MySQL、SQLite、MSSQL等数据库操作进行封装提供统一的API) 与 sequelize-cli

* Sequelize是用于Postgres，MySQL，MariaDB，SQLite和Microsoft SQL Server的基于承诺的Node.js ORM。
* 它具有可靠的事务支持，关系，渴望和延迟加载，读取复制等功能。
* 续集遵循SEMVER。支持Node v6及更高版本以使用ES6功能。

* sequelize 是一个基于Node.js的ORM库，也就是对象关系映射（像操作对象一样的去操作数据库，而不是SQL）

* sequelize 与 sequelize-cli 就像vue 和 vue-cli的关系差不多。

* 1、安装 sequelize
```js
    npm i sequelize
```

* 2、安装 sequelize-cli （用记创建数据库，表等）
```js
    npm i -D sequelize-cli
```

* 3、安装 mysql2 数据库操作模块 （）
```js
    npm i mysql2
```

* 4、在根目录下创建 .sequelizerc文件（和数据库相关迁移、种子等）配置文件
内容如下：
```js
    const path = require('path');

    module.exports = {
        'env': 'development',
        'debug': true,
        'config': path.resolve('src', 'database/config.json'),
        'models-path': path.resolve('src', 'database/models'),
        'seeders-path': path.resolve('src', 'database/seeders'),
        'migrations-path': path.resolve('src', 'database/migrations')
    };
```

* 5、在src目录下新建database目录，并在该目录下新建config.json文件用于配置数据库信息
内容如下：
```json
    {
        "development": {
            "host": "localhost",
            "prot": 3306,
            "dialect": "mysql",
            "username": "root",
            "password": null,
            "database": "ts_node_koa_mysql"
        },
        "test": {

        },
        "production": {

        }
    }
```








# 构建数据库、表结构 (迁移脚本)

* 1、为了执行方别，在package.json中的scripts项下添加相关执行命令，主要是期sequelize-cli来操作的， 
```json
    {
        "db:create": "sequelize db:create",                                             // 创建数据库
        "db:drop": "sequelize db:drop",                                                 // 销毁数据库,

        "db:migrate": "sequelize db:migrate",                                           // 创建表
        "db:migrate:undo:all": "sequelize db:migrate:undo:all",                         // 撤销所有创建

        "db:seed:all": "sequelize db:seed:all",                                         // 执行种子脚本（把数据写入数据库）
        "db:seed:undo:all": "sequelize db:seed:undo:all",                               // 种子脚本撤销/回滚

        "db:init": "npm run db:create && npm run db:migrate && npm run db:seed:all",    // 第一次构建
        "db:redo": "npm run db:drop && npm run db:init"                                 // 全部重建(重置) 
    }

    // 配置创建、销毁数据库的 sequelize 常用命令：
    sequelize db：migrate运行挂起的迁移 续集db：migrate：schema：timestamps：add更新迁移表以具有时间戳
    sequelize db：migrate：status列出所有迁移的状态
    sequelize db：migrate：undo恢复迁移
    sequelize db：migrate：undo：all还原所有已运行的迁移
    sequelize db：seed运行指定的种子
    sequelize db：seed：undo从数据库中删除数据
    sequelize db：seed：all运行每个种子
    sequelize db：seed：undo：all从数据库中删除数据
    sequelize db：create创建配置指定的数据库
    sequelize db：drop删除配置指定的数据库
    sequelize init初始化项目
    sequelize init：config初始化配置
    sequelize init：migrations初始化迁移
    sequelize init：models初始化模型
    sequelize init：seeders初始化种子
    sequelize migration：generate生成一个新的迁移文件[别名：migration：create]
    sequelize model：generate生成模型及其迁移[别名：model：create]
    sequelize seed：generate生成一个新的种子文件[别名：seed：create]
```


* 2、创建数据库 注：要先启动数据库环境如： WampServer、Navicat for MySQL 等，然后在项目根目录(和.sequelizerc文件同级)中打开命令行工具运行如下命令
```js
    npm run db:create   // (它会根据.sequelizerc文件的配置执行，并读取到database/config.json文件进行配置)
                        //注：如果执行不成功，就把命令写到上面第6步写在package.json文件中
```


* 3、创建迁移脚本文件(设计表结构、也可自己手动在数据库管理工具中完成哦！)

【以下是用命令来创建】

(1)、在src/database目录下创建migrations目录，并创建迁移脚本文件.js（可手动 或 用命令 ） 

创建迁移脚本文件.js命令: 
```js
    cd ./node_modules/.bin  // 1、先进入这个目录，
    migration:create --name user // 2、执行该命令，这个user可自定义命名，最好根表相关，命令执行后会在指定的目录生成以时间戳+迁移文件命名的js文件 
如：
    20200615071002-user.js,
    20200615070808-news.js

    // 注：这里有个问题是生成的迁移文件在node_modules/.bin/migrations目录中！！！（我是手动把这里面的文件拷到src/database/migrations目录中去的）
```

(2)、在生成的迁移脚本文件的up方法中配置表结构映射， 
```js

    //迁移脚本文件内容哪下：
    'use strict';
    module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
        Add altering commands here.
        Return a promise to correctly handle asynchronicity.
        
        up方法 要求返回一个Promise

        Example:
        return queryInterface.createTable('users', { id: Sequelize.INTEGER });

        queryInterface.createTable()方法用于创建表，参数1是表名，参数2是表结构（字段信息）
        */
        // 创建User表
        return queryInterface.createTable('User', 
            {
                id: {
                    type: Sequelize.INTEGER.UNSIGNED, //数字
                    autoIncrement: true,              // 值自增
                    primaryKey: true,                 // 主键
                },
                username: {
                    type: Sequelize.STRING(50), //字符串类型 varchar
                    unique: true,               // 值唯一（不能重复）
                    allowNull: false            // 不能为空
                },
                password: {
                    type: Sequelize.STRING(32),
                    allowNull: false
                },
                sex: {
                    type: Sequelize.CHAR(8),     //字符类型
                    defaultValue: '男'
                },
                createdAt: {
                    type: Sequelize.DATE,       //日期类型
                    allowNull: false
                },
                updatedAt: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            }, 
            {
                charset: 'utf8mb4'
            });
        },

    down: (queryInterface, Sequelize) => {
        /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.

        Example:
        return queryInterface.dropTable('users');
        */
        // 删除User表
        return queryInterface.dropTable('User');
    }
    };

```

3、迁移脚本（创建表，根据设计好的迁移脚本文件生成对应的表）

(1)、新增迁移脚本
```js
    db:migrate //(它会根据src/database/migrations目录下的相关.js文件中的配置进行创建表及表结构) 注：它只会执行没执行过的表文件（因为有创建记录，或表中有数据）
    // 注：对应运行命令要在package.json中配置哦！！！

    // db:migrate:undo:all 撤消
```

(2)、更新迁移脚本（添加表字段）这是在需求变更时用的
```js
    //新创建一个迁移脚本，用于更新某个表的字段，这里以user表为例，添加一个id_card字段
    'use strict';
        module.exports = {
        up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('user', 'id_card', {
            type: Sequelize.CHAR(32),  
            allowNull: false,
            defaultValue: '身份证未埴写'
            })
        },

        down: (queryInterface, Sequelize) => {
            return queryInterface.removeColumn('user', 'id_card');
        }
    };
```







# 编写数据库种子脚本（就是将数据和表中的字段一一对应），同样也是用sequelize-cli工具

* 1、创建种子脚本文件
```js

    sequelize seed:create --name user
    //注：这里有个问题是生成的种子脚本文件在node_modules/.bin/seeders目录中！！！（我是手动把这里面的文件拷到src/database/seeders目录中去的）
```

//2、编写数据库种子脚本 这里以user表为例 用写死的数据来测试一下
```js
    'use strict';
    const crypto = require('crypto');

    module.exports = {
        up: (queryInterface, Sequelize) => {

            let md5 = crypto.createHash('md5');
            let password = md5.update('123456').digest('hex');
            let date = new Date();

            return queryInterface.bulkInsert('user', ['mupiao', 'admin', 'root'].map((name, index) => {
            return {
                id: index + 1,
                username: name,
                password,
                sex: 0.5 <= Math.random() ? '男' : '女',
                age: Math.random() + 10 * 100,
                job: '',
                phone: '',
                wechat: '',
                address: '',
                photo: '',
                summary: '',
                createdAt: date,
                updatedAt: date
            }
            }));
        },

        down: (queryInterface, Sequelize) => {
            // 清除表中所有数据
            return queryInterface.bulkDelete('user', null, {});
        }
    };

```

 * 3、执行种子脚本（把数据写入数据库）
```js
    sequelize db:seed:all;
```

* 4、撤销/回滚
```js
    sequelize db:seed:undo:all
```






# 数据库链接 

* 1、安装 sequelize-typescript 模块 它是一个ORM
```js
    // 由于本项目是使用ts作为开发语，所以用到sequelize-typescript库
    // https://www.npmjs.com/package/sequelize-typescript
    npm i sequelize-typescript
```

* 2、配置数据库链接信息
```json
    // 一般情况下都是写在一个专门的dbconfig.json文件的
    {
        "host": "localhost",
        "dialect": "mysql",
        "username": "root",
        "password": "",
        "database": "ts_node_koa_mysql",
        "timezone": "+08:00"
    }

    //具体配置项可在node_modules/sequelize/types/lib/sequelize.d.ts中参考
```

* 3、实例化数据库操作对象
```js
    import { Sequelize } from "sequelize-typescript";
    import dbconfig from './config/dbconfig.json'

    //数据库链接
    const db = new Sequelize({
        ...dbconfig,
        models: [__dirname + '/models/**/*']
    });

    /* 什么是ROM模型
     *
     * ORM模型就类似端前经常的DOM，有了DOM对象我们可以在js中通过DOM对象来对文档进行操作，我们对这些DOM对象的操作就映射到对应HTML元素上了。
     * 而在这里的ORM模型也是一个个对象（类），他们的映射关系是：
     * 
     * 类 == 数据库表
     * 类的实例对象 == 数据库表其中的一条数据
     * 
     * 我们对类的操作，就是操作与其关联的表，对类的某个实倒对象操作就是操作这个关联表中的某条数据。
     * 
     * 这样一来，我们就不用操作数据库，而是操作ORM对象（类）就可以啦。
     * 
     * 但是，由于操作数据库最终ORM底层还是会转为标准的SQL，如果一些过于复杂的ORM对性能不是太好，有时候也需要用到原生的SQL。
     * 
    /

    console.log('db对象中的方法：', db);
    // createConnection: [Function],
    // connect: [Function],
    // Connection: [Function: Connection],
    // createPool: [Function],
    // createPoolCluster: [Function],
    // createQuery: [Function: createQuery],
    // Pool: [Function: Pool],
    // createServer: [Function],
    // PoolConnection: [Function],
    // escape: [Function: escape],
    // escapeId: [Function: escapeId],
    // format: [Function: format],
    // raw: [Function: raw],
    // createConnectionPromise: [Getter],
    // createPoolPromise: [Getter],
    // createPoolClusterPromise: [Getter],
    // Types: [Getter],
    // Charsets: [Getter],
    // CharsetToEncoding: [Getter],
    // setMaxParserCache: [Function],
    // clearParserCache: [Function] }
```

# 用户授权中间件 jwt JsonWebToken

* 1、安装 jwt https://www.npmjs.com/package/jsonwebtoken

```js

    npm i jsonwebtoken
    npm i -D @types/jsonwebtoken   //由于是用ts来做的项目，所以还要安装ts版的
```

* 2、在app.ts中 监听所有请求入口，并在koa中挂载(存储)前端调用API时传过来的token(一般情况下token是在登录时后端生成好传给前端的，前端存起来[这就是在前端判断用户是否登录的条件])，然后，在后端就可以根据在koa中挂载(存储)的token来对有请求入口 或 控制器（控制器中所有的接口） 或 单独的某个接口添访问权限。

```js
    // 监听所有路由请求入口
    App.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");

        // 获取前端从header中传过来的参数，
        let token = ctx.headers['mupiao'];
        console.log('token', ctx.headers.mupiao);

        if (token) {
            // 将传过来的参数挂载到ctx下
            ctx.userInfo = jwt.verify(token, Config.jwt.verifyKey) as UserInfo;   // UserInfo是自定义挂载到koa中的一个对象（属性）
        };
        await next();

        // if (404 == ctx.status) {
        //     ctx.body = 404;
        // }
    });


    // 注：由于在koa中的ctx下是没有UserInfo这个对象（属性）的，所以要在koa中去挂载。

    // 新建一个以koa.extend.ts的文件，其内容如下：
    import kao from 'koa'

    /*
    * koa 类型声明扩展
    *
    * 中koa中的ctx下挂载自定义对象{属性}: userInfo
    */

    interface UserInfo {
        id: number;
        name: string;
    };

    declare module 'koa' {

        interface Context {
            userInfo?: UserInfo
        }
    }




    /*
     * 由于在后端要根据在koa中挂载(存储)的token来对所有请求入口 或 控制器（控制器中所有的接口） 或 单独的某个接口添访问权限；
     *
     * 但是有一些接口如 用户登录、注册等API 是不需要访问权限的，如果对有请求入口 或 控制器设置访问权限的话不优雅；
     * 
     * 所以就把判断访问权限这个功能，做成一个中间件，哪个接口API需要添访问权限，就在哪个接口API上面通过@Flow([中间件1, 中间件2, ...]) 来注册中间件;
     */


    // 在src目录中新建一个middleware文件夹，专门用来存放自定义中间件的。
    // 在middleware文件夹中新建mupiao.ts文件(名字可自定义)，用于判断用户是否有权限访问， 内容如下：
    import koa, { Context, Next } from "koa";
    import Boom from "@hapi/boom";

    /**
     * koa自定义中间件 用于判断API请求时是否登录
     */
    export default async function mupiao(ctx: Context, next: Next) {
        if (!ctx.userInfo || 1 < ctx.userInfo.id) {
            console.log(ctx.userInfo)
            throw Boom.unauthorized('无权访问：你还想没登录就想来调用我API，你想多啦！');
        } else {

            await next();

        }
    };

```

* 3、在需要访问权限的接口API上面添加访问权限中间件
```js

    //实例如下：

    // 要有权限才能访问，通过koa-ts-controllers模块中的 @Flow([mupiao, mupiao2, ...]) 来注册自定义中间件 在@Flow([])中还可以同时添加多个中间件

    import { Controller, Get, Params, Query, Body, Post, Header, Flow } from "koa-ts-controllers";

    // 自定义中间件
    import mupiao from "../middleware/mupiao";


    @Flow([mupiao])
    @Get('/auth')
    async Auth(@Query() par: any) {

        return '<h1 style="color: red">没授权(登录)，就不让你访问！';

    };

    // 不用权限
    @Get('/noauth')
    async NoAuth() {

        return '<h1 style="color: green">OK，我可以任意访问！';

    };
```

