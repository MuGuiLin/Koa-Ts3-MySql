import { Length, IsNotEmpty } from "class-validator";

import { IsSameValue } from '../base/IsSameValue'

class UserBody {
    @Length(1, 50, {
        message: '对不起：用户名长度必须 在1到50之间！'
    })
    username: string;

    @IsNotEmpty({
        message: '对不起：密码不能为空！'
    })
    password: string;
};

export class LoginBody extends UserBody {

    // 由于继承了UserBody 这里就不用写啦！
    // @Length(1, 50, {
    //     message: '对不起：用户名长度必须 在1到50之间！'
    // })
    // username: string;

    // @IsNotEmpty({
    //     message: '对不起：密码不能为空！'
    // })
    // password: string;

};

export class RegistBody extends UserBody {

    // 由于继承了UserBody 这里就不用写啦！
    // @Length(1, 50, {
    //     message: '对不起：用户名长度必须 在1到50之间！'
    // })
    // username: string;

    // @IsNotEmpty({
    //     message: '对不起：密码不能为空！'
    // })
    // password: string;

    /**
     * IsSameValue装饰器 是自己写的一个用于验证两个值是否相等（因为：class-validator模块没提供这种装饰器）
     * 
     *  @IsSameValue('par1', {par2}) // 参数1是一个字符串就是要比对的那个参数，参数2是一个对象就是有提示信息等。
     */
    @IsSameValue('password', {
        message: '对不起：两次输入的密码不一致！'
    })
    rePassword: string;
};