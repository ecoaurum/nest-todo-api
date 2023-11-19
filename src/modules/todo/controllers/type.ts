import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
    @ApiProperty({
        default: 404
    })
    statuscode: number;
    @ApiProperty({
        default: 'Todo with this id not exist'
    })
    message: string;
}