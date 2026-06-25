import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';

export class SearchSeguidoresDto {
    @ApiPropertyOptional({ description: 'Filtrar por usuario que sigue' })
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