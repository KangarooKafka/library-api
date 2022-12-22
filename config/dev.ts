import IConfig from "../src/common/interfaces/config/IConfig";

// Config for non-production application
const devConfig: IConfig = {
    appName: 'library-api',
    port: 4000,
    host: 'localhost',
    mongo: {
        uri: 'mongodb://localhost:27017/library-dev'
    },
    pino: {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true
            }
        }
    }
};
export default devConfig;