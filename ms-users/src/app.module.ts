import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // this will be used to make the config available in all modules of
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory:async (configService:ConfigService) => ({
    //     type:'mysql',
    //     host : configService.get('DB_HOST'),
    //     port: parseInt(configService.get('DB_PORT')),
    //     username: configService.get('DB_USER'),
    //     password:configService.get('DB_PASSWORD'),
    //     database :configService.get('DB_DATABASE'),
    //     entities:[Bus],
    //     synchronize:true
    //   }),
    //   inject: [ConfigService],
    // }),
    // TypeOrmModule.forFeature([Bus])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
