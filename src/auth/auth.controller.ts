import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignIn } from './dto/signin.dto';
import { Response, Request } from 'express';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly minioClientService: MinioClientService,
  ) {}

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
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('avatar'))
  async signin(
    @Body() body: any,
    @UploadedFile() image: BufferedFile,
    @Res() res: Response,
  ) {
    console.log('backend:  ', body, image);
    let avatar = '';
    if (image) {
      console.log('Heeere');
      avatar = (await this.minioClientService.upload(image, 'user-profiles'))
        ?.url;
    }
    const data = await this.authService.signup(
      body.name,
      body.email,
      body.password,
      avatar,
    );

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

  @Post('verify')
  @ApiOkResponse({ type: AuthEntity })
  async verifyToken(
    @Body()
    {
      token,
    }: {
      token: {
        name: string;
        value: string;
      };
    },
  ) {
    if (!token) throw new UnauthorizedException("Token doesn't exist");
    return this.authService.verifyToken(token.value);
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

  @Get('validate-email')
  @ApiOkResponse({ type: Boolean })
  async validateEmail(@Req() req: Request) {
    const { email } = req.query;
    return this.authService.validateEmail(email as string);
  }
}
