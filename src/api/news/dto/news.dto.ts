import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto
{
    @ApiProperty({ example: 'New Animal Shelter Opening', description: 'Title of the news article' })
    title: string;

    @ApiProperty({ example: 'A new shelter is opening in Berlin.', description: 'Details of the news' })
    description: string;

    @ApiProperty({ example: 'https://example.com/news.jpg', description: 'Image URL for the news', required: false })
    images: string[];

    @ApiProperty({ example: 'https://example.com/news.jpg', description: 'Image URL for the news', required: false })
    imageUrls: string[];

}

export class UpdateNewsDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    description?: string;

    @ApiProperty({ example: 'https://example.com/news.jpg', description: 'Image URL for the news', required: false })
    images: string[];

    @ApiProperty({ example: 'https://example.com/news.jpg', description: 'Image URL for the news', required: false })
    imageUrls: string[];

}