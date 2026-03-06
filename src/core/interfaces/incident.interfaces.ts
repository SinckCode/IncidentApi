import { IncidentType } from "../enums/incident-type.enum";

//DTO
export interface IncidentCDto {
    title: string;
    description: string;
    lat: number;
    lon: number;
    type: IncidentType;
}
