import { RouterContext } from "koa-router";
import { Document, Types } from "mongoose";
import pinoLogger from "../../logger/logger";
import Book from '../models/book.model';
import _ from 'lodash';

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

    }

    /**
     * Returns a single book
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Returns all books
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllBooks(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Updates a single book info
     * @param {RouterContext} ctx The request context object containing the new book data.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Deletes a book
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteBook(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }
}

// Export controller
export default new BookController();