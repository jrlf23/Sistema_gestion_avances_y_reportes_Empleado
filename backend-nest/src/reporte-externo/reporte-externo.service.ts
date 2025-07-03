import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReporteExterno } from "./reporte-externo.entity";
import { Repository } from "typeorm";
import { CreateReporteExternoDto } from "./dto/create-reporte-externo.dto";


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

    async findAll(): Promise<ReporteExterno[]>
    {
        return this.repo.find();
    }
}