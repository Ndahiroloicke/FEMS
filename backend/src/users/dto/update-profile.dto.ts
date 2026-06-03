import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Jane' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'First name cannot be blank' })
  @MinLength(2, { message: 'First name must be at least 2 characters' })
  @MaxLength(100)
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Last name cannot be blank' })
  @MinLength(2, { message: 'Last name must be at least 2 characters' })
  @MaxLength(100)
  lastName?: string;

  @ApiPropertyOptional({ example: 'jane.doe@example.com' })
  @IsOptional()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  @MaxLength(255)
  email?: string;
}
