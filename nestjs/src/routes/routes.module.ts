import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './models/routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsModule } from 'src/maps/maps.module';
import { RoutesGateway } from './routes/routes.gateway';
import { BullModule } from '@nestjs/bull';
import { NewPointsJob } from './new-points.job';
import { RoutesDriverService } from 'src/routes-driver/routes-driver.service';
import { RouteDriver } from 'src/routes-driver/models/routes-driver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RouteKafkaProducerJob } from './route-kafka-producer.job';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
// import { MemcachedModule } from 'src/memcached/memcached.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, RouteDriver]),
    MapsModule,
    // MemcachedModule,
    BullModule.registerQueue(
      {
        name: 'new-points-route-driver',
        defaultJobOptions: {
          attempts: 20,
          backoff: { type: 'exponential', delay: 10000 },
        },
      },
      {
        name: 'kafka-producer',
        defaultJobOptions: {
          attempts: 20,
          backoff: { type: 'exponential', delay: 10000 },
        },
      },
      {
        name: 'route-mysql',
        defaultJobOptions: {
          attempts: 20,
          backoff: { type: 'fixed', delay: 10000 },
        },
      },
    ),
    BullBoardModule.forFeature(
      {
        name: 'new-points-route-driver',
        adapter: BullMQAdapter,
      },
      {
        name: 'kafka-producer',
        adapter: BullMQAdapter,
      },
      {
        name: 'route-mysql',
        adapter: BullMQAdapter,
      },
    ),

    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
    RoutesGateway,
    NewPointsJob,
    RoutesDriverService,
    RouteKafkaProducerJob,
    makeCounterProvider({
      name: 'route_started_counter',
      help: 'Number of routes started',
    }),
    makeCounterProvider({
      name: 'route_finished_counter',
      help: 'Number of routes finished',
    }),
  ],
  exports: [
    ClientsModule,
    BullModule.registerQueue(
      {
        name: 'new-points-route-driver',
        defaultJobOptions: {
          attempts: 20,
          backoff: { type: 'exponential', delay: 10000 },
        },
      },
      {
        name: 'kafka-producer',
        defaultJobOptions: {
          attempts: 20,
          backoff: { type: 'exponential', delay: 10000 },
        },
      },
      {
        name: 'route-mysql',
        defaultJobOptions: {
          attempts: 20,
          backoff: { type: 'fixed', delay: 10000 },
        },
      },
    ),
    makeCounterProvider({
      name: 'route_started_counter',
      help: 'Number of routes started',
    }),
    makeCounterProvider({
      name: 'route_finished_counter',
      help: 'Number of routes finished',
    }),
  ],
})
export class RoutesModule {}
