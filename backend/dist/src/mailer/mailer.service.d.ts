import { OnModuleInit } from '@nestjs/common';
export interface MailOptions {
    to: string;
    subject: string;
    text: string;
    html?: string;
}
export declare class MailerService implements OnModuleInit {
    private readonly logger;
    private transporter;
    onModuleInit(): void;
    get isConfigured(): boolean;
    sendMail(options: MailOptions): Promise<void>;
}
