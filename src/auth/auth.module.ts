import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';

import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    SharedModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
