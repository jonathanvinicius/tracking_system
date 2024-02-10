import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteDriver } from './models/routes-driver';
import { Repository } from 'typeorm';
import { UpsertRouteDriverDto } from './dto/upsert-route-driver.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Route } from 'src/routes/models/routes';
import { Counter } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class RoutesDriverService {
  constructor(
    @InjectRepository(RouteDriver)
    private routeDriverRepo: Repository<RouteDriver>,

    @InjectRepository(Route)
    private routeRepo: Repository<Route>,

    @InjectQueue('kafka-producer')
    private kafkaProducerQueue: Queue,

    @InjectMetric('route_started_counter')
    private routeStartedCounter: Counter,

    @InjectMetric('route_finished_counter')
    private routeFinishedCounter: Counter,
  ) {}

  async createOrUpdate(
    route_id: string,
    upsertRouteDriverDto: UpsertRouteDriverDto,
  ) {
    const { name: routeName, directions } = await this.routeRepo.findOne({
      where: { id: route_id },
    });

    const geoCodePoints = JSON.parse(upsertRouteDriverDto.points);

    const routeDriver = await this.routeDriverRepo.findOne({
      where: { route_id },
    });

    if (routeDriver?.id === undefined) {
      this.routeStartedCounter.inc();
      await this.routeDriverRepo.upsert({ route_id, ...upsertRouteDriverDto }, [
        'route_id',
      ]);

      await this.kafkaProducerQueue.add({
        event: 'RouteStarted',
        id: route_id,
        started_at: new Date().toISOString(),
        lat: geoCodePoints.lat,
        lng: geoCodePoints.long,
      });

      return routeDriver;
    }

    await this.routeDriverRepo.upsert({ route_id, ...upsertRouteDriverDto }, [
      'route_id',
    ]);

    await this.kafkaProducerQueue.add({
      event: 'DriverMoved',
      id: routeDriver.id,
      name: routeName,
      lat: geoCodePoints.lat,
      lng: geoCodePoints.long,
      started_at: new Date().toISOString(),
    });

    const legs = directions.routes[0].legs;
    const { lat, lng } = legs[legs.length - 1].end_location;

    if (lat === geoCodePoints.lat && lng === geoCodePoints.long) {
      this.routeFinishedCounter.inc();
      await this.kafkaProducerQueue.add({
        event: 'RouteFinished',
        id: route_id,
        name: routeName,
        lat: geoCodePoints.lat,
        lng: geoCodePoints.long,
        finished_at: new Date().toISOString(),
      });
      await this.routeDriverRepo.upsert({ route_id, ...upsertRouteDriverDto }, [
        'route_id',
      ]);
    }

    return routeDriver;
  }
}
