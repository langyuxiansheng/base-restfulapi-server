import result from '../tools/Result';
module.exports = () => {
    return (ctx, next) => {
        return next().catch((err) => {
            switch (err.status) {
                case 401:
                    ctx.body = result.authorities();
                    break;
                case 404:
                    ctx.body = result.failed(204, '非法请求!');
                    break;
                default:
                    ctx.body = result.failed(null, String(err));
            }
        });
    };
};