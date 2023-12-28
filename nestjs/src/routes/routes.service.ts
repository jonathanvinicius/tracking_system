import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './models/routes';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route) private routeRepo: Repository<Route>,
    private directionsService: DirectionsService,
  ) {}

  async create(createRouteDto: CreateRouteDto) {
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionsService.getDirections(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      );

    const legs = routes[0].legs[0];
    const requestParams: CreateRouteDto = {
      name: createRouteDto.name,
      source: {
        name: legs.start_address,
        location: {
          lat: legs.start_location.lat,
          lng: legs.start_location.lng,
        },
      },
      destination: {
        name: legs.end_address,
        location: {
          lat: legs.end_location.lat,
          lng: legs.end_location.lng,
        },
      },
      distance: legs.distance.value,
      duration: legs.duration.value,
      directions: JSON.stringify({
        available_travel_modes,
        geocoded_waypoints,
        routes,
        request,
      }),
    };
    const newRoute = this.routeRepo.create(plainToClass(Route, requestParams));
    return this.routeRepo.save(newRoute);
  }

  findAll() {
    return this.routeRepo.find();
  }

  findOne(id: string) {
    return this.routeRepo.findOne({ where: { id } });
  }

  update(id: number) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
