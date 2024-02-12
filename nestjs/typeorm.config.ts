import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.getOrThrow('34.95.150.244'),
  port: configService.getOrThrow('3306'),
  database: configService.getOrThrow('tracking_system'),
  username: configService.getOrThrow('jonathan'),
  password: configService.getOrThrow('78951Root.'),
  migrations: ['src/migrations/**/*.ts'],
  entities: [],
});
