import { Get, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    const { authorId, ...rest } = createArticleDto;
    const Image: File = createArticleDto.image;
    return this.prisma.article.create({
      data: {
        ...rest,
        author: { connect: { id: authorId } },
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

  findOne(id: number) {
    return this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    const { authorId, ...rest } = updateArticleDto;
    return this.prisma.article.update({
      where: { id: id },
      data: {
        ...rest,
        author: { connect: { id: authorId } },
      },
    });
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
}
