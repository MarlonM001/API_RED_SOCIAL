import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReaccionesDocument = Reacciones & Document;

/**
 * COLECCION DE REACCIONES
 */
@Schema({
    timestamps: true,
})
export class Reacciones {
    @Prop({ required: true })
    tipo!: string; // ej: 'like', 'love', 'haha'

    @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: true })
    usuario_id!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Publicaciones', required: true })
    publicacion_id!: Types.ObjectId;

    @Prop({ default: true })
    activo!: boolean;
}

export const ReaccionesSchema = SchemaFactory.createForClass(Reacciones);

// Evita que un mismo usuario reaccione dos veces a la misma publicación
ReaccionesSchema.index({ usuario_id: 1, publicacion_id: 1 }, { unique: true });