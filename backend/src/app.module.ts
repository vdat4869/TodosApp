import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './modules/health/health.module';
import appConfig from './config/app.config';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    PrismaModule,
    HealthModule,
    // Add other feature modules here: AuthModule, UserModule, TodoModule, etc.
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
