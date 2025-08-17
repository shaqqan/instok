import winston from "winston";
import { config } from "../../config";
const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        return Object.assign({
            message: info.message,
            stack: info.stack,
        }, info);
    }
    return info;
});
function createLogger() {
    const level = config.LOG_LEVEL;
    const isProd = config.NODE_ENV === "production";
    const logger = winston.createLogger({
        level,
        format: winston.format.combine(enumerateErrorFormat(), winston.format.timestamp(), winston.format.errors({ stack: true }), isProd
            ? winston.format.json()
            : winston.format.printf(({ level, message, timestamp, stack, ...rest }) => {
                const meta = Object.keys(rest).length ? ` ${JSON.stringify(rest)}` : "";
                const stackStr = stack ? `\n${stack}` : "";
                return `${timestamp} ${level}: ${message}${meta}${stackStr}`;
            })),
        transports: [new winston.transports.Console()],
    });
    return {
        debug: (msg, meta) => logger.debug(msg, meta ? { meta } : undefined),
        info: (msg, meta) => logger.info(msg, meta ? { meta } : undefined),
        warn: (msg, meta) => logger.warn(msg, meta ? { meta } : undefined),
        error: (msg, meta) => logger.error(msg, meta ? { meta } : undefined),
    };
}
export const logger = createLogger();
//# sourceMappingURL=index.js.map