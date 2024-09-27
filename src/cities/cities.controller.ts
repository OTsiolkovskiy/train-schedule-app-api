import { Controller, Get, Query } from '@nestjs/common';
import { CityService } from './cities.service';

@Controller('/api/v1/cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAll(@Query('name') name: string) {
    if (name) {
      return this.cityService.findByCityName(name);
    }
    return this.cityService.findAll();
  }
}
