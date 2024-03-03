import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MinioClientModule } from 'src/minio-client/minio-client.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [PrismaModule, MinioClientModule],
})
export class ArticlesModule {}
