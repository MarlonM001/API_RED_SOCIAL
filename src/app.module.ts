import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { SeguidoresModule } from './modules/seguidores/seguidores.modules';
import { ComentariosModule } from './modules/comentarios/comentarios.modules';
import { Publicaciones } from './modules/publicaciones/schemas/publicaciones.schema';
import { PublicacionesModule } from './modules/publicaciones/publicaciones.modules';
import { ReaccionesModule } from './modules/reacciones/reacciones.modules';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RolesModule,
    UsuariosModule,
    SeguidoresModule,
    ComentariosModule,
    PublicacionesModule,
    ReaccionesModule,
    MongooseModule.forRoot(process.env.MONGO_URI as string),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}