import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'John Smith' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'AB1234567' })
  @IsString()
  @IsNotEmpty()
  nationalId: string;

  @ApiPropertyOptional({ example: 'john.smith@example.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: '+250788123456' })
  @IsString()
  @MinLength(7)
  phone: string;

  @ApiPropertyOptional({ example: '12 Main Street, Kigali' })
  @IsOptional()
  @IsString()
  address?: string;
}
