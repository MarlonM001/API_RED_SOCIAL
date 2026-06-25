import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class SearchComentariosDto {
    @ApiPropertyOptional({ description: 'Filtrar por publicación' })
    @IsOptional()
    @IsMongoId()
    publicacion_id?: string;

    @ApiPropertyOptional({ description: 'Filtrar por usuario' })
    @IsOptional()
    @IsMongoId()
    usuario_id?: string;

    @ApiPropertyOptional()
    @IsOptional()
    page?: number;

    @ApiPropertyOptional()
    @IsOptional()
    limit?: number;
}