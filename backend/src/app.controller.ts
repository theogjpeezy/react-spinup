import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHomePage(): string {
    return `
        <html>
            <body>
                <ul>
                    ${this.appService.getPackagePaths().map(appName => `<li><a href="/${appName}">${appName}</a></li>`).join(' ')}
                </ul>
            </body>
        </html>
    `;
  }
}
