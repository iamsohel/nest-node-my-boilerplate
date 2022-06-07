import {
    Controller,
    Get,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpStatus,
    Query,
    Param,
    Patch,
    Body,
  } from '@nestjs/common';
  import { ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
  
  import { UserService } from '../services/user.service';
  
  import {
    BaseApiErrorResponse,
    BaseApiResponse,
    SwaggerBaseApiResponse,
  } from '../../shared/dtos/base-api-response.dto';
  import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto';
  import { UserOutput } from '../dtos/user-output.dto';
  import { ROLE } from '../../auth/constants/role.constant';
  import { UpdateUserInput } from '../dtos/user-update-input.dto';

  
  @Controller('users')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
  }
  