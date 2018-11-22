import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
/* eslint-disable */
const { webDBUtil, Sequelize } = sequelize;
const AdminBaseModel = webDBUtil.import('../../models/AdminPlatform/AdminBaseModel');
/* eslint-endble */

/**
 * 业务示例代码
 */
module.exports = class DemoService {

    /**
     * 获取列表
     * @param {*} param0
     */
    async getListDemo({ page, limit }) {
        try {
            let queryData = {
                where: { IsDelete: null },
                include: [{
                    model: RolesBaseModel,
                    attributes: []
                }],
                attributes: ['AdminID', 'AdminName', 'Account', 'Status', 'IsAdmin', 'Avatar', 'RoleID', Sequelize.col('roles_base.RoleName')],
                raw: true
            };
            //分页
            if (page && limit) {
                queryData.offset = Number((page - 1) * limit); //开始的数据索引
                queryData.limit = Number(limit); //每页限制返回的数据条数
            };
            //建立关联
            AdminBaseModel.belongsTo(RolesBaseModel, { foreignKey: 'RoleID' });
            const { rows, count } = await AdminBaseModel.findAndCount(queryData);
            return result.pageData(null, null, rows, count, page, limit);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 添加平台管理员
     * @param {*} user
     */
    async addDemo({ Account, Password, AdminName }) {
        try {
            if (!Account && !Password && !AdminName) return result.paramsLack();
            const hasAdmin = await AdminBaseModel.findOne({
                where: { Account, IsDelete: null }
            });
            if (hasAdmin) return result.failed(`此用户已存在!`);
            await AdminBaseModel.create({
                Account,
                Password: Utils.GetMd5(Password),
                AdminName
            });
            return result.success();
        } catch (error) {
            console.log(error)
            return result.failed();
        }
    }

    /**
     * 注销平台管理员
     * @param {*} user
     */
    async delDemo(AdminID) {
        try {
            if (!AdminID) return result.paramsLack();
            await AdminBaseModel.update({
                IsDelete: true
            }, {
                where: { AdminID },
                fields: ['IsDelete']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`注销失败`);
        }
    }

    /**
     * 修改平台管理员账号状态
     * @param {*} user
     */
    async updateDemo({ AdminID, Status }) {
        try {
            if (Status === undefined && !AdminID) return result.paramsLack();
            await AdminBaseModel.update({
                Status
            }, {
                where: { AdminID },
                fields: ['Status']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`修改失败`);
        }
    }
};