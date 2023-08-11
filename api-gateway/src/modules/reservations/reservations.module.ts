import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ReservationsController],
  providers: [
    {
      provide: 'RESERVATIONS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('RESERVATION_HOST'),
            port: configService.get('RESERVATION_PORT'),
          },
        })
    },
  ],
})
export class ReservationsModule {}
