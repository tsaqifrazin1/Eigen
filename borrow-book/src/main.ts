import { Reflector, NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from 'modules/app';
import helmet from 'helmet';
// import { HttpExceptionFilter, QueryFailedFilter } from 'filters';
import * as RateLimit from 'express-rate-limit';
import * as morgan from 'morgan';
import { setupSwagger } from 'utils';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  initializeTransactionalContext();
  patchTypeORMRepositoryWithBaseRepository();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    // new ExpressAdapter(),
    // { cors: true },
  );

  app.enable('trust proxy');
  app.setGlobalPrefix('v1')
  app.use(helmet());
  app.use(RateLimit.rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
  app.use(compression());
  app.use(morgan('combined'));
  // app.setGlobalPrefix('bank');

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app
    .useGlobalFilters
    // new HttpExceptionFilter(reflector),
    // new QueryFailedFilter(reflector),
    ();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  setupSwagger(app);
  await app.listen(configService.get('PORT'));
}

void bootstrap();
