import { IsArray, IsDateString, IsEnum, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CrearReportePaso1Dto {
  @IsString() @IsNotEmpty() placa: string;
  @IsString() @IsNotEmpty() equipo: string;
  @IsDateString() fecha: string;
  @IsString() @IsNotEmpty() hora_inicio: string;
  @IsString() @IsNotEmpty() hora_fin: string;
  @IsString() @IsNotEmpty() horas_km: string;
  @IsString() @IsNotEmpty() sistema: string;
  @IsOptional() @IsString() detalles_sistema?: string;
  @IsOptional() @IsString() detalles_falla?: string;
  @IsArray() fuente_reporte: string[];
  @IsOptional() @IsInt() id_empleado?: number;
}

export class CrearReportePaso2Dto {
  @IsDateString() fecha: string;
  @IsString() equipo: string;
  @IsString() placa: string;
  @IsOptional() @IsString() tipo?: string;
  @IsOptional() @IsString() marca?: string;
  @IsOptional() @IsString() depto?: string;
  @IsOptional() @IsInt() kilometraje?: number;
  @IsIn(['1/4', '1/2', '3/4', 'F']) combustible: '1/4' | '1/2' | '3/4' | 'F';
  @IsString() trabajo_solicitado: string;
  @IsOptional() @IsString() observaciones?: string;
  @IsOptional() @IsString() supervisor_recibe?: string;
  @IsOptional() @IsString() mecanico_asignado?: string;
  @IsOptional() @IsString() supervisor_entrega?: string;
  @IsOptional() @IsDateString() fecha_tentativa_entrega?: string;
  @IsOptional() @IsDateString() fecha_real_entrega?: string;
  @IsOptional() @IsString() persona_entrega?: string;
  @IsOptional() @IsString() persona_recibe?: string;
  @IsOptional() inspeccion?: any;
  @IsOptional() accesorios?: any;
  @IsOptional() herramientas?: any;
  @IsOptional() costos?: any;
  @IsOptional() @IsInt() id_empleado?: number;
}

class RepuestoDto {
  @IsString() nombre: string;
  @IsInt() cantidad: number;
  @IsInt() precio: number;
}

export class CrearReportePaso3Dto {
  @IsString() cliente: string;
  @IsOptional() @IsString() direccion?: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsString() logo?: string;
  @IsString() placa: string;
  @IsOptional() @IsString() marca?: string;
  @IsOptional() @IsString() tipo?: string;
  @IsOptional() @IsString() equipo?: string;
  @IsOptional() @IsDateString() fecha_ingreso?: string;
  @IsOptional() @IsDateString() fecha_salida?: string;
  @IsOptional() @IsInt() kil_inicial?: number;
  @IsOptional() @IsInt() kil_final?: number;
  @IsString() falla: string;
  @IsString() trabajo_realizado: string;
  @IsOptional() accesorios?: any[];
  @IsOptional() @ValidateNested({ each: true }) @Type(() => RepuestoDto) repuestos?: RepuestoDto[];
  @IsOptional() revision_bahias?: any;
  @IsOptional() @IsString() observacion?: string;
  @IsOptional() @IsString() enderezar?: string;
  @IsOptional() @IsInt() id_empleado?: number;
}

export class CrearReporteFullDto {
  @ValidateNested() @Type(() => CrearReportePaso1Dto) paso1: CrearReportePaso1Dto;
  @ValidateNested() @Type(() => CrearReportePaso2Dto) paso2: CrearReportePaso2Dto;
  @ValidateNested() @Type(() => CrearReportePaso3Dto) paso3: CrearReportePaso3Dto;
}

