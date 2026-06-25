import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Seguidores, SeguidoresDocument } from './schemas/seguidores.schema';
import { Model } from 'mongoose';
import { CreateSeguidoresDto } from './dto/create-seguidores.dto';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { SearchSeguidoresDto } from './dto/search-seguidores.dto';
import { UpdateSeguidoresDto } from './dto/update-seguidores.dto';

@Injectable()
export class SeguidoresService {
  constructor(
    @InjectModel(Seguidores.name)
    private readonly seguidorModel: Model<SeguidoresDocument>,
  ) {}

  /**
   * CREAR RELACION DE SEGUIDOR
   */
  async create(dto: CreateSeguidoresDto) {
    // VERIFICAR QUE NO EXISTA YA ESA RELACION
    const exists = await this.seguidorModel.findOne({
      usuario_id: dto.usuario_id,
      seguido_id: dto.seguido_id,
    });

    if (exists) {
      throw new BadRequestException('Ya sigues a este usuario');
    }

    const seguidor = await this.seguidorModel.create(dto);

    return ResponseHelper.succes(seguidor, 201);
  }

  /**
   * CONSULTAR SEGUIDORES
   */
  async findAll(search: SearchSeguidoresDto) {
    const filter: any = { activo: true };

    if (search.usuario_id) {
      filter.usuario_id = search.usuario_id;
    }

    const page = Number(search.page) || 1;
    const limit = Number(search.limit) || 10;

    const data = await this.seguidorModel
      .find(filter)
      .populate('usuario_id')
      .populate('seguido_id')
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await this.seguidorModel.countDocuments(filter);

    return ResponseHelper.succes({
      total,
      page,
      limit,
      data,
    });
  }

  /**
   * CONSULTA POR ID
   */
  async findOne(id: string) {
    const seguidor = await this.seguidorModel
      .findById(id)
      .populate('usuario_id')
      .populate('seguido_id');

    if (!seguidor) {
      throw new NotFoundException('Registro no encontrado');
    }

    return ResponseHelper.succes(seguidor);
  }

  /**
   * ACTUALIZAR
   */
  async update(id: string, dto: UpdateSeguidoresDto) {
    const seguidor = await this.seguidorModel.findById(id);

    if (!seguidor) {
      throw new NotFoundException('No se encontró el registro');
    }

    const updated = await this.seguidorModel.findByIdAndUpdate(id, dto, {
      new: true,
    });

    return ResponseHelper.succes(updated);
  }

  /**
   * SOFT DELETE (dejar de seguir)
   */
  async remove(id: string) {
    const seguidor = await this.seguidorModel.findById(id);

    if (!seguidor) {
      throw new NotFoundException('Registro no encontrado');
    }

    const deleted = await this.seguidorModel.findByIdAndUpdate(
      id,
      { activo: false },
      { new: true },
    );

    return ResponseHelper.succes(deleted);
  }
}