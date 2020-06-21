import Koa, { Context } from "koa";

import Boom from "@hapi/boom";

import { Controller, Flow, Get, Post, Put, Delete, Ctx, Params, Body } from "koa-ts-controllers";

import { News as NewsModel } from "../models/News";

import authen from "../middleware/Authentication";

import { PostAddNews, PutEditNews } from "../validators/News";

@Flow([authen])  // 该控制器下面的所有API都需要鉴权
@Controller('/news')
export class NewsController {

    /**
     * 添加新新闻
     */
    @Post('add')
    public async addNews(@Ctx() ctx: Context, @Body() body: PostAddNews) {

    };

    /**
     * 获取当前登录用户指定新闻详情
     */
    @Get('/get/:id(\\d+)')
    public async getNews(@Ctx() ctx: Context, @Params('id') id: number) {

    };

    /**
     * 获取当前登录用户所有新闻
     */
    @Get('/getAll')
    public async getAllNews(@Ctx() ctx: Context) {

    };

    /**
     * 更新当前登录用户指定新闻
     */
    @Put('/edit/:id(\\d+)')
    public async upNews(@Ctx() ctx: Context, @Params('id') id: number, @Body() body: PutEditNews) {

    };

    /**
     * 删除当前登录用户指定新闻
     */
    @Delete('/del/:id(\\d+)')
    public async delNews(@Ctx() ctx: Context, @Params('id') id: number) {

    };
};