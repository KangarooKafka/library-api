import { RouterContext } from "koa-router";
import { Document, Types } from "mongoose";
import pinoLogger from "../../logger/logger";
import Book from '../models/book.model';
import _ from 'lodash';
import Customer from "../models/customer.model";

// Logger
const logger = pinoLogger();

/**
 * Controller for Book-based endpoints and logic
 */
class BookController {

    /**
     * Adds a book
     * @param {RouterContext} ctx The request context object containing the new book data.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Create new book entry
            const book: Document = await new Book(ctx.request.body).save();

            // Create object for use by other middleware
            ctx.state = {
                bookId : book.id,
                authorId : ctx.request.body.author
            }

            // Response to client
            ctx.body = book;
            ctx.status = 201;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns a single book
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get book object
            const book: Document | null = await Book.findById(new Types.ObjectId(ctx.params.id));

            // If book is not found
            if (_.isNil(book)) ctx.throw(404, 'Book not found')

            // Response to client
            ctx.body = book;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns books that match query or returns all if no queries given
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async searchBooks(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get books
            const books = await Book.find(ctx.query);

            // If no books found
            if (_.isEmpty(books)) ctx.throw(404, 'No books found');

            // Response to client
            ctx.body = books;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Updates a single book info
     * @param {RouterContext} ctx The request context object containing the new book data.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and update book
            const book: Document | null = await Book.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If book is not found
            if (_.isNil(book)) ctx.throw(404, 'Book not found');

            // Response to client
            ctx.body = {message: "Success"};
            ctx.status = 200;

            // Log results
            logger.info(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Deletes a book
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and delete book
            const book: Document | null = await Book.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If book was not found
            if (_.isNil(book)) ctx.throw(404, 'Book not found');

            // Create variable object for use by other middleware
            ctx.state = {
                bookId : book.id,
                authorId : book.toObject().author
            }

            // Response to client
            ctx.body = {message: "Success"}
            ctx.status = 200;

            // Log results
            logger.info(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch (e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log response
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Checks out a book
     * @param {RouterContext} ctx The request context object with the customer and book data
     * @param {() => Promise<void>} next The next client request
     */
    public async checkoutBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get book and customer
            const customer = await Customer.findById(ctx.request.body.customer);
            const book = await Book.findById(ctx.request.body.book);

            // Safety check to make sure book and customer are not null
            if (_.isNil(book) || _.isNil(customer)) ctx.throw(404, 'Book or customer not found')

            // Decrement book value
            book.available--;
            book.save();

            // Add book to customer's checked out books
            customer.booksCheckedOut.push(new Types.ObjectId(ctx.request.body.book));
            customer.save();

            // Response to client
            ctx.body = {message: "Success"};
            ctx.status = 200;

            // Log results
            logger.info(`Body: Success\nStatus: ${ctx.status}`)

            await next();
        } catch(e: any){
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns a book
     * @param {RouterContext} ctx The request context with the customer and book data
     * @param {() => Promise<void>} next The next client request
     */
    public async returnBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // If customer or book are not provided
            if (!ctx.request.body.customer || !ctx.request.body.book) ctx.throw(400, 'Book or customer not provided');

            // Get book and customer
            const customer = await Customer.findById(ctx.request.body.customer);
            const book = await Book.findById(ctx.request.body.book);

            // If customer or book are not found
            if (_.isNil(book) || _.isNil(customer)) ctx.throw(404, 'Book not found');

            // Get index of book in customer's book list
            const index = customer.booksCheckedOut.indexOf(ctx.request.body.book, 0);

            // If the book is not in their checked out list
            if (index === -1) ctx.throw(400, 'This book was not checked out by this customer');

            // Increase the books available count
            book.available++;
            book.save();

            // Remove book from customer list
            customer.booksCheckedOut.splice(index, 1);
            customer.save();

            // Response to client
            ctx.body = {message: "Success"}
            ctx.status = 200;

            // Log results
            logger.info(`Body: Success\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next()
        }
    }
}

// Export controller
export default new BookController();