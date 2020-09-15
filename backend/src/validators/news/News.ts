import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator";


class PublicAttr {
    public typeId: number;
    public author: string;
    public content: string;
    public cover: string;
    public summary: string;
    public keyword: string;
    public link: string;
}


export class PostAddNews extends PublicAttr {

    @IsNotEmpty({
        message: '用户id不能为空！'
    })
    userId: number

    @IsNotEmpty({
        message: '新闻类型id不能为空！'
    })
    typeId: number;

    @IsNotEmpty({
        message: '新闻名称不能为空！'
    })
    @MaxLength(120, {
        message: '新闻名称长度不能大于120个字符！'
    })
    title: string;

};

export class PutEditNews extends PublicAttr {

    @ValidateIf((o) => {
        return o.title !== undefined
    })
    @IsNotEmpty({
        message: '新闻名称不能为空！'
    })
    @MaxLength(120, {
        message: '新闻名称长度不能大于120个字符！'
    })
    title: string;
};