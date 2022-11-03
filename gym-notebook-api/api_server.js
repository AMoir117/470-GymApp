const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const http = require('http');

// Load environment variables (or .env if local environment)
require('dotenv').config();
app.use(bodyParser());
require('./app/Middleware/CORS.js')(app);

// Custom error catch for koa-jwt so that we can log the specific error message
// when attempting to read and parse the access_token
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if(err.status === 401) {
            console.log('index.js: sending 401 to the client.');
            ctx.status = 401;
            ctx.body = 'JWT Token expired. If this was an app in production, you do not want to tell the public why their request was rejected!';
        } else {
            console.log('index.js: one of the modules in the chain fired an exception.');
            console.log(`The error message is ${err}`);
        }
    });
});

// require('./config/courses_routes.js')(app);
require('./config/exercisesRoutes.js')(app);

const httpsServer = require('./config/ssl/ssl.js')(app.callback());
httpsServer.listen(process.env.APP_PORT, () => console.log(`Listening on HTTPS port ${process.env.APP_PORT}`));
