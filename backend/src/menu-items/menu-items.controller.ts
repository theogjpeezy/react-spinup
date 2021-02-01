import { Controller, Get } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';

@Controller('menu-items')
export class MenuItemsController {
    constructor(private readonly menuItemsService: MenuItemsService) {}

    @Get()
    public get(): string[] {
        return this.menuItemsService.getMenuItems();
    }
}
