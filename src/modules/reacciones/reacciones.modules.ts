import { MongooseModule } from '@nestjs/mongoose';
import { Reacciones, ReaccionesSchema } from './schemas/reacciones.schema';
import { Usuarios, UserSchema } from '../usuarios/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ReaccionesController } from './reacciones.controller';
import { ReaccionesService } from './reacciones.service';

@Module({
    controllers: [ReaccionesController],
    providers: [ReaccionesService],
    imports: [
        MongooseModule.forFeature([
            {
                name: Reacciones.name,
                schema: ReaccionesSchema,
            },
        ]),
    ],
})
export class ReaccionesModule {}