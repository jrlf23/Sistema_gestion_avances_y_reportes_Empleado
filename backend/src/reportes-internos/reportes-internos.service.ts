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

  async crearPaso1(data: CrearReportePaso1Dto): Promise<ReporteInterno1> {
    const entity = this.repoPaso1.create({
      ...data,
      fuente_reporte: Array.isArray(data.fuente_reporte) ? data.fuente_reporte.join(', ') : (data as any).fuente_reporte,
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
    const paso1 = await this.crearPaso1(payload.paso1);
    const paso2 = await this.crearPaso2(payload.paso2);
    const paso3 = await this.crearPaso3(payload.paso3);
    return { paso1, paso2, paso3 };
  }
}
