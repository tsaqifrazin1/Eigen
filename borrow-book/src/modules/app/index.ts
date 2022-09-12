import 'providers/polyfill.provider';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'utils/strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { contextMiddleware } from 'middlewares';
import { MemberModule } from "modules/members";
import configuration from "../../config/configuration";
import { BookModule } from "modules/book";
import { MembersBookModule } from "modules/members_book";
import { MembersPenaltyModule } from "modules/members_penalty";
// create subscriber

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MemberModule,
    BookModule,
    MembersBookModule,
    MembersPenaltyModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/../../migrations/*{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        migrationsRun: configService.get('runMigrations'),
        synchronize: configService.get('synchronize'),
        //create subscriber
        logging: true,
        logger: 'file',
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes('*');
  }
}
