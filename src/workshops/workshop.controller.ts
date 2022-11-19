import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
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

  @Post('/reservation')
  async reservation(@Body() payload: ReservationDto) {
    const { data, message } = await this.workshopService.createReservation(
      payload,
    );
    return { message, data };
  }
}
