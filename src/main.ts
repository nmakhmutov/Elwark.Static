import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { config } from 'dotenv';
import { join } from 'path';
import { ApiModule } from './modules/api.module';
import { LoggerService } from './modules/core/logger/logger.service';
import { ImageModule } from './modules/image/image.module';
import { ImageWorker } from './modules/image/image.worker';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function bootstrap(): Promise<void> {
    config();

    const app = await NestFactory.create<NestFastifyApplication>(ApiModule, new FastifyAdapter(), {
        logger: false,
    });
    app.useLogger(app.get(LoggerService));
    app.enableCors();
    app.useStaticAssets({
        prefix: '/static',
        root: join(__dirname, '..', 'public'),
    });

    app.select(ImageModule).get(ImageWorker, { strict: true }).Start();

    app.select(SeedModule).get(SeedService, { strict: true }).Seed();

    await app.listenAsync(process.env.SERVER_PORT || 3000, '0.0.0.0');
}
bootstrap();
