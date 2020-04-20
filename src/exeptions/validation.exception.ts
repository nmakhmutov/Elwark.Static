import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(message: string) {
        super(HttpException.createBody(message, 'VALIDATION_EXEPTION', HttpStatus.BAD_REQUEST), HttpStatus.BAD_REQUEST);
    }
}
