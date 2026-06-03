import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { Role } from '../../common/prisma-enums.js';

export class UpdateRoleDto {
  @ApiProperty({ enum: Role, example: Role.INSPECTOR })
  @IsEnum(Role)
  role: Role;
}
