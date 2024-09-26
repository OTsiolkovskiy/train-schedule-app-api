import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TrainService } from './train.service';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { AuthGuard } from 'src/common/quards/auth.quard';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) {}

  @Post()
  create(@Body() createTrainDto: CreateTrainDto) {
    return this.trainService.create(createTrainDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.trainService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.trainService.findOne(+id);
  // }

  @Get('search')
  async findByCity(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('departureFrom') departureFrom: string,
    @Query('departureUntil') departureUntil: string,
  ) {
    console.log(`Finding trains from ${from} to ${to}`);
    console.log(
      `Departure From: ${departureFrom}, Departure Until: ${departureUntil}`,
    );

    const departureFromDate = departureFrom ? new Date(departureFrom) : null;
    const departureUntilDate = departureUntil ? new Date(departureUntil) : null;

    return this.trainService.findByCity(
      from,
      to,
      departureFromDate,
      departureUntilDate,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainDto: UpdateTrainDto) {
    return this.trainService.update(+id, updateTrainDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainService.remove(+id);
  }
}
