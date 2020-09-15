import { Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, UpdatedAt, CreatedAt, ForeignKey } from "sequelize-typescript";
import { News } from "./news/News";


@Table({
    tableName: 'Comment'
})
// 继承Model类，通过<Comment>泛型传值， 这主要是和数据库中的Comment表做对应关系映射。
export class Comment extends Model<Comment> {

    @PrimaryKey         // 主键
    @AutoIncrement      // 值自增
    @Column({           // 列属性
        type: DataType.INTEGER.UNSIGNED
    })
    id: number;

    @ForeignKey(() => News) // 外键News表
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false // 不能为空
    })
    newsId: number;

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    cover: string;

    @AllowNull(true) 
    @Column({
        type: DataType.CHAR(60)
    })
    name: string;

    @AllowNull(false) // 评论内容不能为空
    @Column({
        type: DataType.TEXT
    })
    content: string;

    @AllowNull(true)
    @Column({
        type: DataType.INTEGER,    //整数类型
        defaultValue: 0            //默认值
    })
    score: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};