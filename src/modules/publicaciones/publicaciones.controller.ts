import { Body, Controller, Post, Get, Param, Put, Delete, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { PublicacionesService } from "./publicaciones.service"
import { CreatePublicacionesDto } from "./dto/create-publicaiones.dto"
import { SearchPublicacionesDto } from "./dto/search-publicaciones.dto";
import { UpdatePublicacionesDto } from "./dto/update-publicaciones.dto";

@ApiTags('Publicaciones')
@Controller('publicaciones')
export class PublicacionesController {
    constructor(
        private readonly service: PublicacionesService,
    ) {}

    @Post()
    create(
        @Body() dto: CreatePublicacionesDto
    ) {
        return this.service.create(dto);
    }

    @Get()
    findAll(
        @Query() search: SearchPublicacionesDto
    ) {
        return this.service.findAll(search);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string
    ) {
        return this.service.findOne(id);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdatePublicacionesDto
    ) {
        return this.service.update(id, dto);
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
    ) {
        return this.service.remove(id);
    }
}