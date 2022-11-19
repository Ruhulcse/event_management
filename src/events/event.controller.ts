import { Controller, Get, Param, Query } from '@nestjs/common';
import { eventService } from './event.services';

@Controller({
  path: 'events',
  version: '1',
})
export class eventController {
  constructor(private readonly eventService: eventService) {}

  @Get('')
  async getevents(
    @Query('page') page: number,
    @Query('per_page') per_page: number,
  ) {
    const { data, message } = await this.eventService.getAll(page, per_page);
    return { message, data };
  }

  @Get('/:id')
  async getevent(@Param('id') id: number) {
    const { data, message } = await this.eventService.findOne(id);
    return { message, data };
  }

  @Get('/:id/workshops')
  async getworkshops(@Param('id') event_id: number) {
    const { data, message } = await this.eventService.findWorkshopByEvent(
      event_id,
    );
    return { message, data };
  }
}
