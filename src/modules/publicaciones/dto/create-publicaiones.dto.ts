import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicacionesDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    texto!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    usuario_id!: string;
}