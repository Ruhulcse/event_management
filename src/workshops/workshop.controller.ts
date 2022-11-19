import { Controller, Get, Param, Query } from '@nestjs/common';
import { workshopService } from './workshop.service';

@Controller({
  path: 'workshops',
  version: '1',
})
export class workshopController {
  constructor(private readonly workshopService: workshopService) {}

  @Get('/:id')
  async getevent(@Param('id') id: number) {
    const { data, message } = await this.workshopService.findOne(id);
    return { message, data };
  }
}
