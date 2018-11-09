/**
 * 统一导出
 */
import KoaRouter from 'koa-router';
import controllers from '../controllers/index.js';

//所有的API接口都以apiv1开头
const router = new KoaRouter({
    prefix: '/v1'
});

const {
    TestController,
    UserController,
} = controllers;

/* eslint-disable */
const routers = [{
        url: `/test`,
        routes: TestController
    },
    {
        url: `/user`,
        routes: UserController
    },
];

/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router.use(item.url, item.routes.routes(), item.routes.allowedMethods());
});
export default router;