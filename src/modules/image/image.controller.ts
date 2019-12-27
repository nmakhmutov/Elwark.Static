import {
    Controller,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Query,
    Req,
    Res
    } from '@nestjs/common';
import { FastifyReply as Response, FastifyRequest as Request } from 'fastify';
import { createReadStream } from 'fs';
import { RESOLUTIONS } from './image.constants';
import { ImageOrientation, ImageResolution } from './image.model';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Get('resolution')
    public resolution() {
        return RESOLUTIONS;
    }

    @Get('random')
    public async getRandom(@Res() res: Response<any>) {
        const rnd = (enm: object) => {
            const vals = Object.keys(enm);
            const rndIndex = Math.floor(Math.random() * vals.length);
            return vals[rndIndex];
        };

        const resolution: ImageResolution = rnd(ImageResolution) as ImageResolution;
        const orientation: ImageOrientation = Math.floor(Math.random() * 2) % 2 === 0 ? 'landscape' : 'portrait';
        const imageUrl = await this.imageService.getRandomImagePathByName(resolution, orientation);

        return res.type('image/png')
            .send(createReadStream(imageUrl));
    }

    @Get('random/:name')
    public async getRandomByName(
        @Res() res: Response<any>,
        @Param('name') name: ImageResolution,
        @Query('orientation') orientation: ImageOrientation = 'landscape') {
        const resolution = this.imageService.getResolutionByName(name, orientation);

        if (!resolution)
            throw new NotFoundException(`Image type "${name}" with orientation "${orientation}" not found`);

        const imageUrl = await this.imageService.getRandomImagePathByName(resolution.name, resolution.orientation);

        return res.type('image/png')
            .send(createReadStream(imageUrl));
    }

    @Get('random/:width/:height')
    public async getRandomBySize(
        @Res() res: Response<any>,
        @Param('width', new ParseIntPipe()) width: number = 1,
        @Param('height', new ParseIntPipe()) height: number = 1) {

        const resolution = this.imageService.getResolutionBySize(width, height);
        const imageUrl = await this.imageService.getRandomImagePathByName(resolution.name, resolution.orientation);

        return res.type('image/png')
            .send(createReadStream(imageUrl));
    }

    @Get('admin')
    public async getAdminImages(@Req() req: Request<any>) {
        const result = await this.imageService.getAdminImages();

        return result.map((x) => new URL(x, `http://${req.hostname}`));
    }
}
