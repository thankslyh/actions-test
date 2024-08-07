import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/redis')
  redis() {
    return this.appService.getRedisKey();
  }

  @Get('/mysql')
  mysql() {
    return this.appService.getMysqlData();
  }

  @Get('/deploy')
  deploy() {
    return 'deploy success7';
  }
}
