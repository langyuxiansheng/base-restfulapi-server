/**
 * 角色基础表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('roles_base', {

        //角色ID
        roleId: {
            type: DataTypes.BIGINT(32),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        //角色名称
        roleName: {
            type: DataTypes.STRING(32),
            allowNull: false
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
        tableName: 'roles_base',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};