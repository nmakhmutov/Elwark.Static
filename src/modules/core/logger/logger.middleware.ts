import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerServise: LoggerService) { }

  public use(req: unknown, res: Response, next: () => void): void {
    const {method, url, ip, headers} = req as {method: string; url: string; ip: string; headers: JSON};

    this.loggerServise.info(`${method} ${url} ${ip}`);

    this.loggerServise.debug('HEADERS:\n' + JSON.stringify(headers, null, 4));
    next();
  }
}
