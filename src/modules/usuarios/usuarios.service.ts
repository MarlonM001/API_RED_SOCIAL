
import {
  BadRequestException,
  Injectable,
  NotFoundException,} 
from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuarios, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuarios.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  /**
   * METODO PARA LA CREACION DE USUARIO
   */
  async create(dto: CreateUserDto) {
    // VERIFICACION DE CORREO
    const exists = await this.userModel.findOne({ correo: dto.correo });

    // SI EXISTE EL CORREO
    if (exists){
      throw new BadRequestException('Correo ya registrado');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 20);

    const user = await this.userModel.create({...dto,password: hashedPassword,
    });

    return ResponseHelper.succes(user, 201);
  }

  /**
   * CONSULTAR USUARIO
   */
  async findAll(search: SearchUserDto) {
    // CREAR FILTROS
    const filter: any = { activo: true };

    // FILTRO POR NOMBRE
    if (search.nombre) {
      filter.nombre = {
        $regex: search.nombre,
        $options: 'i',
      };
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    // CONSULTA
    const data = await this.userModel
      .find(filter)
      .populate('role_id')
      .skip((page - 1) * limit)
      .limit(limit);

    // CONTADOR DE DOCUMENTOS
    const total = await this.userModel.countDocuments(filter);

    return ResponseHelper.succes({
      total,
      page,
      limit,
      data,
    });
  }

  /**
   * CONSULTA POR ID DE USUARIO
   */
  async findOne(id: string) {
    const user = await this.userModel.findById(id).populate('role_id');

    if (!user) {
      throw new NotFoundException('Usuario No encontrado');
    }

    return ResponseHelper.succes(user);
  }

  /**
   * ACTUALIZACION DE HORARIO
   */
  
 async update(id:string, dto:UpdateUserDto){
  const user = await this.userModel.findById(id)

  if (!user){
    throw new NotFoundException('No se encontro el usuario')
  }

  if(dto.password){
    dto.password = await bcrypt.hash(dto.password, 20);
  }
  
  
  const updateuser = await this.userModel.findByIdAndUpdate(id, dto,{new:true});
  
  return ResponseHelper.succes(updateuser)
  
  }

  /**
   * SOFT DELETE
   */

async remove(id:string){
    const user= await this.userModel.findById(id)

    if (!user){
        throw new NotFoundException('Usuario no Encontrado')
    }

    const deletedUser = await this.userModel.findByIdAndUpdate(id,{activo:false},{new:true});

    return ResponseHelper.succes(deletedUser)
    }

}
