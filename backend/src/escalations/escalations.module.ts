import { Module } from '@nestjs/common';
import { EscalationsController } from './escalations.controller.js';
import { EscalationsService } from './escalations.service.js';

@Module({
  controllers: [EscalationsController],
  providers: [EscalationsService],
})
export class EscalationsModule {}
