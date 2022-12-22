import IConfig from "../src/common/interfaces/config/IConfig";
import * as process from "process";

// Mongo URI string variables for login

const dbUser: string | undefined = process.env.DBUSER;
const dbPasswd: string | undefined = process.env.DBPASSWD;

// Config for production environment
const prodConfig: IConfig = {
    appName: 'library-api',
    port: 4000,
    host: 'localhost',
    mongo: {
        uri: `mongodb://${dbUser}:${dbPasswd}@localhost:27017/library`
    }
};

export  default prodConfig;