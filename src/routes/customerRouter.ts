import KoaRouter from "koa-router";
import customerController from "../controllers/customerController";
import authorization from "../middleware/authorization";

// Set up Router
const customerRouter: KoaRouter = new KoaRouter();

// Base route for customer REST endpoints
const baseRoute: string = '/customer';

/* ROUTES */

// POST route for adding a customer
customerRouter.post('add-customer',
    baseRoute,
    authorization.validateToken,
    customerController.addCustomer
);

// GET route for getting a single customer
customerRouter.get('get-customer',
    `${baseRoute}/:id`,
    authorization.validateToken,
    customerController.getCustomer
);

// GET route to search customers by query or get all customers if no queries
customerRouter.get('search-customers',
    baseRoute,
    authorization.validateToken,
    customerController.searchCustomers
);

// PUT route for updating a customer
customerRouter.put('update-customer',
    `${baseRoute}/:id`,
    authorization.validateToken,
    customerController.updateCustomer
);

// DELETE route for deleting a customer
customerRouter.delete('delete-customer',
    `${baseRoute}/:id`,
    authorization.validateToken,
    customerController.deleteCustomer
);

// Export router
export default customerRouter;