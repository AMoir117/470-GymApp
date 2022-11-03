
module.exports = async (ctx, next) => {

    await next();

    if (!ctx.status || ctx.status === 404) {
        ctx.status = 404;
        ctx.body = 'The resource you requested could not be found.';
        ctx.type = 'application/problem+json';
    }
};