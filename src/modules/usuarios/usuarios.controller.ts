import { Body, Controller, Post, Get, Param, Put, Patch, Delete, Query } from "@nestjs/common"
import { ApiTags } from "@nestjs/swagger"
import { UsuariosService } from "./usuarios.service"
import { CreateUserDto } from "./dto/create-user.dto"
import { SearchUserDto } from "./dto/search-user.dto";
import { getAllJSDocTags } from "typescript";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags('Usuarios')
@Controller('usuarios')

export class UsuariosController{
    constructor(
        private readonly service:
        UsuariosService,
    ){}

    @Post()
    Create(
        @Body()
            dto:CreateUserDto
        ){
            return this.service.create(dto);
        }

    @Get()
    findAll(
        @Query()
            search:SearchUserDto
        ){
            return this.service.findAll(search);
        }
    
    @Get(':id')
    findOne(
        @Param('id')
        id: string
    ){
        return this.service.findOne(id);
    }    

    @Put(':id')
    update(
        @Param('id')
        id:string,
        @Body()
        dto:UpdateUserDto
    ){
        return this.service.update(id,dto);
    }


    @Delete(':id')
    remove(
        @Param('id')
        id:string,

    ){
        return this.service.remove(id);
    }
}
    


