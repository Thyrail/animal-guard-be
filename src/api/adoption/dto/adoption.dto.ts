import { ApiProperty } from '@nestjs/swagger';

export class CreateAdoptionDto
{
    @ApiProperty({ example: 'Cute Puppy for Adoption', description: 'Title of the adoption post' })
    title: string;

    @ApiProperty({ example: 'A friendly dog looking for a home', description: 'Description of the adoption post' })
    description: string;

    @ApiProperty({ example: ['https://example.com/dog1.jpg'], description: 'Array of image URLs', isArray: true })
    images: string[];

    @ApiProperty({ example: '2021-01-01', required: false, description: 'Estimated age of the animal' })
    estimatedAge?: string;

    @ApiProperty({ example: '2020-01-01', required: false, description: 'Birthdate of the animal' })
    birthDate?: Date;

    @ApiProperty({ example: 'Golden Retriever', required: false, description: 'Breed of the animal' })
    breed?: string;

    @ApiProperty({ example: 'Brown', required: false, description: 'Colour of the animal' })
    colour?: string;

    @ApiProperty({ example: 'male', required: false, description: 'Gender of the animal' })
    gender?: string;

    @ApiProperty({ example: ['Special feature 1', 'Special feature 2'], required: false, isArray: true })
    specialFeatures?: string[];

    @ApiProperty({ example: true, required: false, description: 'Is the animal vaccinated?' })
    vaccinated?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal chipped?' })
    chipped?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal neutered?' })
    neutered?: boolean;

}

export class UpdateAdoptionDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    description?: string;

    @ApiProperty({ example: ['https://example.com/dog2.jpg'], required: false, isArray: true })
    images?: string[];

    @ApiProperty({ example: '2021-01-02', required: false })
    estimatedAge?: string;

    @ApiProperty({ example: '2020-01-02', required: false })
    birthDate?: Date;

    @ApiProperty({ example: 'Labrador Retriever', required: false })
    breed?: string;

    @ApiProperty({ example: 'Black', required: false })
    colour?: string;

    @ApiProperty({ example: 'Male', required: false, description: 'Gender of the animal' })
    gender?: string;

    @ApiProperty({ example: ['Special feature 3', 'Special feature 4'], required: false, isArray: true })
    specialFeatures?: string[];

    @ApiProperty({ example: true, required: false, description: 'Is the animal vaccinated?' })
    vaccinated?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal chipped?' })
    chipped?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal neutered?' })
    neutered?: boolean;

}