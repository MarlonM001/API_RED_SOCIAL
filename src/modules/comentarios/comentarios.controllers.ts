import { Body, Controller, Post, Get, Param, Put, Delete, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { ComentariosService } from "./comentarios.service"
import { CreateComentariosDto } from "./dto/create-comentarios.dto"
import { SearchComentariosDto } from "./dto/search-comentarios.dto";
import { UpdateComentariosDto } from "./dto/update-comentarios.dto";

@ApiTags('Comentarios')
@Controller('comentarios')
export class ComentariosController {
    constructor(
        private readonly service: ComentariosService,
    ) {}

    @Post()
    create(
        @Body() dto: CreateComentariosDto
    ) {
        return this.service.create(dto);
    }

    @Get()
    findAll(
        @Query() search: SearchComentariosDto
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
        @Body() dto: UpdateComentariosDto
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