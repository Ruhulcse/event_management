import { Module } from '@nestjs/common';
import { eventController } from './event.controller';
import { eventService } from './event.services';

@Module({
  providers: [eventService],
  controllers: [eventController],
})
export class EventsModule {}
