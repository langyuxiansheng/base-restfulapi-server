/**
 * 用户数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false
        },
        createdAt: {
            type: DataTypes.INTEGER(32),
            allowNull: false,
            defaultValue: Date.parse(new Date())
        },
        updatedAt: {
            type: DataTypes.INTEGER(32),
            allowNull: false,
            defaultValue: Date.parse(new Date())
        }
    }, {
        tableName: 'users'
    });
};