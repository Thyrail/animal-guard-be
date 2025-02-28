import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MissingService } from './missing.service';
import { CreateMissingDto, UpdateMissingDto } from './dto/missing.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Missing')
@Controller('missing')
export class MissingController
{
    constructor(private readonly missingService: MissingService) { }

    @Post()
    create(@Body() dto: CreateMissingDto)
    {
        return this.missingService.create(dto);
    }

    @Get()
    findAll()
    {
        return this.missingService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string)
    {
        return this.missingService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateMissingDto)
    {
        return this.missingService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.missingService.remove(id);
    }

}