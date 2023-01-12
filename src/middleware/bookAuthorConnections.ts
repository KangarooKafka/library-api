import {RouterContext} from "koa-router";
import pinoLogger from "../../logger/logger";
import Author from '../models/author.model';
import {Types} from "mongoose";


// Set up logger
const logger = pinoLogger();

class bookAuthorConnections {
    /**
     * Adds a book to an author's list when a new book is added
     * @param {RouterContext} ctx Router context with author and book id saved to ctx.state
     * @param {() => Promise<void>} next Next middleware or endpoint
     */
    public async addBookToAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get book and author ids from ctx state
            const bookId = ctx.state.bookId;
            const authorId = ctx.state.authorId;

            // Get author object
            const author = await Author.findById(new Types.ObjectId(authorId));

            // Safety if author object is valid
            if (author && author.books) {
                // Add book to author's book list
                author.books.push(bookId);
                author.save();
            }

            await next();
        } catch (e: any) {
            // Response to client
            ctx.body = {message: e.message}
            ctx.state = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Removes a book from an author's book list
     * @param {RouterContext} ctx Router context with author and book id saved to ctx.state
     * @param {() => Promise<void>} next Next middleware or endpoint
     */
    public async removeBookFromAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get book and author ids from ctx state
            const bookId = ctx.state.bookId;
            const authorId = ctx.state.authorId;

            // Get author object
            const author = await Author.findById(new Types.ObjectId(authorId));

            // Safety if author object is valid
            if (author && author.books) {
                // Find book in author's book list
                const index = author.books.indexOf(bookId, 0);

                // If found
                if (index > -1) {
                    // Remove book
                    author.books.splice(index,1);
                    author.save();
                }
            }

            await next();

        } catch(e: any) {
            // Response to client
            ctx.body = {message: e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
        }
    }
}

export default new bookAuthorConnections;