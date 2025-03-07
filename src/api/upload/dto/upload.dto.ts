import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto
{
    @ApiProperty({ type: 'string', format: 'binary', description: 'Upload File' })
    file: any;
}

export class UploadResponseDto
{
    @ApiProperty({ example: '/uploads/xyz.jpg', description: 'URL of uploaded file' })
    url: string;

    @ApiProperty({ example: 'xyz.jpg', description: 'Original filename' })
    filename: string;

    @ApiProperty({ example: '/uploads/xyz.jpg', description: 'Server path of file' })
    path: string;

    @ApiProperty({ example: 'image', description: 'Type of file' })
    fileType: string;

    @ApiProperty({ example: '2025-03-07T10:00:00.000Z', description: 'Upload timestamp' })
    uploadedAt: Date;
}