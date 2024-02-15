import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SignIn } from './dto/signin.dto';
import { Response, Request } from 'express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(
    @Body() { email, password }: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.login(email, password);

    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return data;
  }

  @Post('signup')
  @ApiOkResponse({ type: AuthEntity })
  async signin(
    @Body() { name, email, password }: SignIn,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.authService.signup(name, email, password);

    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    return data;
  }

  @Get('verify')
  @ApiOkResponse({ type: AuthEntity })
  verify(@Req() req: Request) {
    const token = req.cookies['access_token'];
    return this.authService.verifyToken(token);
  }

  @Post('logout')
  @ApiOkResponse({ type: AuthEntity })
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token');
    return { message: 'success' };
  }

  @Get('user')
  @ApiOkResponse({ type: AuthEntity })
  async user(@Req() req: Request) {
    const token = req.cookies['access_token'];
    return this.authService.verifyUser(token);
  }
}
