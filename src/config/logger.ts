import * as appInsights from "applicationinsights";
import { envs } from "./envs";
import winston from "winston";

appInsights
    .setup(envs.APPINSIGHTS_CONNECTION_STRING)
    .setSendLiveMetrics(true)
    .setAutoCollectConsole(false)
    .start();

const aiClient = appInsights.defaultClient;
const appInsightsTrasport = new winston.transports.Console({
    level: 'info',
    format: winston.format.printf((obj) => {
        const level = obj.level;
        const message = obj.message;
        const timestamp = obj.timestamp;
        aiClient.trackTrace({
            message: `${timestamp} [${level}]: ${message}`
        });
        return `${timestamp} [${level}]: ${message}`;
    })
});

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console()
    ]
});
