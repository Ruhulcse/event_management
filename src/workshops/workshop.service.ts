import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { attachPaginate } from 'knex-paginate';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';

attachPaginate();

export class workshopService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async createReservation(payload: ReservationDto): Promise<any> {
    try {
      const insertedResult: number[] = await this.knex('reservations').insert(
        payload,
      );
      const id: number = insertedResult[0];

      const response: any = await this.prepareResponse(id);
      return {
        message: 'data inserted',
        data: response,
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
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

  async prepareResponse(id: number): Promise<any> {
    const reservation = await this.knex('reservations')
      .select('id', 'name', 'email')
      .first()
      .where('id', id);

    const workshop = await this.knex('reservations')
      .select(
        'workshops.id',
        'workshops.title',
        'workshops.description',
        'workshops.start_at',
        'workshops.end_at',
      )
      .first()
      .innerJoin('workshops', function () {
        this.on('reservations.workshop_id', 'workshops.id');
      })
      .where('reservations.id', id);

    const workshop_id = workshop?.id;

    const event = await this.knex('workshops')
      .select('events.id', 'events.title', 'events.start_at', 'events.end_at')
      .first()
      .innerJoin('events', function () {
        this.on('workshops.event_id', 'events.id');
      })
      .where('workshops.id', workshop_id);

    return {
      reservation,
      event,
      workshop,
    };
  }
}
