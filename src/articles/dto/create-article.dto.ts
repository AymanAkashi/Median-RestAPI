import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(300)
  @ApiProperty({ required: false })
  description?: string;

  @IsString({ each: true })
  @IsOptional()
  @ApiProperty({ required: false, type: [String] })
  tags?: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  body: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = true;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: false })
  image?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty()
  author?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  authorId?: string;
}
