import result from '../../tools/Result';
import utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
/* eslint-disable */
const { webDBUtil } = sequelize;
const PermissionModel = webDBUtil.import('../../models/AdminPlatform/PermissionModel');
const RolesAuthModel = webDBUtil.import('../../models/AdminPlatform/RolesAuthModel');
/* eslint-endble */

/**
 * 权限管理服务类
 * 本页面处理业务逻辑 接收参数与返回处理结果
 */
module.exports = class PermissionService {

    /**
     * 获取权限集
     * @param {*} param0 分页参数
     */
    async getPermissions({ page, limit, roleId }) {
        try {
            let queryData = {
                where: { isDelete: null },
                attributes: ['permissionId', 'permissionName', 'permissionType', 'permissionValue', 'parentId', 'path', 'component', 'meta'],
                order: [
                    ['permissionValue', 'ASC']
                ]
            };

            //分页
            if (page && limit) {
                queryData.offset = Number((page - 1) * limit); //开始的数据索引
                queryData.limit = Number(limit); //每页限制返回的数据条数
            };
            const { rows, count } = await PermissionModel.findAndCount(queryData);
            //所有菜单
            const menus = rows.map(item => {
                item.meta = item.meta ? JSON.parse(item.meta) : null;
                return item;
            });
            let res = { menus };
            //角色已有的权限
            if (roleId) {
                res.onMenus = await RolesAuthModel.findAll({
                    where: { roleId },
                    attributes: ['permissionId']
                });
            }
            return result.pageData(null, null, res, count, page, limit);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 获取菜单权限列表树
     */
    async getPermissionTrees() {
        try {
            let queryData = {
                where: { isDelete: null },
                attributes: ['permissionId', 'permissionName', 'permissionType', 'permissionValue', 'parentId', 'path', 'component', 'meta']
            };
            let rows = await PermissionModel.findAll(queryData);
            let list = rows.map(item => {
                item.meta = item.meta ? JSON.parse(item.meta) : null;
                return item;
            });
            let trees = utils.toTree(list, 'parentId', 'permissionId', 0);
            return result.success(null, trees);
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 添加权限
     * @param {*} user
     */
    async addPermission({
        permissionName,
        permissionType,
        permissionValue,
        parentId,
        path,
        component,
        meta
    }) {
        try {
            if (!permissionName && !permissionType && !permissionValue) return result.paramsLack();
            const hasPermission = await PermissionModel.findOne({
                where: { permissionName, isDelete: null }
            });
            if (hasPermission) return result.failed(`此权限已存在!`);
            PermissionModel.create({
                permissionName,
                permissionType,
                permissionValue,
                parentId: parentId || 0,
                path,
                component,
                meta: JSON.stringify(meta)
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }

    /**
     * 删除权限
     * @param {*} user
     */
    async delPermission(permissionId) {
        try {
            if (!permissionId) return result.paramsLack();
            PermissionModel.update({
                isDelete: true
            }, {
                where: { permissionId },
                fields: ['isDelete']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`删除失败`);
        }
    }

    /**
     * 修改权限
     * @param {*} permission
     */
    async updatePermission({ permissionId, data }) {
        try {
            const { permissionName, meta } = data;
            if (!permissionName && !permissionId) return result.paramsLack();
            PermissionModel.update({
                ...data,
                meta: JSON.stringify(meta)
            }, {
                where: { permissionId },
                fields: ['permissionName', 'permissionType', 'permissionValue', 'parentId', 'path', 'component', 'meta']
            });
            return result.success();
        } catch (error) {
            console.log(error);
            return result.failed(`修改失败`);
        }
    }
};