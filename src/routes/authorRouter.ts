import KoaRouter from "koa-router";
import authorController from "../controllers/authorController";
import authorization from "../middleware/authorization";

// Set up router
const authorRouter: KoaRouter = new KoaRouter();

// Base route for Author REST endpoints
const baseRoute: string = '/author';

/* Routes */

// POST route to create new author
authorRouter.post('add-author',
    baseRoute,
    authorization.validateToken,
    authorController.addAuthor
);

// GET route to get a single author
authorRouter.get('get-author',
    `${baseRoute}/:id`,
    authorController.getAuthor
);

// GET route to search authors by query or get all authors if no queries
authorRouter.get('search-authors',
    baseRoute,
    authorController.searchAuthors
);

// PUT route to update an author by ID
authorRouter.put('update-author',
    `${baseRoute}/:id`,
    authorization.validateToken,
    authorController.updateAuthors
);

// DELETE route to delete an author
authorRouter.delete('delete-author',
    `${baseRoute}/:id`,
    authorization.validateToken,
    authorController.deleteAuthor
);

// Export router
export default authorRouter;