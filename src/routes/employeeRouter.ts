import KoaRouter from "koa-router";
import employeeController from "../controllers/employeeController";
import authorization from "../middleware/authorization";

// Set up router
const employeeRouter: KoaRouter = new KoaRouter();

// Base route for REST endpoints
const baseRoute: string = '/employee';

/* ROUTES */

// POST route for logging in
employeeRouter.post('login',
    `${baseRoute}/login`,
    authorization.checkCredentials,
    employeeController.login
);

// POST route for adding a new employee
employeeRouter.post('add-employee',
    baseRoute,
    authorization.validateNewEmployee,
    employeeController.addEmployee
);

// GET route for getting a single employee
employeeRouter.get('get-employee',
    `${baseRoute}/:id`,
    employeeController.getEmployee
);

// GET route to search employees by query or get all employees if no queries
employeeRouter.get('search-employees',
    baseRoute,
    employeeController.searchEmployees
);

// PUT route for updating a employee
employeeRouter.put('update-employee',
    `${baseRoute}/:id`,
    employeeController.updateEmployee
);

// DELETE route for deleting a employee
employeeRouter.delete('delete-employee',
    `${baseRoute}/:id`,
    employeeController.deleteEmployee
);

// Export router
export default employeeRouter;