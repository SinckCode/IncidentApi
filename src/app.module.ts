import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { IncidentsModule } from './incidents/incidents.module';

@Module({
  imports: [EmailModule, IncidentsModule],
  controllers: [AppController],
  providers: [AppService, IncidentsModule],
})
export class AppModule {}
