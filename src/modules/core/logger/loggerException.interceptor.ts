import {
    BadGatewayException,
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from './logger.service';

@Injectable()
export class HttpLoggerExceptionInterceptor implements NestInterceptor {
    constructor(private loggerService: LoggerService) {}

    public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            catchError((err: {}, cautch: Observable<unknown>) => {
                if (err instanceof HttpException)
                    if (500 <= err.getStatus()) {
                        this.loggerService.error(`HttpException ${err.getStatus()}: ${err.message}`);

                        return throwError(new BadGatewayException());
                    } else {
                        this.loggerService.warn(`HttpException ${err.getStatus()}: ${err.message}`);

                        return throwError(err);
                    }
                else {
                    this.loggerService.error(`Unexpected error: ${err}`);

                    return throwError(new BadGatewayException());
                }
            }),
        );
    }
}
