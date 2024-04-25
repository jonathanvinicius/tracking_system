// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

// const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: 'your_host',
  port: 3306,
  database: 'your_db',
  username: 'your_username',
  password: 'your_password',
  migrations: ['src/migrations/**/*.ts'],
  entities: [],
});
