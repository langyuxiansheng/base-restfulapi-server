//主路由文件
import KoaRouter from 'koa-router';
import controllers from '../controllers/index.js';

//所有的API接口都以apiv1开头
const router = new KoaRouter({ prefix: '/v1' });
const {
    Demos,
    Users,
    Login,
    Admin
} = controllers;

const routers = [{
        url: `/test`,
        routes: Demos.TestController
    },
    {
        url: `/user`,
        routes: Users.UserController
    },
    {
        url: `/login`,
        routes: Login.LoginController
    },
    {
        url: `/platform`,
        routes: Admin.PlatformController
    },
    {
        url: `/permission`,
        routes: Admin.PermissionController
    }
];

//挂载路由
routers.forEach(item => {
    router.use(item.url, item.routes.routes(), item.routes.allowedMethods());
});
export default router;