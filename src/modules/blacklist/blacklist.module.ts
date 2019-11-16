import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { BlackListController } from './blacklist.controlles';
import { blaklistProviders } from './blacklist.providers';
import { BlacklistService } from './blacklist.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BlackListController],
    providers: [BlacklistService, ...blaklistProviders],
    exports: [BlacklistService]
})
export class BlacklistModule {}
