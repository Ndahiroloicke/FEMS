import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly mailer;
    private readonly logger;
    constructor(prisma: PrismaService, jwt: JwtService, mailer: MailerService);
    private signToken;
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../common/prisma-enums.js").Role;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../common/prisma-enums.js").Role;
            isActive: true;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
    }>;
    logout(): {
        message: string;
    };
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
