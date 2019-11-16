import { Controller, Get, Param } from '@nestjs/common';
import { BlacklistType } from './blacklist.interface';
import { BlacklistService } from './blacklist.service';

@Controller('blacklist')
export class BlackListController {
    constructor(private readonly blacklistService: BlacklistService) { }

    @Get('password')
    public async GetPassword(): Promise<string[]> {
        const result = await this.blacklistService.GetByType(BlacklistType.Password);

        return result.map((x) => x.value);
    }

    @Get('password/:password')
    public async IsPasswordForbidden(@Param('password') password: string): Promise<boolean> {
        const result = await this.blacklistService.IsContains(BlacklistType.Password, password);

        return result;
    }

    @Get('email')
    public async GetEmail(): Promise<string[]> {
        const result = await this.blacklistService.GetByType(BlacklistType.Email);

        return result.map((x) => x.value);
    }

    @Get('email/:email')
    public async IsEamilForbidden(@Param('email') email: string): Promise<boolean> {
        const result = await this.blacklistService.IsContains(BlacklistType.Email, email);

        return result;
    }
}
