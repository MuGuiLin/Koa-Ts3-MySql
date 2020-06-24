import kao from 'koa'

/*
 * koa 类型声明扩展
 *
 * 中koa中的ctx下挂载自定义对象{属性}: userInfo
 */

// interface UserInfo {
//     id: number;
//     name: string;
// };

declare module 'koa' {

    interface Context {
        // userInfo?: UserInfo
        userInfo: UserInfo
    }
}
