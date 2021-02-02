import { Injectable } from '@nestjs/common';
import { readdirSync } from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getPackagePaths(): string[] {
    return readdirSync(join(__dirname, '../../client-apps'), { withFileTypes: true})
        .filter(dir => dir.isDirectory())
        .map(({name}) => name);
  }
}
