import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { TimezoneController } from './timezone.controller';
import { timezoneProviders } from './timezone.providers';
import { TimezoneService } from './timezone.service';

@Module({
    imports: [DatabaseModule],
    controllers: [TimezoneController],
    providers: [TimezoneService, ...timezoneProviders],
    exports: [TimezoneService],
})
export class TimezoneModule {}
