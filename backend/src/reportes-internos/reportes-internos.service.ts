import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ReporteInterno1 } from "./entities/reporte-interno1.entity";
import { ReporteInterno2 } from "./entities/reporte-interno2.entity";
import { ReporteInterno3 } from "./entities/reporte-interno3.entity";
import { CrearReporteFullDto, CrearReportePaso1Dto, CrearReportePaso2Dto, CrearReportePaso3Dto } from "./dto/crear-reporte.dto";

@Injectable()
export class reportesInternosService {
  constructor(
    @InjectRepository(ReporteInterno1)
    private repoPaso1: Repository<ReporteInterno1>,

    @InjectRepository(ReporteInterno2)
    private repoPaso2: Repository<ReporteInterno2>,

    @InjectRepository(ReporteInterno3)
    private repoPaso3: Repository<ReporteInterno3>,
  ) {}

  private toDate(value?: string | null): string | null | undefined {
    if (value === undefined) return undefined;
    if (value === null) return null;
    return value.toString().slice(0, 10);
  }

  private toTime(value?: string | null): string | null | undefined {
    if (value === undefined) return undefined;
    if (value === null) return null;
    const v = value.toString();
    if (/^\d{2}:\d{2}:\d{2}$/.test(v)) return v;
    if (/^\d{2}:\d{2}$/.test(v)) return `${v}:00`;
    return v;
  }

  async crearPaso1(data: CrearReportePaso1Dto): Promise<ReporteInterno1> {
    const fuente = Array.isArray((data as any)?.fuente_reporte)
      ? (data as any).fuente_reporte.join(', ')
      : (data as any)?.fuente_reporte ?? '';
    const entity = this.repoPaso1.create({
      ...data,
      fecha: this.toDate(data.fecha) as string,
      hora_inicio: this.toTime(data.hora_inicio) as string,
      hora_fin: this.toTime(data.hora_fin) as string,
      fuente_reporte: fuente,
    });
    return this.repoPaso1.save(entity);
  }

  async crearPaso2(data: CrearReportePaso2Dto): Promise<ReporteInterno2> {
    const entity = this.repoPaso2.create({
      ...data,
      fecha: this.toDate(data.fecha) as string,
      fecha_tentativa_entrega: this.toDate(data.fecha_tentativa_entrega) ?? null,
      fecha_real_entrega: this.toDate(data.fecha_real_entrega) ?? null,
    });
    return this.repoPaso2.save(entity);
  }

  async crearPaso3(data: CrearReportePaso3Dto): Promise<ReporteInterno3> {
    const entity = this.repoPaso3.create({
      ...data,
      fecha_ingreso: this.toDate(data.fecha_ingreso) ?? null,
      fecha_salida: this.toDate(data.fecha_salida) ?? null,
    });
    return this.repoPaso3.save(entity);
  }

  async crearFull(payload: CrearReporteFullDto) {
    // Debug
    // console.log('[crearFull] payload keys:', Object.keys(payload || {}));
    const paso1 = await this.crearPaso1(payload.paso1);
    const paso2 = await this.crearPaso2(payload.paso2);
    const paso3 = await this.crearPaso3(payload.paso3);
    return { paso1, paso2, paso3 };
  }

