import { RouterContext } from "koa-router";
import { Document, Types } from "mongoose";
import pinoLogger from "../../logger/logger";
import Customer from '../models/customer.model';
import _ from 'lodash';

// Logger
const logger = pinoLogger();

/**
 * Controller for Customer-based endpoints and logic
 */
class CustomerController {
    /**
     * Adds a customer
     * @param {RouterContext} ctx The request context object containing the new customer data.
     * @param {() => Promise<void>} next The next client request.
     */
    public async addCustomer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Create new customer entry
            const customer: Document = await new Customer(ctx.request.body).save();

            // Response to client
            ctx.body = customer;
            ctx.status = 201;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        } catch (e: any) {
            // Response to client
            ctx.body = e.message;
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }

    /**
     * Returns a customer
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getCustomer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get customer object
            const customer = await Customer.findById(new Types.ObjectId(ctx.params.id));

            // If customer is found
            if(!_.isNil(customer)){
                // Response to client
                ctx.body = customer;
                ctx.status = 200;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // If customer is not found
            else {
                // Response to client
                ctx.body = {message : "Customer not found"};
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = e.message;
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }

    /**
     * Returns all customers
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllCustomers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get customers
            const customers = await Customer.find({});

            // Response to client
            ctx.body = customers;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`)

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = e.message;
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }

    /**
     * Updates a customer info
     * @param {RouterContext} ctx The request context object containing the new customer info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateCustomer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Update customer
            const customer: Document | null = await Customer.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If customer was found
            if(!_.isNil(customer)) {
                // Response to client
                ctx.body = {message: "Success"};
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // If customer not found
            else {
                // Response to client
                ctx.body = {message: "Customer not found"};
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = e.message;
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }

    /**
     * Deletes a single customer
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteCustomers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and delete customer
            const customer: Document | null = await Customer.findByIdAndDelete(new Types.ObjectId(ctx.params.id))

            // If customer was found
            if(!_.isNil(customer)){
                // Response to client
                ctx.body = {message: "Success"};
                ctx.status = 202;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }

            // If customer is not found
            else {
                // Response to client
                ctx.body = {message: "Customer not found"};
                ctx.status = 404;

                // Log results
                logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);
            }
            // Clear req/res queue
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = e.message;
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`);

            // Clear req/res queue
            await next();
        }
    }
}

// Export controller
export default new CustomerController();