import KoaRouter from "koa-router";
import bookController from "../controllers/bookController";
import bookCheckout from "../middleware/bookCheckout";
import bookAuthorConnections from "../middleware/bookAuthorConnections";
import authorization from "../middleware/authorization";

// Set up router
const bookRouter: KoaRouter = new KoaRouter();

// Base router for Author REST endpoints
const baseRoute: string = '/book';

/* ROUTES */

// POST route to create new book
bookRouter.post('add-book',
    baseRoute,
    authorization.validateToken,
    bookController.addBook,
    bookAuthorConnections.addBookToAuthor
);

// POST route to check out a book
bookRouter.post('check-out-book',
    `${baseRoute}/checkout`,
    bookCheckout.bookAvailable,
    bookCheckout.customerStanding,
    bookController.checkoutBook
);

// POST route to return a book
bookRouter.post('return-book',
    `${baseRoute}/return`,
    bookController.returnBook
);

// GET route to get a single book
bookRouter.get('get-book',
    `${baseRoute}/:id`,
    bookController.getBook
);

// GET route to search books by query or get all books if no queries
bookRouter.get('search-books',
    baseRoute,
    bookController.searchBooks
);

// PUT route for updating a book
bookRouter.put('update-book',
    `${baseRoute}/:id`,
    bookController.updateBook
);

// DELETE route for deleting a book
bookRouter.delete('delete-book',
    `${baseRoute}/:id`,
    bookController.deleteBook,
    bookAuthorConnections.removeBookFromAuthor
);

// Export router
export default bookRouter;