  async crearFullCompat(payload: any) {
    if (payload && payload.paso1 && payload.paso2 && payload.paso3) {
      return this.crearFull(payload as CrearReporteFullDto);
    }

    const toDate = (v?: any) => (v ? v.toString().slice(0, 10) : undefined);
    const toInt = (v: any) => (v === undefined || v === null || v === '' ? undefined : Number(v));

    const hasPaso1Min = !!(payload?.placa && payload?.equipo && (payload?.fecha || payload?.hora_inicio));
    const hasPaso2Min = !!(payload?.fecha && payload?.equipo && payload?.placa && (payload?.trabajoSolicitado || payload?.trabajo_solicitado));
    const hasPaso3Min = !!(payload?.cliente && payload?.placa && ((payload?.falla && String(payload?.falla).trim()) || (payload?.detalles_falla && String(payload?.detalles_falla).trim())) && (payload?.trabajoRealizado && String(payload?.trabajoRealizado).trim()));

    // console.log('[crearFullCompat] keys:', Object.keys(payload || {}));
    // console.log('[crearFullCompat] hasPaso1Min:', hasPaso1Min, 'hasPaso2Min:', hasPaso2Min, 'hasPaso3Min:', hasPaso3Min);

    const paso1: CrearReportePaso1Dto | undefined = hasPaso1Min
      ? ({
          placa: payload.placa,
          equipo: payload.equipo,
          fecha: toDate(payload.fecha) as string,
          hora_inicio: toDate(payload.fecha) ? payload.hora_inicio : this.toTime(payload.hora_inicio),
          hora_fin: this.toTime(payload.hora_fin),
          horas_km: payload.horas_km,
          sistema: String(payload.sistema ?? ''),
          detalles_sistema: payload.detalles_sistema,
          detalles_falla: payload.detalles_falla,
          fuente_reporte: Array.isArray(payload.fuente_reporte)
            ? payload.fuente_reporte
            : payload.fuente_reporte
            ? String(payload.fuente_reporte).split(',').map((s: string) => s.trim())
            : [],
          id_empleado: toInt(payload.id_empleado),
        } as CrearReportePaso1Dto)
      : undefined;

    const paso2: CrearReportePaso2Dto | undefined = hasPaso2Min
      ? ({
          fecha: toDate(payload.fecha) as string,
          equipo: payload.equipo,
          placa: payload.placa,
          tipo: payload.tipo,
          marca: payload.marca,
          depto: payload.depto,
          kilometraje: toInt(payload.kilometraje),
          combustible: (payload.combustible as any) ?? '1/4',
          trabajo_solicitado: payload.trabajoSolicitado ?? payload.trabajo_solicitado,
          observaciones: payload.observaciones,
          supervisor_recibe: payload.supervisorRecibe,
          mecanico_asignado: payload.mecanicoAsignado,
          supervisor_entrega: payload.supervisorEntrega,
          fecha_tentativa_entrega: toDate(payload.fechaTentativaEntrega),
          fecha_real_entrega: toDate(payload.fechaRealEntrega),
          persona_entrega: payload.personaEntrega,
          persona_recibe: payload.personaRecibe,
          inspeccion: payload.inspeccion,
          accesorios: payload.accesorios,
          herramientas: payload.herramientas,
          costos: payload.costos,
          id_empleado: toInt(payload.id_empleado),
        } as CrearReportePaso2Dto)
      : undefined;

    const paso3: CrearReportePaso3Dto | undefined = hasPaso3Min
      ? ({
          cliente: payload.cliente,
          direccion: payload.direccion,
          color: payload.color,
          logo: payload.logo,
          placa: payload.placa,
          marca: payload.marca,
          tipo: payload.tipo,
          equipo: payload.equipo,
          fecha_ingreso: toDate(payload.fechaIngreso),
          fecha_salida: toDate(payload.fechaSalida),
          kil_inicial: toInt(payload.kilInicial),
          kil_final: toInt(payload.kilFinal),
          falla: payload.falla ?? payload.detalles_falla ?? '',
          trabajo_realizado: payload.trabajoRealizado ?? '',
          accesorios: payload.accesorios,
          repuestos: Array.isArray(payload.repuestos)
            ? payload.repuestos.map((r: any) => ({
                nombre: r.nombre,
                cantidad: toInt(r.cantidad) ?? 0,
                precio: toInt(r.precio) ?? 0,
              }))
            : undefined,
          revision_bahias: payload.revisionData ?? payload.revision_bahias,
          observacion: payload.observacion,
          enderezar: payload.enderezar,
          id_empleado: toInt(payload.id_empleado),
        } as CrearReportePaso3Dto)
      : undefined;

    const result: any = {};
    if (paso1) result.paso1 = await this.crearPaso1(paso1);
    if (paso2) result.paso2 = await this.crearPaso2(paso2);
    if (paso3) result.paso3 = await this.crearPaso3(paso3);
    return result;
  }
}
