import { Injectable } from '@nestjs/common';
import { Incident } from 'src/core/interfaces/incident.interfaces';
import { EmailOptions } from 'src/core/interfaces/mail-options.interfaces';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class IncidentsService {
    constructor(private readonly emailService: EmailService) {}

    async createIncident(incident:Incident): Promise<Boolean> {
        const options : EmailOptions = {
            to: 'soyangeldavid1@gmail.com',
      subject: `🚨 Nuevo incidente reportado: ${incident.title}`,
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body{
      margin:0;
      padding:0;
      background:#f4f6f9;
      font-family: Arial, Helvetica, sans-serif;
      color:#111827;
    }
    .wrapper{
      width:100%;
      padding:24px 12px;
    }
    .card{
      max-width:640px;
      margin:0 auto;
      background:#ffffff;
      border:1px solid #e5e7eb;
      border-radius:14px;
      overflow:hidden;
      box-shadow:0 10px 25px rgba(0,0,0,.08);
    }
    .header{
      padding:20px;
      background:linear-gradient(135deg,#ef0381,#7c3aed);
      color:#ffffff;
    }
    .title{
      margin:0;
      font-size:20px;
      font-weight:800;
    }
    .subtitle{
      margin:6px 0 0 0;
      font-size:13px;
      opacity:.9;
    }
    .content{
      padding:20px;
    }
    .badge{
      display:inline-block;
      padding:6px 10px;
      border-radius:999px;
      background:#fff0f7;
      border:1px solid #ffd1e6;
      color:#b1005c;
      font-size:12px;
      font-weight:700;
      margin-bottom:14px;
    }
    .box{
      border:1px solid #e5e7eb;
      background:#fafafa;
      border-radius:12px;
      padding:12px;
      margin-bottom:14px;
    }
    .label{
      margin:0 0 6px 0;
      font-size:12px;
      color:#6b7280;
      font-weight:700;
      text-transform:uppercase;
    }
    .value{
      margin:0;
      font-size:14px;
      line-height:1.45;
      word-break:break-word;
    }
    .button{
      display:inline-block;
      margin-top:10px;
      padding:10px 14px;
      border-radius:10px;
      background:#ef0381;
      color:#ffffff !important;
      text-decoration:none;
      font-weight:800;
      font-size:14px;
    }
    .footer{
      padding:14px 20px;
      border-top:1px solid #e5e7eb;
      font-size:12px;
      color:#6b7280;
      background:#ffffff;
    }
    @media (max-width:520px){
      .title{font-size:18px;}
      .content,.header,.footer{padding-left:16px;padding-right:16px;}
      .button{display:block;text-align:center;}
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="card">

      <div class="header">
        <h1 class="title">Nuevo incidente reportado</h1>
        <p class="subtitle">Se ha registrado un nuevo evento en el sistema.</p>
      </div>

      <div class="content">
        <div class="badge">Tipo: ${incident.type}</div>

        <div class="box">
          <p class="label">Título</p>
          <p class="value">${incident.title}</p>
        </div>

        <div class="box">
          <p class="label">Descripción</p>
          <p class="value">${incident.description}</p>
        </div>

        <div class="box">
          <p class="label">Ubicación</p>
          <p class="value">(${incident.lat}, ${incident.lon})</p>
          <a
            class="button"
            href="https://www.google.com/maps?q=${incident.lat},${incident.lon}"
            target="_blank"
            rel="noopener noreferrer">
            Ver en Google Maps
          </a>
        </div>
      </div>

      <div class="footer">
        Este correo fue generado automáticamente por el sistema de incidentes.
      </div>

    </div>
  </div>
</body>
</html>
`
        };
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
