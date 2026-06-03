import { AuthService } from './auth.service.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            role: import("../common/prisma-enums.js").Role;
            isActive: boolean;
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
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
