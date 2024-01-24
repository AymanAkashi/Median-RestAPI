import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  isNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
