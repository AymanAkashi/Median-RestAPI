import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { Body, Controller, Post } from '@nestjs/common';
import { SignIn } from './dto/signin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('signin')
  @ApiOkResponse({ type: AuthEntity })
  signin(@Body() { name, email, password }: SignIn) {
    return this.authService.signin(name, email, password);
  }
}
