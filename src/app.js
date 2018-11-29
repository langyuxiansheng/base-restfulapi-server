import Koa2 from 'koa';
import KoaBody from 'koa-body';
import KoaStatic from 'koa-static2';
import KoaSession from 'koa-session';
import path from 'path';
import jwt from 'koa-jwt';
import fs from 'fs';
import ip from 'ip';
import { System } from './config';
import MainRoutes from './routes/main-routes';
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch';
import ErrorRoutes from './routes/error-routes';
import logger from './lib/logger';
// import PluginLoader from './lib/PluginLoader';
const app = new Koa2();
// const env = process.env.NODE_ENV || 'development'; // Current mode
//读取jwt公钥
const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'));
//设置会话秘钥
app.keys = [System.Session_Config.key];
// 使用日志中间件，需要放在router前面
// 将配置中间件的参数在注册中间件时作为参数传入
app.use(logger({
    env: app.env, // koa 提供的环境变量
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
}));

//注册
app.use((ctx, next) => {
        if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
            ctx.set('Access-Control-Allow-Origin', '*');
        } else {
            ctx.set('Access-Control-Allow-Origin', System.HTTP_server_host);
        }
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        ctx.set('Access-Control-Allow-Credentials', true); // 允许带上 cookie
        return next();
    })
    .use(ErrorRoutesCatch())
    //加载静态资源文件
    .use(KoaStatic('assets', path.resolve(__dirname, '../assets')))
    .use(jwt({ // Static resource
        secret: publicKey
    }).unless({
        //无需jwt的路由
        path: [/^\/v1\/login\/aminLogin/, /^\/public/, /^\/assets/, /^\/v1\/common\/getImgValidate/]
    }))
    .use(KoaSession(System.Session_Config, app))
    .use(KoaBody({
        multipart: true,
        strict: false,
        formidable: {
            uploadDir: path.join(__dirname, '../assets/uploads/tmp')
        },
        jsonLimit: '10mb',
        formLimit: '10mb',
        textLimit: '10mb'
    })) // Processing request
    // .use(PluginLoader(System.System_plugin_path))
    .use(MainRoutes.routes())
    .use(MainRoutes.allowedMethods())
    .use(ErrorRoutes());
// if (env === 'development') { // logger
//     app.use((ctx, next) => {
//         const start = new Date();
//         console.log(start)
//         return next().then(() => {
//             const ms = new Date() - start;
//             console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//         });
//     });
// }

app.use((ctx, next) => {
    const start = new Date();
    return next().then(() => {
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    });
});

app.listen(System.API_server_port);

console.log(`Now start API server on port ${System.API_server_type}${System.API_server_host}:${System.API_server_port} ...`);

export default app;