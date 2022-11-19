import { Module } from '@nestjs/common';
import { workshopController } from './workshop.controller';
import { workshopService } from './workshop.service';

@Module({
  providers: [workshopService],
  controllers: [workshopController],
})
export class WorkshopsModule {}
