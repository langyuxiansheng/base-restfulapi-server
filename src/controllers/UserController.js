import KoaRouter from 'koa-router';
import services from '../services';
const router = new KoaRouter();
const userService = new services.UserService();

/**
 * UserController
 * 用户信息类
 */
class UserController {

    // /**
    //  * 用户注册
    //  * @param {*} ctx
    //  */
    // async userRegister(ctx) {
    //     ctx.body = await userService.userRegister(ctx.request.body);
    // }

    /**
     * 用户登录
     * @param {*} ctx
     */
    async userLogin(ctx) {
        ctx.body = await userService.userLogin(ctx.request.body);
    }

    /**
     * 获取用户列表
     * @param {*} ctx
     */
    async getUserList(ctx) {
        ctx.body = await userService.getUserList(ctx.request.header.authorization);
    }
}

const {
    userLogin,
    getUserList,
    // userRegister
} = new UserController();

/* eslint-disable */
const routers = [{
        url: `/userLogin`,
        method: 'post',
        acc: userLogin
    },
    {
        url: `/getUserList`,
        method: 'get',
        acc: getUserList
    },
    // {
    //     url: `/userRegister`,
    //     method: 'post',
    //     acc: userRegister
    // },
];

/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;