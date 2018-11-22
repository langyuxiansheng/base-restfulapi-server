import KoaRouter from 'koa-router';
import services from '../../services';
const router = new KoaRouter();
const DemoService = new services.Demos.DemoService();

/**
 * 后台业务代码示例
 */
class DemoController {

    /**
     * 获取列表
     * @param {*} ctx
     */
    async getListDemo(ctx) {
        ctx.body = await DemoService.getListDemo(ctx.request.query);
    }

    /**
     * 添加
     * @param {*} ctx
     */
    async addDemo(ctx) {
        ctx.body = await DemoService.addDemo(ctx.request.body);
    }

    /**
     * 注销
     * @param {*} ctx
     */
    async delDemo(ctx) {
        ctx.body = await DemoService.delDemo(ctx.params.AdminID);
    }

    /**
     * 修改
     * @param {*} ctx
     */
    async updateDemo(ctx) {
        ctx.body = await DemoService.updateDemo({
            AdminID: ctx.params.AdminID,
            Status: ctx.request.body.Status
        });
    }
}

const {
    getListDemo,
    addDemo,
    delDemo,
    updateDemo
} = new DemoController();

/* eslint-disable */
const routers = [{
        url: `/getListDemo`,
        method: 'get',
        acc: getListDemo
    },
    {
        url: `/addDemo`,
        method: 'post',
        acc: addDemo
    },
    {
        url: `/delDemo/:DemoID`,
        method: 'delete',
        acc: delDemo
    },
    {
        url: `/updateDemo/:DemoID`,
        method: 'put',
        acc: updateDemo
    }
];
/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;