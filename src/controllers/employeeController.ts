import { RouterContext } from "koa-router";
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import pinoLogger from "../../logger/logger";
import Employee from '../models/employee.model'
import { compare } from 'bcrypt';
import IEmployee from "../common/interfaces/models/IEmployee";
import {Document, Types} from "mongoose";

// Logger
const logger = pinoLogger();

// Get secret from env or set a new one
const secret = process.env.JWT_SECRET || 'jwt-secret';

/**
 * Controller for Employee-based endpoints and logic
 */
class employeeController {
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
     * Adds a new Employee
     * @param {RouterContext} ctx The request object containing the new Employee info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addEmployee(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Create new Employee entry
            const employee: Document = await new Employee(ctx.request.body).save();

            // Response to client
            ctx.body = employee;
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
     * Returns a single employee
     * @param {RouterContext} ctx The request object containing the Employee being requested.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getEmployee(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try{
            // Get employee object
            const employee: Document | null = await Employee.findById(new Types.ObjectId(ctx.params.id));

            // If employee not found
            if (_.isNil(employee)) ctx.throw(404, 'Employee not found');

            // Response to client
            ctx.body = employee;
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
     * Returns all Employees
     * @param {RouterContext} ctx The request object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async searchEmployees(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get employees
            const employees = await Employee.find(ctx.query);

            // If no employees found
            if (_.isEmpty(employees)) ctx.throw(404, 'No employees found');

            // Response to client
            ctx.body = employees;
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
     * Updates Employee fields
     * @param {RouterContext} ctx The request object containing the Employee to be updated and the new info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateEmployee(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and update Employee
            const employee: Document | null = await Employee.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If Employee not found
            if (_.isNil(employee)) ctx.throw(404, 'Employee not found');

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
     * Deletes a Employee
     * @param {RouterContext} ctx The request object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteEmployee(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and delete Employee
            const employee: Document | null = await Employee.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            if (_.isNil(employee)) ctx.throw(404, 'Employee not found');

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
export default new employeeController();