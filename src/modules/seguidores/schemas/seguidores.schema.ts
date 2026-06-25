import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SeguidoresDocument = Seguidores & Document;

/**
 * COLECCION DE SEGUIDORES
 */
@Schema({
    timestamps: true,
})
export class Seguidores {
    @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: true })
    usuario_id!: Types.ObjectId; // quien sigue

    @Prop({ type: Types.ObjectId, ref: 'Usuarios', required: true })
    seguido_id!: Types.ObjectId; // a quien sigue

    @Prop({ default: true })
    activo!: boolean;
}

export const SeguidoresSchema = SchemaFactory.createForClass(Seguidores);

// Evita que un mismo usuario siga dos veces al mismo seguido
SeguidoresSchema.index({ usuario_id: 1, seguido_id: 1 }, { unique: true });