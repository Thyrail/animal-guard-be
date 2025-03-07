import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MissingService } from './missing.service';
import { CreateMissingDto, UpdateMissingDto } from './dto/missing.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

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

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    uploadFile(@UploadedFile() file: Express.Multer.File)
    {
        return { imageUrl: `/uploads/${file.filename}` };
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