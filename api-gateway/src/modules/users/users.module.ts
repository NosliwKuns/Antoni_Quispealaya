import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USERS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('USER_HOST'),
            port: configService.get('USER_PORT'),
          },
        })
    },
  ],
})
export class UsersModule {}
