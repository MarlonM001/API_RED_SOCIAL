import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateSeguidoresDto {
    @ApiProperty({ description: 'ID del usuario que sigue' })
    @IsNotEmpty()
    @IsMongoId()
    usuario_id!: string;

    @ApiProperty({ description: 'ID del usuario que es seguido' })
    @IsNotEmpty()
    @IsMongoId()
    seguido_id!: string;
}