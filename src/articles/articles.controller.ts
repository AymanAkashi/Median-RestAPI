import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Res,
  Req,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Response, Request } from 'express';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { BufferedFile } from '../minio-client/file.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioClientService } from 'src/minio-client/minio-client.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly minioClientService: MinioClientService,
  ) {}

  @Post()
  @ApiOkResponse({ type: ArticleEntity })
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() body: any,
    @UploadedFile() image: BufferedFile,
    @Res() res: Response,
  ) {
    console.log(image, 'image');
    let uploadedFile = null;
    if (image) {
      uploadedFile = await this.minioClientService.upload(
        image,
        'user-profiles',
      );
      body.image = uploadedFile?.url;
    }
    const tagsArray = body.tags.split(' ');
    const Published = body.published === 'true' ? true : false;
    return new ArticleEntity(
      await this.articlesService.create({
        ...body,
        tags: tagsArray,
        published: Published,
      }),
    );
  }

  @Get()
  @ApiOkResponse({ type: [ArticleEntity] })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }
  @Get('drafts')
  @ApiOkResponse({ type: [ArticleEntity] })
  async findDrafts() {
    const articlesDrafts = await this.articlesService.findDrafts();
    return articlesDrafts.map((draft) => new ArticleEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return new ArticleEntity(article);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: any,
  ) {
    const tagsArray = updateArticleDto.tags.split(' ');
    const Published = updateArticleDto.published === 'true' ? true : false;
    return new ArticleEntity(
      await this.articlesService.update(id, {
        ...updateArticleDto,
        tags: tagsArray,
        published: Published,
      }),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const token = req.cookies['access_token'];
    const user = await this.articlesService.verifyUser(token);
    const article = await this.articlesService.findOne(id);
    if (user.id !== article.authorId) {
      throw new NotFoundException(
        'You are not authorized to delete this article',
      );
    }
    return new ArticleEntity(await this.articlesService.remove(id));
  }

  @Get('trending')
  @ApiOkResponse({ type: [ArticleEntity] })
  async trending() {
    const articles = await this.articlesService.trending();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('search/:query')
  @ApiOkResponse({ type: [ArticleEntity] })
  async search(@Param('query') query: string) {
    const articles = await this.articlesService.search(query);
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get(':id/articles')
  @ApiCreatedResponse({ type: [ArticleEntity] })
  async userArticles(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.userArticles(id);
  }

  @Get(':id/statistics')
  @ApiOkResponse({ type: [ArticleEntity] })
  async userStatistics(@Param('id', ParseIntPipe) id: number) {
    const articles = await this.articlesService.userStatistics(id);
    return articles;
  }
  @Get('me')
  @ApiOkResponse({ type: [ArticleEntity] })
  async myArticles(@Req() req: Request) {
    const token = req.cookies['access_token'];
    const user = await this.articlesService.verifyUser(token);
    if (!user) throw new NotFoundException('User not found');
    console.log(user.id, 'user.id');
    return this.articlesService.myArticles(user.id);
  }
}
