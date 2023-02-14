import mongoose from 'mongoose';
import config from 'config';
import { Logger } from 'pino';

// Logging
import pinoLogger from '../../logger/logger';

// Interfaces
import IMongooseOptions from "../common/interfaces/db/IMongooseOptions";
import IMongoConnect from "../common/interfaces/config/IMongoConnect";
import { NodeEnvironment } from "../common/constants/constants";


import * as process from "process";

/**
 * Connects the API to a MongoDB database.
 */
async function dbConnect(): Promise<void> {
    // Set config and options
    const mongoConnect: IMongoConnect = config.get('mongo');
    mongoose.set('strictQuery', false);
    const options: IMongooseOptions = {
        autoIndex: true,
        family: 4,
    };

    // Instantiate logger
    const logger: Logger = pinoLogger();

    // Try to connect to the database
    try {
        await mongoose.connect(mongoConnect.uri, options);

        // Ternary to only show the URI if not in PROD since at the moment the URI includes user/pass.
        process.env.NODE_ENV !== NodeEnvironment.PROD
            ? logger.info(`Connected to MongoDB at url ${mongoConnect.uri}`)
            : logger.info('Connected to MongoDB');
    } catch (e: any) {
        logger.fatal(`There was an error loading MongoDB: ${e.message}`);
        process.exit(1);
    }
}

export default dbConnect;