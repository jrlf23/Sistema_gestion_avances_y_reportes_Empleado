import { Type } from "class-transformer";
import { IsArray, IsDateString, IsNumberString, IsOptional, IsString, ValidateNested } from "class-validator";


class RepuestosDto {
    @IsString()
    nombre: string;

    @IsNumberString()
    cantidad: string;

    @IsNumberString()
    precio: string;
}

class PuntoDto {
    @IsNumberString()
    x: string;

    @IsNumberString()
    y: string;
}

class BahiaItemRevisionDto {
    @IsString()
    nombre: string;

    @IsString()
    lado: 'izquierdo' | 'derecho';

    @IsNumberString()
    bahia: string;
}

export class CrearReportDto {
    @IsString()
    cliente: string;

    @IsOptional()
    @IsString()
    direccion?: string;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    @IsString()
    logo?: string;

    @IsString()
    placa: string;

    @IsString()
    marca: string;

    @IsString()
    tipo: string;

    @IsString()
    equipo: string;

    @IsDateString()
    fechaIngreso: string;

    @IsDateString()
    fechaSalida: string;

    @IsString()
    kilInicial: string;

    @IsString()
    kilFinal: string;

    @IsString()
    falla: string;

    @IsString()
    trabajoRealizado: string;

    @IsArray()
    @IsString({ each: true })
    accesorios: string[];

    @ValidateNested({ each: true })
    @Type(() => RepuestosDto)
    repuestos: RepuestosDto[];

    @ValidateNested({ each: true })
    @Type(() => BahiaItemRevisionDto)
    revisionesBahias: BahiaItemRevisionDto[];

    @IsOptional()
    @IsString()
    observacion?: string;

    @IsOptional()
    @IsString()
    enderezar?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PuntoDto)
    puntosFrontal?: PuntoDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PuntoDto)
    puntosTrasera?: PuntoDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PuntoDto)
    puntosSuperior?: PuntoDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PuntoDto)
    puntosIzquierdo?: PuntoDto[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PuntoDto)
    puntosDerecho?: PuntoDto[];
}
