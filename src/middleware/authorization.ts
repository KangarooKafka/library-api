import {RouterContext} from "koa-router";
import Employee from '../models/employee.model'
import pinoLogger from "../../logger/logger";
import _ from "lodash";
import { compare } from 'bcrypt';
import {verify} from "jsonwebtoken";

// Create logger
const logger = pinoLogger();

// Set JWT Secret
const secret = process.env.JWT_SECRET || 'jwt-secret';

class authorization {
    /**
     * Checks a client's username and password before passing on to endpoint to get token
     * @param { RouterContext } ctx Router object containing the username and password
     * @param { () => Promise<void>} next The next middleware or endpoint
     */
    public async checkCredentials(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Username and password from client
            const providedUsername = ctx.request.body.username;
            const providedPassword = ctx.request.body.password;

            // If either username or passwords were not provided
            if (!providedPassword || !providedUsername) ctx.throw(422, 'Missing username or password')

            // Find user
            const user = await Employee.findOne({'username' : providedUsername});

            // If user was not found
            if (_.isNil(user)) ctx.throw(403, 'Username or password incorrect');

            // Compare passwords
            const matched = await compare(providedPassword, user.password);

            // If password is not correct
            if (!matched) ctx.throw(403, 'Username or password incorrect');

            // Create user object and save to state. Will be returned with token
            ctx.state = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }

            await next();
        } catch(e: any) {
            // Response to client
            ctx.body = {message: e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);
        }
    }

    public async validateToken(ctx: RouterContext, next: () => Promise<void>): Promise<void> {
        try {
            // Check if user has a token
            if (!ctx.headers.authorization) ctx.throw(403, "Access forbidden");

            // Get user token and separate from 'bearer '
            const token = ctx.headers.authorization.split(' ')[1]

            try {
                await verify(token, secret);
            } catch(e: any) {
                ctx.throw(403, "Access forbidden")
            }

            await next();

        } catch(e: any){
            // Response to client
            ctx.body = {message: e.message};
            ctx.status = e.status;

            // Log results
            logger.info(`Body: ${e.message}\nStatus: ${ctx.status}`);
        }
    }
}

export default new authorization;