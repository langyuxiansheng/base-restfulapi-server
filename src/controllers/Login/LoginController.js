import KoaRouter from 'koa-router';
import services from '../../services';
const router = new KoaRouter();
const LoginService = new services.Login.LoginService();

/**
 * LoginController
 * 用户信息类
 */
class LoginController {

    /**
     * 用户登录 后台账号
     * @param {*} ctx
     */
    async aminLogin(ctx) {
        ctx.body = await LoginService.aminLogin(ctx.request.body);
    }
}

const {
    aminLogin
} = new LoginController();

/* eslint-disable */
const routers = [{
    url: `/aminLogin`,
    method: 'post',
    acc: aminLogin
}];

/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;