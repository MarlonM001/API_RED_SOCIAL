import { MongooseModule } from '@nestjs/mongoose';
import { Publicaciones, PublicacionesSchema } from './schemas/publicaciones.schema';
import { Module } from '@nestjs/common';
import { PublicacionesController } from './publicaciones.controller';
import { PublicacionesService } from './publicaciones.service';

@Module({
    controllers: [PublicacionesController],
    providers: [PublicacionesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Publicaciones.name,
                schema: PublicacionesSchema,
            },
        ]),
    ],
})
export class PublicacionesModule {}