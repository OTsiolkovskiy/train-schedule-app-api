import { Module } from '@nestjs/common';
import { CityService } from './cities.service';
import { CityController } from './cities.controller';

@Module({
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService], // Якщо плануєте використовувати CityService в інших модулях
})
export class CitiesModule {}
