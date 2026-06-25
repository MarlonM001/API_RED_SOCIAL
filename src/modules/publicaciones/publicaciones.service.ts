import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePublicacionesDto } from './dto/create-publicaiones.dto';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { SearchPublicacionesDto } from './dto/search-publicaciones.dto';
import { UpdatePublicacionesDto } from './dto/update-publicaciones.dto';
import { Publicaciones, PublicacionesDocument } from './schemas/publicaciones.schema';

@Injectable()
export class PublicacionesService {
    constructor(
        @InjectModel(Publicaciones.name)
        private readonly publicacionModel: Model<PublicacionesDocument>,
    ) {}

    /**
     * CREAR PUBLICACION
     */
    async create(dto: CreatePublicacionesDto) {
        const publicacion = await this.publicacionModel.create(dto);

        return ResponseHelper.succes(publicacion, 201);
    }

    /**
     * CONSULTAR PUBLICACIONES
     */
    async findAll(search: SearchPublicacionesDto) {
        const filter: any = { activo: true };

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.publicacionModel
            .find(filter)
            .populate('usuario_id')
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.publicacionModel.countDocuments(filter);

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
        const publicacion = await this.publicacionModel
            .findById(id)
            .populate('usuario_id');

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        return ResponseHelper.succes(publicacion);
    }

    /**
     * ACTUALIZAR
     */
    async update(id: string, dto: UpdatePublicacionesDto) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('No se encontró la publicación');
        }

        const updated = await this.publicacionModel.findByIdAndUpdate(id, dto, {
            new: true,
        });

        return ResponseHelper.succes(updated);
    }

    /**
     * SOFT DELETE
     */
    async remove(id: string) {
        const publicacion = await this.publicacionModel.findById(id);

        if (!publicacion) {
            throw new NotFoundException('Publicación no encontrada');
        }

        const deleted = await this.publicacionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deleted);
    }
}