import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrybt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private UserService: UsersService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) throw new NotFoundException(`No user found for email: ${email}`);

    const isPasswordValid = await bcrybt.compare(password, user.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Password Try another one.');

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async signin(
    name: string,
    email: string,
    password: string,
  ): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (user) throw new ConflictException('conflite');

    const newUser = await this.UserService.create({ email, password, name });

    return {
      accessToken: this.jwtService.sign({ userId: newUser.id }),
    };
  }
}