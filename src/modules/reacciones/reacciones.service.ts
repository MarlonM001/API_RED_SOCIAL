import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReaccionesDto } from './dto/create-reacciones.dto';
import { ResponseHelper } from 'src/common/helper/response.helper';
import { UpdateReaccionesDto } from './dto/update-reacciones.dto';
import { SearchReaccionesDto } from './dto/search-recciones.dto';
import { Reacciones, ReaccionesDocument } from './schemas/reacciones.schema';

@Injectable()
export class ReaccionesService {
    constructor(
        @InjectModel(Reacciones.name)
        private readonly reaccionModel: Model<ReaccionesDocument>,
    ) {}

    /**
     * CREAR REACCION
     */
    async create(dto: CreateReaccionesDto) {
        // VERIFICAR QUE EL USUARIO NO HAYA REACCIONADO YA A ESTA PUBLICACION
        const exists = await this.reaccionModel.findOne({
            usuario_id: dto.usuario_id,
            publicacion_id: dto.publicacion_id,
        });

        if (exists) {
            throw new BadRequestException('Ya reaccionaste a esta publicación');
        }

        const reaccion = await this.reaccionModel.create(dto);

        return ResponseHelper.succes(reaccion, 201);
    }

    /**
     * CONSULTAR REACCIONES
     */
    async findAll(search: SearchReaccionesDto) {
        const filter: any = { activo: true };

        if (search.publicacion_id) {
            filter.publicacion_id = search.publicacion_id;
        }

        if (search.usuario_id) {
            filter.usuario_id = search.usuario_id;
        }

        const page = Number(search.page) || 1;
        const limit = Number(search.limit) || 10;

        const data = await this.reaccionModel
            .find(filter)
            .populate('usuario_id')
            .populate('publicacion_id')
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await this.reaccionModel.countDocuments(filter);

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
        const reaccion = await this.reaccionModel
            .findById(id)
            .populate('usuario_id')
            .populate('publicacion_id');

        if (!reaccion) {
            throw new NotFoundException('Reacción no encontrada');
        }

        return ResponseHelper.succes(reaccion);
    }

    /**
     * ACTUALIZAR
     */
    async update(id: string, dto: UpdateReaccionesDto) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('No se encontró la reacción');
        }

        const updated = await this.reaccionModel.findByIdAndUpdate(id, dto, {
            new: true,
        });

        return ResponseHelper.succes(updated);
    }

    /**
     * SOFT DELETE
     */
    async remove(id: string) {
        const reaccion = await this.reaccionModel.findById(id);

        if (!reaccion) {
            throw new NotFoundException('Reacción no encontrada');
        }

        const deleted = await this.reaccionModel.findByIdAndUpdate(
            id,
            { activo: false },
            { new: true },
        );

        return ResponseHelper.succes(deleted);
    }
}