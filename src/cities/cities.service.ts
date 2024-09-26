import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CityService {
  private cities: any[];

  constructor() {
    this.loadCities();
  }

  private loadCities() {
    const filePath = path.join(__dirname, '../data/cities.json');
    const data = fs.readFileSync(filePath, 'utf8');
    this.cities = JSON.parse(data);
  }

  findAll() {
    return this.cities;
  }

  findByCityName(cityName: string) {
    return this.cities.filter((city) =>
      city.city.toLowerCase().includes(cityName.toLowerCase()),
    );
  }
}
