import Koa, { Context } from 'koa';
import KoaBody from "koa-body";
import KoaRouter from "koa-router";
import KoaStatic from "koa-static-cache";
import { bootstrapControllers } from "koa-ts-controllers";
import { Sequelize } from "sequelize-typescript";
import jwt from "jsonwebtoken";
import Config from './config'

// 异步处理
(async () => {
    const App = new Koa();
    const Router = new KoaRouter();

    // 静态资源代理
    App.use(KoaStatic({
        dir: Config.storage.dir,        // 静态资源存储路径(以src为根目录)
        prefix: Config.storage.prefix,  // 静态资源访问前缀(名字自定义，前面一定要加/)
        gzip: true,                     // 是否启用压缩
        dynamic: true                   // 是否启用缓存 
    }));

    // 链接数据库
    const db = new Sequelize({
        ...Config.database,
        models: [
            __dirname + '/models/**/*.ts' // 注models目录中不要出现index.ts（如：user/index.ts）不然会找不到！！要（要：user/User.ts）[而且文件名首字母大写，因为目录名和文件名不可相同]才行！！
        ]
    });
    // console.log(db);


    // 监听所有路由入口 所有请求拦截器
    App.use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");

        // 获取前端从header中传过来的参数，
        let token = ctx.headers[Config.jwt.verifyKey];

        if (token) {
            // 将传过来的参数挂载到ctx下，jwt.verify(token, Config.jwt.verifyKey) 校验在login接口中设置的 jwt.sign(userInfo, Config.jwt.verifyKey) 是否相等;
            // ctx.userInfo = jwt.verify(token, Config.jwt.verifyKey) as UserInfo;   // UserInfo是自定义挂载到koa中的一个对象（属性）
            ctx.userInfo = jwt.verify(token, Config.jwt.verifyKey);   // UserInfo是自定义挂载到koa中的一个对象（属性）

        };
        await next();

        // if (404 == ctx.status) {
        //     ctx.body = 404;
        // }
    });


    // 路由、控制器、API管理（注：这里需要异步处理 await）
    await bootstrapControllers(App, {
        router: Router,                                         // 绑定路由模块 
        basePath: '/api',                                       // 访问规则 localhost:8080/api/v2/控制器/接口
        versions: {                                             // 版本号 
            1: '此版本已弃用，不久将被删除！请尽快迁移到v2版本',    // 可以同时开多个版本，这个是虽然能用，但是有警告信息
            2: true,                                            // 正常访问
            dangote: true                                       // 非常适合定制，业务客户端特定的端点版本
        },
        controllers: [                                          // 指定控制器类、接口存放目录，
            __dirname + '/controllers/**/*.ts'                  // 可直接添加到此数组中，也可以添加全局字符串（匹配controllers目录下的所以文件分析类指定到路由对象中）
        ],

        // errorHandler: async (err: any, ctx: any) => {        // 默认错误处理程序(可选)
        //     ctx.status = 500;
        //     ctx.body = { ...err };
        // },

        errorHandler: async (err: any, ctx: Context) => {       // 统一错误处理程序(可选)
            let status = 500;
            let body: any = {
                statusCode: status,
                error: 'Internal Server Error',
                message: '后台数据库未启动 或 控制器、Api接口内部发生错误！',
                errorDetails: '内部服务器错误！'
            };
            if (err && err.output) {                            // 如果控制器类、接口中有错抛出时的返回处理
                let { statusCode, payload } = err.output;
                status = statusCode || 200;                     // HTTP状态代码(通常4 xx或5 xx)
                body = payload;
                if (err.data) {
                    body.errorDetails = err.data;               // 如果有错误详情时一并返回
                }
            };
            ctx.status = status;
            ctx.body = body;
        }
    });


    // Router.all('*', async (ctx, next) => {
    //     ctx.set("Access-Control-Allow-Origin", "*");
    //     await next();
    // });


    // 注册接收post参数、上传二进制文件等模块
    App.use(KoaBody({
        multipart: true,                    // 开启上传二进制文件处理
        formidable: {
            maxFields: 100,                 // 上传最大文件个数（整数）
            maxFieldsSize: 10,              // 上传最大文件大小（整数） 1MB = (1 * 1024 * 1024)
            uploadDir: Config.storage.dir,  // 文件上传目录,默认os.tmpDir(),
            keepExtensions: true,           // 开启文件写入uploadDir包括原始文件的扩展名, 默认false
            hash: 'md5',                    // 如果你想计算校验和传入的文件, 设置这个要么'sha1'或'md5'、默认false
            multiples: true,                // 开启多文件上传
            onFileBegin: (name?: any, file?: any) => {
                // console.log(name, file);
            }
        }
    }));


    // 注册路由
    App.use(Router.routes());


    // 监听服务
    App.listen(Config.server.prot, Config.server.host, () => {
        console.log('服务启动成功：监听' + Config.server.host + ':' + Config.server.prot);
    });
})();