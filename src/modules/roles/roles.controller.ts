import { Controller, Post, Body, Get, Param, Put, Patch, Delete} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { updateRoleDto } from './dto/update-role.dto';


@Controller('roles')
export class RolesController {
    constructor(
        private readonly Service: RolesService) {}


    /**
     * CREAR ROL
     */

    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.Service.create(dto);
    }

    @Get()
    findAll() {
        return this.Service.findAll();
    }

    /**
     * CONSULTAR ROLES INACTIVOS
     */

    @Get('Inactivos')
    findInactive() {
        return this.Service.findInactive();
    }
    

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.Service.findOne(id);
    }

    /**
     * ACTUALIZAR ROL
     */

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: updateRoleDto) {
        return this.Service.update(id, dto);
    }

    /**
     * RESTAURAR ROL ELIMINADO LOGICAMENTE
     */
    @Patch(':id/restaurar')
    restore(@Param('id') id: string) {
        return this.Service.restore(id);
    }
    
    @Patch(':id')
    partialUpdate(@Param('id') id: string, @Body() dto: updateRoleDto) {
        return this.Service.partialUpdate(id, dto);
    }   
    

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.Service.remove(id);
    }
    
    
}
