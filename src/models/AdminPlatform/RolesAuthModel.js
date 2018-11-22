/**
 * 角色权限过渡中间表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('roles_auth', {

        //过度中间表ID
        roleId: {
            type: DataTypes.BIGINT(32),
            allowNull: false,
            primaryKey: true
        },

        //权限
        permissionId: {
            type: DataTypes.BIGINT(32),
            allowNull: false,
            primaryKey: true
        },

        //创建时间
        createdTime: {
            type: DataTypes.INTEGER(16),
            allowNull: false,
            defaultValue: Date.parse(new Date()) / 1000
        }
    }, {
        tableName: 'roles_auth',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};