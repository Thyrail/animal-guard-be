import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto, UpdateAdoptionDto } from './dto/adoption.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    uploadFile(@UploadedFile() file: Express.Multer.File)
    {
        return { imageUrl: `/uploads/${file.filename}` };
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