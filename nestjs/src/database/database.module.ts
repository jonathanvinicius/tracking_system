import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteDriver } from 'src/routes-driver/models/routes-driver';
import { Route } from 'src/routes/models/routes';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        entities: [Route, RouteDriver],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
