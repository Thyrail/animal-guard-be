import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto, UpdateStoryDto } from './dto/story.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

@ApiTags('Stories')
@Controller('stories')
export class StoryController
{
    constructor(private readonly service: StoryService) { }

    @Post()
    create(@Body() dto: CreateStoryDto)
    {
        return this.service.create(dto);
    }

    @Get()
    findAll()
    {
        return this.service.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateStoryDto)
    {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.service.remove(id);
    }

}