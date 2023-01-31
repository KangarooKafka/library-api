// Interface to use for Mongoose options
export default interface IMongooseOptions {
    bufferCommands?: boolean;
    user?: string;
    pass?: string;
    autoIndex?: boolean;
    dbName?: string;
    promiseLibrary?: string;
    maxPoolSize?: number;
    minPoolSize?: number;
    socketTimeoutMS?: number;
    family?: number;
    authSource?: string;
    serverSelectionTimeout?: number;
    heartBestFrequencyMS?: number;
    strictQuery?: boolean;
}