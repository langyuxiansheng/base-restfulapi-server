/**
 *  示例基础表数据模型
 * @param {*} sequelize
 * @param {*} DataTypes
 * 此模型仅限关系型数据库使用
 */
export default (sequelize, DataTypes) => {
    return sequelize.define('demo_base', {
        //示例ID
        demoID: {
            type: DataTypes.BIGINT(32),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        //示例名称
        demoName: {
            type: DataTypes.STRING(64),
            allowNull: false
        },

        //备注
        remarks: {
            type: DataTypes.STRING(64),
            allowNull: false
        },

        //状态是否禁用 true禁用 false没有禁用
        status: {
            type: DataTypes.INTEGER(2),
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
        tableName: 'demo_base',
        timestamps: false //是否需要增加createdAt、updatedAt、deletedAt字段
    });
};