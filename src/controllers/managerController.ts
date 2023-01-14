import { RouterContext } from "koa-router";
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import pinoLogger from "../../logger/logger";
import Manager from '../models/manager.model'
import { compare } from 'bcrypt';
import IManager from "../common/interfaces/models/IManager";
import {Document, Types} from "mongoose";

// Logger
const logger = pinoLogger();

// Get secret from env or set a new one
const secret = process.env.JWT_SECRET || 'jwt-secret';

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
        try {
            // Create response object
            const returnObject = {
                // User info
                user: ctx.state,

                // Token, expires in one hour
                token: jwt.sign({
                    userId: ctx.state.id,
                    exp:Math.floor(Date.now() / 1000) + 3600
                }, secret )
            };

            // Response to client
            ctx.body = returnObject;
            ctx.status = 200;

        } catch(e:any) {
            // Response to client
            ctx.body = {message: e.message}
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Adds a new manager
     * @param {RouterContext} ctx The request object containing the new manager info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Create new manager entry
            const manager: Document = await new Manager(ctx.request.body).save();

            // Response to client
            ctx.body = manager;
            ctx.status = 201;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch (e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Returns a single manager
     * @param {RouterContext} ctx The request object containing the manager being requested.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try{
            // Get manager object
            const manager: Document | null = await Manager.findById(new Types.ObjectId(ctx.params.id));

            // If manager not found
            if (_.isNil(manager)) ctx.throw(404, 'Manager not found');

            // Response to client
            ctx.body = manager;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e : any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            await next();
        }
    }

    /**
     * Returns all managers
     * @param {RouterContext} ctx The request object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async searchManagers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get managers
            const managers = await Manager.find(ctx.query);

            // If no managers found
            if (_.isEmpty(managers)) ctx.throw(404, 'No managers found');

            // Response to client
            ctx.body = managers;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch (e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Updates manager fields
     * @param {RouterContext} ctx The request object containing the manager to be updated and the new info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and update manager
            const manager: Document | null = await Manager.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If manager not found
            if (_.isNil(manager)) ctx.throw(404, 'Manager not found');

            // Response to client
            ctx.body = {message: "Success"};
            ctx.status = 202;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e : any){
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        }
    }

    /**
     * Deletes a manager
     * @param {RouterContext} ctx The request object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteManager(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and delete manager
            const manager: Document | null = await Manager.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            if (_.isNil(manager)) ctx.throw(404, 'Manager not found');

            // Response to client
            ctx.body = {message: "Success"};
            ctx.status = 202;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        } catch(e: any){
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            await next();
        }
    }

}

// Export controller
export default new ManagerController();