import KoaRouter from 'koa-router';
import services from '../../services';
const router = new KoaRouter();
const PermissionService = new services.Admin.PermissionService();

/**
 * 管理平台权限管理
 */
class PermissionController {

    /**
     * 获取权限集
     * @param {*} ctx
     */
    async getPermissions(ctx) {
        ctx.body = await PermissionService.getPermissions(ctx.request.query);
    }

    /**
     * 获取权限列表树
     * @param {*} ctx
     */
    async getPermissionTrees(ctx) {
        ctx.body = await PermissionService.getPermissionTrees(ctx.request);
    }

    /**
     * 添加权限
     * @param {*} ctx
     */
    async addPermission(ctx) {
        ctx.body = await PermissionService.addPermission(ctx.request.body);
    }

    /**
     * 删除权限
     * @param {*} ctx
     */
    async delPermission(ctx) {
        ctx.body = await PermissionService.delPermission(ctx.params.PermissionID);
    }

    /**
     * 修改权限
     * @param {*} ctx
     */
    async updatePermission(ctx) {
        ctx.body = await PermissionService.updatePermission({
            PermissionID: ctx.params.PermissionID,
            data: ctx.request.body
        });
    }
}

const {
    getPermissions,
    getPermissionTrees,
    addPermission,
    delPermission,
    updatePermission
} = new PermissionController();

/* eslint-disable */
const routers = [{
        url: `/getPermissions`,
        method: 'get',
        acc: getPermissions
    },
    {
        url: `/getPermissionTrees`,
        method: 'get',
        acc: getPermissionTrees
    },
    {
        url: `/addPermission`,
        method: 'post',
        acc: addPermission
    },
    {
        url: `/delPermission/:PermissionID`,
        method: 'delete',
        acc: delPermission
    },
    {
        url: `/updatePermission/:PermissionID`,
        method: 'put',
        acc: updatePermission
    }
];
/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;