export enum ImageResolution {
    VGA = 'vga',
    SVGA = 'svga',
    XGA = 'xga',
    HD = 'hd',
    WHD = 'whd',
    WXGAplus = 'wxgaplus',
    HDplus = 'hdplus',
    FHD = 'fhd',
    QHD = 'qhd',
    UHD = 'uhd'
}

export type ImageOrientation = 'landscape' | 'portrait';

export class ImageModel {

    public pixels: number;

    public orientation: ImageOrientation =
        this.width >= this.height ? 'landscape' : 'portrait';

    constructor(public name: ImageResolution, public width: number, public height: number) {
        this.pixels = width * height;
    }
}
