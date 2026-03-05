import { Module } from '@nestjs/common';
import { IncidentsController } from './incidents.controller';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { IncidentsService } from './incidents.service';

@Module({
    imports: [EmailModule],
    providers: [EmailService, IncidentsService],
  controllers: [IncidentsController]
})
export class IncidentsModule {}
