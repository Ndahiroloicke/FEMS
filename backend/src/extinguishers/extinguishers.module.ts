import { Module } from '@nestjs/common';
import { ExtinguishersController } from './extinguishers.controller.js';
import { ExtinguishersService } from './extinguishers.service.js';

@Module({
  controllers: [ExtinguishersController],
  providers: [ExtinguishersService],
  exports: [ExtinguishersService],
})
export class ExtinguishersModule {}
