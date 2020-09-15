import { IsNumber, IsNotEmpty, MaxLength, ValidateIf,  } from "class-validator";

export class PostAddCommentBody {
    @IsNumber({}, {
        message: 'newsId必须为数字！'
    })
    newsId: number; 
    
    @IsNumber({}, {
        message: 'score必须为数字！'
    })
    score: number;

    @IsNotEmpty({
        message: 'name不能为空！'
    })
    name: string;

    @MaxLength(2000, {
        message: '评论内容不能大于2000个字符！'
    })
    content: string;
};

export class GetOneCommentQuery {
    @IsNumber({}, {
        message: 'newsId必须为数字！'
    })
    newsId: number;
};

export class GetAllCommentQuery {
    @IsNumber({}, {
        message: 'newsId必须为数字！'
    })
    newsId: number;

    @ValidateIf( o => o.page !== undefined)
    @IsNumber({}, {
        message: '分页的页码必须是数字！'
    })
    page: number;

};