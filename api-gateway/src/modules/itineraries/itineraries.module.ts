import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ItinerariesController } from './itineraries.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ItinerariesController],
  providers: [
    {
      provide: 'ITINERARIES_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ITINERARY_HOST'),
            port: configService.get('ITINERARY_PORT'),
          },
        })
    },
  ],
})
export class ItinerariesModule {}
