import Koa, { Context } from "koa";

import Boom from "@hapi/boom";

import { Controller, Flow, Get, Post, Put, Delete, Ctx, Params, Body } from "koa-ts-controllers";

import { NewsType as NewsTypeModel } from "../models/NewsType";

import authen from "../middleware/Authentication";

import { PostAddNewsType } from "../validators/NewsType";


@Flow([authen])  // 该控制器下面的所有API都需要鉴权
@Controller('/newsType')
export class NewsTypeController {

    // 抽离API共用部分
    public async AccessAuthority(ctx: Context, id: number): Promise<NewsTypeModel> {

        let newsType = await NewsTypeModel.findByPk(id);  // 根据主键查找 对应的记录

        if (!newsType) {
            throw Boom.notFound('这条新闻不存在！');
        };

        return newsType;
    };

    /**
     * 添加新闻类型
     */
    @Post('add')
    public async addNewsType(@Ctx() ctx: Context, @Body() body: PostAddNewsType) {
        let { name } = body;

        let newsType = new NewsTypeModel();
        newsType.name = name;

        await newsType.save();
        ctx.status = 200;
        return newsType;
    };

    /**
     * 获取所有新闻类型
     */
    @Get('')
    public async getAllNewsType(@Ctx() ctx: Context) {

        let newsType = await NewsTypeModel.findAll(); // 查询当前用户下所有的新闻
        ctx.status = 200;
        return newsType;
    };

    /**
     * 更新指定新闻类型
     */
    @Put('/edit/:id(\\d+)')
    public async upNewsType(@Ctx() ctx: Context, @Params('id') id: number, @Body() body: any) {

        let { name } = body;

        let newsType = await this.AccessAuthority(ctx, id);

        newsType.name = name || newsType.name;
        await newsType.save();

        ctx.status = 204; // 只反回更新状态，不返回主体

    };

    /**
     * 删除指定新闻类型
     */
    @Delete('/del/:id(\\d+)')
    public async delNewsType(@Ctx() ctx: Context, @Params('id') id: number) {

        let newsType = await this.AccessAuthority(ctx, id);

        await newsType.destroy();  // 删除指定记录

        ctx.status = 204; // 只反回更新状态，不返回主体
    };
};