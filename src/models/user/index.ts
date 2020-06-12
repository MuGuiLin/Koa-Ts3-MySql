import { Model, Table, PrimaryKey, AutoIncrement, Column, AllowNull, Unique, DataType, UpdatedAt, CreatedAt } from "sequelize-typescript";

@Table({
    tableName: 'User'
})
export class User extends Model<User> {

    /**
     * user表 关系映射（和database/目录下的文件中user.js中的配置是对应的）
     * @AllowNull(allowNull?: boolean)	 (default is true)
     * @AutoIncrement	sets attribute.autoIncrement=true
     * @Unique	sets attribute.unique=true
     * @Default(value: any)	sets attribute.defaultValue to specified value
     * @PrimaryKey	sets attribute.primaryKey=true
     * @Comment(value: string)	sets attribute.comment to specified string
     * 
     * Column API
     * @Column	tries to infer dataType from js type
     * @Column(dataType: DateType)	sets dataType explicitly
     * @Column(options: AttributeOptions)	sets attribute options
     * 
     * Type inference
     * string	STRING
     * boolean	BOOLEAN
     * number	INTEGER
     * Date	    DATE
     * Buffer	BLOB
     */

    @PrimaryKey         // 主键
    @AutoIncrement      // 值自增
    @Column({           // 列属性
        type: DataType.INTEGER.UNSIGNED}   
    ) 
    id: number;

    
    @AllowNull(false)   // 不能为空
    @Unique(true)       // 值唯一（不能重复）
    @Column({
        type: DataType.STRING(32)
    })
    username: string;


    @AllowNull(false)
    @Column
    password: string;


    @Column({
        type: DataType.CHAR(8), //字符类型
        defaultValue: '男'
    })
    sex: string;


    @Column({
        type: DataType.CHAR(3), //字符类型
        defaultValue: '0'
    })
    age: string;

    
    @AllowNull(true)
    @Column({
        type: DataType.STRING(32)
    })
    job:string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(11)
    })
    phone: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING(32)
    })
    wechat: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    address: string;


    @AllowNull(true)
    @Column({
        type: DataType.STRING
    })
    photo: string;


    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    summary: Text;


    @CreatedAt
    createdAt: Date;


    @UpdatedAt
    updatedAt: Date;
};