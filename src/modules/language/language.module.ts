import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { LanguageController } from './language.controller';
import { languageProviders } from './language.providers';
import { LanguageService } from './language.service';

@Module({
    imports: [DatabaseModule],
    controllers: [LanguageController],
    providers: [LanguageService, ...languageProviders],
    exports: [LanguageService],
})
export class LanguageModule {}
