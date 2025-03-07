import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

@ApiTags('Events')
@Controller('events')
export class EventController
{
    constructor(private readonly eventService: EventService) { }

    @Post()
    create(@Body() dto: CreateEventDto)
    {
        return this.eventService.create(dto);
    }

    @Get()
    findAll()
    {
        return this.eventService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.eventService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateEventDto)
    {
        return this.eventService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.eventService.remove(id);
    }

}