import { PartialType } from '@nestjs/swagger';
import { CreateExtinguisherDto } from './create-extinguisher.dto.js';

export class UpdateExtinguisherDto extends PartialType(CreateExtinguisherDto) {}
