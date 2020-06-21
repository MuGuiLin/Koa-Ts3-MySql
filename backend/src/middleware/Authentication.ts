import koa, { Context, Next } from "koa";
import Boom from "@hapi/boom";

/**
 * koa自定义中间件 用户鉴权 用于判断API请求时是否登录
 */
export default async function userAuthentication(ctx: Context, next: Next) {

    if (!ctx.userInfo) {
        
        throw Boom.unauthorized('无权访问：你还想没登录就想来调用我API，你想多啦！');
    } else {

        await next();

    }
};