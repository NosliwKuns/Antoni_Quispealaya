import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { IncomingMessage, ServerResponse } from 'http';
import {
  CorrelationIdMiddleware,
  CORRELATION_ID_HEADER,
} from './midlewares/correlation-id.middleware';
import { ItinerariesModule } from './modules/itineraries/itineraries.module';
import { BusesModule } from './modules/buses/buses.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                },
              }
            : undefined,
        messageKey: 'message',
        customProps: (
          req: IncomingMessage,
          res: ServerResponse<IncomingMessage>,
        ) => {
          return {
            correlationId: req[CORRELATION_ID_HEADER],
          };
        },
      },
    }),
    ItinerariesModule,
    BusesModule,
    ReservationsModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})

//--------------------------------------------------------//
export class AppModule implements NestModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = +this.configService.get('PORT_APP'); //  +  -->  cast to number
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationIdMiddleware).forRoutes('*');
  }
}
