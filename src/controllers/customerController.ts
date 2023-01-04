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

    }

    /**
     * Returns a customer
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getCustomer(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Returns all customers
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async getAllCustomers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Updates a customer info
     * @param {RouterContext} ctx The request context object containing the new customer info.
     * @param {() => Promise<void>} next The next client request.
     */
    public async updateCustomers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }

    /**
     * Deletes a single customer
     * @param {RouterContext} ctx The request context object.
     * @param {() => Promise<void>} next The next client request.
     */
    public async deleteCustomers(ctx: RouterContext, next: () => Promise<void>): Promise<void> {

    }
}

// Export controller
export default new CustomerController();