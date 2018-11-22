/**
 * 平台管理员基础表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('admin_base', {

        //管理员ID
        adminId: {
            type: DataTypes.BIGINT(32),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        //管理员名称
        adminName: {
            type: DataTypes.STRING(64),
            allowNull: false
        },

        //管理员账号
        account: {
            type: DataTypes.STRING(64),
            allowNull: false
        },

        //管理员密码
        password: {
            type: DataTypes.STRING(64),
            allowNull: false
        },

        //账号状态是否禁用 true禁用 false没有禁用
        status: {
            type: DataTypes.INTEGER(2),
            allowNull: true
        },

        //是否超级管理员 true是 false普通管理员
        isAdmin: {
            type: DataTypes.INTEGER(),
            allowNull: true
        },

        //头像路径
        avatar: {
            type: DataTypes.STRING(64),
            allowNull: true
        },

        //角色ID
        roleId: {
            type: DataTypes.INTEGER(32),
            allowNull: true
        },

        //是否删除 true是 false否
        isDelete: {
            type: DataTypes.INTEGER(2),
            allowNull: true
        },

        //创建时间
        createdTime: {
            type: DataTypes.INTEGER(16),
            allowNull: false,
            defaultValue: Date.parse(new Date()) / 1000
        },

        //修改时间
        updatedTime: {
            type: DataTypes.INTEGER(16),
            allowNull: false,
            defaultValue: Date.parse(new Date()) / 1000
        }
    }, {
        tableName: 'admin_base',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};