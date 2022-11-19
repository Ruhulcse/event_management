import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { WorkshopsModule } from './workshops/workshops.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          host: 'sql12.freesqldatabase.com',
          user: 'sql12578917',
          password: 'msD9hGBg45',
          database: 'sql12578917',
        },
      },
    }),
    EventsModule,
    WorkshopsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
