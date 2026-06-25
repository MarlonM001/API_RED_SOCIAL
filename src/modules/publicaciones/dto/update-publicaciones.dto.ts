import { PartialType } from "@nestjs/swagger";
import { CreatePublicacionesDto } from './create-publicaiones.dto';

export class UpdatePublicacionesDto extends PartialType(CreatePublicacionesDto) {
}