import { Body, Controller, Post } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import type { IncidentCDto } from 'src/core/interfaces/incident.interfaces';

@Controller('incidents')
export class IncidentsController {
    constructor(private readonly incidentsService: IncidentsService) {}
    @Post()
    async createIncident(@Body() incident: IncidentCDto) {
        // Lógica para crear un incidente
        const result = await this.incidentsService.createIncident(incident);
        return result;
    }
}
