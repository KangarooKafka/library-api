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

    }

    /**
     * Returns a single author
     * @param {RouterContext} ctx The request context object containing the author requested.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Returns all authors
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllAuthors(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Updates the info on an author
     * @param {RouterContext} ctx The request context object containing the author to update and the new info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateAuthors(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Deletes an author
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteAuthor(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }
}

// Export controller
export default new AuthorController();