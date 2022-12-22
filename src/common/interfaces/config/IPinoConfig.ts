// Config format for Pino (logger)
export default interface IPinoConfig {
    transport: {
        target: string;
        options: {
            colorize: boolean;
        };
    };
}