import { RouterContext } from "koa-router";
import _ from "lodash";
import pinoLogger from "../../logger/logger";
import Book from '../models/book.model';
import Customer from '../models/customer.model';
import {Types} from "mongoose";

// Set up logger
const logger = pinoLogger();

// Max amount due for a customer before checkout ability is restricted
const maxDue = 100;

/**
 * Middleware for checking if books are available
 */
class BookCheckout {
    /**
     * Method that checks if customer and book are provided and if the book is available
     * @param {RouterContext} ctx Router context with book
     * @param {() => Promise<void>} next Reference to next middleware or endpoint
     */
    public async bookAvailable(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // If no book provided
            if (!ctx.request.body.book) ctx.throw(400, "No book provided");

            // Get book
            const book = await Book.findById(new Types.ObjectId(ctx.request.body.book));

            // If book is not found
            if (_.isNil(book)) ctx.throw(403, 'Book not found');

            // If there are no available books
            if (book.available <= 0) ctx.throw(400, 'No books available for checkout');

            // Pass to next middleware/endpoint
            await next();
        } catch(e: any){
            // Response to client
            ctx.body = {message: e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);
        }
    }

    /**
     * Method that checks if a customer is in good standing (if they don't owe more than the max amount)
     * @param {RouterContext} ctx Router context with customer
     * @param {() => Promise<void>} next Reference to next middleware or endpoint
     */
    public async customerStanding(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // If no customer provided
            if (!ctx.request.body.customer) ctx.throw(400, 'No customer provided');

            // Get customer
            const customer = await Customer.findById(new Types.ObjectId(ctx.request.body.customer));

            // If customer is not found
            if (_.isNil(customer)) ctx.throw(403, 'Customer not found');

            // If the customer is not in good standing
            if (customer.balanceDue >= maxDue) ctx.throw(400,
                `Customer not in good standing. $${customer.balanceDue} currently due on account`);

            // Pass to next middleware/endpoint
            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message: e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);
        }
    }
}

export default new BookCheckout;