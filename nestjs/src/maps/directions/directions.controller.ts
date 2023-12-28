import { Controller, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { Get } from '@nestjs/common';

@Controller('directions')
export class DirectionsController {
  constructor(private directionsService: DirectionsService) {}

  @Get()
  getDirections(
    @Query('originId') originId: string,
    @Query('destinationId') destinationId: string,
  ) {
    return this.directionsService.getDirections(originId, destinationId);
  }
}
