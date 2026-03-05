import { IncidentType } from "../enums/incident-type.enum";

export interface Incident {
    title: string;
    description: string;
    lat: number;
    lon: number;
    type: IncidentType;
}
