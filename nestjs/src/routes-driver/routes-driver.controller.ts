import { Body, Controller, Param, Post } from '@nestjs/common';
import { RoutesDriverService } from './routes-driver.service';
import { UpsertRouteDriverDto } from './dto/upsert-route-driver.dto';

@Controller('routes-driver')
export class RoutesDriverController {
  constructor(private readonly routeDriverService: RoutesDriverService) {}

  @Post(':route_id')
  async upsert(
    @Param('route_id') route_id: string,
    @Body() upsertRouteDriverDto: UpsertRouteDriverDto,
  ) {
    return this.routeDriverService.createOrUpdate(
      route_id,
      upsertRouteDriverDto,
    );
  }
}
