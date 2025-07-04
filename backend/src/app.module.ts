import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SubscriberModule } from './subscriber/subscriber.module';
import { CentralStationModule } from './central-station/central-station.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig, jwtConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    UserModule,
    AuthModule,
    SubscriberModule,
    CentralStationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
