import { PartialType } from "@nestjs/swagger";
import { CreateComentariosDto } from './create-comentarios.dto';

export class UpdateComentariosDto extends PartialType(CreateComentariosDto) {
}