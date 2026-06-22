import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

/**
 * DTO para actualizar un rol
 * PartialType Convierte todas las propiedades
 * CreateRoleDto en opcionales, lo que es útil para las operaciones de actualización
 */

export class updateRoleDto extends PartialType(CreateRoleDto){
    
}
