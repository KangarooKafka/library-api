import KoaRouter from "koa-router";
import customerController from "../controllers/customerController";

// Set up Router
const customerRouter: KoaRouter = new KoaRouter();

// Base route for customer REST endpoints
const baseRoute: string = '/customer';

/* ROUTES */

// POST route for adding a customer
customerRouter.post('add-customer',
    baseRoute,
    customerController.addCustomer
);

// GET route for getting a single customer
customerRouter.get('get-customer',
    `${baseRoute}/:id`,
    customerController.getCustomer
);

// GET route to search customers by query or get all customers if no queries
customerRouter.get('search-customers',
    baseRoute,
    customerController.searchCustomers
);

// PUT route for updating a customer
customerRouter.put('update-customer',
    `${baseRoute}/:id`,
    customerController.updateCustomer
);

// DELETE route for deleting a customer
customerRouter.delete('delete-customer',
    `${baseRoute}/:id`,
    customerController.deleteCustomer
);

// Export router
export default customerRouter;