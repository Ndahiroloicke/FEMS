import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ComplianceModule } from './compliance/compliance.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';
import { EscalationsModule } from './escalations/escalations.module.js';
import { ExtinguishersModule } from './extinguishers/extinguishers.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    CustomersModule,
    ExtinguishersModule,
    NotificationsModule,
    EscalationsModule,
    ComplianceModule,
    DashboardModule,
  ],
})
export class AppModule {}
