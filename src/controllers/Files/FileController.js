import KoaRouter from 'koa-router';
import services from '../../services';
const router = new KoaRouter();
const FileService = new services.Files.FileService();

/**
 * 文件系统控制器
 */
class FileController {

    /**
     * 上传文件
     * @param {*} ctx
     */
    async uploadFile(ctx) {
        ctx.body = await FileService.uploadFile(ctx);
    }
}

const { uploadFile } = new FileController();

/* eslint-disable */
const routers = [{
    url: `/uploadFile`,
    method: 'post',
    acc: uploadFile
}];

/* eslint-enable */

//挂载路由
routers.forEach(item => {
    router[item.method](item.url, item.acc);
});

module.exports = router;