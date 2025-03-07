import { ApiProperty } from '@nestjs/swagger';

export class CreateStoryDto
{
    @ApiProperty({ example: 'Mein Abenteuer', description: 'Titel der Story', required: true })
    title: string;

    @ApiProperty({ example: 'Dies ist meine unglaubliche Geschichte...', description: 'Beschreibung der Story', required: true })
    description: string;

    @ApiProperty({ example: ['bild1.jpg'], required: false, description: 'Local Images' })
    imageUploads?: string[];

    @ApiProperty({ example: ['https://example.com/bild1.jpg'], required: false, description: 'Bild-URLs' })
    imageUrls?: string[];
}

export class UpdateStoryDto
{
    @ApiProperty({ example: 'Geändertes Abenteuer', required: false })
    title?: string;

    @ApiProperty({ example: 'Dies ist meine geänderte Geschichte...', required: false })
    description?: string;

    @ApiProperty({ example: ['bild1.jpg'], required: false, description: 'Local Images' })
    imageUploads?: string[];

    @ApiProperty({ example: ['https://example.com/bild3.jpg'], required: false })
    imageUrls?: string[];
}