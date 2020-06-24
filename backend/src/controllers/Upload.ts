import { Context } from "koa";
import { Controller, Post, Ctx, Body } from "koa-ts-controllers";
import Boom from "@hapi/boom";
import Config from "../config";

/**
 * 文件上传API
 */
@Controller('/upload')
export class UploadController {

    /**
     * 公共返回方法
     * @param ctx 
     * @param body 
     */
    public async Base(par: any, ctx: any, body: any) {

        if (!ctx.request.files || !ctx.request.files[par]) {
            throw Boom.badData('没有上传文件！');
        }

        const { path, name, size, type } = await ctx.request.files[par];
        
        ctx.status = 200;
        return {
            path: Config.storage.prefix + '/' + path.replace(/\\/g, '/').split('/').pop() as string,
            name, type, size
        }
    };

    /**
     * 附件上传
     */
    @Post('/file')
    public async Annex(@Ctx() ctx: Context, @Body() body: any) {

        if (!ctx.request.files || !ctx.request.files['muFile']) {
            throw Boom.badData('没有上传文件，【请将form-data传输方式的name属性设为muFile】！');
        }

        const { path, name, size, type } = await ctx.request.files['muFile'];

        ctx.status = 200;
        return {
            path: Config.storage.prefix + '/' + path.replace(/\\/g, '/').split('/').pop() as string,
            name, type, size
        }

    };

    /**
     * 图片上传
     */
    @Post('/image')
    public async Image(@Ctx() ctx: Context, @Body() body: any) {

        return await this.Base('image', ctx, body);
    };

    /**
     * 音频上传
     */
    @Post('/audio')
    public async Audio(@Ctx() ctx: Context, @Body() body: any) {

        return await this.Base('audio', ctx, body);
    };

    /**
     * 视频上传
     */
    @Post('/video')
    public async Video(@Ctx() ctx: Context, @Body() body: any) {

        return await this.Base('video', ctx, body);
    };

};
