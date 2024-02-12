import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteDriver } from 'src/routes-driver/models/routes-driver';
import { Route } from 'src/routes/models/routes';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: '34.95.150.244',
        port: 3306,
        database: 'tracking_system',
        username: 'jonathan',
        password: '78951Root.',
        autoLoadEntities: true,
        synchronize: true,
        entities: [Route, RouteDriver],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
