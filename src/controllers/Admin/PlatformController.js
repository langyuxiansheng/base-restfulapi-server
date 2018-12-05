import KoaRouter from 'koa-router';
import services from '../../services';
const router = new KoaRouter();
const PlatformService = new services.Admin.PlatformService();

/**
 * 管理平台服务
 */
class PlatformController {

    /**
     * 获取平台管理员列表
     * @param {*} ctx
     */
    async getPlatformAdminList(ctx) {
        ctx.body = await PlatformService.getPlatformAdminList(ctx.request.query);
    }

    /**
     * 添加平台管理员
     * @param {*} ctx
     */
    async addPlatformAdmin(ctx) {
        ctx.body = await PlatformService.addPlatformAdmin(ctx.request.body);
    }

    /**
     * 注销平台管理员
     * @param {*} ctx
     */
    async delPlatformAdmin(ctx) {
        ctx.body = await PlatformService.delPlatformAdmin(ctx.params.adminId);
    }

    /**
     * 修改平台管理员账号状态
     * @param {*} ctx
     */
    async updatePlatformAdmin(ctx) {
        ctx.body = await PlatformService.updatePlatformAdmin({
            adminId: ctx.params.adminId,
            status: ctx.request.body.status
        });
    }

    /**
     * 设置平台管理员角色
     * @param {*} ctx
     */
    async setPlatformAdminRole(ctx) {
        ctx.body = await PlatformService.setPlatformAdminRole(ctx.request.body);
    }

    /**
     * 添加管理平台角色
     * @param {*} ctx
     */
    async addPlatformRole(ctx) {
        ctx.body = await PlatformService.addPlatformRole(ctx.request.body);
    }

    /**
     * 添加管理平台角色
     * @param {*} ctx
     */
    async getPlatformRoles(ctx) {
        ctx.body = await PlatformService.getPlatformRoles(ctx.request.query);
    }

    /**
     * 删除管理平台角色
     * @param {*} ctx
     */
    async delPlatformRole(ctx) {
        ctx.body = await PlatformService.delPlatformRole(ctx.params.roleId);
    }

    /**
     * 设置管理平台角色权限
     * @param {*} ctx
     */
    async setPlatformRolePermission(ctx) {
        ctx.body = await PlatformService.setPlatformRolePermission(ctx.request.body);
    }
}

const {
    getPlatformAdminList,
    addPlatformAdmin,
    delPlatformAdmin,
    updatePlatformAdmin,
    setPlatformAdminRole,
    addPlatformRole,
    getPlatformRoles,
    delPlatformRole,
    setPlatformRolePermission
} = new PlatformController();

/* eslint-disable */
const routers = [{
        url: `/getPlatformAdminList`,
        method: 'get',
        acc: getPlatformAdminList
    },
    {
        url: `/addPlatformAdmin`,
        method: 'post',
        acc: addPlatformAdmin
    },
    {
        url: `/delPlatformAdmin/:adminId`,
        method: 'delete',
        acc: delPlatformAdmin
    },
    {
        url: `/updatePlatformAdmin/:adminId`,
        method: 'put',
        acc: updatePlatformAdmin
    },
    {
        url: `/setPlatformAdminRole`,
        method: 'put',
        acc: setPlatformAdminRole
    },
    {
        url: `/addPlatformRole`,
        method: 'post',
        acc: addPlatformRole
    },
    {
        url: `/getPlatformRoles`,
        method: 'get',
        acc: getPlatformRoles
    },
    {
        url: `/delPlatformRole/:roleId`,
        method: 'delete',
        acc: delPlatformRole
    },
    {
        url: `/setPlatformRolePermission`,
        method: 'put',
        acc: setPlatformRolePermission
    },
];
/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;