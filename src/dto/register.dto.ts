import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class RegisterDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  full_name?: string;

  @IsNumber()
  height: number;

  @IsNumber()
  weight: number;

  @IsString()
  @IsOptional()
  avatar_url: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  date_of_birth: string;

  @IsEnum(Gender)
  @IsOptional()
  gender?: Gender;
}
