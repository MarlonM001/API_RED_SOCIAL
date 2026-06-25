import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = Usuarios & Document;


    /**
     * COLECCION DE USUARIOS
     */

    @Schema({
        timestamps: true,
    })
    export class Usuarios {
        @Prop({ required: true })
        nombre!: string;


    @Prop ({ required: true, unique: true})
        correo!: string;

    @Prop ({ required: true})
        password!: string;

    @Prop({ type: Types.ObjectId, ref: 'Role', required: true })
        role_id!: Types.ObjectId;

    @Prop({ default: true})
        activo!: boolean;

    
}

export const UserSchema = SchemaFactory.createForClass(Usuarios);

UserSchema.index({ correo: 1 });