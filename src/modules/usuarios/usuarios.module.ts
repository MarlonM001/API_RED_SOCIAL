import {MongooseModule} from '@nestjs/mongoose';
import {Usuarios, UserSchema} from './schemas/user.schema';
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({

    controllers: [UsuariosController],
    providers:[UsuariosService],
    imports :[
        MongooseModule.forFeature([
            {
                name:Usuarios.name,
                schema:UserSchema
            },
        ]),
    ]


})
export class UsuariosModule{}
