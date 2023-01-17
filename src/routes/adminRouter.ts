import KoaRouter from 'koa-router';
import adminController from "../controllers/adminController";

// Set up router
const adminRouter: KoaRouter = new KoaRouter();

// Base router for REST endpoints
const baseRoute: string = '/admin';

/* Routes */

// GET route for health check
adminRouter.get('health-check',
    baseRoute,
    adminController.healthCheck
);

// Export router
export default adminRouter;