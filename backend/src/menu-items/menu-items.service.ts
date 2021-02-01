import { Injectable } from '@nestjs/common';
import * as config from '../config.json';

@Injectable()
export class MenuItemsService {
    public getMenuItems(): string[] {
        return config.menuComponent.menuItems;
    }
}
