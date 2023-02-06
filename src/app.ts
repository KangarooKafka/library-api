'use strict';
import koa from 'koa';
import * as KoaRouter from 'koa-router';
import koaBody from 'koa-body';
import config from 'config';
import { Logger } from 'pino';
import * as dotenv from 'dotenv';

// Set up environment variables
dotenv.config();

// Database
import dbConnect from './db/dbConnect';

// Routes
import adminRouter from "./routes/adminRouter";
import authorRouter from "./routes/authorRouter";
import bookRouter from "./routes/bookRouter";
import customerRouter from "./routes/customerRouter";
import employeeRouter from "./routes/employeeRouter";

// Logger
import pinoLogger from "../logger/logger";
import { NodeEnvironment } from "./common/constants/constants";
import * as process from "process";

/* SERVER SETUP */
const port: number = config.get('port');
const host: string = config.get('host');

// Better logging than console.log
const logger: Logger = pinoLogger();
const koaPinoLogger: Function = require('koa-pino-logger');

// Require the koa-router
const Router = require('koa-router');

// Require CORS
const cors = require('@koa/cors');

// Launch Server
const app: koa = new koa();
const router: KoaRouter = new Router();

app.use(cors());
app.use(koaPinoLogger());
app.use(koaBody({multipart: true}));
app.use(router.routes())
    .use(adminRouter.routes())
    .use(authorRouter.routes())
    .use(bookRouter.routes())
    .use(customerRouter.routes())
    .use(employeeRouter.routes())



/* PORT LISTENING */
if (process.env.NODE_ENV !== NodeEnvironment.TEST) {
    // Connect to DB
    dbConnect();

    app.listen(port, host, () => {
        logger.info(`Server listening at http://${host}:${port}`);
    });
}

export default app;
