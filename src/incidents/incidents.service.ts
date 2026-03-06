import { Injectable } from '@nestjs/common';
import { IncidentCDto } from 'src/core/interfaces/incident.interfaces';
import { EmailOptions } from 'src/core/interfaces/mail-options.interfaces';
import { EmailService } from 'src/email/email.service';
import { generateIncidentEmailTemplate } from './templates/incident-email.template';
import { Incident } from 'src/core/db/entities/incident.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// Repositorio -> Patron de Diseño Repository


@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private readonly incidentRepository: Repository<Incident>,
        private readonly emailService: EmailService
    ) {}

    async createIncident(incident:IncidentCDto): Promise<Boolean> {

        //Una entidad de incidente
        //guardas en db
        const newIncident = this.incidentRepository.create({
            title: incident.title,
            description: incident.description,
            type: incident.type,
            location: {
                type: 'Point',
                coordinates: [incident.lon, incident.lat]
            }
        });
        await this.incidentRepository.save(newIncident);

        const options : EmailOptions = {
            to: 'soyangeldavid1@gmail.com',
            subject: `🚨 Nuevo incidente reportado: ${incident.title}`,
            html: generateIncidentEmailTemplate(incident)
        };
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
