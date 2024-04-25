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
        host: 'host',
        port: 3306,
        database: 'your_database',
        username: 'your_username',
        password: 'your_password',
        autoLoadEntities: true,
        synchronize: true,
        entities: [Route, RouteDriver],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
