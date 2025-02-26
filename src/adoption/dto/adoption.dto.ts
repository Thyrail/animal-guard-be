import { ApiProperty } from '@nestjs/swagger';

export class CreateAdoptionDto
{
    @ApiProperty({ example: 'Cute Puppy for Adoption', description: 'Title of the adoption post' })
    title: string;

    @ApiProperty({ example: 'A friendly dog looking for a home', description: 'Description of the adoption post' })
    description: string;

    @ApiProperty({ example: ['https://example.com/dog1.jpg'], description: 'Array of image URLs', isArray: true })
    images: string[];
}

export class UpdateAdoptionDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    description?: string;

    @ApiProperty({ example: ['https://example.com/dog2.jpg'], required: false, isArray: true })
    images?: string[];
}