import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './models/routes';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapsModule } from 'src/maps/maps.module';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), MapsModule],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
