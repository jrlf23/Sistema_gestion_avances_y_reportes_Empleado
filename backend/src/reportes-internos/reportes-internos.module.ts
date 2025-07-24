import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Reporte } from "./entities/reporte.entity";
import { Repuesto } from "./entities/repuesto.entity";
import { Accesorio } from "./entities/accesorio.entity";
import { Punto } from "./entities/punto.entity";
import { Bahia } from "./entities/bahia.entity";
import { RevisionBahiaItem } from "./entities/revision-bahia-item.entity";
import { reportesInternosController } from "./reportes-internos.controller";
import { ReporteExternoService } from "src/reporte-externo/reporte-externo.service";
import { reportesInternosService } from "./reportes-internos.service";


@Module({
    imports:[
        TypeOrmModule.forFeature([
            Reporte, Repuesto, Accesorio, Punto, Bahia, RevisionBahiaItem,
        ]),
    ],

    controllers: [reportesInternosController],
    providers: [reportesInternosService]
})

export class ReporteInternosModule {}