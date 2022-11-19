import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { attachPaginate } from 'knex-paginate';
import { HttpException, HttpStatus } from '@nestjs/common';

attachPaginate();

export class workshopService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async findOne(id: number): Promise<any> {
    try {
      const workshopData = await this.getWorkShopData(id);

      if (workshopData.length < 1) {
        throw new HttpException(`data not found`, HttpStatus.NOT_FOUND);
      }

      return {
        message: 'successfully get data',
        data: workshopData,
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async getWorkShopData(id: number): Promise<any> {
    const queryResult = await this.knex('workshops')
      .select(
        'workshops.id',
        'workshops.title',
        'workshops.description',
        'workshops.start_at',
        'workshops.end_at',
      )
      .count('reservations.workshop_id AS total_reservations')
      .first()
      .innerJoin('reservations', function () {
        this.on('workshops.id', 'reservations.workshop_id');
      })
      .where('workshops.id', id);
    return queryResult;
  }
}
