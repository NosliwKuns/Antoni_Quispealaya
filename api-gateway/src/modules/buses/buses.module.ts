import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BusesController } from './buses.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [BusesController],
  providers: [
    {
      provide: 'BUSES_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('BUS_HOST'),
            port: configService.get('BUS_PORT'),
          },
        })
    },
  ],
})
export class BusesModule {}
