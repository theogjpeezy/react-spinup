import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenuItemsController } from './menu-items/menu-items.controller';
import { MenuItemsService } from './menu-items/menu-items.service';
import { readdirSync } from 'fs';

const imports = readdirSync('../client-apps', {withFileTypes: true})
    .filter(dir => dir.isDirectory())
    .map(({name}) => 
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../node_modules/', name, 'build'),
            serveRoot: `/${name}`
    }));

@Module({
  imports,
  controllers: [AppController, MenuItemsController],
  providers: [AppService, MenuItemsService],
})
export class AppModule {}