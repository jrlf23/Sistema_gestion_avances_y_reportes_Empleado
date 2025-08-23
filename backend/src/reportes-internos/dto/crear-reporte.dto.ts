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
  @IsOptional()
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
  @IsOptional()
  marca: string;

  @IsString()
  @IsOptional()
  tipo: string;

  @IsString()
  equipo: string;

  @IsDateString()
  fechaIngreso: string;

  @IsOptional()
  @IsDateString()
  fecha?: string;

  @IsOptional()
  @IsDateString()
  fechaSalida?: string;

  @IsNumber()
  @IsOptional()
  kilInicial: number;

  @IsNumber()
  @IsOptional()
  kilFinal: number;

  @IsString()
  @IsOptional()
  falla: string;

  @IsString()
  @IsOptional()
  trabajoRealizado: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  accesorios: string[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RepuestoDto)
  repuestos: RepuestoDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PuntoDto)
  puntos: PuntoDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => BahiaDto)
  bahias: BahiaDto[];

  @IsOptional()
  @IsString()
  hora_inicio?: string;

  @IsOptional()
  @IsString()
  hora_fin?: string;

  @IsOptional()
  @IsString()
  horas_km?: string;

  @IsOptional()
  @IsString()
  sistema?: string;

  @IsOptional()
  @IsString()
  detalles_sistema?: string;

  @IsOptional()
  @IsString()
  detalles_falla?: string;

  @IsOptional()
  @IsString()
  fuente_reporte?: string;

  @IsOptional()
  @IsString()
  acciones_tomadas?: string;

  @IsOptional()
  @IsString()
  causa_raiz?: string;

  @IsOptional()
  @IsString()
  acciones_preventivas?: string;

  @IsOptional()
  @IsString()
  observaciones_finales?: string;
}

