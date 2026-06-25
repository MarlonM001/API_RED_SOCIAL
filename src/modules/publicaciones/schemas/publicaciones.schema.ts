import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PublicacionesDocument = Publicaciones & Document;

/**
 * COLECCION DE PUBLICACIONES
 */
@Schema({
    timestamps: true,
})
export class Publicaciones {
    @Prop({ required: true })
    texto!: string;

    @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: true })
    usuario_id!: Types.ObjectId;

    @Prop({ default: true })
    activo!: boolean;
}

export const PublicacionesSchema = SchemaFactory.createForClass(Publicaciones);

PublicacionesSchema.index({ usuario_id: 1 });