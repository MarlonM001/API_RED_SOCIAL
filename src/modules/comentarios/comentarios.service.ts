import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comentarios, ComentariosDocument } from './schemas/comentarios.schema';
import { Model } from 'mongoose';
import { CreateComentariosDto } from './dto/create-comentarios.dto';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { SearchComentariosDto } from './dto/search-comentarios.dto';
import { UpdateComentariosDto } from './dto/update-comentarios.dto';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectModel(Comentarios.name)
        private readonly comentarioModel: Model<ComentariosDocument>,
    ) {}

    /**
     * CREAR COMENTARIO
     */
    async create(dto: CreateComentariosDto) {
        const comentario = await this.comentarioModel.create(dto);

        return ResponseHelper.succes(comentario, 201);
    }

    /**
     * CONSULTAR COMENTARIOS
     */
    async findAll(search: SearchComentariosDto) {
        const filter: any = { activo: true };

        if (search.publicacion_id) {
            filter.publicacion_id = search.publicacion_id;
        }

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.comentarioModel
            .find(filter)
            .populate('usuario_id')
            .populate('publicacion_id')
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.comentarioModel.countDocuments(filter);

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
        const comentario = await this.comentarioModel
            .findById(id)
            .populate('usuario_id')
            .populate('publicacion_id');

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        return ResponseHelper.succes(comentario);
    }

    /**
     * ACTUALIZAR
     */
    async update(id: string, dto: UpdateComentariosDto) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('No se encontró el comentario');
        }

        const updated = await this.comentarioModel.findByIdAndUpdate(id, dto, {
            new: true,
        });

        return ResponseHelper.succes(updated);
    }

    /**
     * SOFT DELETE
     */
    async remove(id: string) {
        const comentario = await this.comentarioModel.findById(id);

        if (!comentario) {
            throw new NotFoundException('Comentario no encontrado');
        }

        const deleted = await this.comentarioModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deleted);
    }
}