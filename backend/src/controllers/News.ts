import Koa, { Context } from "koa";

import Boom from "@hapi/boom";

import { Controller, Flow, Get, Post, Put, Delete, Ctx, Params, Body } from "koa-ts-controllers";

import { News as NewsModel } from "../models/News";

import authen from "../middleware/Authentication";

import { PostAddNews, PutEditNews } from "../validators/News";


@Flow([authen])  // 该控制器下面的所有API都需要鉴权
@Controller('/news')
export class NewsController {

    // 抽离API共用部分
    public async AccessAuthority(ctx: Context, id: number): Promise<NewsModel> {

        let news = await NewsModel.findByPk(id);  // 根据主键查找 对应的记录

        if (!news) {
            throw Boom.notFound('这条新闻不存在！');
        };

        if (news.userId !== ctx.userInfo.id) {
            throw Boom.forbidden('这条新闻不属性于你！');
        };

        return news;
    };

    /**
     * 添加新新闻
     */
    @Post('/add')
    public async addNews(@Ctx() ctx: Context, @Body() body: PostAddNews) {

        let { typeId, title, author, content, cover, summary, keyword, link } = body;
        let news = new NewsModel();
        news.userId = ctx.userInfo.id;
        news.typeId = typeId;
        news.title = title;
        news.author = author;
        news.content = content;
        news.cover = cover;
        news.summary = summary;
        news.keyword = keyword;
        news.link = link;

        await news.save();
        ctx.status = 200; // 只反回更新状态，不返回主体
    };

    /**
     * 获取当前登录用户指定新闻详情
     */
    @Get('/:id(\\d+)')
    public async getNews(@Ctx() ctx: Context, @Params('id') id: number) {
        let news = await NewsModel.findByPk(id);  // 根据主键查找

        if (!news) {
            throw Boom.notFound('这条新闻不存在！');
        };

        if (news.userId !== ctx.userInfo.id) {
            throw Boom.forbidden('这条新闻不属性于你！');
        };

        // let news = await this.AccessAuthority(ctx, id);

        ctx.status = 200;
        return news;
    };

    /**
     * 获取当前登录用户所有新闻
     */
    @Get('')
    public async getAllNews(@Ctx() ctx: Context) {

        let where = {
            userId: ctx.userInfo.id
        };

        let news = await NewsModel.findAll({ where }); // 查询当前用户下所有的新闻

        ctx.status = 200;
        return news;
    };

    /**
     * 更新当前登录用户指定新闻
     */
    @Put('/edit/:id(\\d+)')
    public async upNews(@Ctx() ctx: Context, @Params('id') id: number, @Body() body: PutEditNews) {

        let { typeId, title, author, content, cover, summary, keyword, link } = body;

        let news = await this.AccessAuthority(ctx, id);

        news.title = title || news.title;
        news.typeId = typeId || news.typeId;
        news.title = title || news.title;
        news.author = author || news.author;
        news.content = content || news.content;
        news.cover = cover || news.cover;
        news.summary = summary || news.summary;
        news.keyword = keyword || news.keyword;
        news.link = link || news.link;
        await news.save();

        ctx.status = 204; // 只反回更新状态，不返回主体

    };

    /**
     * 删除当前登录用户指定新闻
     */
    @Delete('/del/:id(\\d+)')
    public async delNews(@Ctx() ctx: Context, @Params('id') id: number) {

        let news = await this.AccessAuthority(ctx, id);

        await news.destroy();  // 删除指定记录

        ctx.status = 204; // 只反回更新状态，不返回主体

    };
};