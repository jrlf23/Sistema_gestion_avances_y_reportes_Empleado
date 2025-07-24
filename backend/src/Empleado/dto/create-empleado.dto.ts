import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateEmpleadoDto
{
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    address?: string;
    phoneNumber?: string;
    dui?: string;
}