import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Reporte } from "./entities/reporte.entity";
import { Repuesto } from "./entities/repuesto.entity";
import { Accesorio } from "./entities/accesorio.entity";
import { Punto } from "./entities/punto.entity";
import { Bahia } from "./entities/bahia.entity";
import { RevisionBahiaItem } from "./entities/revision-bahia-item.entity";
import { CrearReportDto } from "./dto/crear-reporte.dto";

@Injectable()
export class reportesInternosService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepo: Repository<Reporte>,

    @InjectRepository(Repuesto)
    private repuestoRepo: Repository<Repuesto>,

    @InjectRepository(Accesorio)
    private accesorioRepo: Repository<Accesorio>,

    @InjectRepository(Punto)
    private puntoRepo: Repository<Punto>,

    @InjectRepository(Bahia)
    private bahiaRepo: Repository<Bahia>,

    @InjectRepository(RevisionBahiaItem)
    private revisionItemRepo: Repository<RevisionBahiaItem>,
  ) {}

  async crearReporte(data: CrearReportDto): Promise<Reporte> {
    const { repuestos, accesorios, puntos, bahias, ...datosBasicos } = data;

    // ✅ Crear el reporte base
    const reporte = this.reporteRepo.create(datosBasicos);

    // ✅ Solo asignar si existen repuestos
    if (repuestos && repuestos.length > 0) {
      reporte.repuestos = repuestos.map((r) =>
        this.repuestoRepo.create({ ...r }),
      );
    }

    // ✅ Solo asignar si existen accesorios
    if (accesorios && accesorios.length > 0) {
      reporte.accesorios = accesorios.map((a) =>
        this.accesorioRepo.create({ nombre: a }),
      );
    }

    // ✅ Solo asignar si existen puntos
    if (puntos && puntos.length > 0) {
      reporte.puntos = puntos.map((p) => this.puntoRepo.create({ ...p }));
    }

    // ✅ Solo asignar si existen bahías
    if (bahias && bahias.length > 0) {
      reporte.bahias = bahias.map((b) => {
        const nuevaBahia = this.bahiaRepo.create({ numero: b.numero });
        nuevaBahia.items =
          b.items?.map((item) =>
            this.revisionItemRepo.create({
              nombre: item.nombre,
              lado: item.lado,
            }),
          ) ?? [];
        return nuevaBahia;
      });
    }

    return await this.reporteRepo.save(reporte);
  }

  async obtenerTodos(): Promise<Reporte[]> {
    return await this.reporteRepo.find({
      relations: ["repuestos", "accesorios", "puntos", "bahias", "bahias.items"],
      order: { fechaCreacion: "DESC" },
    });
  }

  async obtenerPorId(id: number): Promise<Reporte> {
    const reporte = await this.reporteRepo.findOne({
      where: { id },
      relations: ["repuestos", "accesorios", "puntos", "bahias", "bahias.items"],
    });

    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }

    return reporte;
  }
}
