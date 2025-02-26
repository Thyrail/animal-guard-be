import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('News')
@Controller('news')
export class NewsController
{
    constructor(private readonly newsService: NewsService) { }

    @Post()
    create(@Body() dto: CreateNewsDto)
    {
        return this.newsService.create(dto);
    }

    @Get()
    findAll()
    {
        return this.newsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.newsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateNewsDto)
    {
        return this.newsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.newsService.remove(id);
    }

}