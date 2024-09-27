import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TrainModule } from './train/train.module';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, TrainModule, CitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
