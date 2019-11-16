import { Injectable } from '@nestjs/common';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

@Injectable()
export class UtilsService {
    public getRandomString = (length: number): string =>
        Array.from(new Array(length), () => alphabet.charAt(Math.floor(Math.random() * alphabet.length))).join('')
}
