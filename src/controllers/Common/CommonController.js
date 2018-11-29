import KoaRouter from 'koa-router';
import services from '../../services';
const router = new KoaRouter();
const CommonService = new services.Common.CommonService();

/**
 * 公共服务系统
 */
class CommonController {

    /**
     * 获取图片验证码
     * @param {*} ctx
     */
    async getImgValidate(ctx) {
        const { text, result } = await CommonService.getImgValidate(ctx);
        ctx.session.imgValidateData = text;
        ctx.body = result;
    }
}

const { getImgValidate } = new CommonController();

/* eslint-disable */
const routers = [{
    url: `/getImgValidate`,
    method: 'get',
    acc: getImgValidate
}];
/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;