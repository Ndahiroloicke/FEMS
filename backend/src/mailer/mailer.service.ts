import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

@Injectable()
export class MailerService implements OnModuleInit {
  private readonly logger = new Logger(MailerService.name);
  private transporter: nodemailer.Transporter | null = null;

  onModuleInit() {
    const host = process.env.SMTP_HOST;
    if (!host) {
      this.logger.warn(
        'SMTP_HOST not configured — emails will be logged to the console only.',
      );
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: Number(process.env.SMTP_PORT ?? 587) === 465,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });
  }

  get isConfigured(): boolean {
    return this.transporter !== null;
  }

  async sendMail(options: MailOptions): Promise<void> {
    const from = process.env.SMTP_FROM ?? 'no-reply@fems.local';

    if (!this.transporter) {
      this.logger.log(
        `[EMAIL:console] To: ${options.to} | Subject: ${options.subject} | ${options.text}`,
      );
      return;
    }

    try {
      await this.transporter.sendMail({
        from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html ?? options.text,
      });
      this.logger.log(`Email sent to ${options.to} (${options.subject})`);
    } catch (err) {
      this.logger.error(
        `Failed to send email to ${options.to}: ${(err as Error).message}`,
      );
    }
  }
}
