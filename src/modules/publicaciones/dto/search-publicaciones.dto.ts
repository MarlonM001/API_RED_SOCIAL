import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class SearchPublicacionesDto {
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