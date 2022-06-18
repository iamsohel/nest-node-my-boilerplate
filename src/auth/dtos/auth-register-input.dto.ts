import {
    IsNotEmpty,
    MaxLength,
    Length,
    IsString,
    IsEmail,
  } from 'class-validator';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  import { ROLE } from '../constants/role.constant';
  
  export class RegisterInput {
    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(100)
    @IsString()
    firstName: string;
  
    @ApiProperty()
    @MaxLength(200)
    @IsString()
    lastName: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @Length(6, 100)
    @IsString()
    password: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(100)
    email: string;
  
    // These keys can only be set by ADMIN user.
    roles: ROLE[] = [ROLE.USER];
  }
  