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

            await next();
        } catch (e: any) {
            // Response to client
            ctx.body = {message : e.message};
            ctx.status = 500;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);

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
            const customer: Document | null = await Customer.findById(new Types.ObjectId(ctx.params.id));

            // If customer is not found
            if (_.isNil(customer)) ctx.throw(404, 'Customer not found')

            // Response to client
            ctx.body = customer;
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
     * Returns customers that match query or returns all if no queries given
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async searchCustomers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Get customers
            const customers = await Customer.find(ctx.query);

            // If no customers were found
            if (_.isEmpty(customers)) ctx.throw(404, 'No customers found');

            // Response to client
            ctx.body = customers;
            ctx.status = 200;

            // Log results
            logger.info(`Body: ${ctx.body}\nStatus: ${ctx.status}`)

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
     * Updates a customer info
     * @param {RouterContext} ctx The request context object containing the new customer info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateCustomer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and update customer
            const customer: Document | null = await Customer.findByIdAndUpdate(new Types.ObjectId(ctx.params.id), ctx.request.body);

            // If customer not found
            if (_.isEmpty(customer)) ctx.throw(404, 'Customer not found');

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
     * Deletes a single customer
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteCustomer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Find and delete customer
            const customer = await Customer.findByIdAndDelete(new Types.ObjectId(ctx.params.id));

            // If customer not found
            if (_.isNil(customer)) ctx.throw(404, 'Customer not found')

            // If there are no books in the customer's book list
            if (_.isEmpty(customer.booksCheckedOut)) {
                // Response to client
                ctx.body = {message: 'Success'};
                ctx.status = 200;

                // Log results
                logger.info(`Body: Success\nStatus: ${ctx.status}`);
            }

            // If the customer has books checked out
            else {
                // Response to client
                ctx.body = {message: 'Success. The following books are currently checked out by this customer',
                    bookList: `${customer.booksCheckedOut}`}
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
export default new CustomerController();