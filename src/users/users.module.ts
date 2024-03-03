import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [PrismaModule, MinioClientModule],
  exports: [UsersService],
})
export class UsersModule {}
