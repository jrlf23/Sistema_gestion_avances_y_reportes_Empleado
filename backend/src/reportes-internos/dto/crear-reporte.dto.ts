import { IsArray, IsDateString, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AreaEnum } from '../entities/punto.entity';

export class CrearReportDto {
  @IsString()
  @IsNotEmpty()
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
  @IsNotEmpty()
  placa: string;

  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsString()
  @IsNotEmpty()
  equipo: string;

  // 🔹 En DB es DATE, aquí permitimos "YYYY-MM-DD"
  @IsDate()
  @Type(() => Date)
  fechaIngreso: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fechaSalida?: Date;

  @IsOptional()
  @IsNumber()
  kilInicial?: number;

  @IsOptional()
  @IsNumber()
  kilFinal?: number;

  @IsString()
  @IsNotEmpty()
  falla: string;

  @IsString()
  @IsNotEmpty()
  trabajoRealizado: string;

  // 🔹 En DB es JSON, lo recibimos como objeto/array sin validar subcampos
  @IsOptional()
  accesorios: any;

  @IsOptional()
  repuestos: any;

  @IsOptional()
  revision_bahias: any;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsOptional()
  @IsString()
  enderezar?: string;

  // 🔹 Nuevos campos que agregaste en entidad
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
