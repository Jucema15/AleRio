import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendMail(to: string, subject: string, text: string) {
      try {
        return await this.mailerService.sendMail({
          to,
          subject,
          text,
          html: `
            <div style="font-family: Arial, sans-serif; color: #222;">
              <h2 style="color: #d32f2f;">⚠️ Alerta de Caudal</h2>
              <p>
                Se ha detectado un posible <b>aumento en la altura del caudal</b> en uno de los sensores monitoreados.
              </p>
              <p>
                <b>Detalles:</b><br>
                ${text}
              </p>
              <p>
                Por favor, tome las precauciones necesarias y verifique la situación lo antes posible.
              </p>
              <hr>
              <small>Este es un mensaje automático del sistema de monitoreo AleRio.</small>
            </div>
          `,
        });
      } catch (error) {
        console.error('Error enviando correo:', error);
        throw error;
      }
    }
}

