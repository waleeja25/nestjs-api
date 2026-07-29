import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class PositiveIntPipe implements PipeTransform<string, number> {
  transform(value: string): number {
    const id = Number(value);

    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID must be a number.');
    }

    if (id <= 0) {
      throw new BadRequestException('ID must be a positive integer.');
    }

    return id;
  }
}
