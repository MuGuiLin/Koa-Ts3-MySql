import { Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, UpdatedAt, CreatedAt, ForeignKey } from "sequelize-typescript";
import { User } from "./user/User";
import { NewsType } from "./NewsType";
import { Review } from "./Review";

@Table({
    tableName: 'News'
})
// 继承Model类，通过<News>泛型传值， 这主要是和数据库中的News表做对应关系映射。
export class News extends Model<News> {

    @PrimaryKey         // 主键
    @AutoIncrement      // 值自增
    @Column({           // 列属性
        type: DataType.INTEGER.UNSIGNED
    })
    id: number;

    @ForeignKey(() => User) // 外键表
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false // 不能为空
    })
    userId: number;

    @ForeignKey(() => NewsType) // 外键表
    @Column({
        type: DataType.INTEGER,
        allowNull: false // 不能为空
    })
    typeId: string;

    @ForeignKey(() => Review)
    @AllowNull(false)   // 不能为空
    @Column({
        type: DataType.INTEGER
    })
    reviewId: string;

    @Unique(true)       // 值唯一（不能重复）
    @Column({
        type: DataType.STRING,
        allowNull: false // 不能为空
    })
    title: string;

    @AllowNull(false)   // 不能为空
    @Column({
        type: DataType.CHAR(60)
    })
    author: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    content: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    cover: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    summary: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    keyword: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    link: string;

    @AllowNull(true)
    @Column({
        type: DataType.INTEGER,    //整数类型
        defaultValue: 0            //默认值
    })
    readSum: string;

    @AllowNull(true)
    @Column({
        type: DataType.INTEGER,    //整数类型
        defaultValue: 0            //默认值
    })
    likeSum: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};