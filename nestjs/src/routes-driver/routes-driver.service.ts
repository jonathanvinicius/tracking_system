import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteDriver } from './models/routes-driver';
import { Repository } from 'typeorm';
import { UpsertRouteDriverDto } from './dto/upsert-route-driver.dto';

@Injectable()
export class RoutesDriverService {
  constructor(
    @InjectRepository(RouteDriver)
    private routeDriverRepo: Repository<RouteDriver>,
  ) {}

  async createOrUpdate(
    route_id: string,
    upsertRouteDriverDto: UpsertRouteDriverDto,
  ) {
    await this.routeDriverRepo.upsert({ route_id, ...upsertRouteDriverDto }, [
      'route_id',
    ]);
  }
}
