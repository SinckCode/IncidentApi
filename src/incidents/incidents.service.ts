import { Injectable } from '@nestjs/common';
import { IncidentCDto } from 'src/core/interfaces/incident.interfaces';
import { EmailOptions } from 'src/core/interfaces/mail-options.interfaces';
import { EmailService } from 'src/email/email.service';
import { generateIncidentEmailTemplate } from './templates/incident-email.template';
import { Incident } from 'src/core/db/entities/incident.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { logger } from "src/config/logger";

// Repositorio -> Patron de Diseño Repository


@Injectable()
export class IncidentsService {
    constructor(
        @InjectRepository(Incident)
        private readonly incidentRepository: Repository<Incident>,
        private readonly emailService: EmailService
    ) {}

    async getIncidentsByRadius(lat: number, lon: number, radiusInMeters: number): Promise<Incident[]> {
        try {
            logger.info(`[IncidentsService] Fetching incidents within radius: lat=${lat}, lon=${lon}, radiusInMeters=${radiusInMeters}`);
            const incidents = await this.incidentRepository
                .createQueryBuilder('incident')
                .where(
                    `ST_DWithin(
                        incident.location,
                        ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)::geography,
                        :radius
                    )`, { lon, lat, radius: radiusInMeters })
                .getMany();
            logger.info(`[IncidentsService] Found ${incidents.length} incidents within radius.`);
            logger.info(`${incidents.length} incidentes encontrados en un radio de ${radiusInMeters} metros.`);
            return incidents;
        } catch (error) {
            console.error(`[IncidentsService] Error fetching incidents by radius:`, error);
            console.error(error);
            return [];
        }
    }

    async getIncidents() : Promise<Incident[]> {

        try {
              logger.info("[IncidentsService] Fetching incidents from database...");
              const incidents = await this.incidentRepository.find();
              logger.info(`[IncidentsService] Se obtuvieron ${incidents.length} incidents.`);
              return incidents;
        } catch (error) {
                console.error("[IncidentsService] Error fetching incidents:", error);
                console.error(error);
              return [];
        }
    }

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
        logger.info("Creando incidente");
        await this.incidentRepository.save(newIncident);
        logger.info("Mandando correo");
        const options : EmailOptions = {
            to: 'soyangeldavid1@gmail.com',
            subject: `🚨 Nuevo incidente reportado: ${incident.title}`,
            html: generateIncidentEmailTemplate(incident)
        };
        logger.info("Enviando correo de notificación");
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
