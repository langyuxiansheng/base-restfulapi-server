import log4js from 'log4js';
// 引入日志输出信息的封装文件
const access = (ctx, message, commonInfo) => {
    const {
        method, // 请求方法 get post或其他
        url, // 请求链接
        host, // 发送请求的客户端的host
        headers // 请求中的headers
    } = ctx.request;
    const client = {
        method,
        url,
        host,
        message,
        referer: headers['referer'], // 请求的源地址
        userAgent: headers['user-agent'] // 客户端信息 设备及浏览器信息
    };
    return JSON.stringify(Object.assign(commonInfo, client));
};

const methods = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark'];

const baseInfo = {
    appLogLevel: 'debug',
    dir: 'logs',
    env: 'dev',
    projectName: 'base-restfulapi-server',
    serverIp: '127.0.0.1'
};
const { env, appLogLevel, dir, serverIp, projectName } = baseInfo;
// 增加常量，用来存储公用的日志信息
const commonInfo = { projectName, serverIp };
module.exports = () => {
    const contextLogger = {};
    const appenders = {};
    appenders.cheese = {
        type: 'dateFile',
        filename: `${dir}/task`,
        pattern: '-yyyy-MM-dd.log',
        alwaysIncludePattern: true
    };

    if (env === 'dev' || env === 'local' || env === 'development') {
        appenders.out = {
            type: 'console'
        };
    }
    let config = {
        appenders,
        categories: {
            default: {
                appenders: Object.keys(appenders),
                level: appLogLevel
            }
        }
    };

    const logger = log4js.getLogger('cheese');

    return async(ctx, next) => {
        const start = Date.now();
        log4js.configure(config);
        methods.forEach((method, i) => {
            contextLogger[method] = (message) => {
                // 将入参换为函数返回的字符串
                logger[method](access(ctx, message, commonInfo));
            };
        });
        ctx.log = contextLogger;
        await next();
        const responseTime = Date.now() - start;
        logger.info(access(ctx, { responseTime: `响应时间为${responseTime / 1000}s` }, commonInfo));
    };
};