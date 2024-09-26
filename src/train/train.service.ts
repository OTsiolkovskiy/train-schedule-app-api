import { Injectable } from '@nestjs/common';
import { CreateTrainDto } from './dto/create-train.dto';
import { UpdateTrainDto } from './dto/update-train.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrainService {
  constructor(private prisma: PrismaService) {}

  create(createTrainDto: CreateTrainDto) {
    return this.prisma.train.create({
      data: {
        from: createTrainDto.from,
        to: createTrainDto.to,
        departure: createTrainDto.departure,
        arrival: createTrainDto.arrival,
      },
    });
  }

  findAll() {
    return this.prisma.train.findMany();
  }

  findOne(id: number) {
    return this.prisma.train.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTrainDto: UpdateTrainDto) {
    return this.prisma.train.update({
      where: { id },
      data: updateTrainDto,
    });
  }

  remove(id: number) {
    return this.prisma.train.delete({
      where: { id },
    });
  }

  findByCity(
    from: string,
    to: string,
    departureFrom?: Date | null,
    departureUntil?: Date | null,
  ) {
    return this.prisma.train.findMany({
      where: {
        from: from,
        to: to,
        departure: {
          // gte: new Date(),
          ...(departureFrom && { gte: departureFrom }), // Greater than or equal to departureFrom if provided
          ...(departureUntil && { lt: departureUntil }),
        },
      },
    });
  }
}
