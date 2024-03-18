import { Get, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BufferedFile } from 'src/minio-client/file.model';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ArticlesService {
  jwtService: any;
  constructor(
    private prisma: PrismaService,
    private minioClientService: MinioClientService,
  ) {}

  create(createArticleDto: CreateArticleDto) {
    console.log('createArticleDto: ', createArticleDto);
    const { authorId, tags, published, ...rest } = createArticleDto;
    return this.prisma.article.create({
      data: {
        ...rest,
        author: { connect: { id: +authorId } },
      },
    });
  }

  async findAll() {
    const article = await this.prisma.article.findMany({
      where: { published: true },
      include: { author: true },
    });
    return article;
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async uploadImage(file: BufferedFile, bucketName: string) {
    const uploadingImage = await this.minioClientService.upload(
      file,
      bucketName,
    );
    if (!uploadingImage) throw new Error('Image upload failed');
    return {
      url: uploadingImage,
      message: 'Image uploaded successfully',
    };
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    const { authorId, image, ...rest } = updateArticleDto;
    return this.prisma.article.update({
      where: { id: id },
      data: {
        ...rest,
        image: image,
        author: { connect: { id: +authorId } },
      },
    });
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
    console.log('data: ', data);
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (user) return { ...user, password: undefined };
    throw new NotFoundException('User not found');
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }

  trending() {
    return this.prisma.article.findMany({
      orderBy: { likes: 'desc' },
      take: 5,
    });
  }

  search(query: string) {
    return this.prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { body: { contains: query } },
          { tags: { hasSome: query.split(' ') } },
        ],
      },
    });
  }

  async myArticles(userId: number) {
    const articles = await this.prisma.article.findMany({
      where: { authorId: userId },
    });
    if (!articles) throw new NotFoundException('No articles found');
    return articles;
  }

  async userArticles(userId: number) {
    const userArticles = await this.prisma.article.findMany({
      where: { authorId: userId },
    });
    if (!userArticles) throw new NotFoundException('No articles found');
    return userArticles;
  }

  async userStatistics(userId: number) {
    const userArticles = await this.prisma.article.findMany({
      where: { authorId: userId },
      select: { likes: true },
    });
    const articleCount = await this.prisma.article.count({
      where: { authorId: userId },
    });
    const likesSum = await this.prisma.article.aggregate({
      where: { authorId: userId },
      _sum: { likes: true },
    });
    const likesAvg = await this.prisma.article.aggregate({
      where: { authorId: userId },
      _avg: { likes: true },
    });

    return {
      articleCount,
      likesSum: likesSum._sum.likes,
      likesAvg: likesAvg._avg.likes,
    };
  }
}
