import { Injectable } from '@nestjs/common';
// import * as fs from 'fs';
// import * as path from 'path';
import { cities } from '../data/cities';

@Injectable()
export class CityService {
  private cities = cities;

  // constructor() {
  //   this.loadCities();
  // }

  // private loadCities() {
  //   const filePath = path.join(__dirname, '../data/cities.json');
  //   const data = fs.readFileSync(filePath, 'utf8');
  //   this.cities = JSON.parse(data);

  //   console.log(filePath);
  // }

  findAll() {
    return this.cities;
  }

  findByCityName(cityName: string) {
    return this.cities.filter((city) =>
      city.city.toLowerCase().includes(cityName.toLowerCase()),
    );
  }
}
