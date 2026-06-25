import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateReaccionesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    tipo!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    usuario_id!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    publicacion_id!: string;
}