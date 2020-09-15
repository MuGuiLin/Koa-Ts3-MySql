import { Context } from "koa";
import { Controller, Flow, Get, Post, Put, Delete, Ctx, Params, Body, Query } from "koa-ts-controllers";
import { PostAddCommentBody, GetOneCommentQuery, GetAllCommentQuery } from "../validators/Comment";

import { Comment as CommentModel } from "../models/Comment";


/**
 * 评价控制器
 */
@Controller('/comment')
export class CommentController {

    /**
     * 添加评论
     */
    @Post('/add')
    public async addComment(@Ctx() ctx: Context, @Body() body: PostAddCommentBody) {
        const { newsId, score, name, content } = body;
        console.log('body', body);

        let cModel = new CommentModel();
        cModel.newsId = newsId;
        cModel.cover = 'default.png';
        cModel.score = score
        cModel.name = name;
        cModel.content = content;
        await cModel.save();

        ctx.status = 200;
        return {
            id: cModel.id,
            name: cModel.name,
            createAt: cModel.createdAt,
        };
    };

    /**
     * 获取单个评论
     */
    @Get('/getOne')
    public async getOneComment(@Ctx() ctx: Context, @Query() query: GetOneCommentQuery) {

    };

    /**
     * 获取所有评论
     */
    @Get('/getAll')
    public async getAllComment(@Ctx() ctx: Context, @Query() queyr: GetAllCommentQuery) {

    };
};