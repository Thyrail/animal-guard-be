import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFiles, UseInterceptors, BadRequestException, Req } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { CreateAdoptionDto, UpdateAdoptionDto } from './dto/adoption.dto';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';

@ApiTags('Adoption')
@Controller('adoption')
export class AdoptionController
{
    constructor(private readonly service: AdoptionService) { }

    @Post()
    @UseInterceptors(FilesInterceptor('imageUploads', 10, multerConfig)) // 🟢 Bis zu 10 Bilder
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                imageUploads: { type: 'array', items: { type: 'string', format: 'binary' } },
                data: { type: 'string' },
            },
        },
    })
    async create(@UploadedFiles() files: Express.Multer.File[], @Body() body: any, @Req() req)
    {
        // console.log("Received files in create:", files);
        // console.log("Received body in create:", body);
        
        if (!body.data)
        {
            throw new BadRequestException("Missing JSON data in request.");
        }

        let parsedData: CreateAdoptionDto;

        try
        {
            parsedData = JSON.parse(body.data);
        }
        catch (error)
        {
            console.error("JSON Parsing Error:", error.message);
            throw new BadRequestException("Invalid JSON format in request.");
        }

        // **ImageUploads verarbeiten**
        const uploadedImagePaths = files.map(file => `/uploads/${file.filename}`);

        // **Bereits vorhandene Bilder aus JSON-Daten behalten**
        parsedData.imageUploads = [
            ...(Array.isArray(parsedData.imageUploads) ? parsedData.imageUploads : []),
            ...uploadedImagePaths
        ];

        // **Sicherstellen, dass `imageUrls` ein Array ist**
        parsedData.imageUrls = parsedData.imageUrls || [];

        // console.log("✅ Final Adoption Data:", parsedData);

        return this.service.create(parsedData);
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