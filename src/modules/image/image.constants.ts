import { join } from 'path';
import { ImageModel, ImageOrientation, ImageResolution } from './image.model';

export const RESOLUTIONS = [
    new ImageModel(ImageResolution.VGA, 640, 480),
    new ImageModel(ImageResolution.VGA, 480, 640),
    new ImageModel(ImageResolution.SVGA, 800, 600),
    new ImageModel(ImageResolution.SVGA, 600, 800),
    new ImageModel(ImageResolution.XGA, 1024, 768),
    new ImageModel(ImageResolution.XGA, 768, 1024),
    new ImageModel(ImageResolution.HD, 1280, 720),
    new ImageModel(ImageResolution.HD, 720, 1280),
    new ImageModel(ImageResolution.WHD, 1366, 768),
    new ImageModel(ImageResolution.WHD, 768, 1366),
    new ImageModel(ImageResolution.WXGAplus, 1440, 900),
    new ImageModel(ImageResolution.WXGAplus, 900, 1440),
    new ImageModel(ImageResolution.HDplus, 1600, 900),
    new ImageModel(ImageResolution.HDplus, 900, 1600),
    new ImageModel(ImageResolution.FHD, 1920, 1080),
    new ImageModel(ImageResolution.FHD, 1080, 1920),
    new ImageModel(ImageResolution.QHD, 2560, 1440),
    new ImageModel(ImageResolution.QHD, 1440, 2560),
    new ImageModel(ImageResolution.UHD, 3840, 2160),
    new ImageModel(ImageResolution.UHD, 2160, 3840),
];

export const MAX_IMAGES_COUNT = RESOLUTIONS.length * 30;

export const PUBLIC_FOLDER = join(__dirname, '..', '..', '..', 'public');

export const IMAGE_FOLDER = join(PUBLIC_FOLDER, 'images');

export const IMAGE_RANDOM_FOLDER = join(IMAGE_FOLDER, 'random');

export const getFilePrefix = (name: ImageResolution, orientation: ImageOrientation, ...args: string[]): string =>
    `${name.toLowerCase()}_${orientation.toLowerCase()}` + (args.length > 0 ? '_' + args.join('_') : '');
