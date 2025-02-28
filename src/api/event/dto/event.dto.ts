import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto
{
    @ApiProperty({ example: 'Charity Run', description: 'Title of the event' })
    title: string;

    @ApiProperty({ example: 'A 5km charity run for a cause', description: 'Event description' })
    description: string;

    @ApiProperty({ example: 'https://example.com/event.jpg', description: 'Event image URL', required: false })
    picture?: string;

    @ApiProperty({ example: '14:00', description: 'Time of the event' })
    time: string;

    @ApiProperty({ example: '2025-03-15', description: 'Date of the event' })
    date: Date;

    @ApiProperty({ example: 'Central Park', description: 'Location of the event' })
    location: string;

    @ApiProperty({ example: '10115', description: 'Postal code of the event location' })
    postalCode: string;
    
}

export class UpdateEventDto
{
    @ApiProperty({ example: 'Updated title', required: false })
    title?: string;

    @ApiProperty({ example: 'Updated description', required: false })
    description?: string;

    @ApiProperty({ example: 'https://example.com/event2.jpg', required: false })
    picture?: string;

    @ApiProperty({ example: '15:00', required: false })
    time?: string;

    @ApiProperty({ example: '2025-04-10', required: false })
    date?: Date;

    @ApiProperty({ example: 'New Event Hall', required: false })
    location?: string;

    @ApiProperty({ example: '10178', required: false })
    postalCode?: string;

}