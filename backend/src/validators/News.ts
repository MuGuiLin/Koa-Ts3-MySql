import { IsNotEmpty, MaxLength, ValidateIf } from "class-validator";

export class PostAddNews {

    @IsNotEmpty({
        message: '面板名称不能为空！'
    })
    @MaxLength(120, {
        message: '面板名称长度不能大于120个字符！'
    })
    title: string;
};

export class PutEditNews {

    @ValidateIf((o) => {
        return o.title !== undefined
    })
    @IsNotEmpty({
        message: '面板名称不能为空！'
    })
    @MaxLength(120, {
        message: '面板名称长度不能大于120个字符！'
    })
    title: string;
};