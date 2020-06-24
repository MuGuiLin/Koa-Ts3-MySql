import { IsNotEmpty, MaxLength } from "class-validator";

export class PostAddNewsType {

    @IsNotEmpty({
        message: '类型名称不能为空！'
    })
    @MaxLength(20, {
        message: '面板名称长度不能大于20个字符！'
    })
    name: string;
};
