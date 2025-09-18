import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateReporteExternoDto
{
    @IsNotEmpty()
    placa: string;

    @IsNotEmpty()
    equipo: string;

    @IsOptional()
    @IsString()
    cd?: string;

    @IsDateString()
    fecha: string;

    @IsNotEmpty()
    horaInicio: string;

    @IsNotEmpty()
    horaFin: string;

    @IsNotEmpty()
    horasKm: string;

    @IsNotEmpty()
    sistema: string;

    @IsOptional()
    @IsString()
    detallesFalla?: string;

    @IsArray()
    fuenteReporte: string[];

    // Se asignará desde el token; no viene del cliente
}