import { MongooseModule } from '@nestjs/mongoose';
import { Comentarios, ComentariosSchema } from './schemas/comentarios.schema';
import { Usuarios, UserSchema } from '../usuarios/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ComentariosController } from './comentarios.controllers';
import { ComentariosService } from './comentarios.service';

@Module({
    controllers: [ComentariosController],
    providers: [ComentariosService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Comentarios.name,
                schema: ComentariosSchema,
            },
        ]),
    ],
})
export class ComentariosModule {}