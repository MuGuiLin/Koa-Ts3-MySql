import { Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, UpdatedAt, CreatedAt, ForeignKey } from "sequelize-typescript";
import { User } from "./user/User";
import { News } from "./News";

@Table({
    tableName: 'Review'
})
// 继承Model类，通过<Review>泛型传值， 这主要是和数据库中的Review表做对应关系映射。
export class Review extends Model<Review> {

    @PrimaryKey         // 主键
    @AutoIncrement      // 值自增
    @Column({           // 列属性
        type: DataType.INTEGER.UNSIGNED
    })
    id: number;

    @ForeignKey(() => User) // 外键表
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    userId: string;

    @ForeignKey(() => News) // 外键表
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    newsId: string;

    @Column({
        type: DataType.STRING(11),
        allowNull: true
    })
    phone: string;

    @AllowNull(false)   // 不能为空
    @Unique(true)       // 值唯一（不能重复）
    @Column({
        type: DataType.STRING(120)
    })
    name: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    content: string;

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