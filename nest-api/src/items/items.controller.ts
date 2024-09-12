import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './items.model';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  getItems(): Item[] {
    return this.itemsService.getItems();
  }

  @Get(':id')
  getItemById(@Param('id') id: number): Item {
    return <Item>this.itemsService.getItemById(id);
  }

  @Post()
  addItem(@Body() newItem: Item): void {
    this.itemsService.addItem(newItem);
  }

  @Put(':id')
  updateItem(@Param('id') id: number, @Body() updatedItem: Item): void {
    this.itemsService.updateItem(id, updatedItem);
  }

  @Delete(':id')
  deleteItem(@Param('id') id: number): void {
    this.itemsService.deleteItem(id);
  }

  @Post('reset')
  resetItems(): void {
    this.itemsService.resetItems();
  }
}
