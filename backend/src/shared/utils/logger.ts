import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';

export const loggerInstance = WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('TodosApp', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
    // In production, we could add File transports or external logging services here
  ],
});
