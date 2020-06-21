import { Context } from "koa";

// ORM模块 
import { Controller, Header, Ctx, Get, Params, Query, Post, Body, Flow } from "koa-ts-controllers";

// 错误处理模块
import Boom from "@hapi/boom";

// Node加密模块
import Crypto from "crypto";

// 用户信息加密 token
import jwt from "jsonwebtoken";

// 配置信息
import Config from "../../config";

// 自定义API参数验证模块
import { LoginBody, RegistBody } from "../../validators/user/User";

// 用户表信息映射模型
import { User as UserModel } from "../../models/user/User";

import authen from "../../middleware/Authentication";

// 用户API控制器
@Controller('/user')
export class UserController {

    /**
     * 用户登录
     * @param username
     * @param password
     */
    @Post('/login')
    public async Login(@Ctx() ctx: Context, @Body() body: LoginBody) {

        // console.log(body);

        let { username, password } = body;

        const md5 = Crypto.createHash('md5');
        const user = await UserModel.findOne({
            where: { username }
        });

        // console.log(user); // 查询到的数据

        if (!user) {
            throw Boom.notFound('登录失败：', '该用户不存在！');
        }

        password = md5.update(password).digest('hex');

        if (password != user.password) {
            throw Boom.forbidden('登录失败：', '当前密码有误！');
        }

        // ctx.status = 201;
        // return {
        //     id: user.id,
        //     username: user.username
        // };

        // 用jwt 生成token 从headers中返回前端(用于验证是否登录)，所有不能像上面直接返回！！
        let userInfo = {
            id: user.id,
            username: user.username
        };

        let token = jwt.sign(userInfo, Config.jwt.verifyKey);   // Config.jwt.verifyKey === mupiao-token 在这里生效

        ctx.set('token', token);
        ctx.status = 201;

        return userInfo;
    };



    /**
     * 用户注册
     * @param username
     * @param password
     * @param rePassword
     * }
     */
    @Post('/regist')
    public async Regist(@Ctx() ctx: Context, @Body() body: RegistBody) {
        // console.log(body);
        
        let { username, password } = body;

        const md5 = Crypto.createHash('md5');

        // 先根据传过来的用户名，查询数据库是否存在该用户名
        const user = await UserModel.findOne({
            where: { username }
        });

        if (user) {
            throw Boom.conflict('注册失败：', '这个用户名已经被注册过啦！');
        }

        // 将数据设置到UserModel表对象中
        let newUser = new UserModel();
        newUser.username = username;
        newUser.password = md5.update(password).digest('hex');

        // 将UserModel表对象中的数据同步到数据库
        await newUser.save();

        ctx.status = 201;
        return {
            id: newUser.id,
            name: newUser.username,
            createAt: newUser.createdAt,
        };

        // https://sequelize.org/v5/class/lib/model.js~Model.html
        // Model.create();
        // Model.update(); 
        // instance.save(); 
        // instance.update();
    };

    @Flow([authen]) // 用户需要登录才能访问该API (在请求时在请求头Request Headers中把token带过来(可以在axios拦截器中给所有请求的加上))
    @Get('/info')
    async getUserInfo(@Ctx() ctx: Context, @Query() par: any) {
        // console.log(par);

        const user = await UserModel.findOne({ where: { id: par.id } });

        // console.log(user);

        ctx.status = 201;
        return {
            id: user.id,
            data: user
        }
    };

};