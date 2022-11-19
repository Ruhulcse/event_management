import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { HttpException, HttpStatus } from '@nestjs/common';

export class eventService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getAll(page: number, per_page: number): Promise<any> {
    try {
      const offset = per_page * page - per_page;
      const paginate = await this.generatePage(page, per_page);
      const events = await this.getEvents(offset, per_page);

      if (events.length < 1) {
        throw new HttpException(`data not found`, HttpStatus.NOT_FOUND);
      }
      return {
        message: 'successfully get data',
        data: { events, paginate },
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async findOne(id: number): Promise<any> {
    try {
      const eventData = await this.getEventData(id);

      if (eventData.length < 1) {
        throw new HttpException(`data not found`, HttpStatus.NOT_FOUND);
      }

      return {
        message: 'successfully get data',
        data: eventData,
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  async findWorkshopByEvent(id: number): Promise<any> {
    try {
      const mainEventData = await this.getActiveEventData(id);
      const workshops = await this.getWorkshop(id);
      const finalResponse = { ...mainEventData, workshops };

      if (mainEventData.length < 1) {
        throw new HttpException(`data not found`, HttpStatus.NOT_FOUND);
      }

      return {
        message: 'successfully get data',
        data: finalResponse,
      };
    } catch (error) {
      throw new HttpException(`${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }
  async generatePage(current_page: number, per_page: number): Promise<any> {
    current_page = current_page < 1 ? 1 : current_page;

    const totalData = await this.knex('events')
      .pluck('id')
      .where('start_at', '>=', new Date());

    const total = totalData.length;
    const total_page =
      total % per_page == 0
        ? total / per_page
        : Math.floor(total / per_page) + 1;

    return {
      total,
      per_page,
      total_page,
      current_page,
    };
  }
  async getEvents(offset: number, per_page: number): Promise<any> {
    const queryResult = await this.knex
      .table('events')
      .where('start_at', '>=', new Date())
      .limit(per_page)
      .offset(offset);
    return queryResult;
  }
  async getEventData(id: number): Promise<any> {
    const queryResult = await this.knex('events')
      .select('events.id', 'events.title', 'events.start_at', 'events.end_at')
      .count('workshops.event_id AS workshops')
      .first()
      .innerJoin('workshops', function () {
        this.on('events.id ', 'workshops.event_id');
      })
      .where('events.id', id);
    return queryResult;
  }
  async getActiveEventData(id: number): Promise<any> {
    const queryResult = await this.knex('events')
      .select('id', 'title', 'start_at', 'end_at')
      .first()
      .where('id', id)
      .where('start_at', '>=', new Date());
    return queryResult;
  }
  async getWorkshop(event_id: number): Promise<any> {
    const queryResult = await this.knex('workshops')
      .select('id', 'title', 'description', 'start_at', 'end_at')
      .where('event_id', event_id);
    return queryResult;
  }
}
