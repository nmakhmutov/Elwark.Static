/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Controller,
    Get,
    NotFoundException,
    Param,
    Req,
    Res,
    Query,
    ParseIntPipe
} from '@nestjs/common';
import { FastifyReply as Response, FastifyRequest as Request } from 'fastify';
import { createReadStream } from 'fs';
import { RESOLUTIONS } from './image.constants';
import { ImageOrientation, ImageResolution, ImageModel } from './image.model';
import { ImageService } from './image.service';

@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }

    @Get('resolution')
    public resolution(): ImageModel[] {
        return RESOLUTIONS;
    }

    @Get('random')
    public async getRandom(@Res() res: Response<unknown>): Promise<unknown> {
        const rnd = (enm: object): string=> {
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
        @Res() res: Response<unknown>,
        @Param('name') name: ImageResolution,
        @Query('orientation') orientation: ImageOrientation = 'landscape'): Promise<unknown> {
        const resolution = this.imageService.getResolutionByName(name, orientation);

        if (!resolution)
            throw new NotFoundException(`Image type "${name}" with orientation "${orientation}" not found`);

        const imageUrl = await this.imageService.getRandomImagePathByName(resolution.name, resolution.orientation);

        return res.type('image/png')
            .send(createReadStream(imageUrl));
    }

    @Get('random/:width/:height')
    public async getRandomBySize(
        @Res() res: Response<unknown>,
        @Param('width', new ParseIntPipe()) width = 1,
        @Param('height', new ParseIntPipe()) height = 1): Promise<unknown> {

        const resolution = this.imageService.getResolutionBySize(width, height);
        const imageUrl = await this.imageService.getRandomImagePathByName(resolution.name, resolution.orientation);

        return res.type('image/png')
            .send(createReadStream(imageUrl));
    }

    @Get('admin')
    public async getAdminImages(@Req() req: Request<unknown>): Promise<unknown> {
        const result = await this.imageService.getAdminImages();

        return result.map((x) => new URL(x, `http://${req.hostname}`));
    }
}
