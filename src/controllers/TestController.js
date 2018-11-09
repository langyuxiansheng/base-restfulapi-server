import KoaRouter from 'koa-router';
import {
    TestService
} from '../services';

const router = new KoaRouter();

/**
 * test TestController
 */
class TestController {
    /**
     * get
     * @param {*} ctx
     */
    async getTest(ctx) {
        ctx.body = await TestService.getTest(ctx.request.query);
    }

    /**
     * post
     * @param {*} ctx
     */
    async postTest(ctx) {
        ctx.body = await TestService.postTest(ctx.request.body);
    }

    /**
     * put
     * @param {*} ctx
     */
    async putTest(ctx) {
        ctx.body = await TestService.putTest(ctx.params.id, ctx.request.body);
    }

    /**
     * delete
     */
    async deleteTest(ctx) {
        ctx.body = await TestService.deleteTest(ctx.params.id);
    }
}

const {
    getTest,
    postTest,
    putTest,
    deleteTest
} = new TestController();

/* eslint-disable */
const routers = [{
        url: `/getTest`,
        method: 'get',
        acc: getTest
    },
    {
        url: `/postTest`,
        method: 'post',
        acc: postTest
    },
    {
        url: `/putTest/:id`,
        method: 'put',
        acc: putTest
    },
    {
        url: `/deleteTest/:id`,
        method: 'delete',
        acc: deleteTest
    },
];

/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;