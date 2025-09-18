import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReporteExterno } from "./reporte-externo.entity";
import { Repository } from "typeorm";
import { CreateReporteExternoDto } from "./dto/create-reporte-externo.dto";
import { Empleado } from "src/Empleado/empleado.entity";


@Injectable()
export class ReporteExternoService
{
    constructor ( 
        @InjectRepository(ReporteExterno)
        private repo: Repository<ReporteExterno>
    ) {}

    async create (data: CreateReporteExternoDto): Promise<ReporteExterno>
    {
        const reporte = this.repo.create(data);
        return this.repo.save(reporte);
    }

    async createForEmpleado(data: CreateReporteExternoDto, empleadoId: number): Promise<ReporteExterno>
    {
        if (!empleadoId && empleadoId !== 0) {
            throw new NotFoundException('Empleado no autenticado');
        }
        const empleadoRef = { id_empleado: empleadoId } as Empleado;
        const reporte = this.repo.create({ ...data, empleado: empleadoRef });
        return this.repo.save(reporte);
    }

    async findAll(): Promise<ReporteExterno[]>
    {
        return this.repo.find();
    }
}