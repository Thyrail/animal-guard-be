import { ApiProperty } from '@nestjs/swagger';

export class CreateMissingDto
{
    @ApiProperty({ example: 'Lost Dog', required: true, description: 'Title of the missing post' })
    title: string;

    @ApiProperty({ example: 'A small brown dog was lost near the park.', required: true, description: 'Details about the missing case' })
    description: string;

    @ApiProperty({ example: ['https://example.com/missing-dog.jpg'], required: false, description: 'Array of image URLs', isArray: true })
    images: string[];

    @ApiProperty({ example: ['https://example.com/missing-dog.jpg'], required: false, description: 'Array of image URLs', isArray: true })
    imageUrls: string[];

    @ApiProperty({ example: 'Golden Retriever', required: false, description: 'Breed of the missing animal' })
    breed?: string;

    @ApiProperty({ example: 'Brown', required: false, description: 'Colour of the missing animal' })
    colour?: string;

    @ApiProperty({ example: true, required: false, description: 'Is the animal chipped?' })
    chipped?: boolean;

}

export class UpdateMissingDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    description?: string;

    @ApiProperty({ example: ['https://example.com/missing-dog.jpg'], required: false, description: 'Array of image URLs', isArray: true })
    images: string[];

    @ApiProperty({ example: ['https://example.com/missing-dog.jpg'], required: false, description: 'Array of image URLs', isArray: true })
    imageUrls: string[];

    @ApiProperty({ example: 'Labrador Retriever', required: false })
    breed?: string;

    @ApiProperty({ example: 'Black', required: false })
    colour?: string;

    @ApiProperty({ example: true, required: false })
    chipped?: boolean;

}