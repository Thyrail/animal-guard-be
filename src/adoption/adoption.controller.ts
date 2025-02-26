import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto, UpdateAdoptionDto } from './dto/adoption.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Adoption')
@Controller('adoption')
export class AdoptionController
{
    constructor(private readonly service: AdoptionService) { }

    @Post()
    create(@Body() dto: CreateAdoptionDto)
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
    update(@Param('id') id: string, @Body() dto: UpdateAdoptionDto)
    {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string)
    {
        return this.service.remove(id);
    }
    
}