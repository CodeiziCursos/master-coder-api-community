import { Controller, Get } from '@nestjs/common';
@Controller('healthCheck')
export class AppController {
  @Get()
  healthCheck(): number {
    return process.uptime();
  }
}
