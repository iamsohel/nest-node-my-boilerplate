import {
    Post,
    Body,
    UseGuards,
    Controller,
    HttpStatus,
    UseInterceptors,
    ClassSerializerInterceptor,
    HttpCode,
  } from '@nestjs/common';
  import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
  
  import { AuthService } from '../services/auth.service';
  import { LoginInput } from '../dtos/auth-login-input.dto';
  import { RegisterInput } from '../dtos/auth-register-input.dto';
  import { RegisterOutput } from '../dtos/auth-register-output.dto';
  import { AuthTokenOutput } from '../dtos/auth-token-output.dto';
  import {
    BaseApiErrorResponse,
    BaseApiResponse,
    SwaggerBaseApiResponse,
  } from '../../shared/dtos/base-api-response.dto';
  import { ReqContext } from '../../shared/request-context/req-context.decorator';
  import { RequestContext } from '../../shared/request-context/request-context.dto';
  import { AppLogger } from '../../shared/logger/logger.service';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly authService: AuthService,
      private readonly logger: AppLogger,
    ) {
      this.logger.setContext(AuthController.name);
    }
    @Post('login')
    @ApiOperation({
      summary: 'User login API',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      type: SwaggerBaseApiResponse(AuthTokenOutput),
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      type: BaseApiErrorResponse,
    })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    login(
      @ReqContext() ctx: RequestContext,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      @Body() credential: LoginInput,
    ): BaseApiResponse<AuthTokenOutput> {
      this.logger.log(ctx, `${this.login.name} was called`);
  
      const authToken = this.authService.login(ctx);
      return { data: authToken, meta: {} };
    }
  
    @Post('register')
    @ApiOperation({
      summary: 'User registration API',
    })
    @ApiResponse({
      status: HttpStatus.CREATED,
      type: SwaggerBaseApiResponse(RegisterOutput),
    })
    @UseInterceptors(ClassSerializerInterceptor)
    async registerLocal(
      @ReqContext() ctx: RequestContext,
      @Body() input: RegisterInput,
    ): Promise<BaseApiResponse<RegisterOutput>> {
      const registeredUser = await this.authService.register(ctx, input);
      return { data: registeredUser, meta: {} };
    }
  
    @Post('refresh-token')
    @ApiOperation({
      summary: 'Refresh access token API',
    })
    @ApiResponse({
      status: HttpStatus.OK,
      type: SwaggerBaseApiResponse(AuthTokenOutput),
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      type: BaseApiErrorResponse,
    })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(ClassSerializerInterceptor)
    async refreshToken(
      @ReqContext() ctx: RequestContext,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ): Promise<BaseApiResponse<AuthTokenOutput>> {
      this.logger.log(ctx, `${this.refreshToken.name} was called`);
  
      const authToken = await this.authService.refreshToken(ctx);
      return { data: authToken, meta: {} };
    }
  }
  