import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    @ApiProperty({ 
        description: 'Nombre del usuario',
        minLength: 3,
        maxLength: 50
        
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3,{message: 'El nombre debe tener al menos 3 caracteres'})
    @MaxLength(50,{message: 'El nombre no puede exceder los 50 caracteres'})
    nombre!: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        maxLength: 100
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100,{message: 'El correo no puede exceder los 100 caracteres'})
    @IsEmail({}, { message: 'El correo debe ser una dirección de correo electrónico válida' })
    correo!: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        minLength: 8,
        maxLength: 20
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6,{message: 'La contraseña debe tener al menos 8 caracteres'})
    @MaxLength(20,{message: 'La contraseña no puede exceder los 20 caracteres'})
    password!: string;

    @ApiProperty({
        description: 'ID del rol del usuario'
    })
    @IsNotEmpty()
    rol_id!: string;

}