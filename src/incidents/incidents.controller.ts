import { Body, Controller, Get, ParseFloatPipe, Post, Query } from '@nestjs/common';
import { IncidentsService } from './incidents.service';
import type { IncidentCDto } from 'src/core/interfaces/incident.interfaces';

@Controller('incidents')
export class IncidentsController {
    constructor(private readonly incidentsService: IncidentsService) {}

    @Get()
    async getIncidents(){
        const result = await this.incidentsService.getIncidents();
        return result;
    }


    //Cuando quieres filtrar ----> Query Strings
    @Get('radius')
    async getIncidentByRadius(
        @Query('lat', ParseFloatPipe) lat: number,
        @Query('lon', ParseFloatPipe) lon: number,
        @Query('radiusInMeters', ParseFloatPipe) radiusInMeters: number
    ){
        // Lógica para obtener incidentes por radio
        const result = await this.incidentsService.getIncidentsByRadius(lat, lon, radiusInMeters);
        return result;
    }


    @Post()
    async createIncident(@Body() incident: IncidentCDto) {
        // Lógica para crear un incidente
        const result = await this.incidentsService.createIncident(incident);
        return result;
    }
}
