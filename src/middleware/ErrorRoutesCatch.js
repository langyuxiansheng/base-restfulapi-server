import result from '../tools/Result';
module.exports = () => {
    return (ctx, next) => {
        return next().catch((err) => {
            console.log(`Authentication 验证`, err);
            switch (err.status) {
                case 401:
                    ctx.body = result.authorities();
                    break;
                case 404:
                    ctx.body = `404 Not Found!`;
                    break;
                default:
                    ctx.body = result.failed(err);
            }
        });
    };
};