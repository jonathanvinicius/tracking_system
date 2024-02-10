import { Module } from '@nestjs/common';
import { RouteDriver } from './models/routes-driver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesDriverController } from './routes-driver.controller';
import { RoutesDriverService } from './routes-driver.service';
import { RoutesModule } from 'src/routes/routes.module';
import { Route } from 'src/routes/models/routes';

@Module({
  imports: [TypeOrmModule.forFeature([RouteDriver, Route]), RoutesModule],
  controllers: [RoutesDriverController],
  providers: [RoutesDriverService],
  exports: [RoutesDriverService],
})
export class RoutesDriverModule {}
