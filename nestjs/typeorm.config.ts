// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

// const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: '34.95.150.244',
  port: 3306,
  database: 'tracking_system',
  username: 'jonathan',
  password: '78951Root.',
  migrations: ['src/migrations/**/*.ts'],
  entities: [],
});
