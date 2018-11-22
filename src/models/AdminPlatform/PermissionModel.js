/**
 * 角色权限表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('permission', {

        //权限ID
        permissionId: {
            type: DataTypes.BIGINT(32),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        //权限名称
        permissionName: {
            type: DataTypes.STRING(64),
            allowNull: false
        },

        //权限类型  1 菜单 2 按钮
        permissionType: {
            type: DataTypes.INTEGER(2),
            allowNull: false,
            defaultValue: 1
        },

        //权限值(vue组件)
        permissionValue: {
            type: DataTypes.STRING(),
            allowNull: true
        },

        //权限父级ID
        parentId: {
            type: DataTypes.BIGINT(32),
            allowNull: true
        },

        //菜单路径
        path: {
            type: DataTypes.STRING(),
            allowNull: true
        },

        //组件名称
        component: {
            type: DataTypes.STRING(),
            allowNull: true
        },

        //元值
        meta: {
            type: DataTypes.STRING(),
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
        tableName: 'permission',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};