import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto
{
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    firstName: string;

    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    lastName: string;

    @ApiProperty({ example: 'Dr.', required: false, description: 'Title of the user' })
    title?: string;

    @ApiProperty({ example: 'Herr', enum: ['Herr', 'Frau'], required: false, description: 'Salutation of the user' })
    salutation?: 'Herr' | 'Frau';

    @ApiProperty({ example: 'Berlin', required: false, description: 'Birthplace of the user' })
    birthPlace?: string;

    @ApiProperty({ example: '1985-06-15', required: false, description: 'Birthdate of the user' })
    birthDate?: Date;

    @ApiProperty({
        example: { street: 'Main St', houseNumber: '42', postalCode: '10115', city: 'Berlin' },
        required: false,
        description: 'User address'
    })
    address?: {
        street?: string;
        houseNumber?: string;
        postalCode?: string;
        city?: string;
    };

    @ApiProperty({ example: 'john.doe@example.com', description: 'Email of the user' })
    email: string;

    @ApiProperty({ example: 'johndoe', required: false, description: 'Username of the user' })
    username?: string;

    @ApiProperty({ example: '+49123456789', required: false, description: 'Phone number of the user' })
    phone?: string;

    @ApiProperty({ example: 'SecurePassword123!', description: 'Password of the user' })
    password: string;

    @ApiProperty({ example: true, required: false, description: 'Is the user an admin?' })
    isAdmin?: boolean;

}

export class UpdateUserDto
{
    @ApiProperty({ example: 'John', required: false })
    firstName?: string;

    @ApiProperty({ example: 'Doe', required: false })
    lastName?: string;

    @ApiProperty({ example: 'Dr.', required: false })
    title?: string;

    @ApiProperty({ example: 'Herr', enum: ['Herr', 'Frau'], required: false })
    salutation?: 'Herr' | 'Frau';

    @ApiProperty({ example: 'Berlin', required: false })
    birthPlace?: string;

    @ApiProperty({ example: '1985-06-15', required: false })
    birthDate?: Date;

    @ApiProperty({
        example: { street: 'Updated St', houseNumber: '50', postalCode: '10178', city: 'Hamburg' },
        required: false
    })
    address?: {
        street?: string;
        houseNumber?: string;
        postalCode?: string;
        city?: string;
    };

    @ApiProperty({ example: 'updated.email@example.com', required: false })
    email?: string;

    @ApiProperty({ example: 'newusername', required: false })
    username?: string;

    @ApiProperty({ example: '+49111111111', required: false })
    phone?: string;

    @ApiProperty({ example: 'NewPassword123!', required: false })
    password?: string;

    @ApiProperty({ example: true, required: false })
    isAdmin?: boolean;

}