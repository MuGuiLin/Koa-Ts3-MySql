import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";
import { any } from "sequelize/types/lib/operators";

/**
 * 验证两个值是否相等
 * @param property 要比对验证的那个值的名称
 * @param options 
 * 
 * IsSameValue 这个装饰器名是自定义的！
 */
export function IsSameValue(property: string, options?: ValidationOptions) {

    // 定义验证装饰器
    /**
     * @param target  装饰目标
     *  @param propertyName  装饰属性名称
     */
    return function (target: Object, propertyName: string) {

        // 用class-validator模块提供的registerDecorator方法来注册自定义验证装饰器
        registerDecorator({
            name: 'IsSameValue',            // 自定装饰器名称
            target: target.constructor,     // 要求传入构造函数
            propertyName,                   //
            constraints: [property],        // 要比对验证的那个值的名称，由于可能有多个，所有用数据传
            options,

            // 验证器，要求包涵一个方法
            validator: {

                validate(thisValue: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {

                    // validationArguments 对象中包涵了 在调用@IsSameValue这个装饰器中上面的那个验证规则类中的所有参数

                    // console.log('调用@IsSameValue这个装饰器中上面的那个验证规则类：', validationArguments);
                    // console.log('调用@IsSameValue这个装饰器中上面的那个验证规则类的对象：', validationArguments.object);

                    // 根据要比对验证的那个值的名称，获取其值
                    // validationArguments.object 的类型验证会报错，要像下面一样处理一下。
                    const relatedValue = validationArguments && (validationArguments.object as any)[property]

                    // thisValue    是当前装饰属自己的值
                    // relatedValue 是要比对验证的那个值

                    return thisValue === relatedValue;
                }
            }
        });

    };
};