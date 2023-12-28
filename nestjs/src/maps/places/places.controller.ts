import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';

@Controller('places')
export class PlacesController {
  constructor(private placeService: PlacesService) {}

  @Get()
  async findPlace(@Query('text') text: string) {
    return this.placeService.findPlace(text);
  }
}
