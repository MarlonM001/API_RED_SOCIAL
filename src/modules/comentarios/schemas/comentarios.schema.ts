import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ComentariosDocument = Comentarios & Document;

/**
 * COLECCION DE COMENTARIOS
 */
@Schema({
    timestamps: true,
})
export class Comentarios {
    @Prop({ required: true })
    texto!: string;

    @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: true })
    usuario_id!: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Publicaciones', required: true })
    publicacion_id!: Types.ObjectId;

    @Prop({ default: true })
    activo!: boolean;
}

export const ComentariosSchema = SchemaFactory.createForClass(Comentarios);

ComentariosSchema.index({ publicacion_id: 1 });