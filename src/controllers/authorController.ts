import { RouterContext } from "koa-router";
import { Document, Types } from "mongoose";
import pinoLogger from "../../logger/logger";
import Author from '../models/author.model'
import _ from 'lodash'

// Logger
const logger = pinoLogger();

/**
 * Controller for Author-based endpoints and logic
 */
class AuthorController {
    /**
     * Adds a new author
     * @param {RouterContext} ctx The request context object containing data for the new author.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Create new author entry
            const author: Document = await new Author(ctx.request.body).save();

            // Response to client
            ctx.body = author;
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
     * Returns a single author
     * @param {RouterContext} ctx The request context object containing the author requested.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get author object
            const author: Document | null = await Author.findById(new Types.ObjectId(ctx.params.id));

            // If author is not found
            if (_.isNil(author)) ctx.throw(404, 'Author not found');

            // Response to client
            ctx.body = author;
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
     * Returns authors that match query or returns all if no queries given
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async searchAuthors(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get authors
            const authors = await Author.find(ctx.query);

            // If no authors are found
            if (_.isEmpty(authors)) ctx.throw(404, 'No authors found')

            // Response to client
            ctx.body = authors;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e : any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Updates the info on an author
     * @param {RouterContext} ctx The request context object containing the author to update and the new info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateAuthors(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and update author
            const author: Document | null = await Author.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If author not found
            if (_.isNil(author)) ctx.throw(404, 'Author not found')

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
     * Deletes an author
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and delete author
            const author = await Author.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If author not found
            if (_.isNil(author)) ctx.throw(404, 'Author not found')

            // If there are no books referencing this author, the delete was clean
            if (_.isEmpty(author.books)) {
                // Response to client
                ctx.body = {message: 'Success'};
                ctx.status = 200;

                // Log results
                logger.info(`Body: Success\nStatus: ${ctx.status}`);
            }

            // If the author has books referencing it
            else {
                // Response to client
                ctx.body = {message: 'Success. The following books reference this author and need to be updated',
                    bookList: `${author.books}`}
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`)
            }

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
}

// Export controller
export default new AuthorController();