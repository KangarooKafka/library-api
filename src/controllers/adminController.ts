import { RouterContext } from 'koa-router';
import pinoLogger from "../../logger/logger";

// Logger
const logger = pinoLogger();

/**
 * Controller for admin endpoints and logic
 */
class AdminController {
    /**
     * Confirms if the server is running
     * @param {RouterContext} ctx The request context
     * @param {() => Promise<void>} next The next client request.
     */
    public async healthCheck(ctx: RouterContext, next: () => Promise<void>): Promise<void>{
        try {
            // Set response
            ctx.body = { serverResp: 'running' };
            ctx.status = 200;

            // Log response
            logger.info(`Body: Server running\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any) {
            // Set response
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log response
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }
}

// Export controller
export default new AdminController();