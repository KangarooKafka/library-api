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
        // Try/Catch block to catch database and server errors
        try {
            // Set response
            ctx.body = { serverResp: 'running' };
            ctx.status = 200;

            // Log response
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Set response
            ctx.body = e.message;
            ctx.status = 500;

            // Log response
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }
}

// Export controller
export default new AdminController();