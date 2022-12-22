import config from 'config';
import pino, { Logger } from 'pino';

// Enum for environments
import { NodeEnvironment } from '../src/common/constants/constants';

/**
 * Creates a pino logger. If the environment is 'development', creates an instance of the pino
 * logger that has the proper formatting options
 * @returns {Logger} An instance of pino, or formatted instance of pino if the Node Environment is 'develop'.
 */
export default function pinoLogger(): Logger {
    // Get environment
    const env: string = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : NodeEnvironment.DEV;

    // Enrich pino logger with formatting options if the Node Environment is development.
    if (env === NodeEnvironment.DEV) {
        return pino(config.get('pino'));
    }

    return pino();
}