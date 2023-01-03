import { RouterContext } from "koa-router";
import jwt from 'jsonwebtoken';
import * as _ from 'lodash';
import pinoLogger from "../../logger/logger";
import Manager from '../models/manager.model'
import { compare } from 'bcrypt';
import IManager from "../common/interfaces/models/IManager";

// Logger
const logger = pinoLogger();

/**
 * Controller for Manager-based endpoints and logic
 */
class ManagerController {
    /**
     * Logs in a user and gives them a token
     * @param {RouterContext} ctx The request object containing the username and password.
     * @param {() => Promise<void>} next The next client request.
     */
    public async login(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Adds a new manager
     * @param {RouterContext} ctx The request object containing the new manager info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Returns a single manager
     * @param {RouterContext} ctx The request object containing the manager being requested.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Returns all managers
     * @param {RouterContext} ctx The request object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllManagers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Updates manager fields
     * @param {RouterContext} ctx The request object containing the manager to be updated and the new info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Deletes a manager
     * @param {RouterContext} ctx The request object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

}

// Export controller
export default new ManagerController();