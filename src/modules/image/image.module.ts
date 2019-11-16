import { Module } from '@nestjs/common';
import { UtilsService } from '../core/utils/utils.service';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ImageWorker } from './image.worker';

@Module({
    imports: [UtilsService],
    controllers: [ImageController],
    providers: [ImageService, ImageWorker],
    exports: [ImageService, ImageWorker]
})
export class ImageModule { }
