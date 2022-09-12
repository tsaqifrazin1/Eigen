import '../providers/polyfill.provider';

import { SnakeNamingStrategy } from '../utils/strategies/snake-naming.strategy';
import { ConfigService } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
// import {
//   UserAuthForgottenPasswordSubscriber,
//   UserAuthSubscriber,
//   UserSubscriber,
// } from 'modules/user/subscribers';

const configService = new ConfigService();

const config: ConnectionOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: +configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/modules/**/*{.entity,.index}{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: false,
  // seeds: ["src/modules/**/seeds/**/*{.ts,.js}"],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
  // subscribers: [
  //   UserSubscriber,
  //   UserAuthSubscriber,
  //   UserAuthForgottenPasswordSubscriber,
  // ],
  synchronize: true,
  logging: true,
};

export = config;
