import { Controller, Get, Query } from '@nestjs/common';
import { eventService } from './event.services';

@Controller({
  path: 'event',
  version: '1',
})
export class eventController {
  constructor(private readonly eventService: eventService) {}
  @Get('')
  async getevents(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
  ) {
    const data = await this.eventService.getAll(page, per_page);
    return { message: data.message, result: data.data };
  }
}
