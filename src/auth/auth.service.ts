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
      accessToken: this.jwtService.sign({ email: user.email }),
    };
  }

  async signup(
    name: string,
    email: string,
    password: string,
    avatar: string,
  ): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (user) throw new ConflictException('conflite');

    const newUser = await this.UserService.create({
      email,
      password,
      name,
      avatar,
    });

    return {
      accessToken: this.jwtService.sign({ email: newUser.email }),
    };
  }
  async verifyToken(token: string) {
    try {
      const data = await this.jwtService.verify(token);
      return data;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async verifyUser(token: string) {
    const data = await this.verifyToken(token);
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) return { ...user, password: undefined };
    throw new NotFoundException('User not found');
  }

  async validateEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    if (user) throw new ConflictException('Email already in use');
  }
}
