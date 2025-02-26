import { ApiProperty } from '@nestjs/swagger';

export class CreateMissingDto
{
    @ApiProperty({ example: 'Lost Dog', description: 'Title of the missing post' })
    title: string;

    @ApiProperty({ example: 'A small brown dog was lost near the park.', description: 'Details about the missing case' })
    description: string;

    @ApiProperty({ example: ['https://example.com/missing-dog.jpg'], description: 'Array of image URLs', isArray: true })
    images: string[];

}

export class UpdateMissingDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    description?: string;

    @ApiProperty({ example: ['https://example.com/missing-dog-updated.jpg'], required: false, isArray: true })
    images?: string[];

}