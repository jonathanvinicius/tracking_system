import { Module } from '@nestjs/common';
import { RouteDriver } from './models/routes-driver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesDriverController } from './routes-driver.controller';
import { RoutesDriverService } from './routes-driver.service';

@Module({
  imports: [TypeOrmModule.forFeature([RouteDriver])],
  controllers: [RoutesDriverController],
  providers: [RoutesDriverService],
})
export class RoutesDriverModule {}
