/**
 * 错误路由处理
 */
export default () => {
    return (ctx, next) => {
        if (ctx.status === 404) ctx.body = '没有找到内容 - 404';
        return next();
    };
}