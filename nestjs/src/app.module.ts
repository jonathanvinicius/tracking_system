import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { MapsModule } from './maps/maps.module';
import { RoutesDriverModule } from './routes-driver/routes-driver.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RoutesModule,
    DatabaseModule,
    MapsModule,
    RoutesDriverModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
