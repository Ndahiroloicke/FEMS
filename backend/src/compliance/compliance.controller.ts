import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ComplianceService } from './compliance.service.js';

@ApiTags('Compliance')
@Controller('compliance')
export class ComplianceController {
  constructor(private readonly complianceService: ComplianceService) {}

  @Post('run-checks')
  @ApiOperation({
    summary: 'Manually trigger expiry warnings and police escalations',
  })
  runChecks() {
    return this.complianceService.runChecksNow();
  }
}
