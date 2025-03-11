import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsArray, IsDateString, IsObject } from 'class-validator';

export class CreateAdoptionDto
{
    @ApiProperty({ example: 'Cute Puppy for Adoption', description: 'Title of the adoption post' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'A friendly dog looking for a home', description: 'Description of the adoption post' })
    @IsString()
    description: string;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
    @IsArray()
    @IsOptional()
    imageUploads?: string[];

    @ApiProperty({ type: 'array', items: { type: 'string' }, required: false })
    @IsArray()
    @IsOptional()
    imageUrls?: string[];

    @ApiProperty({ example: '01.01.2025', required: false, description: 'Estimated age of the animal' })
    @IsOptional()
    estimatedAge?: string;

    @ApiProperty({ example: '01.01.2025', required: false, description: 'Birthdate of the animal' })
    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @ApiProperty({ example: 'Golden Retriever', required: false, description: 'Breed of the animal' })
    @IsOptional()
    breed?: string;

    @ApiProperty({ example: 'Brown', required: false, description: 'Colour of the animal' })
    @IsOptional()
    colour?: string;

    @ApiProperty({ example: 'male', required: false })
    @IsString()
    @IsOptional()
    gender?: string;

    @ApiProperty({
        example: { "Verträglichkeit mit Hunden": "Ja", "Behinderungen": "Blind" },
        required: false,
        description: 'Structured special features'
    })
    @IsObject()
    @IsOptional()
    specialFeatures?: Record<string, string>;

    @ApiProperty({ example: true, required: false, description: 'Is the animal vaccinated?' })
    @IsBoolean()
    @IsOptional()
    vaccinated?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal chipped?' })
    @IsBoolean()
    @IsOptional()
    chipped?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal neutered?' })
    @IsBoolean()
    @IsOptional()
    neutered?: boolean;
}

export class UpdateAdoptionDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: false })
    @IsArray()
    @IsOptional()
    imageUploads?: string[];

    @ApiProperty({ type: 'array', items: { type: 'string' }, required: false })
    @IsArray()
    @IsOptional()
    imageUrls?: string[];

    @ApiProperty({ example: '2021-01-02', required: false })
    @IsOptional()
    estimatedAge?: string;

    @ApiProperty({ example: '2020-01-02', required: false })
    @IsDateString()
    @IsOptional()
    birthDate?: string;

    @ApiProperty({ example: 'Labrador Retriever', required: false })
    @IsOptional()
    breed?: string;

    @ApiProperty({ example: 'Black', required: false })
    @IsOptional()
    colour?: string;

    @ApiProperty({ example: 'male', required: false })
    @IsString()
    @IsOptional()
    gender?: string;

    @ApiProperty({
        example: { "Verträglichkeit mit Katzen": "Nein", "Besondere Fähigkeiten": "Therapiehund" },
        required: false
    })
    @IsObject()
    @IsOptional()
    specialFeatures?: Record<string, string>;

    @ApiProperty({ example: true, required: false, description: 'Is the animal vaccinated?' })
    @IsBoolean()
    @IsOptional()
    vaccinated?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal chipped?' })
    @IsBoolean()
    @IsOptional()
    chipped?: boolean;

    @ApiProperty({ example: true, required: false, description: 'Is the animal neutered?' })
    @IsBoolean()
    @IsOptional()
    neutered?: boolean;
}
