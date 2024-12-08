import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ezrantn',
  database: 'hyfit',
  entities: ['dist/**/*.entity.ts'],
  migrations: ['dist/migrations/*.ts'],
});

AppDataSource.initialize();
