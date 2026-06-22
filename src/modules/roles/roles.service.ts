import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleDocument, Role } from './schemas/roles.schema';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { updateRoleDto } from './dto/update-role.dto';



@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  /** Metodo para crear un rol */
  async create(dto: CreateRoleDto) {
    const role = await this.roleModel.create(dto);
    return ResponseHelper.succes(role, 201);
  }

  /**
   * METODO PARA CONSULTAR ROLES
   */

  async findAll() {
    const roles= await this.roleModel.find({activo: true});
    return ResponseHelper.succes(roles);
    }



    /**
     *ELIMINAR LOGICAMENTE
     */

   async findInactive(){
    const roles= await this.roleModel.find({activo: false});
    return ResponseHelper.succes(roles);
   }
   
   
  /**
 * METODO PARA ACTUALIZAR UN ROL
 */


  async findOne(id: string){
    const role = await this.roleModel.findById(id);
    if(!role) throw new NotFoundException('Rol no encontrado');
    return ResponseHelper.succes(role);
  }

  /**
   * ACTUALIZAR COMPLETAMENTE UN ROL
   */

  async update(id:string, dto: updateRoleDto){
    const role = await this.roleModel. findById(id);
    if(!role) throw new NotFoundException('Rol no encontrado');
    const updatedRole = await this.roleModel.findByIdAndUpdate(id,
    dto, {new: true});
    return ResponseHelper.succes(updatedRole);
  }

  /**
   * ACTUALIZACION PARCIAL DE UN ROL
   */

  async partialUpdate(id:string, dto: updateRoleDto){
    const role = await this.roleModel. findById(id);
    if(!role) throw new NotFoundException('Rol no encontrado');
    const updatedRole = await this.roleModel.findByIdAndUpdate(id, {$set:dto}, {new: true});
    return ResponseHelper.succes(updatedRole);
  }

  
  /**
   * Consulta roles eliminados logicamente
   */

  async findDeleted(){
    const roles = await this.roleModel.find({activo: false});
    return ResponseHelper.succes(roles);
  }


  /**
   * ELIMINACION LOGICA DE UN ROL
   */


  async remove(id:string){
    const role = await this.roleModel. findById(id);
    if(!role) throw new NotFoundException('Rol no encontrado');
    const deletedRole =await this.roleModel.findByIdAndUpdate(id, {activo: false}, {new: true});
    return ResponseHelper.succes ( deletedRole);
  }
 /**
  * RESTAURAR UN ROL ELIMINADO LOGICAMENTE
  */
  async restore(id:string){
    const role = await this.roleModel. findById(id);
    if(!role) throw new NotFoundException('Rol no encontrado');
    const restoredRole = await this.roleModel.findByIdAndUpdate(id, {activo: true}, {new: true});
    return ResponseHelper.succes(restoredRole);
  }

}



