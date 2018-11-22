import result from '../../tools/Result';
import Utils from '../../tools/Utils';
import sequelize from '../../lib/sequelize';
import middleware from '../../middleware';
/* eslint-disable */
const { webDBUtil, Sequelize } = sequelize;
const AdminBaseModel = webDBUtil.import('../../models/AdminPlatform/AdminBaseModel');
const RolesBaseModel = webDBUtil.import('../../models/AdminPlatform/RolesBaseModel');
const RolesAuthModel = webDBUtil.import('../../models/AdminPlatform/RolesAuthModel');
const PermissionModel = webDBUtil.import('../../models/AdminPlatform/PermissionModel');
/* eslint-endble */
const { ValidateTools } = middleware.ValidateTools;
const validateTools = new ValidateTools();

/**
 * 登陆系统
 */
module.exports = class LoginService {

    /**
     * 用户登录 后台账号
     * @param {*} user
     */
    async aminLogin({ account, password }) {
        try {
            if (!account && !password) return result.paramsLack();
            const userInfo = await AdminBaseModel.findOne({
                where: { account, password: Utils.getMd5(password) },
                raw: true
            });

            if (userInfo) {
                const { adminId, adminName, account, isAdmin, isDelete, status, roleId } = userInfo;
                if (isDelete) return result.failed(`该用户已被注销!`);
                if (status) return result.failed(`该用户已被禁用!`);
                const token = validateTools.getJWT({ adminId, adminName, account, isAdmin, roleId }, 3600 * 24);
                //超级管理员
                if (isAdmin) return result.success(null, { token, userInfo: { adminId, adminName, account, isAdmin, roleId, roleName: '超级管理员' } });
                //普通人员登录
                if (roleId) {
                    //获取角色信息
                    const { roleName } = await RolesBaseModel.findOne({ where: { roleId, isDelete: null } });
                    //关联中间表/权限表
                    RolesAuthModel.belongsTo(PermissionModel, { foreignKey: 'permissionId' });
                    //获取菜单权限
                    const list = await RolesAuthModel.findAll({
                        where: { roleId },
                        include: [{
                            where: { isDelete: null },
                            model: PermissionModel,
                            attributes: []
                        }],
                        attributes: [
                            Sequelize.col('permission.permissionId'),
                            Sequelize.col('permission.permissionName'),
                            Sequelize.col('permission.permissionType'),
                            Sequelize.col('permission.permissionValue'),
                            Sequelize.col('permission.parentId'),
                            Sequelize.col('permission.path'),
                            Sequelize.col('permission.component'),
                            Sequelize.col('permission.meta')
                        ],
                        order: [
                            [Sequelize.col('permission.permissionValue'), 'ASC']
                        ],
                        raw: true
                    });

                    //处理Meta
                    let menus = list.map(item => {
                        item.Meta = item.Meta ? JSON.parse(item.meta) : null;
                        return item;
                    });

                    return result.success(null, { token, userInfo: { adminId, adminName, account, isAdmin, roleId, roleName }, menus });
                }
                return result.failed(`你暂无权限登录系统,请联系管理员`);
            } else {
                return result.failed(`用户名或密码错误`);
            }
        } catch (error) {
            console.log(error);
            return result.failed();
        }
    }
};