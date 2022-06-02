import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    @Get('/all')
    all(){
        return 1;
    }
}
