import { Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, UpdatedAt, CreatedAt, ForeignKey } from "sequelize-typescript";

@Table({
    tableName: 'NewsType'
})
// 继承Model类，通过<NewsType>泛型传值， 这主要是和数据库中的NewsType表做对应关系映射。
export class NewsType extends Model<NewsType> {

    @PrimaryKey         // 主键
    @AutoIncrement      // 值自增
    @Column({           // 列属性
        type: DataType.INTEGER.UNSIGNED
    })
    id: number;

    @Column({
        type: DataType.CHAR(60),
        allowNull: true
    })
    type: string;

    @AllowNull(false)   // 不能为空
    @Unique(true)       // 值唯一（不能重复）
    @Column({
        type: DataType.CHAR(60)
    })
    name: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};