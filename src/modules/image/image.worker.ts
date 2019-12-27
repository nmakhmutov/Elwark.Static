import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdir, statSync, unlink, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { get } from 'request-promise';
import { promisify } from 'util';
import { LoggerService } from '../core/logger/logger.service';
import { UtilsService } from '../core/utils/utils.service';
import { getFilePrefix, IMAGE_RANDOM_FOLDER, MAX_IMAGES_COUNT, RESOLUTIONS } from './image.constants';

@Injectable()
export class ImageWorker {
    private loadingTimer: NodeJS.Timer;
    private cleaningTimer: NodeJS.Timer;

    constructor(private readonly loggerService: LoggerService, private readonly utils: UtilsService) {
        if (!existsSync(IMAGE_RANDOM_FOLDER))
            mkdirSync(IMAGE_RANDOM_FOLDER, { recursive: true });

        readdir(IMAGE_RANDOM_FOLDER, async (_, files) => {
            let count = files.length;
            while (count <= MAX_IMAGES_COUNT)
                count += await this.loadImages();
        });
    }

    public Start(): void {
        this.loggerService.info(`Starting ${ImageWorker.name}`);

        setInterval(() => this.loadImages(), this.milliseconds(0, 9, 0));
        setInterval(() => this.deleteImages(), this.milliseconds(0, 11, 0));
    }

    private loadImages = async (): Promise<number> => {
        this.loggerService.info('Starting load new random images');

        const images = RESOLUTIONS
            .map((x) => this.getRandomImage(x.width, x.height)
                .then((data) => {
                    writeFileSync(
                        join(IMAGE_RANDOM_FOLDER, getFilePrefix(x.name, x.orientation, `${this.utils.getRandomString(10)}.jpg`)),
                        data);
                    return true;
                }
                ).catch((err) => {
                    this.loggerService.error(`An error has occurred when image was loading ${err.message}`);
                    return false;
                }));

        const result = await Promise.all(images);
        const count = result.filter((x) => x).length;
        this.loggerService.info(`Loaded ${result.filter((x) => x).length} images`);

        return count;
    }

    private deleteImages = async (): Promise<number> => {
        const files = await promisify(readdir)(IMAGE_RANDOM_FOLDER);
        const images = files.map((file) => resolve(IMAGE_RANDOM_FOLDER, file))
            .map((image) => ({ path: image, creation: statSync(image).birthtimeMs }))
            .sort((first, second) => second.creation - first.creation)
            .slice(MAX_IMAGES_COUNT);

        if (images.length === 0)
            return 0;

        this.loggerService.info(`Starting delete ${images.length} old images`);

        const result = await images.map((item) =>
            promisify(unlink)(item.path)
                .then(() => true)
                .catch(() => false))
            .filter((x) => x);

        this.loggerService.warn(`Deleted ${result.length} old images`);

        return result.length;
    }

    private milliseconds = (h: number, m: number, s: number): number => ((h * 60 * 60 + m * 60 + s) * 1000);

    private getRandomImage = async (width: number, height: number) => {
        const providers = [
            `http://picsum.photos/${width}/${height}/?random`,

            `https://source.unsplash.com/random/${width}x${height}?nature`,
            `https://source.unsplash.com/random/${width}x${height}?arch`,

            `https://placeimg.com/${width}/${height}/arch`,
            `https://placeimg.com/${width}/${height}/nature`
        ];

        const provider = providers[Math.floor(Math.random() * providers.length)];
        this.loggerService.info(`Start loading image from ${provider}`);

        return get(provider, { resolveWithFullResponse: true, encoding: null })
            .then((res: any) => Buffer.from(res.body));
    }
}
