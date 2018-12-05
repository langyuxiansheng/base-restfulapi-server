import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
/* eslint-disable */
const { webDBUtil, Sequelize } = sequelize;
const AdminBaseModel = webDBUtil.import('../../models/AdminPlatform/AdminBaseModel');
const RolesBaseModel = webDBUtil.import('../../models/AdminPlatform/RolesBaseModel');
const RolesAuthModel = webDBUtil.import('../../models/AdminPlatform/RolesAuthModel');
/* eslint-endble */

/**
 * 平台管理员类
 * 本页面处理业务逻辑 接收参数与返回处理结果
 */
module.exports = class PlatformService {

    /**
     * 获取平台管理员列表
     * @param {*} param0
     */
    async getPlatformAdminList({ page, limit }) {
        try {
            let queryData = {
                where: { isDelete: null },
                include: [{
                    model: RolesBaseModel,
                    attributes: []
                }],
                attributes: ['adminId', 'adminName', 'account', 'status', 'isAdmin', 'avatar', 'roleId', Sequelize.col('roles_base.roleName')],
                raw: true
            };
            //分页
            if (page && limit) {
                queryData.offset = Number((page - 1) * limit); //开始的数据索引
                queryData.limit = Number(limit); //每页限制返回的数据条数
            };
            //建立关联
            AdminBaseModel.belongsTo(RolesBaseModel, { foreignKey: 'roleId' });
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
    async addPlatformAdmin({ account, password, adminName }) {
        try {
            if (!account && !password && !adminName) return result.paramsLack();
            const hasAdmin = await AdminBaseModel.findOne({
                where: { account, isDelete: null }
            });
            if (hasAdmin) return result.failed(`此用户已存在!`);
            AdminBaseModel.create({ account, adminName, password: Utils.getMd5(password) });
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
    async delPlatformAdmin(adminId) {
        try {
            if (!adminId) return result.paramsLack();
            AdminBaseModel.update({
                isDelete: true
            }, {
                where: { adminId },
                fields: ['isDelete']
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
    async updatePlatformAdmin({ adminId, status }) {
        try {
            if (status === undefined || !adminId) return result.paramsLack();
            AdminBaseModel.update({
                status
            }, {
                where: { adminId },
                fields: ['status']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`修改失败`);
        }
    }

    /**
     * 设置平台管理员角色
     * @param {roleId} 角色ID
     */
    async setPlatformAdminRole({ roleId, adminId }) {
        try {
            if (!adminId) return result.paramsLack();
            AdminBaseModel.update({
                roleId: roleId
            }, {
                where: { adminId },
                fields: ['roleId']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`设置平台管理员角色失败`);
        }
    }

    /**
     * 添加角色
     * @param {*} user
     */
    async addPlatformRole({ roleName }) {
        try {
            if (!roleName) return result.paramsLack();
            const hasRole = await RolesBaseModel.findOne({
                where: { roleName, isDelete: null }
            });
            if (hasRole) return result.failed(`此角色已存在!`);
            RolesBaseModel.create({
                roleName,
                roleId: (Date.parse(new Date()) + 1024) / 1000
            });
            return result.success();
        } catch (error) {
            console.log(error)
            return result.failed();
        }
    }

    /**
     * 获取平台角色列表
     * @param {*} param0
     */
    async getPlatformRoles({ page, limit }) {
        try {
            let queryData = {
                where: { isDelete: null },
                attributes: ['roleId', 'roleName']
            };
            //分页
            if (page && limit) {
                queryData.offset = Number((page - 1) * limit); //开始的数据索引
                queryData.limit = Number(limit); //每页限制返回的数据条数
            };
            const { rows, count } = await RolesBaseModel.findAndCount(queryData);
            return result.pageData(null, null, rows, count, page, limit);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 删除平台角色
     * @param {*} roleId
     */
    async delPlatformRole(roleId) {
        try {
            if (!roleId) return result.paramsLack();
            RolesBaseModel.update({
                isDelete: true
            }, {
                where: { roleId },
                fields: ['isDelete']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`删除失败`);
        }
    }

    /**
     * 设置平台的角色权限
     * @param {roleId,permissionIds} 角色ID 权限列ID数组
     */
    async setPlatformRolePermission({ roleId, permissionIds }) {
        try {
            if (roleId === undefined || !permissionIds) return result.paramsLack();
            //插入多条记录
            let records = permissionIds.map(item => ({ roleId, permissionId: item }));
            //先清除
            await RolesAuthModel.destroy({ where: { roleId } });
            //然后再写入
            RolesAuthModel.bulkCreate(records);
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`设置角色权限失败`);
        }
    }
};