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

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
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

            // If author is found
            if(!_.isNil(author)){
                // Response to client
                ctx.body = author;
                ctx.status = 200;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // If author is not found
            else {
                // Response to client
                ctx.body = {message: "Author not found"}
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }

    /**
     * Returns all authors
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllAuthors(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get authors
            const authors = await Author.find({});

            // If no authors are found
            if(!_.isEmpty(authors)){
                // Response to client
                ctx.body = authors;
                ctx.status = 200;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // If at least one author is found
            else {
                // Response to client
                ctx.body = {message: "No authors found"}
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // Clear req/res queue
            await next();
        } catch(e : any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
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

            // Response to client
            ctx.body = {message: "Success"};
            ctx.status = 202;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
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
            const author: Document | null = await Author.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // Response to client
            ctx.body = author;
            ctx.status = 202;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }
}

// Export controller
export default new AuthorController();