import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: any;
  let jwt: JwtService;
  let mailer: any;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    };
    jwt = { sign: jest.fn().mockReturnValue('signed.jwt.token') } as any;
    mailer = { sendMail: jest.fn().mockResolvedValue(undefined) };
    service = new AuthService(prisma, jwt, mailer);
  });

  describe('register', () => {
    it('hashes the password, creates a user and returns an access token', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      prisma.user.create.mockImplementation(({ data }: any) =>
        Promise.resolve({
          id: 'u1',
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: 'USER',
          isActive: true,
        }),
      );

      const result = await service.register({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'Jane.Doe@Example.com',
        password: 'Password@123',
      });

      expect(result.accessToken).toBe('signed.jwt.token');
      expect(result.user.email).toBe('jane.doe@example.com');
      const createArg = prisma.user.create.mock.calls[0][0];
      expect(createArg.data.passwordHash).not.toBe('Password@123');
      await expect(
        bcrypt.compare('Password@123', createArg.data.passwordHash),
      ).resolves.toBe(true);
    });

    it('throws ConflictException when the email already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'existing' });
      await expect(
        service.register({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          password: 'Password@123',
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });
  });

  describe('login', () => {
    it('returns a token for valid credentials', async () => {
      const passwordHash = await bcrypt.hash('Password@123', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        role: 'USER',
        isActive: true,
        passwordHash,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const result = await service.login({
        email: 'jane@example.com',
        password: 'Password@123',
      });

      expect(result.accessToken).toBe('signed.jwt.token');
      expect((result.user as any).passwordHash).toBeUndefined();
    });

    it('throws UnauthorizedException for invalid password', async () => {
      const passwordHash = await bcrypt.hash('Password@123', 10);
      prisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'jane@example.com',
        isActive: true,
        passwordHash,
      });

      await expect(
        service.login({ email: 'jane@example.com', password: 'wrong' }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
