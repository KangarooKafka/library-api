import IMongoConnect from './IMongoConnect';
import IPinoConfig from './IPinoConfig';

// Interface for default configuration
export default interface IConfig {
    appName: string;
    port: number,
    host: string,
    mongo?: IMongoConnect;
    pino?: IPinoConfig;
}