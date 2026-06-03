import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class AssignExtinguisherDto {
  @ApiPropertyOptional({
    description: 'User ID to assign as owner; omit or set null to unassign',
    example: '00000000-0000-0000-0000-000000000001',
  })
  @IsOptional()
  @IsUUID()
  ownerId?: string | null;
}
