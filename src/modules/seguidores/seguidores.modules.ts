import {MongooseModule} from '@nestjs/mongoose';
import {Seguidores, SeguidoresSchema} from './schemas/seguidores.schema';
import { Module } from '@nestjs/common';
import { SeguidoresController } from './seguidores.controller';
import { SeguidoresService } from './seguidores.service';

@Module({

    controllers: [SeguidoresController],
    providers:[SeguidoresService],
    imports :[
        MongooseModule.forFeature([
            {
                name:Seguidores.name,
                schema:SeguidoresSchema
            },
        ]),
    ]


})
export class SeguidoresModule{}
