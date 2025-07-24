import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AreaEnum } from '../entities/punto.entity';

class RepuestoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  precio: number;
}

class PuntoDto {
  @IsEnum(AreaEnum)
  area: AreaEnum;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;
}

class RevisionItemDto {
  @IsString()
  nombre: string;

  @IsString()
  lado: 'izquierdo' | 'derecho';
}

class BahiaDto {
  @IsNumber()
  numero: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RevisionItemDto)
  items: RevisionItemDto[];
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

  @IsOptional()
  @IsDateString()
  fechaSalida?: string;

  @IsNumber()
  kilInicial: number;

  @IsNumber()
  kilFinal: number;

  @IsString()
  falla: string;

  @IsString()
  trabajoRealizado: string;

  @IsArray()
  @IsString({ each: true })
  accesorios: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RepuestoDto)
  repuestos: RepuestoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PuntoDto)
  puntos: PuntoDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BahiaDto)
  bahias: BahiaDto[];
}
