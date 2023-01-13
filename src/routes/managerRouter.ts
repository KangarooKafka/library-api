import KoaRouter from "koa-router";
import managerController from "../controllers/managerController";

// Set up router
const managerRouter: KoaRouter = new KoaRouter();

// Base route for REST endpoints
const baseRoute: string = '/manager';

/* ROUTES */

// POST route for adding a new manager
managerRouter.post('add-manager',
    baseRoute,
    managerController.addManager
);

// GET route for getting a single manager
managerRouter.get('get-manager',
    `${baseRoute}/:id`,
    managerController.getManager
);

// GET route to search managers by query or get all managers if no queries
managerRouter.get('search-managers',
    baseRoute,
    managerController.searchManagers
);

// PUT route for updating a manager
managerRouter.put('update-manager',
    `${baseRoute}/:id`,
    managerController.updateManager
);

// DELETE route for deleting a manager
managerRouter.delete('delete-manager',
    `${baseRoute}/:id`,
    managerController.deleteManager
);

// Export router
export default managerRouter;