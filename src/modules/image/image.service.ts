import { Injectable } from '@nestjs/common';
import { readdir, statSync } from 'fs';
import { basename, resolve } from 'path';
import { promisify } from 'util';
import { ADMIN_ICONS_FOLDER, getFilePrefix, IMAGE_RANDOM_FOLDER, MAX_IMAGES_COUNT, RESOLUTIONS } from './image.constants';
import { ImageModel, ImageOrientation, ImageResolution } from './image.model';

@Injectable()
export class ImageService {
    public getRandomImagePathByName = async (name: ImageResolution, orientation: ImageOrientation): Promise<string> => {
        const files = await promisify(readdir)(IMAGE_RANDOM_FOLDER);
        const images = files.map((file) => resolve(IMAGE_RANDOM_FOLDER, file))
            .map((image) => ({ path: image, creation: statSync(image).birthtimeMs }))
            .sort((first, second) => second.creation - first.creation)
            .slice(0, MAX_IMAGES_COUNT)
            .filter((file) => basename(file.path).indexOf(getFilePrefix(name, orientation)) === 0);

        const imageIndex = Math.floor(Math.random() * images.length);

        return images[imageIndex].path;
    }

    public getResolutionBySize = (width: number, height: number): ImageModel => {
        const orientation: ImageOrientation = width >= height
            ? 'landscape'
            : 'portrait';

        const images = RESOLUTIONS.filter((x) => x.orientation === orientation)
            .sort((a, b) => b.pixels - a.pixels);
        const pixels = width * height;

        return images.reduce((prev, curr) =>
            Math.abs(curr.pixels - pixels) < Math.abs(prev.pixels - pixels)
                ? curr
                : prev
        );
    }

    public getAdminImages = async () => {
        const files = await promisify(readdir)(ADMIN_ICONS_FOLDER);
        const images = files.map((file) => resolve(ADMIN_ICONS_FOLDER, file))
            .map((path) => path.substr(path.indexOf('public'), path.length).replace('public', 'static'));

        return images;
    }

    public getResolutionByName = (name: ImageResolution, orientation: ImageOrientation = 'landscape') =>
        RESOLUTIONS.find((x) => x.name === name && x.orientation === orientation)
}
