import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerServise: LoggerService) { }

  public use(req: Request, res: Response, next: () => void) {
    this.loggerServise.info(`${req.method} ${req.url} ${(req as any).ip}`);

    this.loggerServise.debug('HEADERS:\n' + JSON.stringify(req.headers, null, 4));
    next();
  }
}
