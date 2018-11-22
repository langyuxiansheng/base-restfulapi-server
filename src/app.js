import Koa2 from 'koa';
import KoaBody from 'koa-body';
import KoaStatic from 'koa-static2';
import {
    System
} from './config';
import path from 'path';
import MainRoutes from './routes/main-routes';
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch';
import ErrorRoutes from './routes/error-routes';
import jwt from 'koa-jwt';
import fs from 'fs';

//初始化mongo数据库链接工具
// import './lib/mongoUtil';
// import './lib/sequelize';
// import mysqlDb from './lib/mysql-db';
// import PluginLoader from './lib/PluginLoader';

const app = new Koa2();
const env = process.env.NODE_ENV || 'development'; // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'));

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
    }).use(ErrorRoutesCatch())
    //加载静态资源文件
    .use(KoaStatic('assets', path.resolve(__dirname, '../assets')))
    .use(jwt({ // Static resource
        secret: publicKey
    }).unless({
        //无需jwt的路由
        path: [/^\/v1\/login\/aminLogin/, /^\/public/, /^\/assets/]
    }))
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
if (env === 'development') { // logger
    app.use((ctx, next) => {
        const start = new Date();
        return next().then(() => {
            const ms = new Date() - start;
            console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
        });
    });
}

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